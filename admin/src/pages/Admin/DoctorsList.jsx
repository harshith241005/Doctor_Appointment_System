/**
 * DoctorsList Component - View All Registered Doctors
 * Built by Harshith for MediBook Healthcare Platform
 * Features: Doctor cards, Availability toggle, Search & filter
 */

import React, { useContext, useEffect, useState } from 'react'
import { AdminContext } from '../../context/AdminContext'

const DoctorsList = () => {

  const { doctors, changeAvailability, aToken, getAllDoctors } = useContext(AdminContext)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterSpeciality, setFilterSpeciality] = useState('all')

  useEffect(() => {
    if (aToken) {
      getAllDoctors()
    }
  }, [aToken])

  // Get unique specialities for filter
  const specialities = [...new Set(doctors.map(doc => doc.speciality))]

  // Filter doctors based on search and speciality
  const filteredDoctors = doctors.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.speciality.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesSpeciality = filterSpeciality === 'all' || doc.speciality === filterSpeciality
    return matchesSearch && matchesSpeciality
  })

  return (
    <div className='p-6 bg-gray-50 min-h-screen'>
      {/* Page Header */}
      <div className='mb-8'>
        <h1 className='text-3xl font-bold text-gray-800'>All Doctors</h1>
        <p className='text-gray-500 mt-1'>Manage registered doctors and their availability</p>
      </div>

      {/* Search & Filter Bar */}
      <div className='bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8'>
        <div className='flex flex-col md:flex-row gap-4'>
          {/* Search */}
          <div className='flex-1 relative'>
            <svg className='w-5 h-5 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'/>
            </svg>
            <input 
              type="text"
              placeholder='Search doctors by name or speciality...'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className='w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-primary transition-colors'
            />
          </div>

          {/* Speciality Filter */}
          <select 
            value={filterSpeciality}
            onChange={(e) => setFilterSpeciality(e.target.value)}
            className='px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-primary transition-colors bg-white min-w-[200px]'
          >
            <option value="all">All Specialities</option>
            {specialities.map((spec, index) => (
              <option key={index} value={spec}>{spec}</option>
            ))}
          </select>
        </div>

        {/* Stats Bar */}
        <div className='flex flex-wrap items-center gap-4 mt-4 pt-4 border-t border-gray-100'>
          <div className='flex items-center gap-2'>
            <span className='w-3 h-3 bg-primary rounded-full'></span>
            <span className='text-sm text-gray-600'>{doctors.length} Total Doctors</span>
          </div>
          <div className='flex items-center gap-2'>
            <span className='w-3 h-3 bg-green-500 rounded-full'></span>
            <span className='text-sm text-gray-600'>{doctors.filter(d => d.available).length} Available</span>
          </div>
          <div className='flex items-center gap-2'>
            <span className='w-3 h-3 bg-gray-400 rounded-full'></span>
            <span className='text-sm text-gray-600'>{doctors.filter(d => !d.available).length} Unavailable</span>
          </div>
        </div>
      </div>

      {/* Doctors Grid */}
      {filteredDoctors.length === 0 ? (
        <div className='bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center'>
          <div className='w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4'>
            <svg className='w-10 h-10 text-gray-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z'/>
            </svg>
          </div>
          <h3 className='text-xl font-semibold text-gray-800 mb-2'>No Doctors Found</h3>
          <p className='text-gray-500'>Try adjusting your search or filter criteria</p>
        </div>
      ) : (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
          {filteredDoctors.map((item, index) => (
            <div 
              key={index}
              className='bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 group'
            >
              {/* Doctor Image */}
              <div className='relative'>
                <img 
                  className='w-full h-48 object-cover bg-gradient-to-br from-primary/10 to-primary/5 group-hover:scale-105 transition-transform duration-500' 
                  src={item.image} 
                  alt={item.name}
                />
                {/* Availability Badge */}
                <div className='absolute top-3 right-3'>
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${
                    item.available 
                      ? 'bg-green-500 text-white' 
                      : 'bg-gray-500 text-white'
                  }`}>
                    <span className={`w-1.5 h-1.5 rounded-full bg-white ${item.available ? 'animate-pulse' : ''}`}></span>
                    {item.available ? 'Available' : 'Unavailable'}
                  </span>
                </div>
              </div>

              {/* Doctor Info */}
              <div className='p-5'>
                <h3 className='text-lg font-bold text-gray-800 mb-1'>{item.name}</h3>
                <p className='text-sm text-primary font-medium mb-4'>{item.speciality}</p>
                
                {/* Availability Toggle */}
                <div className='flex items-center justify-between pt-4 border-t border-gray-100'>
                  <span className='text-sm text-gray-500'>Availability</span>
                  <label className='relative inline-flex items-center cursor-pointer'>
                    <input 
                      type="checkbox" 
                      checked={item.available}
                      onChange={() => changeAvailability(item._id)}
                      className='sr-only peer' 
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Footer */}
      <div className='mt-8 text-center text-sm text-gray-400'>
        <p>MediBook Admin • Built by Harshith</p>
      </div>
    </div>
  )
}

export default DoctorsList
