import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate, Outlet } from 'react-router-dom';

// --- AUTH & PUBLIC ---
import { HomeScreen } from './screens/HomeScreen';
import SignInScreen from './features/auth/SignInScreen';
import SignUp from "./features/auth/SignUpScreen";
import ForgotPasswordScreen from "./features/auth/ForgotPasswordScreen";
import VerifyOtpScreen from "./features/auth/VerifyOtpScreen";
import ResetPasswordScreen from "./features/auth/ResetPasswordScreen"
import { MOCK_HOME_DATA } from './data/MOCK_HOME';

// --- SELECTION ---
import WareHouseScreen from './screens/WareHouseScreen';

// --- MANAGER ---
import { Sidebar } from './components/Sidebar';
import DashboardManagerScreen from './screens/manager/DashboardScreen';
import ProductScreen from './screens/manager/ProductScreen';
import StaffScreen from './screens/manager/StaffScreen';
import ShiftScreen from './screens/manager/ShiftScreen';
import SupplierScreen from './screens/manager/SupplierScreen';
import NoteAuthorizationScreen from './screens/manager/NoteAuthorizationScreen';

// ---  STAFF ---
import DashboardStaffScreen from './screens/staff/DashboardScreen';
import ProductViewScreen from './screens/staff/ProductScreen';
import DeliveryScreen from './screens/staff/DeliveryScreen';
import ReceiptScreen from './screens/staff/ReceiptScreen';

// --- CONTEXT & CSS ---
import { NoteProvider } from './context/NoteContext';
import { AuthProvider } from './context/AuthContext';
import { WarehouseProvider, useWarehouse } from "./context/WarehouseContext";
import './index.css';

// Component Layout chứa Sidebar - Chỉ dùng cho các route bên trong hệ thống
const AppLayout = () => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar /> 
      <main className="flex-1 overflow-y-auto p-4">
        {/* Outlet sẽ render các con của Route /app/* */}
        <Outlet />
      </main>
    </div>
  );
};

// DefaultRoute theo role
const DefaultRoute = () => { 
  const { role } = useWarehouse(); 
  if (role === "manager") return <Navigate to="dashboard_manager" replace />; 
  if (role === "staff") return <Navigate to="dashboard_staff" replace />; 
  return <Navigate to="/warehouse" replace />; 
};

// Protected route chặn user chưa có role truy cập và quay về trang signin
const ProtectedRoute = () => { 
  const { role } = useWarehouse(); 
  if (!role) { 
    return <Navigate to="/signin" replace />; 
  } 
  return <Outlet />; 
};

//Role-based route
const RoleRoute = ({ allow }: { allow: string[] }) => { 
  const { role } = useWarehouse(); 
  if (!role) { 
    return <Navigate to="/signin" replace />; 
  } 
  if (!allow.includes(role)) { 
    return <Navigate to="/app" replace />; 
  } 
  return <Outlet />; 
};

// --- MAIN APP ---
function App() {
  return (
    <Router>
      <AuthProvider>
      <NoteProvider>
      <WarehouseProvider>
        <Routes>
          {/* --- NHÓM 1: PUBLIC (Không Sidebar) --- */}
          <Route path="/home" element={<HomeScreen data={MOCK_HOME_DATA} themeColor="#1f6feb" />} />
          <Route path="/signin" element={<SignInScreen />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forgotpassword" element={<ForgotPasswordScreen />} />
          <Route path="/verifyotp" element={<VerifyOtpScreen />} />
          <Route path="/resetpassword" element={<ResetPasswordScreen />} />

          {/* --- NHÓM 2: SELECTION (Không Sidebar) --- */}
          <Route path="/warehouse" element={<WareHouseScreen />} />

          {/* --- NHÓM 3: INTERNAL APP (CÓ SIDEBAR) --- */}
          <Route path="/app" element={<ProtectedRoute />}>
            <Route element={<AppLayout />}>
              {/* Manager Routes */}
              <Route element={<RoleRoute allow={["manager"]} />}>
                <Route path="dashboard_manager" element={<DashboardManagerScreen />} />
                <Route path="products" element={<ProductScreen />} />
                <Route path="staffs" element={<StaffScreen />} />
                <Route path="suppliers" element={<SupplierScreen />} />
                <Route path="notes" element={<NoteAuthorizationScreen/>} />
                <Route path="shifts" element={<ShiftScreen />} />
              </Route>
              {/* Staff Routes */}
              <Route element={<RoleRoute allow={["staff"]} />}>
                <Route path="dashboard_staff" element={<DashboardStaffScreen />} />
                <Route path="products_view" element={<ProductViewScreen />} />
                <Route path="delivery" element={<DeliveryScreen />} />
                <Route path="receipts" element={<ReceiptScreen />} />
              </Route>
              {/* DefaultRoute theo role */}
              <Route index element={<DefaultRoute />} />
            </Route>
          </Route>

          {/* --- ĐIỀU HƯỚNG GỐC --- */}
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="*" element={<div className="p-10">404 - Trang không tồn tại</div>} />
        </Routes>
      </WarehouseProvider>
      </NoteProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;