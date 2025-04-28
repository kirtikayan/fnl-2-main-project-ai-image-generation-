import React from 'react';
import { stepsData } from '../assets/assets';
import { motion } from 'framer-motion';

const Steps = () => {
  return (
    <div
      className="flex flex-col items-center justify-center py-24 px-4 md:px-12 bg-gradient-to-r from-teal-500 to-indigo-600 text-white"
    >
      {/* Title */}
      <motion.h1
        className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-center max-w-4xl mx-auto mb-8 px-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          delay: 0.3, 
          duration: 1, // 1-second transition duration for title
        }}
      >
        How AI Magic Works
      </motion.h1>

      <motion.p
        className="text-lg sm:text-xl lg:text-2xl text-neutral-200 mb-10 max-w-2xl mx-auto text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          delay: 0.5, 
          duration: 1.2, // 1.2-second transition duration for description
        }}
      >
        Transform Texts Into Stunning Images in a Few Simple Steps
      </motion.p>

      {/* Steps List */}
      <div className="space-y-6 w-full max-w-4xl">
        {stepsData.map((item, index) => (
          <motion.div
            key={index}
            className="flex flex-col sm:flex-row items-center gap-6 sm:gap-8 p-6 bg-white/20 shadow-lg rounded-lg hover:scale-105 hover:bg-white/30 transition-all duration-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              delay: 0.7 + index * 0.2, // Staggered delay based on the index
              duration: 1, // Same duration for each step
            }}
          >
            <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-pink-500 to-teal-500 rounded-full mb-4 sm:mb-0">
              <img className="w-10 h-10 object-contain" src={item.icon} alt={item.title} />
            </div>
            <div className="text-left text-center sm:text-left">
              <h2 className="text-xl sm:text-2xl font-semibold text-white">{item.title}</h2>
              <p className="text-orange-400">{item.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Steps;
