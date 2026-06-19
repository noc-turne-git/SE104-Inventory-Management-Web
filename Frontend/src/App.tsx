import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { Toaster } from 'sonner';

// --- AUTH & PUBLIC ---
import { HomeScreen } from './screens/HomeScreen';
import SignInScreen from './features/auth/SignInScreen';
import SignUp from "./features/auth/SignUpScreen";
import ForgotPasswordScreen from "./features/auth/ForgotPasswordScreen";
import VerifyOtpScreen from "./features/auth/VerifyOtpScreen";
import ResetPasswordScreen from "./features/auth/ResetPasswordScreen"
import VerifyEmailScreen from "./features/auth/VerifyEmailScreen";
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
import { AuthProvider, useAuth } from './context/AuthContext';
import { WarehouseProvider, useWarehouseContext } from "./context/WarehouseContext";
import './index.css';

// Component Layout chứa Sidebar - Chỉ dùng cho các route bên trong hệ thống
const AppLayout = () => {
  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      <Sidebar /> 
      <main className="flex-1 overflow-y-auto p-4">
        {/* Outlet sẽ render các con của Route /app/* */}
        <Outlet />
      </main>
    </div>
  );
};

// --- MAIN APP ---
// Quản lý toàn bộ routing và route guards của ứng dụng
function App() {

  // DefaultRoute
  // Redirect user về dashboard tương ứng theo role khi vào /app
  const DefaultRoute = () => { 
    const { role } = useWarehouseContext();
    if (role === "owner" || role === "manager") return <Navigate to="dashboard_manager" replace />; 
    if (role === "staff") return <Navigate to="dashboard_staff" replace />; 
    return <Navigate to="/warehouse" replace />; 
  };
  
  // GuestOnlyRoute
  // Guard: chỉ cho phép user chưa login
  // Nếu đã login: Có role → /app, chưa có role → /warehouse
  const GuestOnlyRoute = () => {
    const { user, loading: authLoading } = useAuth();
    const { role, loading: whLoading } = useWarehouseContext(); //đổi tên loading thành whLoading để trách trùng tên biến vs loading của useAuth
    // Có thêm loading check để tránh redirect sai khi reload
    if (authLoading || whLoading) {
      return null; // hoặc spinner
    }
    if (user) {
      return role
        ? <Navigate to="/app" replace /> //Nếu đã login và đã chọn warehouse role: chuyển /app.
        : <Navigate to="/warehouse" replace />;
    }
    return <Outlet />;
  };

  // RequireAuthRoute
  // Guard: chỉ cho phép user đã login
  // Nếu chưa login → redirect /signin
  const RequireAuthRoute = () => {
    const { user } = useAuth();
    if (!user) {
      return <Navigate to="/signin" replace />;
    }
    return <Outlet />;
  };

  // RequireRoleRoute
  // Guard: yêu cầu user đã login + có warehouse role
  // Nếu chưa login → /signin và chưa có role → /warehouse
  const RequireRoleRoute = () => { 
    const { role } = useWarehouseContext(); 
    const { user } = useAuth();
    if (!user) {
      return <Navigate to="/signin" replace />;
    }
    if (!role) { 
      return <Navigate to="/warehouse" replace />; 
    }
    return <Outlet />; 
  };

  // RoleRoute
  // Guard: phân quyền theo role (RBAC)
  // Nếu chưa có role → /warehouse, role không hợp lệ → /app (default dashboard)
  const RoleRoute = ({ allow }: { allow: string[] }) => { 
    const { role } = useWarehouseContext(); 
    if (!role) { 
      return <Navigate to="/warehouse" replace />; 
    } 
    if (!allow.includes(role)) { 
      return <Navigate to="/app" replace />; 
    } 
    return <Outlet />; 
  };

  // ResetFlowRoute
  // Kiểm tra key trong localStorage (reset_email, reset_token)
  // Nếu thiếu hoặc không hợp lệ → redirect /forgotpassword
  const ResetFlowRoute = ({ requiredKey, redirectTo }: { requiredKey: string; redirectTo: string }) => {
    const value = localStorage.getItem(requiredKey);
    if (!value || value === "undefined" || value === "null") {
      return <Navigate to={redirectTo} replace />;
    }
    return <Outlet />;
  };

  return (
    <Router>
      <WarehouseProvider>
        <AuthProvider>
          <NoteProvider>
            <Toaster richColors position="top-center" />
            <Routes>
              {/*--- PUBLIC ROUTES (Không cần authentication) ---*/}
              <Route path="/home" element={<HomeScreen data={MOCK_HOME_DATA} themeColor="#1f6feb" />} />
              <Route path="/verify-email" element={<VerifyEmailScreen />} />

              {/* --- AUTH ROUTES (Ngăn user đã login truy cập /signin, /signup) --- */}
              <Route element={<GuestOnlyRoute />}> 
                <Route path="/signin" element={<SignInScreen />} />
                <Route path="/signup" element={<SignUp />} />
              </Route>
              
              {/* --- RESET PASSWORD FLOW --- */}
              <Route path="/forgotpassword" element={<ForgotPasswordScreen />} />
              <Route element={<ResetFlowRoute requiredKey="reset_email" redirectTo="/forgotpassword" />}>
                <Route path="/verifyotp" element={<VerifyOtpScreen />} />
              </Route>
              <Route element={<ResetFlowRoute requiredKey="reset_token" redirectTo="/forgotpassword" />}>
                <Route path="/resetpassword" element={<ResetPasswordScreen />} />
              </Route>

              {/* --- WORKSPACE SELECTION (yêu cầu login) --- */}
              <Route element={<RequireAuthRoute />}>
                <Route path="/warehouse" element={<WareHouseScreen />} />
              </Route>

              {/* --- MAIN APP (yêu cầu login + role) --- */}
              <Route path="/app" element={<RequireRoleRoute />}>
                <Route element={<AppLayout />}>
                  {/* Manager Routes */}
                  <Route element={<RoleRoute allow={["owner", "manager"]} />}>
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
          </NoteProvider>
        </AuthProvider>
      </WarehouseProvider>
    </Router>
  );
}

export default App;
