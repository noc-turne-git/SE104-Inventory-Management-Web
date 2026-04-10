import { Van, ScrollText, LayoutDashboard, User, Truck, Package, Users, Calendar, LogOut } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Sidebar.css';

export const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Update: thêm /app
  const menuItems = [
    { name: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/app/dashboard' },
    { name: 'Profile', icon: <User size={20} />, path: '/app/profile' },
    { name: 'Suppliers', icon: <Truck size={20} />, path: '/app/suppliers' },
    { name: 'Products', icon: <Package size={20} />, path: '/app/products' },
    { name: 'Staff', icon: <Users size={20} />, path: '/app/staffs' },
    { name: 'Shifts', icon: <Calendar size={20} />, path: '/app/shifts' },
    { name: 'Delivery', icon: <ScrollText size={20} />, path: '/app/delivery' },
    { name: 'Receipts', icon: <Van size={20} />, path: '/app/receipts' },
    { name: 'ProductsView', icon: <Package size={20} />, path: '/app/products_view' },
  ];

  const handleLogout = () => {
    navigate("/", { replace: true });
  };

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2 className="logo-text">Management System</h2>
        <div className="user-card">
          <div className="avatar">J</div>
          <div className="user-info">
            <span className="user-name">John Manager</span>
            <span className="user-role">Manager</span>
          </div>
        </div>
      </div>

      <nav className="nav-list">
        {menuItems.map((item) => (
          <Link 
            key={item.name} 
            to={item.path} 
            className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
          >
            {item.icon}
            <span className="nav-text">{item.name}</span>
          </Link>
        ))}
      </nav>

      {/* Nhấn logout về màn hình sign in (ví dụ đỡ vì chưa có home=)))  */}
      <button className="logout-button" onClick={handleLogout}>
        <LogOut size={18} />
        <span>Logout</span>
      </button>
    </div>
  );
};