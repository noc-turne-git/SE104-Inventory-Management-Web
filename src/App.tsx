import ProductScreen from './screenStyles/ProductScreen.tsx';
import ShiftScreen from './screenStyles/ShiftScreen.tsx';
import { Sidebar } from './components/Sidebar.tsx';
import ReceiptScreen from './screenStyles/ReceiptScreen.tsx';
import DeliveryScreen from './screenStyles/DeliveryScreen.tsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
            <Route path="*" element={<div style={{padding: 20}}>Trang này đang phát triển...</div>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;