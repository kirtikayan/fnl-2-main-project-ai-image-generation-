import React, { useContext, useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext'
import { motion } from 'framer-motion'
import axios from 'axios'
import { toast } from 'react-toastify'

const Login = () => {
  const [state, setState] = useState('Login')
  const { setShowLogin, backendUrl, setToken, setUser } = useContext(AppContext)

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onSubmitHandler = async (e) => {
    e.preventDefault()

    try {
      if (state === 'Login') {
        const { data } = await axios.post(backendUrl + '/api/user/login', { email, password })

        if (data.success) {
          setToken(data.token)
          setUser(data.user)
          localStorage.setItem('token', data.token)
          setShowLogin(false)
        } else {
          toast.error(data.message)
        }
      } else {
        const { data } = await axios.post(backendUrl + '/api/user/register', { name, email, password })

        if (data.success) {
          setToken(data.token)
          setUser(data.user)
          localStorage.setItem('token', data.token)
          setShowLogin(false)
        } else {
          toast.error(data.message)
        }
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [])

  return (
    <div className='fixed top-0 left-0 right-0 bottom-0 z-10 backdrop-blur-sm bg-black/50 flex justify-center items-center'>
      {/* Funky Animated Background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-700 animate-gradientBackground"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      />

      <motion.form
        onSubmit={onSubmitHandler}
        initial={{ opacity: 0.2, y: 50 }}
        transition={{ duration: 0.5 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className='relative bg-white/80 p-10 rounded-xl text-slate-900 shadow-lg ring-2 ring-yellow-400 backdrop-blur-md'
      >
        <h1 className='text-center text-3xl font-extrabold text-yellow-600'>{state}</h1>
        <p className='text-sm text-center text-slate-900'>Welcome back! Please sign in to continue</p>

        {/* Name Field (only for sign up) */}
        {state !== 'Login' && (
          <div className='border px-6 py-2 flex items-center gap-2 rounded-full mt-4 bg-gradient-to-r from-teal-400 to-pink-400'>
            <img src={assets.profile_icon} alt='' width={20} />
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              type='text'
              className='outline-none text-sm bg-transparent w-full'
              placeholder='Full Name'
              required
            />
          </div>
        )}

        {/* Email Field */}
        <div className='border px-6 py-2 flex items-center gap-2 rounded-full mt-4 bg-gradient-to-r from-teal-400 to-pink-400'>
          <img src={assets.email_icon} alt='' />
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type='email'
            className='outline-none text-sm bg-transparent w-full'
            placeholder='Email Id'
            required
          />
        </div>

        {/* Password Field */}
        <div className='border px-6 py-2 flex items-center gap-2 rounded-full mt-4 bg-gradient-to-r from-teal-400 to-pink-400'>
          <img src={assets.lock_icon} alt='' />
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type='password'
            className='outline-none text-sm bg-transparent w-full'
            placeholder='Password'
            required
          />
        </div>

        <p className='text-sm text-red-600 my-4 cursor-pointer hover:underline'>Forgot password?</p>

        <motion.button
          className='bg-blue-600 w-full text-black py-2 rounded-full mt-6 shadow-lg hover:bg-blue-700 hover:scale-105 transition-all duration-300'
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {state === 'Login' ? 'Login' : 'Create Account'}
        </motion.button>

        {/* Toggle between Login and Signup */}
        {state === 'Login' ? (
          <p className='mt-5 text-center'>
            Don't have an account?{' '}
            <span className='text-yellow-600 cursor-pointer' onClick={() => setState('Sign Up')}>
              Sign up
            </span>
          </p>
        ) : (
          <p className='mt-5 text-center'>
            Already have an account?{' '}
            <span className='text-yellow-600 cursor-pointer' onClick={() => setState('Login')}>
              Login
            </span>
          </p>
        )}

        {/* Close Button */}
        <img
          onClick={() => setShowLogin(false)}
          src={assets.cross_icon}
          alt=''
          className='absolute top-5 right-5 cursor-pointer hover:scale-110 transition-all duration-300'
        />
      </motion.form>
    </div>
  )
}

export default Login
