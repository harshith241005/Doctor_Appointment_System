/**
 * Home Page Component - Landing Page
 * Built by Harshith for MediBook Healthcare Platform
 * Features: Hero section, Specialities, Top doctors, Banner
 */

import React from 'react'
import Header from '../components/Header'
import SpecialityMenu from '../components/SpecialityMenu'
import TopDoctors from '../components/TopDoctors'
import Banner from '../components/Banner'

const Home = () => {
  return (
    <div className='min-h-screen'>
      {/* Hero Section */}
      <Header />
      
      {/* Why Choose Us Section */}
      <section className='py-16 bg-gradient-to-b from-white to-gray-50'>
        <div className='max-w-7xl mx-auto px-4'>
          <div className='text-center mb-12'>
            <span className='inline-block bg-primary/10 text-primary text-sm font-medium px-4 py-2 rounded-full mb-4'>
              Why Choose MediBook?
            </span>
            <h2 className='text-3xl font-bold text-gray-800 mb-4'>Healthcare Made Simple</h2>
            <p className='text-gray-500 max-w-2xl mx-auto'>
              Experience the future of healthcare with our comprehensive platform designed for your convenience
            </p>
          </div>
          
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
            {/* Feature 1 */}
            <div className='bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100'>
              <div className='w-14 h-14 bg-emerald-100 rounded-2xl flex items-center justify-center mb-4'>
                <svg className='w-7 h-7 text-emerald-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'/>
                </svg>
              </div>
              <h3 className='text-lg font-bold text-gray-800 mb-2'>24/7 Available</h3>
              <p className='text-gray-500 text-sm'>Book appointments anytime, anywhere with our round-the-clock service</p>
            </div>

            {/* Feature 2 */}
            <div className='bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100'>
              <div className='w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center mb-4'>
                <svg className='w-7 h-7 text-blue-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z'/>
                </svg>
              </div>
              <h3 className='text-lg font-bold text-gray-800 mb-2'>Verified Doctors</h3>
              <p className='text-gray-500 text-sm'>All our doctors are verified and certified medical professionals</p>
            </div>

            {/* Feature 3 */}
            <div className='bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100'>
              <div className='w-14 h-14 bg-purple-100 rounded-2xl flex items-center justify-center mb-4'>
                <svg className='w-7 h-7 text-purple-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z'/>
                </svg>
              </div>
              <h3 className='text-lg font-bold text-gray-800 mb-2'>Secure Payments</h3>
              <p className='text-gray-500 text-sm'>Multiple payment options with encrypted and secure transactions</p>
            </div>

            {/* Feature 4 */}
            <div className='bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100'>
              <div className='w-14 h-14 bg-amber-100 rounded-2xl flex items-center justify-center mb-4'>
                <svg className='w-7 h-7 text-amber-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z'/>
                </svg>
              </div>
              <h3 className='text-lg font-bold text-gray-800 mb-2'>Top Rated</h3>
              <p className='text-gray-500 text-sm'>Highly rated by thousands of satisfied patients nationwide</p>
            </div>
          </div>
        </div>
      </section>

      {/* Specialities Section */}
      <SpecialityMenu />
      
      {/* Top Doctors Section */}
      <TopDoctors />
      
      {/* Statistics Section */}
      <section className='py-16 bg-gradient-to-r from-primary to-primary-dark'>
        <div className='max-w-7xl mx-auto px-4'>
          <div className='grid grid-cols-2 md:grid-cols-4 gap-8'>
            <div className='text-center'>
              <p className='text-4xl md:text-5xl font-bold text-white mb-2'>500+</p>
              <p className='text-emerald-100'>Expert Doctors</p>
            </div>
            <div className='text-center'>
              <p className='text-4xl md:text-5xl font-bold text-white mb-2'>10K+</p>
              <p className='text-emerald-100'>Happy Patients</p>
            </div>
            <div className='text-center'>
              <p className='text-4xl md:text-5xl font-bold text-white mb-2'>15+</p>
              <p className='text-emerald-100'>Specializations</p>
            </div>
            <div className='text-center'>
              <p className='text-4xl md:text-5xl font-bold text-white mb-2'>98%</p>
              <p className='text-emerald-100'>Success Rate</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Banner */}
      <Banner />

      {/* Testimonials Preview */}
      <section className='py-16 bg-gray-50'>
        <div className='max-w-7xl mx-auto px-4'>
          <div className='text-center mb-12'>
            <span className='inline-block bg-primary/10 text-primary text-sm font-medium px-4 py-2 rounded-full mb-4'>
              Testimonials
            </span>
            <h2 className='text-3xl font-bold text-gray-800 mb-4'>What Our Patients Say</h2>
            <p className='text-gray-500 max-w-2xl mx-auto'>
              Real experiences from real patients who trust MediBook for their healthcare needs
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            {/* Testimonial 1 */}
            <div className='bg-white rounded-2xl p-8 shadow-md'>
              <div className='flex items-center gap-1 text-amber-400 mb-4'>
                {[1,2,3,4,5].map(star => (
                  <svg key={star} className='w-5 h-5 fill-current' viewBox='0 0 20 20'>
                    <path d='M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z'/>
                  </svg>
                ))}
              </div>
              <p className='text-gray-600 mb-6 leading-relaxed'>
                "MediBook made booking appointments so easy. I found a great doctor within minutes and the whole process was seamless!"
              </p>
              <div className='flex items-center gap-4'>
                <div className='w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center'>
                  <span className='text-primary font-bold'>PK</span>
                </div>
                <div>
                  <p className='font-semibold text-gray-800'>Priya Kumar</p>
                  <p className='text-sm text-gray-500'>Patient since 2024</p>
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className='bg-white rounded-2xl p-8 shadow-md'>
              <div className='flex items-center gap-1 text-amber-400 mb-4'>
                {[1,2,3,4,5].map(star => (
                  <svg key={star} className='w-5 h-5 fill-current' viewBox='0 0 20 20'>
                    <path d='M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z'/>
                  </svg>
                ))}
              </div>
              <p className='text-gray-600 mb-6 leading-relaxed'>
                "The doctors on MediBook are highly professional. I love how I can see reviews and choose the best one for my needs."
              </p>
              <div className='flex items-center gap-4'>
                <div className='w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center'>
                  <span className='text-primary font-bold'>RS</span>
                </div>
                <div>
                  <p className='font-semibold text-gray-800'>Rahul Sharma</p>
                  <p className='text-sm text-gray-500'>Patient since 2024</p>
                </div>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className='bg-white rounded-2xl p-8 shadow-md'>
              <div className='flex items-center gap-1 text-amber-400 mb-4'>
                {[1,2,3,4,5].map(star => (
                  <svg key={star} className='w-5 h-5 fill-current' viewBox='0 0 20 20'>
                    <path d='M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z'/>
                  </svg>
                ))}
              </div>
              <p className='text-gray-600 mb-6 leading-relaxed'>
                "Excellent platform! The payment process is secure and I always get reminders for my appointments. Highly recommended!"
              </p>
              <div className='flex items-center gap-4'>
                <div className='w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center'>
                  <span className='text-primary font-bold'>AM</span>
                </div>
                <div>
                  <p className='font-semibold text-gray-800'>Anita Mehta</p>
                  <p className='text-sm text-gray-500'>Patient since 2024</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
