import React, { useContext, useState, useRef, useEffect } from 'react';
import { assets } from '../assets/assets';
import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { motion } from 'framer-motion';

const Navbar = () => {
  const { user, setShowLogin, logout, credit } = useContext(AppContext);
  const navigate = useNavigate();

  // Dropdown state
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div
      className="w-full px-6 md:px-12 lg:px-16 py-4 border-b border-neutral-300 transition-all duration-300"
      style={{
        background: 'linear-gradient(to ,  white %, #e9d5c0)',
      }}
    >
      <div className="flex items-center justify-between max-w-screen-xl mx-auto">
        {/* Logo */}
        <Link to="/">
          <img
            src={assets.logo}
            alt="Logo"
            className="w-28 sm:w-36 object-contain"
          />
        </Link>

        {/* Navigation / User section */}
        <div className="flex items-center space-x-4 md:space-x-6 relative">
          {user ? (
            <>
              {/* Credits Badge */}
              <motion.button
                onClick={() => navigate('/buy')}
                className="flex items-center gap-2 bg-[#e3d5ca] text-[#3e2f2b] px-4 py-2 rounded-full text-sm border border-[#d6c1b1]"
                whileHover={{ scale: 1.05 }}
              >
                <img className="w-4" src={assets.credit_star} alt="Credits" />
                <span>Credits: {credit}</span>
              </motion.button>

              {/* Greeting */}
              <span className="hidden sm:block text-sm text-neutral-600">
                Hi, {user.name}
              </span>

              {/* Profile Icon + Click Dropdown */}
              <div className="relative" ref={dropdownRef}>
                <img
                  src={assets.profile_icon}
                  className="w-9 h-9 rounded-full border border-[#d6c1b1] cursor-pointer"
                  alt="Profile"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                />
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-32 bg-[#fdfaf5] border border-[#e0d0c0] rounded-md text-sm z-50">
                    <button
                      onClick={() => {
                        logout();
                        setDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-[#f0e6dd] transition-colors"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <motion.button
                onClick={() => navigate('/buy')}
                className="bg-[#d6b88d] text-white px-5 py-2 rounded-full text-sm hover:bg-[#cfa97e] transition-all"
                whileHover={{ scale: 1.05 }}
              >
                Subscription
              </motion.button>

              <motion.button
                onClick={() => setShowLogin(true)}
                className="bg-white border border-[#d6c1b1] text-[#3e2f2b] px-6 py-2 rounded-full text-sm hover:bg-[#f0e8e1] transition-all"
                whileHover={{ scale: 1.05 }}
              >
                Login
              </motion.button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
