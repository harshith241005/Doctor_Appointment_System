/**
 * Sidebar Component - Admin Navigation
 * Built by Harshith for MediBook Healthcare Platform
 * Features: Navigation links, Role-based menus
 */

import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { NavLink } from 'react-router-dom'
import { DoctorContext } from '../context/DoctorContext'
import { AdminContext } from '../context/AdminContext'

const Sidebar = () => {

  const { dToken } = useContext(DoctorContext)
  const { aToken } = useContext(AdminContext)

  const adminMenuItems = [
    { path: '/admin-dashboard', icon: assets.home_icon, label: 'Dashboard' },
    { path: '/all-appointments', icon: assets.appointment_icon, label: 'Appointments' },
    { path: '/add-doctor', icon: assets.add_icon, label: 'Add Doctor' },
    { path: '/doctor-list', icon: assets.people_icon, label: 'Doctors List' }
  ]

  const doctorMenuItems = [
    { path: '/doctor-dashboard', icon: assets.home_icon, label: 'Dashboard' },
    { path: '/doctor-appointments', icon: assets.appointment_icon, label: 'Appointments' },
    { path: '/doctor-profile', icon: assets.people_icon, label: 'Profile' }
  ]

  const MenuItem = ({ item }) => (
    <NavLink 
      to={item.path} 
      className={({ isActive }) => `
        flex items-center gap-4 py-4 px-6 mx-3 rounded-xl cursor-pointer
        transition-all duration-300 group
        ${isActive 
          ? 'bg-gradient-to-r from-primary to-primary-dark text-white shadow-lg shadow-primary/30' 
          : 'text-gray-600 hover:bg-primary/5 hover:text-primary'
        }
      `}
    >
      <img 
        className={`w-5 h-5 transition-transform duration-300 group-hover:scale-110`} 
        src={item.icon} 
        alt='' 
      />
      <p className='hidden md:block font-medium'>{item.label}</p>
    </NavLink>
  )

  return (
    <div className='min-h-screen bg-white border-r border-gray-100 flex flex-col'>
      {/* Logo Section - Mobile Only */}
      <div className='md:hidden p-4 border-b border-gray-100'>
        <div className='w-10 h-10 bg-primary rounded-xl flex items-center justify-center'>
          <span className='text-white font-bold'>M</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className='flex-1 py-6'>
        {/* Admin Menu */}
        {aToken && (
          <div>
            <p className='text-xs font-semibold text-gray-400 uppercase tracking-wider px-6 mb-4 hidden md:block'>
              Admin Panel
            </p>
            <ul className='space-y-2'>
              {adminMenuItems.map((item, index) => (
                <li key={index}>
                  <MenuItem item={item} />
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Doctor Menu */}
        {dToken && (
          <div>
            <p className='text-xs font-semibold text-gray-400 uppercase tracking-wider px-6 mb-4 hidden md:block'>
              Doctor Panel
            </p>
            <ul className='space-y-2'>
              {doctorMenuItems.map((item, index) => (
                <li key={index}>
                  <MenuItem item={item} />
                </li>
              ))}
            </ul>
          </div>
        )}
      </nav>

      {/* Footer */}
      <div className='p-4 border-t border-gray-100 hidden md:block'>
        <div className='bg-gradient-to-r from-primary/10 to-primary/5 rounded-xl p-4'>
          <div className='flex items-center gap-3 mb-3'>
            <div className='w-10 h-10 bg-primary rounded-full flex items-center justify-center'>
              <svg className='w-5 h-5 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'/>
              </svg>
            </div>
            <div>
              <p className='text-sm font-semibold text-gray-800'>Need Help?</p>
              <p className='text-xs text-gray-500'>Contact support</p>
            </div>
          </div>
          <button className='w-full py-2 bg-white text-primary text-sm font-medium rounded-lg hover:bg-primary hover:text-white transition-all duration-300'>
            Get Support
          </button>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
