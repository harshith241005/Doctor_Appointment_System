/**
 * AllAppointments Component - View All System Appointments
 * Built by Harshith for MediBook Healthcare Platform
 * Features: Appointment list, Status management, Filtering
 */

import React, { useEffect, useState } from 'react'
import { assets } from '../../assets/assets'
import { useContext } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { AppContext } from '../../context/AppContext'

const AllAppointments = () => {

  const { aToken, appointments, cancelAppointment, getAllAppointments } = useContext(AdminContext)
  const { slotDateFormat, calculateAge, currency } = useContext(AppContext)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')

  useEffect(() => {
    if (aToken) {
      getAllAppointments()
    }
  }, [aToken])

  // Filter appointments
  const filteredAppointments = appointments.filter(item => {
    const matchesSearch = 
      item.userData.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.docData.name.toLowerCase().includes(searchTerm.toLowerCase())
    
    let matchesStatus = true
    if (filterStatus === 'completed') matchesStatus = item.isCompleted
    else if (filterStatus === 'cancelled') matchesStatus = item.cancelled
    else if (filterStatus === 'pending') matchesStatus = !item.isCompleted && !item.cancelled

    return matchesSearch && matchesStatus
  })

  // Get status counts
  const statusCounts = {
    all: appointments.length,
    pending: appointments.filter(a => !a.isCompleted && !a.cancelled).length,
    completed: appointments.filter(a => a.isCompleted).length,
    cancelled: appointments.filter(a => a.cancelled).length
  }

  return (
    <div className='p-6 bg-gray-50 min-h-screen'>
      {/* Page Header */}
      <div className='mb-8'>
        <h1 className='text-3xl font-bold text-gray-800'>All Appointments</h1>
        <p className='text-gray-500 mt-1'>View and manage all patient appointments</p>
      </div>

      {/* Filters Section */}
      <div className='bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8'>
        <div className='flex flex-col lg:flex-row gap-4'>
          {/* Search */}
          <div className='flex-1 relative'>
            <svg className='w-5 h-5 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'/>
            </svg>
            <input 
              type="text"
              placeholder='Search by patient or doctor name...'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className='w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-primary transition-colors'
            />
          </div>

          {/* Status Filter Tabs */}
          <div className='flex flex-wrap gap-2'>
            {[
              { key: 'all', label: 'All', count: statusCounts.all },
              { key: 'pending', label: 'Pending', count: statusCounts.pending },
              { key: 'completed', label: 'Completed', count: statusCounts.completed },
              { key: 'cancelled', label: 'Cancelled', count: statusCounts.cancelled }
            ].map(tab => (
              <button
                key={tab.key}
                onClick={() => setFilterStatus(tab.key)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                  filterStatus === tab.key 
                    ? 'bg-primary text-white shadow-md' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {tab.label}
                <span className={`text-xs px-2 py-0.5 rounded-full ${
                  filterStatus === tab.key ? 'bg-white/20 text-white' : 'bg-white text-gray-600'
                }`}>
                  {tab.count}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Appointments Table */}
      <div className='bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden'>
        {/* Table Header */}
        <div className='hidden sm:grid grid-cols-[0.5fr_2fr_1fr_2fr_2fr_1fr_1fr] gap-4 py-4 px-6 bg-gray-50 border-b border-gray-100'>
          <p className='text-sm font-semibold text-gray-600'>#</p>
          <p className='text-sm font-semibold text-gray-600'>Patient</p>
          <p className='text-sm font-semibold text-gray-600'>Age</p>
          <p className='text-sm font-semibold text-gray-600'>Date & Time</p>
          <p className='text-sm font-semibold text-gray-600'>Doctor</p>
          <p className='text-sm font-semibold text-gray-600'>Fees</p>
          <p className='text-sm font-semibold text-gray-600'>Status</p>
        </div>

        {/* Table Body */}
        <div className='divide-y divide-gray-50 max-h-[60vh] overflow-y-auto'>
          {filteredAppointments.length === 0 ? (
            <div className='text-center py-12'>
              <div className='w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4'>
                <svg className='w-8 h-8 text-gray-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z'/>
                </svg>
              </div>
              <p className='text-gray-500'>No appointments found</p>
            </div>
          ) : (
            filteredAppointments.map((item, index) => (
              <div 
                key={index}
                className='flex flex-wrap justify-between gap-4 sm:grid sm:grid-cols-[0.5fr_2fr_1fr_2fr_2fr_1fr_1fr] items-center py-4 px-6 hover:bg-gray-50 transition-colors'
              >
                {/* Index */}
                <p className='text-sm text-gray-500 hidden sm:block'>{index + 1}</p>
                
                {/* Patient Info */}
                <div className='flex items-center gap-3'>
                  <img src={item.userData.image} className='w-10 h-10 rounded-full object-cover border-2 border-gray-100' alt="" />
                  <p className='font-medium text-gray-800'>{item.userData.name}</p>
                </div>
                
                {/* Age */}
                <p className='text-sm text-gray-600 hidden sm:block'>{calculateAge(item.userData.dob)} yrs</p>
                
                {/* Date & Time */}
                <div className='flex items-center gap-2 text-gray-600'>
                  <svg className='w-4 h-4 text-gray-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z'/>
                  </svg>
                  <span className='text-sm'>{slotDateFormat(item.slotDate)}, {item.slotTime}</span>
                </div>
                
                {/* Doctor Info */}
                <div className='flex items-center gap-3'>
                  <img src={item.docData.image} className='w-10 h-10 rounded-full object-cover bg-primary/10 border-2 border-gray-100' alt="" />
                  <p className='font-medium text-gray-800'>{item.docData.name}</p>
                </div>
                
                {/* Fees */}
                <p className='font-semibold text-gray-800'>{currency}{item.amount}</p>
                
                {/* Status/Action */}
                <div>
                  {item.cancelled ? (
                    <span className='inline-flex items-center gap-1 px-3 py-1.5 bg-red-100 text-red-600 rounded-full text-xs font-medium'>
                      <svg className='w-3 h-3' fill='currentColor' viewBox='0 0 20 20'>
                        <path fillRule='evenodd' d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z' clipRule='evenodd'/>
                      </svg>
                      Cancelled
                    </span>
                  ) : item.isCompleted ? (
                    <span className='inline-flex items-center gap-1 px-3 py-1.5 bg-green-100 text-green-600 rounded-full text-xs font-medium'>
                      <svg className='w-3 h-3' fill='currentColor' viewBox='0 0 20 20'>
                        <path fillRule='evenodd' d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z' clipRule='evenodd'/>
                      </svg>
                      Completed
                    </span>
                  ) : (
                    <button 
                      onClick={() => cancelAppointment(item._id)}
                      className='p-2 hover:bg-red-50 rounded-lg transition-colors group'
                      title="Cancel Appointment"
                    >
                      <img className='w-6 opacity-60 group-hover:opacity-100' src={assets.cancel_icon} alt="" />
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Footer */}
      <div className='mt-8 text-center text-sm text-gray-400'>
        <p>MediBook Admin • Built by Harshith</p>
      </div>
    </div>
  )
}

export default AllAppointments
