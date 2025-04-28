import React, { useContext } from 'react';
import { assets } from '../assets/assets';
import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { motion } from 'framer-motion';

const Navbar = () => {
  const { user, setShowLogin, logout, credit } = useContext(AppContext);
  const navigate = useNavigate();

  return (
    <div
      className="w-full text-white py-4 px-6 md:px-12 lg:px-16 shadow-2xl transition-all duration-300 "
      style={{
        background: 'linear-gradient(to right, #d2723a 25%, rgba(255, 255, 255, 0) 50%, #d2723a 75%)',
        backgroundSize: '200% 100%',
        animation: 'shine 5s infinite linear',
        boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.1)', // Slight shadow on base
      }}
    >
      <div className="flex items-center justify-between max-w-screen-xl mx-auto">
        {/* Logo */}
        <Link to="/">
          <img
            src={assets.logo}
            alt="Logo"
            className="w-32 sm:w-36 lg:w-48 object-contain"
          />
        </Link>

        {/* Navigation / User section */}
        <div className="flex items-center space-x-4 md:space-x-6">
          {user ? (
            <div className="flex items-center space-x-4">
              {/* Credits Button with Animation */}
              <motion.button
                onClick={() => navigate('/buy')}
                className="flex items-center space-x-2 bg-[#4E3629] hover:bg-[#3E2A1F] px-4 py-2 rounded-full transition-all duration-300 shadow-lg"
                whileHover={{
                  scale: 1.1,
                  backgroundColor: "#3E2A1F",
                  transition: { duration: 0.3 },
                }}
              >
                <img className="w-5" src={assets.credit_star} alt="Credits" />
                <p className="text-sm font-medium">Credits left: {credit}</p>
              </motion.button>

              {/* User greeting */}
              <p className="hidden sm:block text-sm">Hi, {user.name}</p>

              {/* Profile Dropdown */}
              <div className="relative group">
                <img
                  src={assets.profile_icon}
                  className="w-10 rounded-full shadow-md"
                  alt="Profile"
                />
                <div className="absolute hidden group-hover:block top-0 right-0 z-10 text-black rounded-lg p-4 bg-white/80 backdrop-blur-md">
                  <ul className="list-none p-2 bg-white rounded-lg shadow-xl text-sm">
                    <li
                      onClick={logout}
                      className="py-1 px-2 cursor-pointer hover:bg-gray-200 rounded-md"
                    >
                      Logout
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              {/* Subscription Button with Animation */}
              <motion.p
                onClick={() => navigate('/buy')}
                className="cursor-pointer bg-[#8D6E63] hover:bg-[#7A4F38] text-white rounded-full px-6 py-3 transition-all duration-300 shadow-lg"
                whileHover={{
                  scale: 1.1,
                  backgroundColor: "#7A4F38",
                  transition: { duration: 0.1 },
                }}
              >
                Subscription
              </motion.p>

              {/* Login Button with Animation */}
              <motion.button
                onClick={() => setShowLogin(true)}
                className="bg-[#6D4C41] text-white px-8 py-3 rounded-full text-sm shadow-lg hover:bg-[#5A3E2C] transition-colors duration-300"
                whileHover={{
                  scale: 1.05,
                  backgroundColor: "#5A3E2C",
                  transition: { duration: 0.3 },
                }}
              >
                Login
              </motion.button>
            </div>
          )}
        </div>
      </div>

      {/* Adding shine effect using CSS animation */}
      <style>{`
        @keyframes shine {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }
      `}</style>
    </div>
  );
};

export default Navbar;
