import { useState } from 'react';
import { Van, ScrollText, LayoutDashboard, User, Truck, Package, Users, Calendar, LogOut, Home } from 'lucide-react';
import { Link, useLocation} from 'react-router-dom';
import './Sidebar.css';
import { ProfileFeature } from '../features/profile/profile';

export const Sidebar = () => {
  const location = useLocation();
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  //Path để load screens
  const menuItems = [
    { name: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/dashboard' },
    { name: 'Suppliers', icon: <Truck size={20} />, path: '/suppliers' },
    { name: 'Products', icon: <Package size={20} />, path: '/products' },
    { name: 'Staff', icon: <Users size={20} />, path: '/staffs' },
    { name: 'Shifts', icon: <Calendar size={20} />, path: '/shifts' },
    { name: 'Delivery', icon: <ScrollText size={20} />, path: '/delivery' },
    { name: 'Receipts', icon: <Van size={20} />, path: '/receipts' },
    { name: 'ProductsView', icon: <Package size={20} />, path: '/products_view' },
    { name: 'Home', icon: <Home size={20} />, path: '/home' },
    { name: 'Warehouse', icon: <Home size={20} />, path: '/warehouse' },
  ];

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2 className="logo-text">Management System</h2>
        <button 
          onClick={() => setIsProfileOpen(true)}
          className="user-card flex items-center gap-3 w-full p-2 rounded-xl hover:bg-white/10 transition-all text-left outline-none"
        >
          <div className="avatar">J</div>
          <div className="user-info">
            <span className="user-name">John Manager</span>
            <span className="user-role">Manager</span>
          </div>
        </button>
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

      <button className="logout-button">
        <LogOut size={18} />
        <span>Logout</span>
      </button>

      <ProfileFeature 
        isOpen={isProfileOpen} 
        onClose={() => setIsProfileOpen(false)} 
      />
      
    </div>
  );
};