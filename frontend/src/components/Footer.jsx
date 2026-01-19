import React from 'react'
import { assets } from '../assets/assets'
import { Link } from 'react-router-dom'

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className='bg-gray-900 text-gray-300 mt-20'>
      {/* Main Footer Content */}
      <div className='max-w-7xl mx-auto px-6 py-16'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12'>
          
          {/* Brand Section */}
          <div className='lg:col-span-1'>
            <h2 className='text-2xl font-bold text-white mb-4'>Medi<span className='text-primary'>Book</span></h2>
            <p className='text-gray-400 leading-relaxed mb-6'>
              Your trusted healthcare companion. We connect patients with the best doctors, 
              making healthcare accessible, affordable, and convenient.
            </p>
            <div className='flex gap-4'>
              <a href='#' className='w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary transition-all'>
                <span className='text-white text-sm'>f</span>
              </a>
              <a href='#' className='w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary transition-all'>
                <span className='text-white text-sm'>t</span>
              </a>
              <a href='#' className='w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary transition-all'>
                <span className='text-white text-sm'>in</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className='text-lg font-semibold text-white mb-6'>Quick Links</h3>
            <ul className='space-y-3'>
              <li><Link to='/' className='hover:text-primary transition-colors'>Home</Link></li>
              <li><Link to='/doctors' className='hover:text-primary transition-colors'>Find Doctors</Link></li>
              <li><Link to='/about' className='hover:text-primary transition-colors'>About Us</Link></li>
              <li><Link to='/contact' className='hover:text-primary transition-colors'>Contact</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className='text-lg font-semibold text-white mb-6'>Our Services</h3>
            <ul className='space-y-3'>
              <li><a href='#' className='hover:text-primary transition-colors'>Online Consultation</a></li>
              <li><a href='#' className='hover:text-primary transition-colors'>Book Appointment</a></li>
              <li><a href='#' className='hover:text-primary transition-colors'>Health Records</a></li>
              <li><a href='#' className='hover:text-primary transition-colors'>24/7 Support</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className='text-lg font-semibold text-white mb-6'>Contact Us</h3>
            <ul className='space-y-3'>
              <li className='flex items-start gap-3'>
                <span className='text-primary'>📍</span>
                <span>Hyderabad, Telangana<br/>India - 500001</span>
              </li>
              <li className='flex items-center gap-3'>
                <span className='text-primary'>📞</span>
                <span>+91 98765 43210</span>
              </li>
              <li className='flex items-center gap-3'>
                <span className='text-primary'>✉️</span>
                <span>contact@medibook.com</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className='border-t border-gray-800'>
        <div className='max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center'>
          <p className='text-gray-500 text-sm'>
            © {currentYear} MediBook. All rights reserved.
          </p>
          <p className='text-gray-500 text-sm mt-2 md:mt-0'>
            Designed & Developed by <span className='text-primary font-medium'>Harsh</span>
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
