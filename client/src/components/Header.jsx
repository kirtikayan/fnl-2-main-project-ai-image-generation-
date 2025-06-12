import React, { useContext } from 'react';
import { assets } from '../assets/assets';
import { motion } from 'framer-motion';
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const { user, setShowLogin } = useContext(AppContext);
  const navigate = useNavigate();

  const handleClick = () => {
    if (user) {
      navigate('/Result');
    } else {
      setShowLogin(true);
    }
  };

  return (
    <motion.div
      className="flex flex-col justify-center items-center text-center py-24 px-4 md:px-12 text-[#2c1d29]"
      style={{
        background: 'radial-gradient(circle at center, #f8e1ff 0%, #ffffff 60%)',
      }}
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 1.5,
        ease: [0.6, -0.05, 0.01, 0.99],
        type: 'spring',
        stiffness: 100,
        damping: 25,
      }}
    >
      {/* Logo */}
      <motion.div
        className="mb-10"
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 1 }}
      >
        <img
          src={assets.logo}
          alt="AI Art Logo"
          className="w-32 sm:w-40 lg:w-48 object-contain"
        />
      </motion.div>

      {/* Animated Tagline */}
      <motion.div
        className="bg-gradient-to-r from-fuchsia-500 via-pink-500 to-rose-400 px-6 py-2 rounded-full inline-flex items-center space-x-2 text-lg font-semibold text-white"
        whileHover={{
          scale: 1.05,
          rotate: [0, 3, -3, 3, 0],
        }}
        transition={{
          duration: 0.6,
          ease: 'easeInOut',
        }}
      >
        <p>Your Gateway to AI-Generated Art</p>
        <img src={assets.star_icon} alt="Star Icon" className="w-6 h-6" />
      </motion.div>

      {/* Main Heading */}
      <motion.h1
        className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mt-12 max-w-3xl mx-auto leading-tight"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 1 }}
        style={{
          backgroundImage: 'linear-gradient(90deg, #0d2661, #ff77ff, #00c6ff, #00ff99)',
          backgroundSize: '400% 400%',
          backgroundPosition: '0% 50%',
          color: 'transparent',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          animation: 'gradientAnimation 6s ease infinite',
        }}
      >
        Transform Your Ideas into Stunning Visual Art in Seconds
      </motion.h1>

      {/* Description */}
      <motion.p
        className="text-lg mt-6 max-w-xl mx-auto text-[#4a3b4e]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 1 }}
      >
        Harness the power of AI to turn simple words into breathtaking art. Fast,
        intuitive, and mesmerizing — watch your imagination become reality.
      </motion.p>

      {/* Action Button */}
      <motion.button
        onClick={handleClick}
        className="mt-10 px-8 py-3 bg-gradient-to-r from-pink-600 to-indigo-500 text-white text-lg font-semibold rounded-full hover:scale-105 active:scale-95 transition-all flex items-center"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
      >
        Start Creating
        <img className="h-6 ml-2" src={assets.star_group} alt="Star Group" />
      </motion.button>

      {/* Art Preview */}
      <motion.div
        className="mt-20 grid grid-cols-2 sm:grid-cols-3 gap-6 max-w-5xl mx-auto px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
      >
        {Array(6)
          .fill('')
          .map((_, index) => (
            <motion.div
              key={index}
              className="relative w-full h-48 rounded-lg overflow-hidden border border-purple-200"
              whileHover={{
                scale: 1.1,
                rotate: 5,
                transition: { duration: 0.4 },
              }}
            >
              <img
                src={
                  index % 2 === 0
                    ? assets.sample_img_2
                    : assets.sample_img_1
                    
                }
                alt={`AI Art ${index}`}
                className="w-full h-full object-cover"
              />
            </motion.div>
          ))}
      </motion.div>

      {/* Footer Text */}
      <motion.p
        className="mt-12 text-sm text-[#4b3e4f]"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0] }}
        transition={{
          delay: 1.4,
          duration: 2,
          repeat: Infinity,
          repeatType: 'loop',
        }}
      >
        Powered by cutting-edge AI to bring your creativity to life.
      </motion.p>

      {/* Keyframe animation for text gradient */}
      <style>{`
        @keyframes gradientAnimation {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
      `}</style>
    </motion.div>
  );
};

export default Header;
