import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { IoMenu } from "react-icons/io5";
import { FaTimes } from 'react-icons/fa';

const Navbar = () => {
  const navigate = useNavigate();
  const [navOpen, setNavOpen] = useState(false);

  const toggleNav = () => setNavOpen(!navOpen);
  const closeNav = () => setNavOpen(false);

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/how-it-work', label: 'How It Works' },
    { path: '/about', label: 'About' },
    { path: '/testimonial', label: 'Testimonials' },
    { path: '/contact', label: 'Contact' }
  ];

  return (
    <nav className="p-4 lg:px-28 flex items-center justify-between bg-eerieBlack rubik-bold">
      {/* Mobile menu button and logo */}
      <div className="flex items-center gap-4">
        <button
          onClick={toggleNav}
          className="text-white lg:hidden md:hidden"
          aria-label={navOpen ? "Close menu" : "Open menu"}
        >
          {navOpen ? <FaTimes size={24} /> : <IoMenu size={24} />}
        </button>

        <h1
          className="text-2xl text-white cursor-pointer"
          onClick={() => { navigate('/'); closeNav(); }}
        >
          HypeDrop
        </h1>
      </div>

      {/* Navigation links */}
      <ul className={`
        ${navOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 md:translate-x-0
        absolute lg:relative
        top-20 lg:top-0
        left-0 w-full lg:w-auto
        h-screen lg:h-auto
        bg-charcoal lg:bg-transparent
        flex flex-col lg:flex-row
        gap-6 lg:gap-5
        p-4 lg:p-0
        transition-transform duration-300 ease-in-out
        z-40
      `}>
        {navItems.map((item) => (
          <li key={item.path}>
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                `block py-2 text-white text-sm hover:text-brassYellow transition-colors
                ${isActive ? 'text-brassYellow' : ''}`
              }
              onClick={closeNav}
            >
              {item.label}
            </NavLink>
          </li>
        ))}
      </ul>

      {/* Auth button */}
      <div className="flex gap-5">
        <button
          onClick={() => navigate('/login')}
          className="text-darkSlateGray cursor-pointer rubik-regular rounded-full bg-brassYellow hover:bg-brassYellow/90 px-6 py-2 text-sm transition-colors"
        >
          Sign Up/Login
        </button>
      </div>
    </nav>
  );
};

export default Navbar;