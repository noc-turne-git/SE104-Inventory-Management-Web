import { Van, LayoutDashboard, Package, Users, Calendar, LogOut, NotebookPen, UserRoundPen, BookUser, PackagePlus } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Sidebar.css';

export const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Update: thêm /app
  const menuItems = [
    { name: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/dashboard_manager' },
    { name: 'Profile', icon: <UserRoundPen size={20} />, path: '/profile' },
    { name: 'Products', icon: <Package size={20} />, path: '/products' },
    { name: 'Suppliers', icon: <BookUser size={20} />, path: '/suppliers' },
    { name: 'Staff', icon: <Users size={20} />, path: '/staffs' },
    { name: 'Shifts', icon: <Calendar size={20} />, path: '/shifts' },
    { name: 'Notes', icon: <NotebookPen size={20} />, path: '/notes' },

    { name: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/dashboard_staff' },
    { name: 'Products', icon: <Package size={20} />, path: '/products_view' },
    { name: 'Delivery', icon: <Van size={20} />, path: '/delivery' },
    { name: 'Receipts', icon: <PackagePlus size={20} />, path: '/receipts' },
    
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
            key={item.path} 
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