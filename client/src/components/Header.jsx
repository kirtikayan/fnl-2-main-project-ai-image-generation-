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
      navigate('/Result')
    } else {
      setShowLogin(true);
    }
  };

  return (
    <motion.div
    className="flex flex-col justify-center items-center text-center py-24 px-4 md:px-12 bg-gradient-to-r from-red-300 to-yellow-200 text-blue-900"
    initial={{ opacity: 0, y: 50, scale: 0.95 }}  // Start a bit smaller for a zoom-in effect
    animate={{ opacity: 1, y: 0, scale: 1 }}  // Scale to normal size
    transition={{
      duration: 1.5,  // Longer duration for a smoother transition
      ease: [0.6, -0.05, 0.01, 0.99],  // Custom cubic-bezier easing for a unique feel
      type: 'spring',
      stiffness: 100,
      damping: 25,  // Slight damping for a more bouncy effect
    }}
    >
      {/* Logo Section */}
      <motion.div
        className="flex items-center justify-center space-x-4 mb-8"
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 1 }} // Delayed and same duration for each element
      >
        <img src={assets.logo} alt="AI Art Logo" className="w-32 sm:w-40 lg:w-48 object-contain" />
      </motion.div>

      {/* Tagline */}
      <motion.div
      className="bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 px-6 py-2 rounded-full inline-flex items-center space-x-2 text-lg font-semibold shadow-lg"
      initial={{ opacity: 1 }}
      whileHover={{
        x: [0, 10, -10, 10, -10, 0], // Funky horizontal shake
        y: [0, -5, 0, 5, 0], // Small vertical bounce
        scale: [1, 1.1, 1, 1.1, 1], // Slight scale-up for a "pulse" effect
        rotate: [0, 5, -5, 0], // Slight rotation for added funk
        backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"], // Background color shift
      }}
      transition={{
        duration: 2,
        repeat: Infinity, // Loop forever while hovering
        repeatType: 'loop',
        ease: "easeInOut", // Smooth easing
      }}
    >
      <p>Your Gateway to AI-Generated Art</p>
      <img src={assets.star_icon} alt="Star Icon" className="w-6 h-6" />
    </motion.div>


     
<motion.h1
      className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mt-12 max-w-3xl mx-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.6, duration: 1 }} // Delayed further
      style={{
        fontFamily: "sans-serif", // Default font, no font change
        backgroundImage: "linear-gradient(90deg, #0d2661, #ff77ff, #00c6ff, #00ff99)",
        backgroundSize: "400% 400%", // Larger background size for smoother transition
        backgroundPosition: "0% 50%",
        color: "transparent", // Text becomes transparent to reveal gradient
        backgroundClip: "text", // Clip the background gradient to the text
        WebkitBackgroundClip: "text", // Required for Safari
        animation: "gradientAnimation 3s ease infinite", // Animate the gradient
      }}
    >
      Transform Your Ideas into Stunning Visual Art in Seconds
    </motion.h1>

      {/* Description */}
      <motion.p
        className="text-lg mt-6 text-blue-900 max-w-xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 1 }} // Delay increased
      >
        Harness the power of AI to turn simple words into breathtaking art. It's fast, easy, and fun to watch your imagination come to life with AI.
      </motion.p>

      {/* Main Button */}
      <motion.button
        onClick={handleClick}
        className=" flex mt-8 px-8 py-3 bg-gradient-to-r from-pink-600 to-indigo-500 text-white text-lg font-semibold rounded-full shadow-xl transform transition-all hover:scale-105 active:scale-95"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }} // Delay before the button appears
      >
        Start Creating
        <img className="h-6 ml-2" src={assets.star_group} alt="Star Group" />
      </motion.button>

      {/* Featured Art Preview with Crazy Hover Animation */}
      <motion.div
  className="mt-16 grid grid-cols-3 gap-4 max-w-4xl mx-auto"
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ delay: 1.2, duration: 1 }} // Delay increased here too
>
  {Array(6).fill('').map((item, index) => (
    <motion.div
      key={index}
      className="relative w-full h-48 cursor-pointer rounded-lg overflow-hidden"
      whileHover={{
        scale: 1.2,
        rotate: 10,
        x: [0, 20, -20, 0], // Crazy horizontal shake effect
        y: [0, -10, 10, 0], // Crazy vertical shake effect
        boxShadow: "0 0 15px 5px rgba(255, 165, 0, 0.7)", // Glowing orange shadow for hover state


        transition: { duration: 0.5 },
      }}
      // Default box-shadow to none or light shadow when not hovered
      style={{ boxShadow: "0 0 5px rgba(128, 0, 128, 0.5)" }}
    >
      <img
        src={index % 2 === 0 ? assets.sample_img_2 : assets.sample_img_1}
        alt={`AI Art ${index}`}
        className="w-full h-full object-cover rounded-lg"
      />
    </motion.div>
  ))}
</motion.div>



      {/* Footer Text */}
      <motion.p
  className="mt-8 text-sm text-blue-900"
  initial={{ opacity: 0 }}
  animate={{ opacity: [0, 1, 0] }} // Loop opacity fade-in and fade-out
  transition={{
    delay: 1.4,
    duration: 2, // You can adjust the duration as needed
    repeat: Infinity, // Make it loop
    repeatType: 'loop', // Loop the animation continuously
  }} 
>
  Powered by cutting-edge AI technology to bring your imagination to life.
</motion.p>

    </motion.div>
  );
};

export default Header;
