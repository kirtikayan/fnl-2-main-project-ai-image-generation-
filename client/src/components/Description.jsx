import React from 'react';
import { assets } from '../assets/assets';
import { motion } from 'framer-motion';

const Description = () => {
  return (
    <div
      className="flex flex-col items-center justify-center p-6 md:px-28  text-black bg-white "
      
    >
      {/* Main Heading */}
      <motion.h1
        className="text-3xl sm:text-5xl font-extrabold text-center mb-6 mt-7 "
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 1 }}
      >
        Generate AI Images
      </motion.h1>

      {/* Subheading */}
      <motion.p
        className="text-blue-900 mb-8 text-center max-w-lg mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        Bring Creative Vision to Life
      </motion.p>

      {/* Image and Text Section */}
      <div className="flex flex-col gap-5 md:gap-14 md:flex-row items-center mb-10">
        {/* Image Animation */}
        <motion.img
          src={assets.sample_img_2}
          alt="AI Generated Image"
          className="w-80 xl:w-96 rounded-lg shadow-xl transform transition-all hover:scale-105 hover:rotate-2"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.7, duration: 1 }}
        />

        {/* Text Block */}
        <div className="max-w-lg">
          {/* Subheading */}
          <motion.h2
            className="text-3xl font-medium mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
          >
            Introducing the AI Website - Your Ultimate Text to Image Generator
          </motion.h2>

          {/* Description Text */}
          <motion.p
            className="text-blue-800 mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 1 }}
          >
            Effortlessly bring your ideas to life with our free AI image generator. Transform your text into stunning visuals in seconds. Imagine, describe, and see your vision come to life instantly.
          </motion.p>

          {/* Additional Info */}
          <motion.p
            className="text-blue-800 mb-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4, duration: 1 }}
          >
            Type a text prompt, and our advanced AI will generate high-quality images in seconds. From product visuals to character designs and portraits, even non-existent concepts come to life effortlessly. Unleash limitless creativity with our AI technology.
          </motion.p>
        </div>
      </div>
    </div>
  );
};

export default Description;
