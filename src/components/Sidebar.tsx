import { Van, LayoutDashboard, Package, Users, Calendar, LogOut, NotebookPen, BookUser, PackagePlus, ArrowLeft } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import './Sidebar.css';
import { ProfileFeature } from '../features/profile/profile';
import { useAuth } from '../context/AuthContext';

export const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const {user, logout} = useAuth();
  if (!user) return null;

  const menuConfig = {
    manager: [
      { name: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/app/dashboard_manager' },
      { name: 'Products', icon: <Package size={20} />, path: '/app/products' },
      { name: 'Suppliers', icon: <BookUser size={20} />, path: '/app/suppliers' },
      { name: 'Staff', icon: <Users size={20} />, path: '/app/staffs' },
      { name: 'Shifts', icon: <Calendar size={20} />, path: '/app/shifts' },
      { name: 'Notes', icon: <NotebookPen size={20} />, path: '/app/notes' },
    ],
    staff: [
      { name: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/app/dashboard_staff' },
      { name: 'Products', icon: <Package size={20} />, path: '/app/products_view' },
      { name: 'Delivery', icon: <Van size={20} />, path: '/app/delivery' },
      { name: 'Receipts', icon: <PackagePlus size={20} />, path: '/app/receipts' },
    ]
  };

  const menuItems = menuConfig[user?.role as keyof typeof menuConfig] || [];

  const handleLogout = () => {
    logout();
    navigate("/home", { replace: true });
  };

  return (
    <div className="sidebar">
      {/* Header section */}
      <div className="sidebar-header">
        <div className="flex flex-row gap-2 items-center justify-start">
          <button className="backButton-text" onClick={() => navigate('/warehouse')} title="Back to Warehouse">
            <ArrowLeft size={20} />
          </button>
          <h2 className="brand-text">Stockify</h2>
        </div>

        <button 
          onClick={() => setIsProfileOpen(true)}
          className="user-card hover: bg-blue-100"
        >
          <div className="avatar">{user?.role ? 'M' : 'S'}</div>
          <div className="user-info">
            <span className="user-name">{user?.userName}</span>
            <span className="user-role">{user?.role}</span>
          </div>
        </button>
      </div>

      {/* Navigation section - scrollable if too long */}
      <nav className="nav-list">
        {menuItems.map((item) => (
          <Link 
            key={item.path} 
            to={item.path} 
            className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
          >
            {item.icon}
            <span className="nav-text">{item.name}</span>
          </Link>
        ))}
      </nav>

      {/* Logout button - always at bottom */}
      <div className="">
        <button className="logout-button" onClick={handleLogout}>
          <LogOut size={18} />
          <span>Logout</span>
        </button>
      </div>

      <ProfileFeature 
        isOpen={isProfileOpen} 
        onClose={() => setIsProfileOpen(false)} 
      />
    </div>
  );
};