/**
 * Doctor Dashboard Component - Doctor's Personal Analytics
 * Built by Harshith for MediBook Healthcare Platform
 * Features: Earnings, Appointments, Patients stats, Latest bookings
 */

import React, { useContext, useEffect } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { assets } from '../../assets/assets'
import { AppContext } from '../../context/AppContext'

const DoctorDashboard = () => {
  const { dToken, dashData, getDashData, cancelAppointment, completeAppointment } = useContext(DoctorContext)
  const { slotDateFormat, currency } = useContext(AppContext)

  useEffect(() => {
    if (dToken) {
      getDashData()
    }
  }, [dToken])

  return dashData && (
    <div className='p-6 bg-gray-50 min-h-screen'>
      {/* Page Header */}
      <div className='mb-8'>
        <h1 className='text-2xl font-bold text-gray-800'>Dashboard</h1>
        <p className='text-gray-500'>Welcome back! Here's your practice overview</p>
      </div>

      {/* Stats Cards */}
      <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-8'>
        {/* Earnings Card */}
        <div className='bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all'>
          <div className='flex items-center justify-between mb-4'>
            <div className='w-14 h-14 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-200'>
              <svg className='w-7 h-7 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z'/>
              </svg>
            </div>
            <span className='text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full'>
              +12.5%
            </span>
          </div>
          <p className='text-3xl font-bold text-gray-800 mb-1'>{currency} {dashData.earnings}</p>
          <p className='text-gray-500 text-sm'>Total Earnings</p>
        </div>

        {/* Appointments Card */}
        <div className='bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all'>
          <div className='flex items-center justify-between mb-4'>
            <div className='w-14 h-14 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-200'>
              <svg className='w-7 h-7 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z'/>
              </svg>
            </div>
            <span className='text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-full'>
              Active
            </span>
          </div>
          <p className='text-3xl font-bold text-gray-800 mb-1'>{dashData.appointments}</p>
          <p className='text-gray-500 text-sm'>Total Appointments</p>
        </div>

        {/* Patients Card */}
        <div className='bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all'>
          <div className='flex items-center justify-between mb-4'>
            <div className='w-14 h-14 bg-gradient-to-br from-purple-400 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-200'>
              <svg className='w-7 h-7 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z'/>
              </svg>
            </div>
            <span className='text-xs font-medium text-purple-600 bg-purple-50 px-2 py-1 rounded-full'>
              Growing
            </span>
          </div>
          <p className='text-3xl font-bold text-gray-800 mb-1'>{dashData.patients}</p>
          <p className='text-gray-500 text-sm'>Unique Patients</p>
        </div>
      </div>

      {/* Latest Bookings */}
      <div className='bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden'>
        <div className='flex items-center justify-between px-6 py-4 border-b border-gray-100'>
          <div className='flex items-center gap-3'>
            <div className='w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center'>
              <svg className='w-5 h-5 text-primary' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2'/>
              </svg>
            </div>
            <div>
              <h2 className='font-semibold text-gray-800'>Latest Bookings</h2>
              <p className='text-sm text-gray-500'>Recent patient appointments</p>
            </div>
          </div>
        </div>

        <div className='divide-y divide-gray-50'>
          {dashData.latestAppointments.slice(0, 5).map((item, index) => (
            <div className='flex items-center px-6 py-4 hover:bg-gray-50 transition-colors' key={index}>
              <img 
                className='w-12 h-12 rounded-full object-cover border-2 border-gray-100' 
                src={item.userData.image} 
                alt={item.userData.name} 
              />
              <div className='flex-1 ml-4'>
                <p className='font-medium text-gray-800'>{item.userData.name}</p>
                <p className='text-sm text-gray-500'>
                  {slotDateFormat(item.slotDate)} • {item.slotTime}
                </p>
              </div>
              <div>
                {item.cancelled ? (
                  <span className='inline-flex items-center gap-1 px-3 py-1 bg-red-50 text-red-600 rounded-full text-sm font-medium'>
                    <span className='w-2 h-2 bg-red-400 rounded-full'></span>
                    Cancelled
                  </span>
                ) : item.isCompleted ? (
                  <span className='inline-flex items-center gap-1 px-3 py-1 bg-green-50 text-green-600 rounded-full text-sm font-medium'>
                    <span className='w-2 h-2 bg-green-400 rounded-full'></span>
                    Completed
                  </span>
                ) : (
                  <div className='flex items-center gap-2'>
                    <button 
                      onClick={() => cancelAppointment(item._id)} 
                      className='p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors'
                      title='Cancel Appointment'
                    >
                      <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M6 18L18 6M6 6l12 12'/>
                      </svg>
                    </button>
                    <button 
                      onClick={() => completeAppointment(item._id)} 
                      className='p-2 text-green-500 hover:bg-green-50 rounded-lg transition-colors'
                      title='Complete Appointment'
                    >
                      <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M5 13l4 4L19 7'/>
                      </svg>
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {dashData.latestAppointments.length === 0 && (
          <div className='px-6 py-12 text-center'>
            <div className='w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4'>
              <svg className='w-8 h-8 text-gray-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z'/>
              </svg>
            </div>
            <p className='text-gray-500'>No appointments yet</p>
          </div>
        )}
      </div>

      {/* Footer Attribution */}
      <div className='mt-8 text-center text-sm text-gray-400'>
        MediBook Doctor Portal — Developed by Harshith
      </div>
    </div>
  )
}

export default DoctorDashboard
