import React from 'react'
import { assets, testimonialsData } from '../assets/assets'
import { motion } from 'framer-motion'

const Testimonials = () => {
  return (
    <motion.div 
      initial={{ opacity: 0.2, y: 100 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className='flex flex-col items-center justify-center my-20 p-12'
    >
      <h1 className='text-3xl sm:text-4xl font-semibold mb-2'>User Reviews</h1>
      <p className='text-blue-900 mb-12'>What our customers say</p>

      {/* Testimonials Container */}
      <motion.div 
        className='flex flex-wrap gap-6'
      >
        {testimonialsData.map((testimonial, index) => (
          <motion.div
            key={index}
            className='p-12 rounded-lg shadow-md border w-80 m-auto cursor-pointer hover:scale-[1.02] transition-all'
            style={{
              background: 'linear-gradient(to right, #d1c4e9, #b39ddb, #c5cae9)',  // Light, minimal gradient
              backgroundSize: '200% 100%',
              animation: 'shine 5s infinite linear',  // Apply shine animation
            }}
            initial={{ opacity: 0.5, y: 50 }}  // Start each card below and semi-transparent
            animate={{ opacity: 1, y: 0 }}  // Animate to its normal position
            whileHover={{
              y: -10,  // Move up when hovered (simulate bottom-to-top effect)
              scale: 1.05,  // Slightly scale up for hover effect
              transition: { duration: 0.3 }  // Transition duration for hover animation
            }}
            transition={{
              delay: index * 0.2,  // Stagger the animation slightly for each card
              duration: 1,  // Duration of each card animation
            }}
          >
            <div className='flex flex-col items-center'>
              <img src={testimonial.image} alt='' className='rounded-full w-14' />
              <h2 className='text-xl font-semibold mt-3'>{testimonial.name}</h2>
              <p className='text-blue-900 mb-4'>{testimonial.role}</p>
              <div className='flex mb-4'>
                {Array(testimonial.stars).fill().map((item, index) => (
                  <img key={index} src={assets.rating_star} alt='' />
                ))}
              </div>
              <p className='text-center text-sm text-blue-900'>{testimonial.text}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  )
}

export default Testimonials
