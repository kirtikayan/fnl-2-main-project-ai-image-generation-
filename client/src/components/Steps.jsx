import React from 'react';
import { stepsData } from '../assets/assets';
import { motion } from 'framer-motion';

const Steps = () => {
  return (
    <div
      className=" bg-white flex flex-col items-center justify-center py-24 px-4 md:px-12 text-black"
      
    >
      {/* Title */}
      <motion.h1
        className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-center max-w-4xl mx-auto mb-8 px-6 tracking-tight text-black"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 1, ease: 'easeOut' }}
      >
        How AI Magic Works
      </motion.h1>

      {/* Description */}
      <motion.p
        className="text-lg sm:text-xl lg:text-2xl text-blue-800 mb-12 max-w-2xl mx-auto text-center font-light"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 1.2, ease: 'easeOut' }}
      >
        Transform Texts Into Stunning Images in a Few Simple Steps
      </motion.p>

      {/* Steps List */}
      <div className="space-y-8 w-full max-w-4xl">
        {stepsData.map((item, index) => (
         <motion.div
  key={index}
  className="flex flex-col sm:flex-row items-center gap-6 sm:gap-8 p-6 
             bg-teal-100 hover:bg-teal-200 
             backdrop-blur-md rounded-xl border border-white/20 
             cursor-pointer transition-all duration-300 ease-in-out hover:scale-105"
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{
    delay: 0.7 + index * 0.2,
    duration: 0.8,
    ease: 'easeOut',
  }}
>
  <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-pink-400 to-teal-400 rounded-full shadow-md">
    <img
      className="w-10 h-10 object-contain"
      src={item.icon}
      alt={item.title}
    />
  </div>
  <div className="text-center sm:text-left">
    <h2 className="text-xl sm:text-2xl font-semibold text-blue-900 tracking-wide">
      {item.title}
    </h2>
    <p className="text-blue-700 mt-1 leading-relaxed">
      {item.description}
    </p>
  </div>
</motion.div>

        ))}
      </div>
    </div>
  );
};

export default Steps;
