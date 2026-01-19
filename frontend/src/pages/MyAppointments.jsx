/**
 * MyAppointments Component - User Appointment Management
 * Built by Harshith for MediBook Healthcare Platform
 * Features: View appointments, Payment integration, Cancel appointments
 */

import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { assets } from '../assets/assets'

const MyAppointments = () => {

    const { token } = useContext(AppContext)
    const navigate = useNavigate()
    const backendUrl = "http://localhost:4000"
    const [appointments, setAppointments] = useState([])
    const [payment, setPayment] = useState('')
    const [loading, setLoading] = useState(true)
    const [filter, setFilter] = useState('all')

    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    const slotDateFormat = (slotDate) => {
        const dateArray = slotDate.split('_')
        return dateArray[0] + " " + months[Number(dateArray[1])] + " " + dateArray[2]
    }

    const getUserAppointments = async () => {
        try {
            setLoading(true)
            const { data } = await axios.get(backendUrl + '/api/user/appointments', { headers: { token } })
            setAppointments(data.appointments.reverse())
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        } finally {
            setLoading(false)
        }
    }

    const cancelAppointment = async (appointmentId) => {
        try {
            const { data } = await axios.post(backendUrl + '/api/user/cancel-appointment', { appointmentId }, { headers: { token } })

            if (data.success) {
                toast.success(data.message)
                getUserAppointments()
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    const initPay = (order) => {
        const options = {
            key: import.meta.env.VITE_RAZORPAY_KEY_ID,
            amount: order.amount,
            currency: order.currency,
            name: 'MediBook Payment',
            description: "Appointment Payment",
            order_id: order.id,
            receipt: order.receipt,
            handler: async (response) => {
                try {
                    const { data } = await axios.post(backendUrl + "/api/user/verifyRazorpay", response, { headers: { token } });
                    if (data.success) {
                        navigate('/my-appointments')
                        getUserAppointments()
                    }
                } catch (error) {
                    console.log(error)
                    toast.error(error.message)
                }
            }
        };
        const rzp = new window.Razorpay(options);
        rzp.open();
    };

    const appointmentRazorpay = async (appointmentId) => {
        try {
            const { data } = await axios.post(backendUrl + '/api/user/payment-razorpay', { appointmentId }, { headers: { token } })
            if (data.success) {
                initPay(data.order)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    const appointmentStripe = async (appointmentId) => {
        try {
            const { data } = await axios.post(backendUrl + '/api/user/payment-stripe', { appointmentId }, { headers: { token } })
            if (data.success) {
                const { session_url } = data
                window.location.replace(session_url)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    const filteredAppointments = appointments.filter(item => {
        if (filter === 'all') return true
        if (filter === 'upcoming') return !item.cancelled && !item.isCompleted
        if (filter === 'completed') return item.isCompleted
        if (filter === 'cancelled') return item.cancelled
        return true
    })

    const getCounts = () => {
        return {
            all: appointments.length,
            upcoming: appointments.filter(a => !a.cancelled && !a.isCompleted).length,
            completed: appointments.filter(a => a.isCompleted).length,
            cancelled: appointments.filter(a => a.cancelled).length
        }
    }

    useEffect(() => {
        if (token) {
            getUserAppointments()
        }
    }, [token])

    const counts = getCounts()

    return (
        <div className='min-h-screen py-8'>
            <div className='max-w-6xl mx-auto px-4'>
                {/* Page Header */}
                <div className='bg-gradient-to-r from-primary to-primary-dark rounded-2xl p-8 mb-8'>
                    <h1 className='text-3xl font-bold text-white mb-2'>My Appointments</h1>
                    <p className='text-emerald-100'>Manage and track all your medical appointments</p>
                </div>

                {/* Filter Tabs */}
                <div className='bg-white rounded-xl shadow-md p-2 mb-6 flex flex-wrap gap-2'>
                    {[
                        { key: 'all', label: 'All', count: counts.all },
                        { key: 'upcoming', label: 'Upcoming', count: counts.upcoming },
                        { key: 'completed', label: 'Completed', count: counts.completed },
                        { key: 'cancelled', label: 'Cancelled', count: counts.cancelled }
                    ].map(tab => (
                        <button
                            key={tab.key}
                            onClick={() => setFilter(tab.key)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                                filter === tab.key 
                                    ? 'bg-primary text-white shadow-md' 
                                    : 'text-gray-600 hover:bg-gray-100'
                            }`}
                        >
                            {tab.label}
                            <span className={`text-xs px-2 py-0.5 rounded-full ${
                                filter === tab.key ? 'bg-white/20 text-white' : 'bg-gray-200 text-gray-600'
                            }`}>
                                {tab.count}
                            </span>
                        </button>
                    ))}
                </div>

                {/* Loading State */}
                {loading ? (
                    <div className='flex flex-col items-center justify-center py-20'>
                        <div className='w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4'></div>
                        <p className='text-gray-500'>Loading appointments...</p>
                    </div>
                ) : filteredAppointments.length === 0 ? (
                    <div className='bg-white rounded-2xl shadow-lg p-12 text-center'>
                        <div className='w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6'>
                            <svg className='w-12 h-12 text-gray-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z'></path>
                            </svg>
                        </div>
                        <h3 className='text-xl font-semibold text-gray-800 mb-2'>No Appointments Found</h3>
                        <p className='text-gray-500 mb-6'>
                            {filter === 'all' 
                                ? "You haven't booked any appointments yet." 
                                : `No ${filter} appointments found.`}
                        </p>
                        <button 
                            onClick={() => navigate('/doctors')}
                            className='bg-primary text-white px-8 py-3 rounded-full hover:bg-primary-dark transition-all duration-300 shadow-lg'
                        >
                            Book an Appointment
                        </button>
                    </div>
                ) : (
                    <div className='space-y-4'>
                        {filteredAppointments.map((item, index) => (
                            <div 
                                key={index} 
                                className={`bg-white rounded-2xl shadow-md overflow-hidden border-l-4 transition-all duration-300 hover:shadow-lg ${
                                    item.cancelled 
                                        ? 'border-red-500' 
                                        : item.isCompleted 
                                            ? 'border-green-500' 
                                            : 'border-primary'
                                }`}
                            >
                                <div className='p-6'>
                                    <div className='flex flex-col lg:flex-row gap-6'>
                                        <div className='flex-shrink-0'>
                                            <img 
                                                className='w-32 h-32 rounded-2xl object-cover bg-gradient-to-br from-primary/20 to-primary/5' 
                                                src={item.docData.image} 
                                                alt={item.docData.name} 
                                            />
                                        </div>

                                        <div className='flex-1'>
                                            <div className='flex flex-wrap items-start justify-between gap-4'>
                                                <div>
                                                    <h3 className='text-xl font-bold text-gray-800'>{item.docData.name}</h3>
                                                    <p className='text-primary font-medium'>{item.docData.speciality}</p>
                                                </div>
                                                
                                                <div>
                                                    {item.cancelled ? (
                                                        <span className='inline-flex items-center gap-1 px-4 py-2 bg-red-100 text-red-600 rounded-full text-sm font-medium'>
                                                            <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M6 18L18 6M6 6l12 12'></path>
                                                            </svg>
                                                            Cancelled
                                                        </span>
                                                    ) : item.isCompleted ? (
                                                        <span className='inline-flex items-center gap-1 px-4 py-2 bg-green-100 text-green-600 rounded-full text-sm font-medium'>
                                                            <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M5 13l4 4L19 7'></path>
                                                            </svg>
                                                            Completed
                                                        </span>
                                                    ) : item.payment ? (
                                                        <span className='inline-flex items-center gap-1 px-4 py-2 bg-emerald-100 text-emerald-600 rounded-full text-sm font-medium'>
                                                            <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'></path>
                                                            </svg>
                                                            Paid
                                                        </span>
                                                    ) : (
                                                        <span className='inline-flex items-center gap-1 px-4 py-2 bg-amber-100 text-amber-600 rounded-full text-sm font-medium'>
                                                            <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'></path>
                                                            </svg>
                                                            Pending
                                                        </span>
                                                    )}
                                                </div>
                                            </div>

                                            <div className='mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4'>
                                                <div className='flex items-center gap-3 text-gray-600'>
                                                    <div className='w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center'>
                                                        <svg className='w-5 h-5 text-gray-500' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z'></path>
                                                        </svg>
                                                    </div>
                                                    <div>
                                                        <p className='text-xs text-gray-400'>Date & Time</p>
                                                        <p className='font-medium'>{slotDateFormat(item.slotDate)} | {item.slotTime}</p>
                                                    </div>
                                                </div>

                                                <div className='flex items-center gap-3 text-gray-600'>
                                                    <div className='w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center'>
                                                        <svg className='w-5 h-5 text-gray-500' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z'></path>
                                                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M15 11a3 3 0 11-6 0 3 3 0 016 0z'></path>
                                                        </svg>
                                                    </div>
                                                    <div>
                                                        <p className='text-xs text-gray-400'>Location</p>
                                                        <p className='font-medium text-sm'>{item.docData.address.line1}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className='flex flex-col gap-2 min-w-[160px]'>
                                            {!item.cancelled && !item.payment && !item.isCompleted && payment !== item._id && (
                                                <button 
                                                    onClick={() => setPayment(item._id)} 
                                                    className='w-full py-2.5 px-4 bg-primary text-white rounded-xl font-medium hover:bg-primary-dark transition-all duration-300 flex items-center justify-center gap-2'
                                                >
                                                    <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z'></path>
                                                    </svg>
                                                    Pay Now
                                                </button>
                                            )}

                                            {!item.cancelled && !item.payment && !item.isCompleted && payment === item._id && (
                                                <>
                                                    <button 
                                                        onClick={() => appointmentStripe(item._id)} 
                                                        className='w-full py-2.5 px-4 border-2 border-gray-200 rounded-xl font-medium hover:bg-gray-50 transition-all duration-300 flex items-center justify-center'
                                                    >
                                                        <img className='h-5' src={assets.stripe_logo} alt="Stripe" />
                                                    </button>
                                                    <button 
                                                        onClick={() => appointmentRazorpay(item._id)} 
                                                        className='w-full py-2.5 px-4 border-2 border-gray-200 rounded-xl font-medium hover:bg-gray-50 transition-all duration-300 flex items-center justify-center'
                                                    >
                                                        <img className='h-5' src={assets.razorpay_logo} alt="Razorpay" />
                                                    </button>
                                                </>
                                            )}

                                            {!item.cancelled && !item.isCompleted && (
                                                <button 
                                                    onClick={() => cancelAppointment(item._id)} 
                                                    className='w-full py-2.5 px-4 border-2 border-red-200 text-red-500 rounded-xl font-medium hover:bg-red-50 hover:border-red-300 transition-all duration-300 flex items-center justify-center gap-2'
                                                >
                                                    <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M6 18L18 6M6 6l12 12'></path>
                                                    </svg>
                                                    Cancel
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Help Section */}
                <div className='mt-12 bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-8'>
                    <h3 className='text-xl font-bold text-gray-800 mb-4'>Need Help?</h3>
                    <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                        <div className='flex items-start gap-4'>
                            <div className='w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0'>
                                <svg className='w-5 h-5 text-primary' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z'></path>
                                </svg>
                            </div>
                            <div>
                                <h4 className='font-semibold text-gray-800'>Call Support</h4>
                                <p className='text-sm text-gray-500'>+91 98765 43210</p>
                            </div>
                        </div>
                        <div className='flex items-start gap-4'>
                            <div className='w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0'>
                                <svg className='w-5 h-5 text-primary' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'></path>
                                </svg>
                            </div>
                            <div>
                                <h4 className='font-semibold text-gray-800'>Email Us</h4>
                                <p className='text-sm text-gray-500'>support@medibook.com</p>
                            </div>
                        </div>
                        <div className='flex items-start gap-4'>
                            <div className='w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0'>
                                <svg className='w-5 h-5 text-primary' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'></path>
                                </svg>
                            </div>
                            <div>
                                <h4 className='font-semibold text-gray-800'>FAQ</h4>
                                <p className='text-sm text-gray-500'>Check common questions</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MyAppointments
