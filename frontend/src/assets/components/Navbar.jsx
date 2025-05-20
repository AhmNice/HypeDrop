import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FiHome, FiMusic, FiUpload, FiUser, FiLogOut, FiMenu,
  FiX } from 'react-icons/fi';
import { useAuthStore } from '../store/authStore';
import toast from 'react-hot-toast';

const Navbar = () => {
  const navigate = useNavigate();
  const { logout, isAuthenticated } = useAuthStore();
  const [isCollapsed, setIsCollapsed] = useState(true);

  const handleLogout = async () => {
    await logout();
    localStorage.clear();
    toast.success('User logged out successfully');
    navigate('/login', { replace: true });
  };
  const handleNavCollapse = ()=>{
      setIsCollapsed(prev => !prev)
  }
  return (
    <div
      className={`bg-white shadow-md flex flex-col h-screen p-4 justify-between transition-all duration-300 ${
        isCollapsed ? 'w-20' : 'w-64'
      }`}

    >
      {/* Logo - Collapsed to just icon or small text */}
      <div className="flex justify-between p-4 items-center gap-5 relative">
        {isCollapsed ? (
          <span className="SpaceGroteskBold text-2xl font-bold text-[#7D00FF]">H</span>
        ) : (
          <h1 className="SpaceGroteskBold text-2xl font-bold text-[#7D00FF]">HypeDrop</h1>
        )}
         {isCollapsed ? <span className='absolute -right-4'
          onClick={handleNavCollapse}
         ><FiMenu size={20}/></span> :
        <span onClick={handleNavCollapse} className='right-0'> <FiX size={20}/></span> }
      </div>

      {/* Navigation Links */}
      <nav className="flex-1">
        <ul className="flex flex-col gap-2">
          <NavItem
            to="/dashboard"
            icon={<FiHome size={20} />}
            label="Dashboard"
            isCollapsed={isCollapsed}
          />
          <NavItem
            to="/snippets"
            icon={<FiMusic size={20} />}
            label="My Snippets"
            isCollapsed={isCollapsed}
          />
          <NavItem
            to="/upload-snippet"
            icon={<FiUpload size={20} />}
            label="Add Snippet"
            isCollapsed={isCollapsed}
          />
          <NavItem
            to="/profile"
            icon={<FiUser size={20} />}
            label="Profile"
            isCollapsed={isCollapsed}
          />
        </ul>
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-gray-100">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 text-gray-700 hover:text-[#7D00FF] transition-colors w-full"
        >
          <FiLogOut size={20} />
          {!isCollapsed && <span className="InterRegular">Logout</span>}
        </button>
      </div>
    </div>
  );
};

// Updated NavItem component
const NavItem = ({ to, icon, label, isCollapsed }) => (
  <li>
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center p-3 rounded-lg transition-colors ${
          isActive
            ? 'bg-[#7D00FF]/10 text-[#7D00FF]'
            : 'text-gray-700 hover:bg-gray-100'
        } ${isCollapsed ? 'justify-center' : ''}`
      }
    >
      <span className="flex-shrink-0">{icon}</span>
      {!isCollapsed && <span className="InterRegular ml-3">{label}</span>}
    </NavLink>
  </li>
);

export default Navbar;