/**
 * Admin Dashboard Component - Analytics & Overview
 * Built by Harshith for MediBook Healthcare Platform
 * Features: Stats cards, Latest appointments, Quick actions
 */

import React, { useContext, useEffect } from 'react'
import { assets } from '../../assets/assets'
import { AdminContext } from '../../context/AdminContext'
import { AppContext } from '../../context/AppContext'

const Dashboard = () => {

  const { aToken, getDashData, cancelAppointment, dashData } = useContext(AdminContext)
  const { slotDateFormat } = useContext(AppContext)

  useEffect(() => {
    if (aToken) {
      getDashData()
    }
  }, [aToken])

  return dashData && (
    <div className='p-6 bg-gray-50 min-h-screen'>
      {/* Page Header */}
      <div className='mb-8'>
        <h1 className='text-3xl font-bold text-gray-800'>Dashboard</h1>
        <p className='text-gray-500 mt-1'>Welcome back! Here's what's happening with MediBook today.</p>
      </div>

      {/* Stats Cards */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8'>
        {/* Doctors Card */}
        <div className='bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-sm font-medium text-gray-500 mb-1'>Total Doctors</p>
              <p className='text-3xl font-bold text-gray-800'>{dashData.doctors}</p>
              <p className='text-xs text-green-500 mt-2 flex items-center gap-1'>
                <svg className='w-3 h-3' fill='currentColor' viewBox='0 0 20 20'>
                  <path fillRule='evenodd' d='M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z' clipRule='evenodd'/>
                </svg>
                Active
              </p>
            </div>
            <div className='w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center'>
              <img className='w-7' src={assets.doctor_icon} alt="" />
            </div>
          </div>
        </div>

        {/* Appointments Card */}
        <div className='bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-sm font-medium text-gray-500 mb-1'>Appointments</p>
              <p className='text-3xl font-bold text-gray-800'>{dashData.appointments}</p>
              <p className='text-xs text-primary mt-2 flex items-center gap-1'>
                <svg className='w-3 h-3' fill='currentColor' viewBox='0 0 20 20'>
                  <path fillRule='evenodd' d='M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z' clipRule='evenodd'/>
                </svg>
                This month
              </p>
            </div>
            <div className='w-14 h-14 bg-gradient-to-br from-primary to-primary-dark rounded-2xl flex items-center justify-center'>
              <img className='w-7' src={assets.appointments_icon} alt="" />
            </div>
          </div>
        </div>

        {/* Patients Card */}
        <div className='bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-sm font-medium text-gray-500 mb-1'>Total Patients</p>
              <p className='text-3xl font-bold text-gray-800'>{dashData.patients}</p>
              <p className='text-xs text-purple-500 mt-2 flex items-center gap-1'>
                <svg className='w-3 h-3' fill='currentColor' viewBox='0 0 20 20'>
                  <path d='M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z'/>
                </svg>
                Registered
              </p>
            </div>
            <div className='w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center'>
              <img className='w-7' src={assets.patients_icon} alt="" />
            </div>
          </div>
        </div>

        {/* Revenue Card */}
        <div className='bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-sm font-medium text-gray-500 mb-1'>Success Rate</p>
              <p className='text-3xl font-bold text-gray-800'>98%</p>
              <p className='text-xs text-amber-500 mt-2 flex items-center gap-1'>
                <svg className='w-3 h-3' fill='currentColor' viewBox='0 0 20 20'>
                  <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z'/>
                </svg>
                Excellent
              </p>
            </div>
            <div className='w-14 h-14 bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl flex items-center justify-center'>
              <svg className='w-7 h-7 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'/>
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Latest Bookings Section */}
      <div className='bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden'>
        <div className='flex items-center justify-between px-6 py-4 border-b border-gray-100'>
          <div className='flex items-center gap-3'>
            <div className='w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center'>
              <img className='w-5' src={assets.list_icon} alt="" />
            </div>
            <div>
              <h2 className='text-lg font-semibold text-gray-800'>Latest Bookings</h2>
              <p className='text-sm text-gray-500'>Recent appointment requests</p>
            </div>
          </div>
          <span className='text-xs bg-primary/10 text-primary px-3 py-1 rounded-full font-medium'>
            {dashData.latestAppointments.length} New
          </span>
        </div>

        <div className='divide-y divide-gray-50'>
          {dashData.latestAppointments.slice(0, 5).map((item, index) => (
            <div className='flex items-center px-6 py-4 hover:bg-gray-50 transition-colors' key={index}>
              <img className='w-12 h-12 rounded-full object-cover border-2 border-gray-100' src={item.docData.image} alt="" />
              <div className='flex-1 ml-4'>
                <p className='font-semibold text-gray-800'>{item.docData.name}</p>
                <p className='text-sm text-gray-500 flex items-center gap-2'>
                  <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z'/>
                  </svg>
                  {slotDateFormat(item.slotDate)}
                </p>
              </div>
              <div className='flex items-center gap-3'>
                {item.cancelled ? (
                  <span className='px-3 py-1.5 bg-red-100 text-red-600 rounded-full text-xs font-medium'>
                    Cancelled
                  </span>
                ) : item.isCompleted ? (
                  <span className='px-3 py-1.5 bg-green-100 text-green-600 rounded-full text-xs font-medium'>
                    Completed
                  </span>
                ) : (
                  <button 
                    onClick={() => cancelAppointment(item._id)} 
                    className='p-2 hover:bg-red-50 rounded-lg transition-colors group'
                    title="Cancel Appointment"
                  >
                    <img className='w-6 opacity-70 group-hover:opacity-100' src={assets.cancel_icon} alt="" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {dashData.latestAppointments.length === 0 && (
          <div className='text-center py-12'>
            <div className='w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4'>
              <svg className='w-8 h-8 text-gray-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z'/>
              </svg>
            </div>
            <p className='text-gray-500'>No recent bookings</p>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className='mt-8 text-center text-sm text-gray-400'>
        <p>MediBook Admin Dashboard • Built by Harshith</p>
      </div>
    </div>
  )
}

export default Dashboard
