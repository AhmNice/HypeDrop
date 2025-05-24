import React, { useState, useEffect } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import {
  FiHome,
  FiMusic,
  FiUpload,
  FiUser,
  FiLogOut,
  FiMenu,
  FiX,
  FiSearch,
  FiSettings,
} from "react-icons/fi";
import {MessageCircleCodeIcon, MessagesSquare} from 'lucide-react'
import { useAuthStore } from "../store/authStore";
import toast from "react-hot-toast";
import logoIcon from '../images/logoIcon.png';
import logoFull from '../images/logoFull.png';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout, isAuthenticated } = useAuthStore();
  const [isCollapsed, setIsCollapsed] = useState(() => {
    const savedState = localStorage.getItem("navbarCollapsed");
    return savedState ? JSON.parse(savedState) : false;
  });
  const [activePath, setActivePath] = useState(location.pathname);

  // Navigation items array
  const navItems = [
    {
      to: "/dashboard",
      icon: <FiHome size={20} />,
      label: "Dashboard",
      show: true,
    },
    {
      to: "/snippets",
      icon: <FiMusic size={20} />,
      label: `${user?.role === "artist" ? "My Snippets" : "All Snippets"}`,
      show: true,
    },
    {
      to: "/upload-snippet",
      icon: <FiUpload size={20} />,
      label: "Add Snippet",
      show: user?.role === "artist",
    },
    {
      to: "/profile",
      icon: <FiUser size={20} />,
      label: "Profile",
      show: true,
    },
    {
      to: "/settings",
      icon: <FiSettings size={20} />,
      label: "Settings",
      show: true,
    },
    {
      to: "/chat",
      icon: < MessagesSquare size={20} />,
      label: "Chat",
      show: true,
    },
  ];

  useEffect(() => {
    setActivePath(location.pathname);
  }, [location]);

  useEffect(() => {
    localStorage.setItem("navbarCollapsed", JSON.stringify(isCollapsed));
  }, [isCollapsed]);

  const handleLogout = async () => {
    try {
      await logout();
      localStorage.clear();
      toast.success("Logged out successfully");
      navigate("/login", { replace: true });
    } catch (error) {
      toast.error("Logout failed. Please try again.");
    }
  };

  const handleNavCollapse = () => {
    setIsCollapsed((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        window.innerWidth <= 768 &&
        !event.target.closest(".navbar-container")
      ) {
        setIsCollapsed(true);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      className={`bg-white shadow-md flex flex-col h-screen p-4 justify-between transition-all duration-300 ${isCollapsed ? "w-20" : "w-64"
        }`}
    >
      {/* Logo and Toggle */}
      <div className="flex justify-between p-4 items-center gap-5 relative">
        <NavLink to="/dashboard" className="flex items-center">
          {
            isCollapsed
              ?
              <img src={logoIcon} alt="HypeDrop" className="h-4 w-4" />
              :
            <img src={logoFull} alt="HypeDrop" className="h-8" />
          }
        </NavLink>
        <button
          onClick={handleNavCollapse}
          className={`absolute p-1 rounded-full hover:bg-gray-100 transition-colors ${isCollapsed ? "-right-4" : "right-0"
            }`}
          aria-label={isCollapsed ? "Expand menu" : "Collapse menu"}
        >
          {isCollapsed ? <FiMenu size={20} /> : <FiX size={20} />}
        </button>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 overflow-y-auto">
        <ul className="flex flex-col gap-1">
          {navItems.map(
            (item) =>
              item.show && (
                <NavItem
                  key={item.to}
                  to={item.to}
                  icon={item.icon}
                  label={item.label}
                  isCollapsed={isCollapsed}
                  activePath={activePath}
                />
              )
          )}
        </ul>
      </nav>

      {/* User Profile and Logout */}
      <div className="p-4 border-t border-gray-100">
        {!isCollapsed && user && (
          <div className="flex items-center mb-4 p-2 rounded-lg hover:bg-gray-50 transition-colors">
            <div className="w-8 h-8 rounded-full bg-[#7D00FF]/10 flex items-center justify-center text-[#7D00FF] font-medium">
              {user?.role === "artist"
                ? user?.stageName?.charAt(0)
                : user?.userName?.charAt(0)}
            </div>
            <div className="ml-3 overflow-hidden">
              <p className="font-medium text-sm truncate">{user.name}</p>
              <p className="text-xs text-gray-500 truncate">{user.email}</p>
            </div>
          </div>
        )}
        <button
          onClick={handleLogout}
          className={`flex items-center p-3 rounded-lg transition-colors
            ${isCollapsed ? "justify-center" : ""}`}
          aria-label="Logout"
        >
          <FiLogOut size={20} />
          {!isCollapsed && <span className="InterRegular">Logout</span>}
        </button>
      </div>
    </div>
  );
};

const NavItem = ({ to, icon, label, isCollapsed, activePath }) => {
  const isActive = activePath.startsWith(to);

  return (
    <li>
      <NavLink
        to={to}
        className={`flex items-center p-3 rounded-lg transition-colors ${isActive
            ? "bg-[#7D00FF]/10 text-[#7D00FF] font-medium"
            : "text-gray-700 hover:bg-gray-100"
          } ${isCollapsed ? "justify-center" : ""}`}
      >
        <span className="flex-shrink-0">{icon}</span>
        {!isCollapsed && (
          <span className="InterRegular ml-3 overflow-hidden whitespace-nowrap overflow-ellipsis">
            {label}
          </span>
        )}
        {isActive && !isCollapsed && (
          <span className="ml-auto w-2 h-2 rounded-full bg-[#7D00FF]"></span>
        )}
      </NavLink>
    </li>
  );
};

export default Navbar;
