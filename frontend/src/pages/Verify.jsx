/**
 * Payment Verification Component - Stripe Payment Verification
 * Built by Harshith for MediBook Healthcare Platform
 * Features: Payment status verification, Redirect handling
 */

import React, { useContext, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const Verify = () => {

    const [searchParams] = useSearchParams()
    const success = searchParams.get('success')
    const appointmentId = searchParams.get('appointmentId')
    const { token } = useContext(AppContext)
    const backendUrl = "http://localhost:4000"
    const navigate = useNavigate()

    const verifyPayment = async () => {
        try {
            const { data } = await axios.post(
                backendUrl + '/api/user/verifyStripe',
                { success, appointmentId },
                { headers: { token } }
            )

            if (data.success) {
                toast.success('Payment verified successfully!')
            } else {
                toast.error(data.message || 'Payment verification failed')
            }
            navigate('/my-appointments')
        } catch (error) {
            console.log(error)
            toast.error(error.message)
            navigate('/my-appointments')
        }
    }

    useEffect(() => {
        if (token && appointmentId) {
            verifyPayment()
        }
    }, [token, appointmentId])

    return (
        <div className='min-h-screen flex items-center justify-center bg-gray-50'>
            <div className='bg-white rounded-3xl shadow-xl p-12 text-center max-w-md mx-4'>
                {/* Loading Animation */}
                <div className='relative mb-8'>
                    <div className='w-24 h-24 mx-auto'>
                        <div className='absolute inset-0 border-4 border-primary/20 rounded-full'></div>
                        <div className='absolute inset-0 border-4 border-primary border-t-transparent rounded-full animate-spin'></div>
                    </div>
                    <div className='absolute inset-0 flex items-center justify-center'>
                        <svg className='w-10 h-10 text-primary' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'/>
                        </svg>
                    </div>
                </div>

                {/* Text */}
                <h1 className='text-2xl font-bold text-gray-800 mb-3'>Verifying Payment</h1>
                <p className='text-gray-500 mb-6'>
                    Please wait while we verify your payment. This may take a few seconds...
                </p>

                {/* Progress Bar */}
                <div className='w-full bg-gray-100 rounded-full h-2 overflow-hidden'>
                    <div className='bg-primary h-full rounded-full animate-pulse' style={{ width: '70%' }}></div>
                </div>

                {/* Footer */}
                <p className='text-sm text-gray-400 mt-8'>
                    Do not close or refresh this page
                </p>
            </div>
        </div>
    )
}

export default Verify
