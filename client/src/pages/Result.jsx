import React, { useContext, useState } from 'react';
import { assets } from '../assets/assets';
import { motion } from 'framer-motion';
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

const Result = () => {
  const [image, setImage] = useState(assets.sample_img_2);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState('');
  const navigate = useNavigate();

  const { generateImage } = useContext(AppContext);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (input) {
      const image = await generateImage(input);
      if (image) {
        localStorage.setItem('aiImage', image);
        setIsImageLoaded(true);
        setImage(image);
      }
    }
    setLoading(false);
  };

  return (
    <motion.form
      initial={{ opacity: 0.2, y: 100 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      onSubmit={onSubmitHandler}
      className="flex flex-col items-center justify-center h-screen text-black p-6 "
       style={{
        background: 'radial-gradient(circle at center, #f8e1ff 0%, #ffffff 60%)',
      }}
    >
      <motion.h1 className="text-7xl font-bold mb-6 mt-40 text-center">Generate Stunning AI Art in Seconds!</motion.h1>
      <motion.p className="text-lg mb-8 text-center max-w-lg text-blue-800">
        Describe your idea and let our AI transform it into a masterpiece.
      </motion.p>

      <div className="relative mb-6">
        <motion.img
          src={image}
          alt="Generated Art"
          className="max-w-lg rounded-lg shadow-xl"
        />
      </div>

      {loading && (
        <div className="flex justify-center items-center mt-4">
          <motion.div className="w-12 h-12 border-4 border-t-4 border-black border-solid rounded-full animate-spin" style={{ borderTopColor: '#f9c74f' }} />
          <motion.p className="ml-4 text-xl font-semibold">Generating Image...</motion.p>
        </div>
      )}

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
            className={`bg-pink-700 px-10 py-3 rounded-full text-white font-semibold transition-all duration-300 ${loading ? 'cursor-not-allowed opacity-50' : 'hover:scale-105 active:scale-95'}`}
            disabled={loading}
          >
            Generate
          </motion.button>
        </div>
      )}

      {isImageLoaded && (
        <div className="flex gap-4 flex-wrap justify-center text-sm p-2 mt-10 rounded-full">
          <motion.p
            onClick={() => setIsImageLoaded(false)}
            className="border border-zinc-900 text-black px-8 py-3 rounded-full cursor-pointer hover:bg-gray-800"
          >
            Generate Another
          </motion.p>
          <motion.a
            href={image}
            download
            className="bg-yellow-500 px-10 py-3 rounded-full cursor-pointer hover:bg-yellow-800"
          >
            Download
          </motion.a>
          <motion.a
            onClick={() => navigate('/edit')}
            className="bg-green-500 px-10 py-3 rounded-full cursor-pointer hover:bg-green-900"
          >
            Edit
          </motion.a>
        </div>
      )}
    </motion.form>
  );
};

export default Result;
