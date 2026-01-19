/**
 * Appointment Booking Component - Doctor Appointment Scheduler
 * Built by Harshith for MediBook Healthcare Platform
 * Features: Doctor details, Slot selection, Booking confirmation
 */

import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { assets } from '../assets/assets'
import RelatedDoctors from '../components/RelatedDoctors'
import axios from 'axios'
import { toast } from 'react-toastify'

const Appointment = () => {

    const { docId } = useParams()
    const { doctors, currencySymbol, token, getDoctosData } = useContext(AppContext)
    const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']
    const backendUrl = "http://localhost:4000"
    const [docInfo, setDocInfo] = useState(false)
    const [docSlots, setDocSlots] = useState([])
    const [slotIndex, setSlotIndex] = useState(0)
    const [slotTime, setSlotTime] = useState('')
    const [booking, setBooking] = useState(false)

    const navigate = useNavigate()

    const fetchDocInfo = async () => {
        const docInfo = doctors.find((doc) => doc._id === docId)
        setDocInfo(docInfo)
    }

    const getAvailableSolts = async () => {
        setDocSlots([])
        let today = new Date()

        for (let i = 0; i < 7; i++) {
            let currentDate = new Date(today)
            currentDate.setDate(today.getDate() + i)

            let endTime = new Date()
            endTime.setDate(today.getDate() + i)
            endTime.setHours(21, 0, 0, 0)

            if (today.getDate() === currentDate.getDate()) {
                currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10)
                currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0)
            } else {
                currentDate.setHours(10)
                currentDate.setMinutes(0)
            }

            let timeSlots = [];

            while (currentDate < endTime) {
                let formattedTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

                let day = currentDate.getDate()
                let month = currentDate.getMonth() + 1
                let year = currentDate.getFullYear()

                const slotDate = day + "_" + month + "_" + year
                const slotTime = formattedTime

                const isSlotAvailable = docInfo.slots_booked[slotDate] && docInfo.slots_booked[slotDate].includes(slotTime) ? false : true

                if (isSlotAvailable) {
                    timeSlots.push({
                        datetime: new Date(currentDate),
                        time: formattedTime
                    })
                }

                currentDate.setMinutes(currentDate.getMinutes() + 30);
            }

            setDocSlots(prev => ([...prev, timeSlots]))
        }
    }

    const bookAppointment = async () => {
        if (!token) {
            toast.warning('Login to book appointment')
            return navigate('/login')
        }

        setBooking(true)
        const date = docSlots[slotIndex][0].datetime

        let day = date.getDate()
        let month = date.getMonth() + 1
        let year = date.getFullYear()

        const slotDate = day + "_" + month + "_" + year

        try {
            const { data } = await axios.post(backendUrl + '/api/user/book-appointment', { docId, slotDate, slotTime }, { headers: { token } })
            if (data.success) {
                toast.success(data.message)
                getDoctosData()
                navigate('/my-appointments')
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        } finally {
            setBooking(false)
        }
    }

    useEffect(() => {
        if (doctors.length > 0) {
            fetchDocInfo()
        }
    }, [doctors, docId])

    useEffect(() => {
        if (docInfo) {
            getAvailableSolts()
        }
    }, [docInfo])

    return docInfo ? (
        <div className='min-h-screen py-8'>
            <div className='max-w-6xl mx-auto px-4'>
                
                {/* Doctor Profile Section */}
                <div className='bg-white rounded-3xl shadow-xl overflow-hidden mb-8'>
                    <div className='md:flex'>
                        <div className='md:w-1/3'>
                            <div className='relative h-full'>
                                <img 
                                    className='w-full h-full object-cover min-h-[300px] bg-gradient-to-br from-primary to-primary-dark' 
                                    src={docInfo.image} 
                                    alt={docInfo.name} 
                                />
                                <div className='absolute top-4 left-4'>
                                    <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium ${
                                        docInfo.available 
                                            ? 'bg-green-500 text-white' 
                                            : 'bg-red-500 text-white'
                                    }`}>
                                        <span className='w-2 h-2 rounded-full bg-white'></span>
                                        {docInfo.available ? 'Available' : 'Not Available'}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className='md:w-2/3 p-8'>
                            <div className='flex items-start justify-between mb-4'>
                                <div>
                                    <h1 className='text-3xl font-bold text-gray-800 flex items-center gap-3'>
                                        {docInfo.name}
                                        <img className='w-6 h-6' src={assets.verified_icon} alt="Verified" />
                                    </h1>
                                    <div className='flex flex-wrap items-center gap-3 mt-2'>
                                        <span className='text-primary font-medium'>{docInfo.degree}</span>
                                        <span className='text-gray-300'>•</span>
                                        <span className='text-gray-600'>{docInfo.speciality}</span>
                                        <span className='bg-primary/10 text-primary text-sm px-3 py-1 rounded-full font-medium'>
                                            {docInfo.experience}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className='grid grid-cols-3 gap-4 py-6 border-y border-gray-100 my-6'>
                                <div className='text-center'>
                                    <div className='flex items-center justify-center gap-1 text-amber-500 mb-1'>
                                        {[1,2,3,4,5].map(star => (
                                            <svg key={star} className='w-5 h-5 fill-current' viewBox='0 0 20 20'>
                                                <path d='M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z'/>
                                            </svg>
                                        ))}
                                    </div>
                                    <p className='text-sm text-gray-500'>4.9 Rating</p>
                                </div>
                                <div className='text-center border-x border-gray-100'>
                                    <p className='text-2xl font-bold text-gray-800'>500+</p>
                                    <p className='text-sm text-gray-500'>Patients</p>
                                </div>
                                <div className='text-center'>
                                    <p className='text-2xl font-bold text-gray-800'>{docInfo.experience}</p>
                                    <p className='text-sm text-gray-500'>Experience</p>
                                </div>
                            </div>

                            <div className='mb-6'>
                                <h3 className='flex items-center gap-2 text-lg font-semibold text-gray-800 mb-3'>
                                    <svg className='w-5 h-5 text-primary' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'></path>
                                    </svg>
                                    About Doctor
                                </h3>
                                <p className='text-gray-600 leading-relaxed'>{docInfo.about}</p>
                            </div>

                            <div className='bg-gradient-to-r from-primary/5 to-primary/10 rounded-2xl p-6'>
                                <div className='flex items-center justify-between'>
                                    <div>
                                        <p className='text-sm text-gray-500 mb-1'>Consultation Fee</p>
                                        <p className='text-3xl font-bold text-primary'>{currencySymbol}{docInfo.fees}</p>
                                    </div>
                                    <div className='text-right'>
                                        <p className='text-sm text-gray-500'>Duration</p>
                                        <p className='text-lg font-semibold text-gray-800'>30 mins</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Booking Section */}
                <div className='bg-white rounded-3xl shadow-xl p-8 mb-8'>
                    <h2 className='text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3'>
                        <div className='w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center'>
                            <svg className='w-5 h-5 text-primary' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z'></path>
                            </svg>
                        </div>
                        Select Appointment Date
                    </h2>

                    <div className='flex gap-4 overflow-x-auto pb-4 scrollbar-hide'>
                        {docSlots.length > 0 && docSlots.map((item, index) => (
                            <button 
                                onClick={() => setSlotIndex(index)} 
                                key={index} 
                                className={`flex-shrink-0 min-w-[90px] py-6 px-4 rounded-2xl text-center transition-all duration-300 ${
                                    slotIndex === index 
                                        ? 'bg-primary text-white shadow-lg shadow-primary/30 scale-105' 
                                        : 'bg-gray-50 hover:bg-gray-100 text-gray-700 border-2 border-gray-100'
                                }`}
                            >
                                <p className='text-sm font-medium mb-1'>{item[0] && daysOfWeek[item[0].datetime.getDay()]}</p>
                                <p className='text-2xl font-bold'>{item[0] && item[0].datetime.getDate()}</p>
                            </button>
                        ))}
                    </div>

                    <div className='mt-8'>
                        <h3 className='text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2'>
                            <svg className='w-5 h-5 text-primary' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'></path>
                            </svg>
                            Available Time Slots
                        </h3>
                        <div className='flex flex-wrap gap-3'>
                            {docSlots.length > 0 && docSlots[slotIndex].map((item, index) => (
                                <button 
                                    onClick={() => setSlotTime(item.time)} 
                                    key={index} 
                                    className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                                        item.time === slotTime 
                                            ? 'bg-primary text-white shadow-lg shadow-primary/30' 
                                            : 'bg-gray-50 hover:bg-gray-100 text-gray-600 border-2 border-gray-100'
                                    }`}
                                >
                                    {item.time.toLowerCase()}
                                </button>
                            ))}
                        </div>

                        {docSlots.length > 0 && docSlots[slotIndex].length === 0 && (
                            <div className='text-center py-8'>
                                <div className='w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4'>
                                    <svg className='w-8 h-8 text-gray-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'></path>
                                    </svg>
                                </div>
                                <p className='text-gray-500'>No slots available for this date</p>
                            </div>
                        )}
                    </div>

                    <div className='mt-8 flex flex-wrap items-center gap-4'>
                        <button 
                            onClick={bookAppointment}
                            disabled={!slotTime || booking}
                            className={`flex items-center gap-3 px-10 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 ${
                                slotTime && !booking
                                    ? 'bg-primary text-white shadow-xl shadow-primary/30 hover:bg-primary-dark hover:scale-105' 
                                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                            }`}
                        >
                            {booking ? (
                                <>
                                    <svg className='animate-spin w-6 h-6' fill='none' viewBox='0 0 24 24'>
                                        <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4'></circle>
                                        <path className='opacity-75' fill='currentColor' d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'></path>
                                    </svg>
                                    Booking...
                                </>
                            ) : (
                                <>
                                    <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z'></path>
                                    </svg>
                                    Book Appointment
                                </>
                            )}
                        </button>

                        {slotTime && (
                            <div className='text-gray-600'>
                                <span className='font-medium'>Selected:</span> {slotTime} on {docSlots[slotIndex][0] && daysOfWeek[docSlots[slotIndex][0].datetime.getDay()]}, {docSlots[slotIndex][0] && docSlots[slotIndex][0].datetime.getDate()}
                            </div>
                        )}
                    </div>
                </div>

                <RelatedDoctors speciality={docInfo.speciality} docId={docId} />
            </div>
        </div>
    ) : (
        <div className='min-h-screen flex items-center justify-center'>
            <div className='text-center'>
                <div className='w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4'></div>
                <p className='text-gray-500'>Loading doctor information...</p>
            </div>
        </div>
    )
}

export default Appointment
