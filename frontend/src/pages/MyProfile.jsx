/**
 * MyProfile Component - User Profile Management
 * Built by Harshith for MediBook Healthcare Platform
 * Features: Profile editing, Image upload, Personal information management
 */

import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { assets } from '../assets/assets'

const MyProfile = () => {

    const [isEdit, setIsEdit] = useState(false)
    const [image, setImage] = useState(false)
    const [loading, setLoading] = useState(false)

    const { token, userData, setUserData, loadUserProfileData } = useContext(AppContext)
    const backendUrl = "http://localhost:4000"

    // Function to update user profile data using API
    const updateUserProfileData = async () => {
        setLoading(true)
        try {
            const formData = new FormData();

            formData.append('name', userData.name)
            formData.append('phone', userData.phone)
            formData.append('address', JSON.stringify(userData.address))
            formData.append('gender', userData.gender)
            formData.append('dob', userData.dob)

            image && formData.append('image', image)

            const { data } = await axios.post(backendUrl + '/api/user/update-profile', formData, { headers: { token } })

            if (data.success) {
                toast.success(data.message)
                await loadUserProfileData()
                setIsEdit(false)
                setImage(false)
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            console.log(error)
            toast.error(error.message)
        } finally {
            setLoading(false)
        }
    }

    return userData ? (
        <div className='min-h-screen py-8'>
            {/* Profile Header */}
            <div className='max-w-4xl mx-auto'>
                <div className='bg-gradient-to-r from-primary to-primary-dark rounded-2xl p-8 mb-8'>
                    <h1 className='text-3xl font-bold text-white mb-2'>My Profile</h1>
                    <p className='text-emerald-100'>Manage your personal information and preferences</p>
                </div>

                {/* Profile Card */}
                <div className='bg-white rounded-2xl shadow-lg overflow-hidden'>
                    {/* Profile Image Section */}
                    <div className='bg-gradient-to-r from-gray-50 to-gray-100 p-8 flex flex-col sm:flex-row items-center gap-6 border-b'>
                        <div className='relative'>
                            {isEdit ? (
                                <label htmlFor='image' className='cursor-pointer group'>
                                    <div className='relative'>
                                        <img 
                                            className='w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg group-hover:opacity-75 transition-opacity' 
                                            src={image ? URL.createObjectURL(image) : userData.image} 
                                            alt="Profile" 
                                        />
                                        <div className='absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity'>
                                            <div className='bg-black bg-opacity-50 rounded-full p-3'>
                                                <img className='w-6 h-6' src={assets.upload_icon} alt="" />
                                            </div>
                                        </div>
                                    </div>
                                    <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" hidden accept="image/*" />
                                </label>
                            ) : (
                                <img className='w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg' src={userData.image} alt="Profile" />
                            )}
                            
                            {/* Online Status Indicator */}
                            <span className='absolute bottom-2 right-2 w-4 h-4 bg-green-500 border-2 border-white rounded-full'></span>
                        </div>

                        <div className='text-center sm:text-left'>
                            {isEdit ? (
                                <input 
                                    className='text-2xl font-bold text-gray-800 bg-white border-2 border-primary rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary' 
                                    type="text" 
                                    onChange={(e) => setUserData(prev => ({ ...prev, name: e.target.value }))} 
                                    value={userData.name} 
                                />
                            ) : (
                                <h2 className='text-2xl font-bold text-gray-800'>{userData.name}</h2>
                            )}
                            <p className='text-gray-500 mt-1 flex items-center justify-center sm:justify-start gap-2'>
                                <span className='w-2 h-2 bg-primary rounded-full'></span>
                                MediBook Member
                            </p>
                        </div>
                    </div>

                    {/* Profile Details */}
                    <div className='p-8'>
                        {/* Contact Information */}
                        <div className='mb-8'>
                            <div className='flex items-center gap-2 mb-4'>
                                <div className='w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center'>
                                    <svg className='w-4 h-4 text-primary' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'></path>
                                    </svg>
                                </div>
                                <h3 className='text-lg font-semibold text-gray-800'>Contact Information</h3>
                            </div>
                            
                            <div className='grid grid-cols-1 md:grid-cols-2 gap-6 pl-10'>
                                <div>
                                    <label className='text-sm font-medium text-gray-500'>Email Address</label>
                                    <p className='text-gray-800 mt-1 flex items-center gap-2'>
                                        <span className='text-primary'>{userData.email}</span>
                                        <span className='bg-green-100 text-green-600 text-xs px-2 py-0.5 rounded-full'>Verified</span>
                                    </p>
                                </div>

                                <div>
                                    <label className='text-sm font-medium text-gray-500'>Phone Number</label>
                                    {isEdit ? (
                                        <input 
                                            className='w-full mt-1 border-2 border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:border-primary transition-colors' 
                                            type="tel" 
                                            onChange={(e) => setUserData(prev => ({ ...prev, phone: e.target.value }))} 
                                            value={userData.phone}
                                            placeholder="Enter phone number"
                                        />
                                    ) : (
                                        <p className='text-gray-800 mt-1'>{userData.phone || 'Not provided'}</p>
                                    )}
                                </div>

                                <div className='md:col-span-2'>
                                    <label className='text-sm font-medium text-gray-500'>Address</label>
                                    {isEdit ? (
                                        <div className='space-y-2 mt-1'>
                                            <input 
                                                className='w-full border-2 border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:border-primary transition-colors' 
                                                type="text" 
                                                onChange={(e) => setUserData(prev => ({ ...prev, address: { ...prev.address, line1: e.target.value } }))} 
                                                value={userData.address.line1}
                                                placeholder="Address Line 1"
                                            />
                                            <input 
                                                className='w-full border-2 border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:border-primary transition-colors' 
                                                type="text" 
                                                onChange={(e) => setUserData(prev => ({ ...prev, address: { ...prev.address, line2: e.target.value } }))} 
                                                value={userData.address.line2}
                                                placeholder="Address Line 2"
                                            />
                                        </div>
                                    ) : (
                                        <p className='text-gray-800 mt-1'>
                                            {userData.address.line1 || 'Not provided'}<br />
                                            {userData.address.line2}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Divider */}
                        <div className='border-t border-gray-200 my-6'></div>

                        {/* Basic Information */}
                        <div className='mb-8'>
                            <div className='flex items-center gap-2 mb-4'>
                                <div className='w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center'>
                                    <svg className='w-4 h-4 text-primary' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'></path>
                                    </svg>
                                </div>
                                <h3 className='text-lg font-semibold text-gray-800'>Basic Information</h3>
                            </div>
                            
                            <div className='grid grid-cols-1 md:grid-cols-2 gap-6 pl-10'>
                                <div>
                                    <label className='text-sm font-medium text-gray-500'>Gender</label>
                                    {isEdit ? (
                                        <select 
                                            className='w-full mt-1 border-2 border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:border-primary transition-colors bg-white' 
                                            onChange={(e) => setUserData(prev => ({ ...prev, gender: e.target.value }))} 
                                            value={userData.gender}
                                        >
                                            <option value="Not Selected">Select Gender</option>
                                            <option value="Male">Male</option>
                                            <option value="Female">Female</option>
                                            <option value="Other">Other</option>
                                        </select>
                                    ) : (
                                        <p className='text-gray-800 mt-1'>{userData.gender || 'Not selected'}</p>
                                    )}
                                </div>

                                <div>
                                    <label className='text-sm font-medium text-gray-500'>Date of Birth</label>
                                    {isEdit ? (
                                        <input 
                                            className='w-full mt-1 border-2 border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:border-primary transition-colors' 
                                            type='date' 
                                            onChange={(e) => setUserData(prev => ({ ...prev, dob: e.target.value }))} 
                                            value={userData.dob}
                                        />
                                    ) : (
                                        <p className='text-gray-800 mt-1'>{userData.dob || 'Not provided'}</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className='flex flex-wrap gap-4 pt-6 border-t border-gray-200'>
                            {isEdit ? (
                                <>
                                    <button 
                                        onClick={updateUserProfileData} 
                                        disabled={loading}
                                        className='flex items-center gap-2 bg-primary text-white px-8 py-3 rounded-full hover:bg-primary-dark transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50'
                                    >
                                        {loading ? (
                                            <>
                                                <svg className='animate-spin w-5 h-5' fill='none' viewBox='0 0 24 24'>
                                                    <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4'></circle>
                                                    <path className='opacity-75' fill='currentColor' d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'></path>
                                                </svg>
                                                Saving...
                                            </>
                                        ) : (
                                            <>
                                                <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M5 13l4 4L19 7'></path>
                                                </svg>
                                                Save Changes
                                            </>
                                        )}
                                    </button>
                                    <button 
                                        onClick={() => {setIsEdit(false); setImage(false)}} 
                                        className='flex items-center gap-2 border-2 border-gray-300 text-gray-600 px-8 py-3 rounded-full hover:bg-gray-50 transition-all duration-300'
                                    >
                                        <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M6 18L18 6M6 6l12 12'></path>
                                        </svg>
                                        Cancel
                                    </button>
                                </>
                            ) : (
                                <button 
                                    onClick={() => setIsEdit(true)} 
                                    className='flex items-center gap-2 bg-primary text-white px-8 py-3 rounded-full hover:bg-primary-dark transition-all duration-300 shadow-lg hover:shadow-xl'
                                >
                                    <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z'></path>
                                    </svg>
                                    Edit Profile
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                {/* Quick Stats */}
                <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mt-8'>
                    <div className='bg-white rounded-xl p-6 shadow-md border border-gray-100'>
                        <div className='flex items-center gap-4'>
                            <div className='w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center'>
                                <svg className='w-6 h-6 text-emerald-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'></path>
                                </svg>
                            </div>
                            <div>
                                <p className='text-2xl font-bold text-gray-800'>Active</p>
                                <p className='text-sm text-gray-500'>Account Status</p>
                            </div>
                        </div>
                    </div>
                    
                    <div className='bg-white rounded-xl p-6 shadow-md border border-gray-100'>
                        <div className='flex items-center gap-4'>
                            <div className='w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center'>
                                <svg className='w-6 h-6 text-blue-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z'></path>
                                </svg>
                            </div>
                            <div>
                                <p className='text-2xl font-bold text-gray-800'>Secured</p>
                                <p className='text-sm text-gray-500'>Data Protection</p>
                            </div>
                        </div>
                    </div>
                    
                    <div className='bg-white rounded-xl p-6 shadow-md border border-gray-100'>
                        <div className='flex items-center gap-4'>
                            <div className='w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center'>
                                <svg className='w-6 h-6 text-purple-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z'></path>
                                </svg>
                            </div>
                            <div>
                                <p className='text-2xl font-bold text-gray-800'>Premium</p>
                                <p className='text-sm text-gray-500'>Member Type</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    ) : null
}

export default MyProfile
