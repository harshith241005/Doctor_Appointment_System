/**
 * Doctor Appointments Component - Manage Patient Appointments
 * Built by Harshith for MediBook Healthcare Platform
 * Features: Appointment list, Status management, Search, Filters
 */

import React, { useContext, useEffect, useState } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { AppContext } from '../../context/AppContext'

const DoctorAppointments = () => {
  const { dToken, appointments, getAppointments, cancelAppointment, completeAppointment } = useContext(DoctorContext)
  const { slotDateFormat, calculateAge, currency } = useContext(AppContext)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  useEffect(() => {
    if (dToken) {
      getAppointments()
    }
  }, [dToken])

  // Filter appointments based on search and status
  const filteredAppointments = appointments.filter(item => {
    const matchesSearch = item.userData.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = 
      statusFilter === 'all' ||
      (statusFilter === 'pending' && !item.cancelled && !item.isCompleted) ||
      (statusFilter === 'completed' && item.isCompleted) ||
      (statusFilter === 'cancelled' && item.cancelled)
    return matchesSearch && matchesStatus
  })

  // Get counts for each status
  const pendingCount = appointments.filter(a => !a.cancelled && !a.isCompleted).length
  const completedCount = appointments.filter(a => a.isCompleted).length
  const cancelledCount = appointments.filter(a => a.cancelled).length

  return (
    <div className='p-6 bg-gray-50 min-h-screen'>
      {/* Page Header */}
      <div className='mb-6'>
        <h1 className='text-2xl font-bold text-gray-800'>My Appointments</h1>
        <p className='text-gray-500'>Manage your patient appointments</p>
      </div>

      {/* Search and Filter Bar */}
      <div className='bg-white rounded-2xl p-4 shadow-sm border border-gray-100 mb-6'>
        <div className='flex flex-col md:flex-row gap-4'>
          {/* Search Input */}
          <div className='flex-1 relative'>
            <svg className='absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'/>
            </svg>
            <input
              type='text'
              placeholder='Search patients...'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className='w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all'
            />
          </div>
        </div>

        {/* Status Filter Tabs */}
        <div className='flex gap-2 mt-4 flex-wrap'>
          <button
            onClick={() => setStatusFilter('all')}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              statusFilter === 'all'
                ? 'bg-primary text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            All ({appointments.length})
          </button>
          <button
            onClick={() => setStatusFilter('pending')}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              statusFilter === 'pending'
                ? 'bg-amber-500 text-white'
                : 'bg-amber-50 text-amber-600 hover:bg-amber-100'
            }`}
          >
            Pending ({pendingCount})
          </button>
          <button
            onClick={() => setStatusFilter('completed')}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              statusFilter === 'completed'
                ? 'bg-green-500 text-white'
                : 'bg-green-50 text-green-600 hover:bg-green-100'
            }`}
          >
            Completed ({completedCount})
          </button>
          <button
            onClick={() => setStatusFilter('cancelled')}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              statusFilter === 'cancelled'
                ? 'bg-red-500 text-white'
                : 'bg-red-50 text-red-600 hover:bg-red-100'
            }`}
          >
            Cancelled ({cancelledCount})
          </button>
        </div>
      </div>

      {/* Appointments Table */}
      <div className='bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden'>
        {/* Table Header */}
        <div className='hidden md:grid grid-cols-[0.5fr_2fr_1fr_1fr_2fr_1fr_1.5fr] gap-4 py-4 px-6 bg-gray-50 border-b border-gray-100 text-sm font-medium text-gray-500'>
          <p>#</p>
          <p>Patient</p>
          <p>Payment</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Fees</p>
          <p>Actions</p>
        </div>

        {/* Table Body */}
        <div className='divide-y divide-gray-50'>
          {filteredAppointments.map((item, index) => (
            <div 
              className='grid grid-cols-1 md:grid-cols-[0.5fr_2fr_1fr_1fr_2fr_1fr_1.5fr] gap-4 py-4 px-6 items-center hover:bg-gray-50 transition-colors' 
              key={index}
            >
              {/* Index */}
              <p className='hidden md:block text-gray-400 font-medium'>{index + 1}</p>

              {/* Patient Info */}
              <div className='flex items-center gap-3'>
                <img 
                  src={item.userData.image} 
                  className='w-10 h-10 rounded-full object-cover border-2 border-gray-100' 
                  alt={item.userData.name} 
                />
                <div>
                  <p className='font-medium text-gray-800'>{item.userData.name}</p>
                  <p className='text-xs text-gray-500 md:hidden'>Age: {calculateAge(item.userData.dob)}</p>
                </div>
              </div>

              {/* Payment Status */}
              <div>
                <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                  item.payment 
                    ? 'bg-green-50 text-green-600' 
                    : 'bg-amber-50 text-amber-600'
                }`}>
                  {item.payment ? (
                    <>
                      <svg className='w-3 h-3' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M5 13l4 4L19 7'/>
                      </svg>
                      Online
                    </>
                  ) : 'CASH'}
                </span>
              </div>

              {/* Age */}
              <p className='hidden md:block text-gray-600'>{calculateAge(item.userData.dob)} yrs</p>

              {/* Date & Time */}
              <div className='text-gray-600'>
                <p className='font-medium'>{slotDateFormat(item.slotDate)}</p>
                <p className='text-sm text-gray-500'>{item.slotTime}</p>
              </div>

              {/* Fees */}
              <p className='font-semibold text-gray-800'>{currency}{item.amount}</p>

              {/* Actions */}
              <div>
                {item.cancelled ? (
                  <span className='inline-flex items-center gap-1 px-3 py-1.5 bg-red-50 text-red-600 rounded-lg text-sm font-medium'>
                    <span className='w-2 h-2 bg-red-400 rounded-full'></span>
                    Cancelled
                  </span>
                ) : item.isCompleted ? (
                  <span className='inline-flex items-center gap-1 px-3 py-1.5 bg-green-50 text-green-600 rounded-lg text-sm font-medium'>
                    <span className='w-2 h-2 bg-green-400 rounded-full'></span>
                    Completed
                  </span>
                ) : (
                  <div className='flex items-center gap-2'>
                    <button 
                      onClick={() => cancelAppointment(item._id)} 
                      className='flex items-center gap-1 px-3 py-1.5 text-red-500 bg-red-50 hover:bg-red-100 rounded-lg transition-colors text-sm'
                      title='Cancel'
                    >
                      <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M6 18L18 6M6 6l12 12'/>
                      </svg>
                    </button>
                    <button 
                      onClick={() => completeAppointment(item._id)} 
                      className='flex items-center gap-1 px-3 py-1.5 text-green-500 bg-green-50 hover:bg-green-100 rounded-lg transition-colors text-sm'
                      title='Complete'
                    >
                      <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M5 13l4 4L19 7'/>
                      </svg>
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredAppointments.length === 0 && (
          <div className='py-16 text-center'>
            <div className='w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4'>
              <svg className='w-10 h-10 text-gray-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z'/>
              </svg>
            </div>
            <h3 className='text-lg font-semibold text-gray-800 mb-2'>No Appointments Found</h3>
            <p className='text-gray-500'>
              {searchTerm 
                ? 'Try adjusting your search criteria' 
                : 'Your appointment list is empty'}
            </p>
          </div>
        )}
      </div>

      {/* Footer Attribution */}
      <div className='mt-8 text-center text-sm text-gray-400'>
        MediBook Doctor Portal — Built by Harshith
      </div>
    </div>
  )
}

export default DoctorAppointments
