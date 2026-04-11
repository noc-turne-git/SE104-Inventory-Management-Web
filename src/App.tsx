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
import { HomeScreen } from './screenStyles/HomeScreen';
import { MOCK_HOME_DATA } from './data/MOCK_HOME';
import ProfileScreen from './screenStyles/manager/ProfileScreen';
import WareHouseScreen  from './screenStyles/WareHouseScreen';
import { MOCK_WAREHOUSES, MOCK_INVITATIONS } from './data/MOCK_WAREHOUSE';
import { useState } from 'react';

function App() {
  const [warehouses, setWarehouses] = useState(MOCK_WAREHOUSES);
  const [invitations, setInvitations] = useState(MOCK_INVITATIONS);
  const handleRemoveInvitation = (id: string) => {
    setInvitations(prev => prev.filter(inv => inv.id !== id));
  };

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
            <Route path="/profile" element={<ProfileScreen />} />
            <Route path="/delivery" element={<DeliveryScreen />} /> 
            <Route path="/receipts" element={<ReceiptScreen />} /> 
            <Route path="/products_view" element={<ProductViewScreen />} /> 
            <Route path="/suppliers" element={<SupplierScreen />} /> 
            <Route path="/staffs" element={<StaffScreen />} /> 
            <Route path="/home" element={<HomeScreen data={MOCK_HOME_DATA} themeColor="#1f6feb" />} />
            <Route path="/warehouse" element={<WareHouseScreen warehouses={warehouses} 
            invitations={invitations} 
            onManage={(id) => console.log("Manage:", id)} 
            onCreate={(name, addr) => console.log("Create:", name, addr)} 
            onAcceptInvitation={(id) => {
              console.log("Accepted:", id);
              handleRemoveInvitation(id);
            }} 
            onDeclineInvitation={(id) => {
              console.log("Declined:", id);
              handleRemoveInvitation(id);
            }} />} />
            <Route path="*" element={<div style={{padding: 20}}>Trang này đang phát triển...</div>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;