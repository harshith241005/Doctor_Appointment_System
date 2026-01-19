/**
 * AddDoctor Component - Doctor Registration Form
 * Built by Harshith for MediBook Healthcare Platform
 * Features: Doctor details input, Image upload, Form validation
 */

import React, { useContext, useState } from 'react'
import { assets } from '../../assets/assets'
import { toast } from 'react-toastify'
import axios from 'axios'
import { AdminContext } from '../../context/AdminContext'
import { AppContext } from '../../context/AppContext'

const AddDoctor = () => {

    const [docImg, setDocImg] = useState(false)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false) 
    const [experience, setExperience] = useState('1 Year')
    const [fees, setFees] = useState('')
    const [about, setAbout] = useState('')
    const [speciality, setSpeciality] = useState('General physician')
    const [degree, setDegree] = useState('')
    const [address1, setAddress1] = useState('')
    const [address2, setAddress2] = useState('')
    const [loading, setLoading] = useState(false)

    const { backendUrl } = useContext(AppContext)
    const { aToken } = useContext(AdminContext)

    const onSubmitHandler = async (event) => {
        event.preventDefault()
        setLoading(true)

        try {
            if (!docImg) {
                setLoading(false)
                return toast.error('Please upload doctor image')
            }

            const formData = new FormData();

            formData.append('image', docImg)
            formData.append('name', name)
            formData.append('email', email)
            formData.append('password', password)
            formData.append('experience', experience)
            formData.append('fees', Number(fees))
            formData.append('about', about)
            formData.append('speciality', speciality)
            formData.append('degree', degree)
            formData.append('address', JSON.stringify({ line1: address1, line2: address2 }))

            const { data } = await axios.post(backendUrl + '/api/admin/add-doctor', formData, { headers: { aToken } })
            if (data.success) {
                toast.success(data.message)
                setDocImg(false)
                setName('')
                setPassword('')
                setEmail('')
                setAddress1('')
                setAddress2('')
                setDegree('')
                setAbout('')
                setFees('')
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

    return (
        <div className='p-6 bg-gray-50 min-h-screen'>
            {/* Page Header */}
            <div className='mb-8'>
                <h1 className='text-3xl font-bold text-gray-800'>Add New Doctor</h1>
                <p className='text-gray-500 mt-1'>Fill in the details to register a new doctor on MediBook</p>
            </div>

            <form onSubmit={onSubmitHandler} className='w-full'>
                <div className='bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden'>
                    {/* Image Upload Section */}
                    <div className='bg-gradient-to-r from-primary/5 to-primary/10 p-8 border-b border-gray-100'>
                        <div className='flex flex-col sm:flex-row items-center gap-6'>
                            <label htmlFor="doc-img" className='cursor-pointer group'>
                                <div className='relative'>
                                    <img
                                        className='w-32 h-32 object-cover rounded-2xl border-4 border-white shadow-lg group-hover:opacity-75 transition-opacity bg-white'
                                        src={docImg ? URL.createObjectURL(docImg) : assets.upload_area}
                                        alt="Doctor Preview"
                                    />
                                    <div className='absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity'>
                                        <div className='bg-primary text-white rounded-full p-3'>
                                            <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z'/>
                                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M15 13a3 3 0 11-6 0 3 3 0 016 0z'/>
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </label>
                            <input onChange={(e) => setDocImg(e.target.files[0])} type="file" id="doc-img" hidden accept="image/*" />
                            <div>
                                <h3 className='text-lg font-semibold text-gray-800 mb-1'>Profile Photo</h3>
                                <p className='text-sm text-gray-500'>Upload a professional photo of the doctor</p>
                                <p className='text-xs text-gray-400 mt-1'>Recommended: 300x300px, JPG or PNG</p>
                            </div>
                        </div>
                    </div>

                    {/* Form Fields */}
                    <div className='p-8'>
                        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
                            {/* Left Column */}
                            <div className='space-y-6'>
                                <div>
                                    <label className='block text-sm font-medium text-gray-700 mb-2'>Full Name</label>
                                    <input 
                                        onChange={e => setName(e.target.value)} 
                                        value={name} 
                                        className='w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors' 
                                        type="text" 
                                        placeholder='Dr. John Doe' 
                                        required 
                                    />
                                </div>

                                <div>
                                    <label className='block text-sm font-medium text-gray-700 mb-2'>Email Address</label>
                                    <input 
                                        onChange={e => setEmail(e.target.value)} 
                                        value={email} 
                                        className='w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors' 
                                        type="email" 
                                        placeholder='doctor@medibook.com' 
                                        required 
                                    />
                                </div>

                                <div>
                                    <label className='block text-sm font-medium text-gray-700 mb-2'>Password</label>
                                    <div className='relative'>
                                        <input
                                            onChange={e => setPassword(e.target.value)}
                                            value={password}
                                            className='w-full border-2 border-gray-200 rounded-xl px-4 py-3 pr-12 focus:outline-none focus:border-primary transition-colors'
                                            type={showPassword ? 'text' : 'password'}
                                            placeholder='Create a secure password'
                                            required
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className='absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600'
                                        >
                                            {showPassword ? (
                                                <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21'/>
                                                </svg>
                                            ) : (
                                                <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'/>
                                                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z'/>
                                                </svg>
                                            )}
                                        </button>
                                    </div>
                                </div>

                                <div>
                                    <label className='block text-sm font-medium text-gray-700 mb-2'>Experience</label>
                                    <select 
                                        onChange={e => setExperience(e.target.value)} 
                                        value={experience} 
                                        className='w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors bg-white'
                                    >
                                        <option value="1 Year">1 Year</option>
                                        <option value="2 Years">2 Years</option>
                                        <option value="3 Years">3 Years</option>
                                        <option value="4 Years">4 Years</option>
                                        <option value="5 Years">5 Years</option>
                                        <option value="6 Years">6 Years</option>
                                        <option value="7 Years">7 Years</option>
                                        <option value="8 Years">8 Years</option>
                                        <option value="9 Years">9 Years</option>
                                        <option value="10+ Years">10+ Years</option>
                                    </select>
                                </div>

                                <div>
                                    <label className='block text-sm font-medium text-gray-700 mb-2'>Consultation Fees (₹)</label>
                                    <input 
                                        onChange={e => setFees(e.target.value)} 
                                        value={fees} 
                                        className='w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors' 
                                        type="number" 
                                        placeholder='500' 
                                        required 
                                    />
                                </div>
                            </div>

                            {/* Right Column */}
                            <div className='space-y-6'>
                                <div>
                                    <label className='block text-sm font-medium text-gray-700 mb-2'>Specialization</label>
                                    <select 
                                        onChange={e => setSpeciality(e.target.value)} 
                                        value={speciality} 
                                        className='w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors bg-white'
                                    >
                                        <option value="General physician">General Physician</option>
                                        <option value="Gynecologist">Gynecologist</option>
                                        <option value="Dermatologist">Dermatologist</option>
                                        <option value="Pediatricians">Pediatrician</option>
                                        <option value="Neurologist">Neurologist</option>
                                        <option value="Gastroenterologist">Gastroenterologist</option>
                                    </select>
                                </div>

                                <div>
                                    <label className='block text-sm font-medium text-gray-700 mb-2'>Degree / Qualification</label>
                                    <input 
                                        onChange={e => setDegree(e.target.value)} 
                                        value={degree} 
                                        className='w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors' 
                                        type="text" 
                                        placeholder='MBBS, MD' 
                                        required 
                                    />
                                </div>

                                <div>
                                    <label className='block text-sm font-medium text-gray-700 mb-2'>Clinic Address</label>
                                    <input 
                                        onChange={e => setAddress1(e.target.value)} 
                                        value={address1} 
                                        className='w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors mb-3' 
                                        type="text" 
                                        placeholder='Street Address' 
                                        required 
                                    />
                                    <input 
                                        onChange={e => setAddress2(e.target.value)} 
                                        value={address2} 
                                        className='w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors' 
                                        type="text" 
                                        placeholder='City, State, ZIP' 
                                        required 
                                    />
                                </div>
                            </div>
                        </div>

                        {/* About Section */}
                        <div className='mt-8'>
                            <label className='block text-sm font-medium text-gray-700 mb-2'>About Doctor</label>
                            <textarea 
                                onChange={e => setAbout(e.target.value)} 
                                value={about} 
                                className='w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors resize-none' 
                                rows={4} 
                                placeholder='Write a brief description about the doctor, their expertise, and experience...'
                            ></textarea>
                        </div>

                        {/* Submit Button */}
                        <div className='mt-8 flex justify-end'>
                            <button 
                                type='submit' 
                                disabled={loading}
                                className='flex items-center gap-3 bg-primary text-white px-10 py-4 rounded-xl font-semibold hover:bg-primary-dark transition-all duration-300 shadow-lg shadow-primary/30 disabled:opacity-50'
                            >
                                {loading ? (
                                    <>
                                        <svg className='animate-spin w-5 h-5' fill='none' viewBox='0 0 24 24'>
                                            <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4'></circle>
                                            <path className='opacity-75' fill='currentColor' d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'></path>
                                        </svg>
                                        Adding Doctor...
                                    </>
                                ) : (
                                    <>
                                        <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M12 6v6m0 0v6m0-6h6m-6 0H6'/>
                                        </svg>
                                        Add Doctor
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default AddDoctor
