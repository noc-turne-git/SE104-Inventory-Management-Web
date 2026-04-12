import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// --- AUTH COMPONENTS ---
import SignInScreen from './features/auth/SignInScreen';
import SignUp from "./features/auth/SignUpScreen";
import ForgotPasswordScreen from './features/auth/ForgotPasswordScreen';
import VerifyOtpScreen from './features/auth/VerifyOtpScreen';
import ResetPasswordScreen from './features/auth/ResetPasswordScreen';

// --- MANAGER SCREENS ---
import ProductScreen from './screenStyles/manager/ProductScreen';
import ShiftScreen from './screenStyles/manager/ShiftScreen';
import StaffScreen from './screenStyles/manager/StaffScreen';
import SupplierScreen from './screenStyles/manager/SupplierScreen';
import DashboardManagerScreen from './screenStyles/manager/DashboardScreen';
import NoteAuthorizationScreen from './screenStyles/manager/NoteAuthorizationScreen';

// --- STAFF SCREENS ---
import ReceiptScreen from './screenStyles/staff/ReceiptScreen';
import DeliveryScreen from './screenStyles/staff/DeliveryScreen';
import ProductViewScreen from './screenStyles/staff/ProductScreen';
import DashboardStaffScreen from './screenStyles/staff/DashboardScreen';

// --- COMMON COMPONENTS ---
import { Sidebar } from './components/Sidebar';
import { NoteProvider } from './context/NoteContext';
import './index.css';
import { HomeScreen } from './screenStyles/HomeScreen';
import { MOCK_HOME_DATA } from './data/MOCK_HOME';
import ProfileScreen from './screenStyles/manager/ProfileScreen';
//import WareHouseScreen  from './screenStyles/WareHouseScreen';
//import { MOCK_WAREHOUSES } from './data/MOCK_WAREHOUSE';

function App() {
  return (
    <NoteProvider>
      <Router>
        <div className="layout-container">
          {/* Lưu ý: Sidebar thường chỉ hiển thị khi đã đăng nhập. 
              Nếu bạn muốn ẩn Sidebar ở các trang Auth, bạn có thể thêm logic kiểm tra auth tại đây.
          */}
          <Sidebar />

          <div className="main-content">
            <Routes>
              {/* --- AUTH ROUTES --- */}
              <Route path="/signin" element={<SignInScreen />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/forgot-password" element={<ForgotPasswordScreen />} />
              <Route path="/verify-otp" element={<VerifyOtpScreen />} />
              <Route path="/reset-password" element={<ResetPasswordScreen />} />

              {/* --- MANAGER ROUTES --- */}
              <Route path="/dashboard_manager" element={<DashboardManagerScreen />} />
              <Route path="/profile" element={<ProfileScreen />} />
              <Route path="/products" element={<ProductScreen />} />
              <Route path="/suppliers" element={<SupplierScreen />} />
              <Route path="/staffs" element={<StaffScreen />} />
              <Route path="/shifts" element={<ShiftScreen />} />
              <Route path="/notes" element={<NoteAuthorizationScreen />} />
              

              <Route path="/home" element={<HomeScreen data={MOCK_HOME_DATA} themeColor="#1f6feb" />} />
              {/* <Route path="/warehouse" element={<WareHouseScreen warehouses={MOCK_WAREHOUSES} invitations={[]} onManage={() => {}} onCreate={() => {}} onAcceptInvitation={() => {}} onDeclineInvitation={() => {}} />} /> */}

              {/* --- STAFF ROUTES --- */}
              <Route path="/dashboard_staff" element={<DashboardStaffScreen />} />
              <Route path="/products_view" element={<ProductViewScreen />} />
              <Route path="/delivery" element={<DeliveryScreen />} />
              <Route path="/receipts" element={<ReceiptScreen />} />

              {/* --- DEFAULT & 404 --- */}
              <Route path="/" element={<Navigate to="/signin" replace />} />
              <Route path="*" element={<div style={{ padding: 20 }}>Trang này đang phát triển hoặc không tồn tại...</div>} />
            </Routes>
          </div>
        </div>
      </Router>
    </NoteProvider>
  );
}

export default App;