import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate, Outlet } from 'react-router-dom';

// --- AUTH & PUBLIC ---
import { HomeScreen } from './screens/HomeScreen';
import SignInScreen from './features/auth/SignInScreen';
import SignUp from "./features/auth/SignUpScreen";
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
import './index.css';

// 1. Component Layout chứa Sidebar - Chỉ dùng cho các route bên trong hệ thống
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

function App() {

  return (
    <AuthProvider>
    <NoteProvider>
      <Router>
        <Routes>
          {/* --- NHÓM 1: PUBLIC (Không Sidebar) --- */}
          <Route path="/home" element={<HomeScreen data={MOCK_HOME_DATA} themeColor="#1f6feb" />} />
          <Route path="/signin" element={<SignInScreen />} />
          <Route path="/signup" element={<SignUp />} />

          {/* --- NHÓM 2: SELECTION (Không Sidebar) --- */}
          <Route path="/warehouse" element={<WareHouseScreen />} />

          {/* --- NHÓM 3: INTERNAL APP (CÓ SIDEBAR) --- */}
          {/* Tất cả các route bắt đầu bằng /app sẽ được bọc bởi AppLayout */}
          <Route path="/app" element={<AppLayout />}>
            {/* Manager Routes */}
            <Route path="dashboard_manager" element={<DashboardManagerScreen />} />
            <Route path="products" element={<ProductScreen />} />
            <Route path="staffs" element={<StaffScreen />} />
            <Route path="suppliers" element={<SupplierScreen />} />
            <Route path="notes" element={<NoteAuthorizationScreen/>} />
            <Route path="shifts" element={<ShiftScreen />} />
            
            {/* Staff Routes */}
            <Route path="dashboard_staff" element={<DashboardStaffScreen />} />
            <Route path="products_view" element={<ProductViewScreen />} />
            <Route path="delivery" element={<DeliveryScreen />} />
            <Route path="receipts" element={<ReceiptScreen />} />

            {/* Điều hướng mặc định bên trong app */}
            <Route index element={<Navigate to="dashboard_manager" replace />} />
          </Route>

          {/* --- ĐIỀU HƯỚNG GỐC --- */}
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="*" element={<div className="p-10">404 - Trang không tồn tại</div>} />
        </Routes>
      </Router>
    </NoteProvider>
    </AuthProvider>
  );
}

export default App;