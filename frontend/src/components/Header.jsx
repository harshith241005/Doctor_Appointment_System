import React from 'react'
import { assets } from '../assets/assets'

const Header = () => {
  return (
    <div className='flex flex-col md:flex-row flex-wrap bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 rounded-2xl px-6 md:px-10 lg:px-20 shadow-lg'>

      {/* --------- Header Left --------- */}
      <div className='md:w-1/2 flex flex-col items-start justify-center gap-6 py-10 m-auto md:py-[10vw] md:mb-[-30px]'>
        <div className='inline-block px-4 py-2 bg-emerald-100 rounded-full'>
          <span className='text-emerald-700 font-medium text-sm'>✨ #1 Healthcare Platform</span>
        </div>
        <h1 className='text-3xl md:text-4xl lg:text-5xl text-gray-800 font-bold leading-tight md:leading-tight lg:leading-tight'>
          Your Health Journey <br /> 
          <span className='text-primary'>Starts Here</span>
        </h1>
        <p className='text-gray-600 text-base md:text-lg leading-relaxed'>
          Connect with <span className='text-primary font-semibold'>500+</span> verified doctors across <span className='text-primary font-semibold'>20+</span> specialties. 
          Book appointments instantly, anytime, anywhere.
        </p>
        <div className='flex flex-col md:flex-row items-center gap-4'>
          <img className='w-28' src={assets.group_profiles} alt="Happy Patients" />
          <div>
            <p className='text-gray-800 font-semibold'>Trusted by 10,000+ patients</p>
            <p className='text-gray-500 text-sm'>Join our growing healthcare community</p>
          </div>
        </div>
        <div className='flex gap-4'>
          <a
            href='#speciality'
            className='flex items-center gap-2 bg-primary hover:bg-primary-dark px-8 py-4 rounded-full text-white font-medium hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl'
          >
            Find a Doctor <img className='w-3' src={assets.arrow_icon} alt="" />
          </a>
          <a
            href='#speciality'
            className='flex items-center gap-2 border-2 border-primary text-primary px-8 py-4 rounded-full font-medium hover:bg-primary hover:text-white transition-all duration-300'
          >
            Learn More
          </a>
        </div>
      </div>

      {/* --------- Header Right --------- */}
      <div className='md:w-1/2 relative flex items-end justify-center'>
        <div className='absolute top-10 right-10 w-20 h-20 bg-emerald-200 rounded-full opacity-50 animate-pulse'></div>
        <div className='absolute bottom-20 left-10 w-16 h-16 bg-cyan-200 rounded-full opacity-50 animate-pulse'></div>
        <img
          className='w-full md:absolute bottom-0 h-auto rounded-lg object-contain drop-shadow-2xl'
          src="https://res.cloudinary.com/ddkzadleu/image/upload/v1753033755/do-removebg-preview_npqxyd.png"
          alt="Professional Doctor"
        />
      </div>
    </div>
  )
}

export default Header
