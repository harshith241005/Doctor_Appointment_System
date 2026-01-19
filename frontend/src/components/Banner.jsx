import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const Banner = () => {
  const navigate = useNavigate()

  return (
    <div className='relative overflow-hidden bg-gradient-to-r from-primary via-emerald-500 to-teal-500 rounded-2xl px-6 sm:px-10 md:px-14 lg:px-12 my-20 md:mx-10 shadow-2xl'>
      {/* Background Pattern */}
      <div className='absolute inset-0 opacity-10'>
        <div className='absolute top-0 left-0 w-40 h-40 bg-white rounded-full -translate-x-1/2 -translate-y-1/2'></div>
        <div className='absolute bottom-0 right-0 w-60 h-60 bg-white rounded-full translate-x-1/2 translate-y-1/2'></div>
      </div>

      {/* ------- Left Side ------- */}
      <div className='relative flex-1 py-10 sm:py-12 md:py-16 lg:py-20 lg:pl-5'>
        <div className='max-w-xl'>
          <span className='inline-block px-4 py-1 bg-white/20 rounded-full text-white text-sm mb-4'>
            🌟 Special Offer - 20% Off First Consultation
          </span>
          <h2 className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight'>
            Ready to Take Control of Your Health?
          </h2>
          <p className='mt-4 text-white/90 text-base md:text-lg'>
            Join thousands of satisfied patients who trust MediBook for their healthcare needs.
          </p>
          <div className='flex flex-wrap gap-4 mt-8'>
            <button
              onClick={() => { navigate('/login'); scrollTo(0, 0) }}
              className='bg-white text-primary px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl hover:scale-105'
            >
              Get Started Free
            </button>
            <button
              onClick={() => { navigate('/doctors'); scrollTo(0, 0) }}
              className='border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white/10 transition-all'
            >
              Browse Doctors
            </button>
          </div>
        </div>
      </div>

      {/* ------- Right Side ------- */}
      <div className='hidden md:block md:w-1/2 lg:w-[370px] absolute right-0 bottom-0'>
        <img className='w-full max-w-md drop-shadow-2xl' src={assets.appointment_img} alt="Book Appointment" />
      </div>
    </div>
  )
}

export default Banner
