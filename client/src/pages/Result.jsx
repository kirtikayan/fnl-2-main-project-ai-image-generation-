import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { motion } from 'framer-motion'
import { AppContext } from '../context/AppContext'

const Result = () => {
  const [image, setImage] = useState(assets.sample_img_2)
  const [isImageLoaded, setIsImageLoaded] = useState(false)
  const [loading, setLoading] = useState(false)
  const [input, setInput] = useState('')

  const { generateImage } = useContext(AppContext)

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    setLoading(true)

    if (input) {
      const image = await generateImage(input)
      if (image) {
        setIsImageLoaded(true)
        setImage(image)
      }
    }
    setLoading(false)
  }

  return (
    <motion.form
      initial={{ opacity: 0.2, y: 100 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      onSubmit={onSubmitHandler}
      className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-blue-500 via-purple-600 to-pink-600 text-white p-6 bg-cover bg-fixed"
      style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0) 70%)' }}  // Gradient fading effect
    >
      {/* Landing Page Heading */}
      <motion.h1
        className="text-4xl sm:text-5xl font-bold mb-6 text-center mt-40"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
      >
        Generate Stunning AI Art in Seconds!
      </motion.h1>

      <motion.p
        className="text-lg sm:text-xl mb-8 text-center max-w-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.4 }}
      >
        Describe your idea and let our AI transform it into a masterpiece. The future of art is in your hands!
      </motion.p>

      {/* Image Display */}
      <div className="relative mb-6">
        <motion.img
          src={image}
          alt="Generated Art"
          className="max-w-lg rounded-lg shadow-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
        />
        {/* Animated Progress Bar */}
        <motion.span
          className={`absolute bottom-0 left-0 h-2 bg-red-500 ${loading ? 'w-full transition-all duration-3000' : 'w-0'}`}
          initial={{ width: 0 }}
          animate={{ width: loading ? '100%' : '0%' }}
          transition={{ duration: 3, ease: 'ease-in-out' }}
        />
      </div>

      {/* Loading Indicator */}
      {loading && (
        <div className="flex justify-center items-center mt-4">
          <motion.div
            className="w-12 h-12 border-4 border-t-4 border-black border-solid rounded-full animate-spin ml-70"
            style={{ borderTopColor: '#f9c74f' }}
          />
          <motion.p className="ml-4 text-xl font-semibold">Generating Image...</motion.p>
        </div>
      )}

      {/* Input Form for New Generation */}
      {!isImageLoaded && (
        <div className="flex w-full max-w-xl bg-neutral-700 text-white text-sm p-2 mt-8 rounded-full">
          <input
            onChange={(e) => setInput(e.target.value)}
            value={input}
            type="text"
            placeholder="Describe your idea..."
            className="flex-1 bg-transparent outline-none p-3 rounded-full placeholder:text-gray-300 text-lg"
          />
          <motion.button
            type="submit"
            className={`bg-pink-700 px-10 sm:px-16 py-3 rounded-full text-white font-semibold shadow-lg transition-all duration-300 ease-in-out transform ${loading ? 'cursor-not-allowed opacity-50' : 'hover:scale-105 active:scale-95'}`}
            disabled={loading}
          >
            Generate
          </motion.button>
        </div>
      )}

      {/* Actions after Image is Generated */}
      {isImageLoaded && (
        <div className="flex gap-4 flex-wrap justify-center text-sm p-2 mt-10 rounded-full">
          <motion.p
            onClick={() => { setIsImageLoaded(false) }}
            className="bg-transparent border border-zinc-900 text-black px-8 py-3 rounded-full cursor-pointer hover:bg-gray-800 transition-all duration-300"
          >
            Generate Another
          </motion.p>
          <motion.a
            href={image}
            download
            className="bg-yellow-900 px-10 py-3 rounded-full cursor-pointer hover:bg-yellow-800 transition-all duration-300"
          >
            Download
          </motion.a>
        </div>
      )}
    </motion.form>
  )
}

export default Result
