import ProductScreen from './screenStyles/manager/ProductScreen';
import ShiftScreen from './screenStyles/manager/ShiftScreen';
import StaffScreen from './screenStyles/manager/StaffScreen';
import SupplierScreen from './screenStyles/manager/SupplierScreen';
import { Sidebar } from './components/Sidebar';
import ReceiptScreen from './screenStyles/staff/ReceiptScreen';
import DeliveryScreen from './screenStyles/staff/DeliveryScreen';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductViewScreen from './screenStyles/staff/ProductScreen';
import './index.css';

function App() {
  return (
    <Router>
      <div className="layout-container">
        {/* Thanh điều hướng bên trái */}
        <Sidebar />

        {/* Vùng hiển thị nội dung bên phải */}
        <div className="main-content">
          <Routes>
            <Route path="/products" element={<ProductScreen />} />
            {/* Mặc định vào Products hoặc Dashboard */}
            <Route path="/shifts" element={<ShiftScreen />} /> 
            <Route path="/delivery" element={<DeliveryScreen />} /> 
            <Route path="/receipts" element={<ReceiptScreen />} /> 
            <Route path="/products_view" element={<ReceiptScreen />} /> 
            <Route path="/suppliers" element={<SupplierScreen />} /> 
            <Route path="/staffs" element={<StaffScreen />} /> 
            <Route path="*" element={<div style={{padding: 20}}>Trang này đang phát triển...</div>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;