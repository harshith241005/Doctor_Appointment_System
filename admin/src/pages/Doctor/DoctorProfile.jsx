/**
 * Doctor Profile Component - Manage Doctor Profile Settings
 * Built by Harshith for MediBook Healthcare Platform
 * Features: Profile view/edit, Availability toggle, Fee management
 */

import React, { useContext, useEffect, useState } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { AppContext } from '../../context/AppContext'
import { toast } from 'react-toastify'
import axios from 'axios'

const DoctorProfile = () => {
  const { dToken, profileData, setProfileData, getProfileData } = useContext(DoctorContext)
  const { currency, backendUrl } = useContext(AppContext)
  const [isEdit, setIsEdit] = useState(false)
  const [loading, setLoading] = useState(false)

  const updateProfile = async () => {
    try {
      setLoading(true)
      const updateData = {
        address: profileData.address,
        fees: profileData.fees,
        about: profileData.about,
        available: profileData.available
      }

      const { data } = await axios.post(backendUrl + '/api/doctor/update-profile', updateData, { headers: { dToken } })

      if (data.success) {
        toast.success(data.message)
        setIsEdit(false)
        getProfileData()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (dToken) {
      getProfileData()
    }
  }, [dToken])

  return profileData && (
    <div className='p-6 bg-gray-50 min-h-screen'>
      {/* Page Header */}
      <div className='mb-6'>
        <h1 className='text-2xl font-bold text-gray-800'>My Profile</h1>
        <p className='text-gray-500'>Manage your professional profile</p>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
        {/* Profile Image Card */}
        <div className='lg:col-span-1'>
          <div className='bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden'>
            {/* Image */}
            <div className='relative'>
              <div className='h-32 bg-gradient-to-r from-primary to-primary-dark'></div>
              <div className='absolute left-1/2 -translate-x-1/2 -bottom-16'>
                <img 
                  className='w-32 h-32 rounded-2xl object-cover border-4 border-white shadow-lg' 
                  src={profileData.image} 
                  alt={profileData.name} 
                />
              </div>
            </div>

            {/* Info */}
            <div className='pt-20 pb-6 px-6 text-center'>
              <h2 className='text-xl font-bold text-gray-800 mb-1'>{profileData.name}</h2>
              <p className='text-primary font-medium mb-4'>{profileData.speciality}</p>
              
              <div className='flex justify-center gap-4 text-sm'>
                <div className='text-center'>
                  <p className='font-semibold text-gray-800'>{profileData.degree}</p>
                  <p className='text-gray-500'>Degree</p>
                </div>
                <div className='h-10 w-px bg-gray-200'></div>
                <div className='text-center'>
                  <p className='font-semibold text-gray-800'>{profileData.experience}</p>
                  <p className='text-gray-500'>Experience</p>
                </div>
              </div>

              {/* Availability Status */}
              <div className='mt-6 pt-6 border-t border-gray-100'>
                <div className='flex items-center justify-center gap-3'>
                  <span className={`w-3 h-3 rounded-full ${profileData.available ? 'bg-green-400' : 'bg-red-400'}`}></span>
                  <span className={`font-medium ${profileData.available ? 'text-green-600' : 'text-red-600'}`}>
                    {profileData.available ? 'Available for Appointments' : 'Not Available'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className='bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mt-6'>
            <h3 className='font-semibold text-gray-800 mb-4'>Quick Settings</h3>
            
            {/* Availability Toggle */}
            <div className='flex items-center justify-between py-3'>
              <div>
                <p className='font-medium text-gray-800'>Availability</p>
                <p className='text-sm text-gray-500'>Accept new appointments</p>
              </div>
              <label className='relative inline-flex items-center cursor-pointer'>
                <input 
                  type='checkbox' 
                  className='sr-only peer'
                  checked={profileData.available}
                  onChange={() => isEdit && setProfileData(prev => ({ ...prev, available: !prev.available }))}
                  disabled={!isEdit}
                />
                <div className={`w-11 h-6 rounded-full peer ${profileData.available ? 'bg-primary' : 'bg-gray-200'} peer-focus:ring-4 peer-focus:ring-primary/20 after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all ${profileData.available ? 'after:translate-x-full' : ''}`}></div>
              </label>
            </div>
          </div>
        </div>

        {/* Profile Details Card */}
        <div className='lg:col-span-2'>
          <div className='bg-white rounded-2xl shadow-sm border border-gray-100 p-8'>
            <div className='flex items-center justify-between mb-6'>
              <h2 className='text-xl font-bold text-gray-800'>Profile Details</h2>
              {isEdit ? (
                <div className='flex gap-3'>
                  <button
                    onClick={() => { setIsEdit(false); getProfileData(); }}
                    className='px-4 py-2 border border-gray-200 rounded-xl text-gray-600 hover:bg-gray-50 transition-colors'
                    disabled={loading}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={updateProfile}
                    disabled={loading}
                    className='px-4 py-2 bg-primary text-white rounded-xl hover:bg-primary-dark transition-colors flex items-center gap-2'
                  >
                    {loading ? (
                      <>
                        <svg className='animate-spin h-4 w-4' fill='none' viewBox='0 0 24 24'>
                          <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4'></circle>
                          <path className='opacity-75' fill='currentColor' d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'></path>
                        </svg>
                        Saving...
                      </>
                    ) : 'Save Changes'}
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setIsEdit(true)}
                  className='px-4 py-2 bg-primary/10 text-primary rounded-xl hover:bg-primary/20 transition-colors flex items-center gap-2'
                >
                  <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z'/>
                  </svg>
                  Edit Profile
                </button>
              )}
            </div>

            {/* About Section */}
            <div className='mb-6'>
              <label className='block text-sm font-medium text-gray-700 mb-2'>About</label>
              {isEdit ? (
                <textarea
                  value={profileData.about}
                  onChange={(e) => setProfileData(prev => ({ ...prev, about: e.target.value }))}
                  rows={5}
                  className='w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 resize-none transition-all'
                  placeholder='Write about yourself...'
                />
              ) : (
                <p className='text-gray-600 leading-relaxed bg-gray-50 rounded-xl p-4'>{profileData.about}</p>
              )}
            </div>

            {/* Fees Section */}
            <div className='mb-6'>
              <label className='block text-sm font-medium text-gray-700 mb-2'>Appointment Fee</label>
              <div className='flex items-center gap-2'>
                <span className='text-gray-500'>{currency}</span>
                {isEdit ? (
                  <input
                    type='number'
                    value={profileData.fees}
                    onChange={(e) => setProfileData(prev => ({ ...prev, fees: e.target.value }))}
                    className='w-32 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all'
                  />
                ) : (
                  <span className='text-2xl font-bold text-gray-800'>{profileData.fees}</span>
                )}
              </div>
            </div>

            {/* Address Section */}
            <div className='mb-6'>
              <label className='block text-sm font-medium text-gray-700 mb-2'>Clinic Address</label>
              {isEdit ? (
                <div className='space-y-3'>
                  <input
                    type='text'
                    value={profileData.address.line1}
                    onChange={(e) => setProfileData(prev => ({ ...prev, address: { ...prev.address, line1: e.target.value } }))}
                    placeholder='Address Line 1'
                    className='w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all'
                  />
                  <input
                    type='text'
                    value={profileData.address.line2}
                    onChange={(e) => setProfileData(prev => ({ ...prev, address: { ...prev.address, line2: e.target.value } }))}
                    placeholder='Address Line 2'
                    className='w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all'
                  />
                </div>
              ) : (
                <div className='flex items-start gap-3 bg-gray-50 rounded-xl p-4'>
                  <svg className='w-5 h-5 text-gray-400 mt-0.5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z'/>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M15 11a3 3 0 11-6 0 3 3 0 016 0z'/>
                  </svg>
                  <div className='text-gray-600'>
                    <p>{profileData.address.line1}</p>
                    <p>{profileData.address.line2}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Footer Attribution */}
          <div className='mt-6 text-center text-sm text-gray-400'>
            MediBook Doctor Profile — Crafted by Harshith
          </div>
        </div>
      </div>
    </div>
  )
}

export default DoctorProfile
