import React, { useContext } from 'react'
import { assets, plans } from '../assets/assets'
import { AppContext } from '../context/AppContext'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from 'axios'

const BuyCredit = () => {
  const { user, backendUrl, loadCreditsData, token, setShowLogin } = useContext(AppContext)

  const navigate = useNavigate()

  const initpay = async (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: 'Credits Payment',
      description: 'Credits Payment',
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response) => {
        try {
          const { data } = await axios.post(backendUrl + '/api/user/verify-razor', response, { headers: { token } })
          if (data.success) {
            loadCreditsData()
            navigate('/')
            toast.success('Credit Added')
          }
        } catch (error) {
          toast.error(error.message)
        }
      }
    }
    const rzp = new window.Razorpay(options)
    rzp.open()
  }

  const paymentRazorpay = async (planId) => {
    try {
      if (!user) {
        setShowLogin(true)
      }

      const { data } = await axios.post(backendUrl + '/api/user/pay-razor', { planId }, { headers: { token } })

      if (data.success) {
        initpay(data.order)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0.2, y: 100 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="min-h-[80vh] text-center pt-14 mb-10 relative"
    >
      {/* Gradient background with fade effect */}
      <div className="absolute inset-0"
      style={{
        background: 'radial-gradient(circle at center, #f8e1ff 0%, #ffffff 60%)',
      }}></div> 
      
      <div className="relative z-10 mt-40">
        <button className="border border-gray-400 px-10 py-2 rounded-full mb-6 text-blue-900">Our Subscription</button>
        <h1 className="text-7xl font-bold mb-6 sm:mb-10 text-black">Choose the Subscription</h1>

        <div className="flex flex-wrap justify-center gap-6 text-left">
          {plans.map((item, index) => (
            <motion.div
              key={index}
              className=" drop-shadow-lg rounded-lg py-12 px-8 text-white hover:scale-105 hover:shadow-2xl transition-all duration-500"
              style={{
              background: 'linear-gradient(to right, #d1c4e9, #b39ddb, #c5cae9)',  // Light, minimal gradient
              backgroundSize: '200% 100%',
              animation: 'shine 5s infinite linear',  // Apply shine animation
            }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 + index * 0.2 }}
            >
              <img src={assets.logo_icon} alt="" width={40} className="mx-auto mb-3" />
              <p className="mt-3 mb-1 font-semibold text-center text-white">{item.id}</p>
              <p className="text-sm text-center text-white">{item.desc}</p>
              <p className="mt-6 text-center">
                <span className="text-3xl font-medium text-red-700">₹{item.price}</span> / {item.credits} credits
              </p>
              <motion.button
                onClick={() => paymentRazorpay(item.id)}
                className="w-full bg-red-500 text-white mt-8 text-sm rounded-full py-2.5 min-w-52 hover:scale-105 hover:bg-red-700 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {user ? 'Purchase' : 'Get Started'}
              </motion.button>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default BuyCredit
