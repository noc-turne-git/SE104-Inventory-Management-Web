import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// AUTH
import SignInScreen from './features/auth/SignInScreen';
import SignUp from "./features/auth/SignUpScreen";
import ForgotPasswordScreen from './features/auth/ForgotPasswordScreen';
import VerifyOtpScreen from './features/auth/VerifyOtpScreen';
import ResetPasswordScreen from './features/auth/ResetPasswordScreen';

// MAIN
import ProductScreen from './screenStyles/manager/ProductScreen';
import ShiftScreen from './screenStyles/manager/ShiftScreen';
import StaffScreen from './screenStyles/manager/StaffScreen';
import SupplierScreen from './screenStyles/manager/SupplierScreen';
import ReceiptScreen from './screenStyles/staff/ReceiptScreen';
import DeliveryScreen from './screenStyles/staff/DeliveryScreen';
import ProductViewScreen from './screenStyles/staff/ProductScreen';

import { Sidebar } from './components/Sidebar';

import './index.css';

function App() {
  return (
    <Router>
      <Routes>

        {/* AUTH (không có sidebar) */}
        <Route path="/" element={<SignInScreen />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/forgot-password" element={<ForgotPasswordScreen />} />
        <Route path="/verify-otp" element={<VerifyOtpScreen />} />
        <Route path="/reset-password" element={<ResetPasswordScreen />} />

        {/* MAIN APP (có sidebar) */}
        <Route
          path="/*"
          element={
            <div className="layout-container">
              <Sidebar />
              <div className="main-content">
                <Routes>
                  <Route path="products" element={<ProductScreen />} />
                  <Route path="shifts" element={<ShiftScreen />} />
                  <Route path="delivery" element={<DeliveryScreen />} />
                  <Route path="receipts" element={<ReceiptScreen />} />
                  <Route path="products_view" element={<ProductViewScreen />} />
                  <Route path="suppliers" element={<SupplierScreen />} />
                  <Route path="staffs" element={<StaffScreen />} />
                  <Route path="*" element={<div style={{ padding: 20 }}>Trang này đang phát triển...</div>} />
                </Routes>
              </div>
            </div>
          }
        />

      </Routes>
    </Router>
  );
}

export default App;