/**
 * RelatedDoctors Component - Similar Doctors Suggestions
 * Built by Harshith for MediBook Healthcare Platform
 * Features: Related doctors by speciality, Quick navigation
 */

import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const RelatedDoctors = ({ speciality, docId }) => {

    const navigate = useNavigate()
    const { doctors } = useContext(AppContext)

    const [relDoc, setRelDoc] = useState([])

    useEffect(() => {
        if (doctors.length > 0 && speciality) {
            const doctorsData = doctors.filter((doc) => doc.speciality === speciality && doc._id !== docId)
            setRelDoc(doctorsData)
        }
    }, [doctors, speciality, docId])

    if (relDoc.length === 0) return null;

    return (
        <div className='bg-white rounded-3xl shadow-xl p-8'>
            {/* Section Header */}
            <div className='text-center mb-10'>
                <span className='inline-block bg-primary/10 text-primary text-sm font-medium px-4 py-2 rounded-full mb-4'>
                    Similar Specialists
                </span>
                <h2 className='text-3xl font-bold text-gray-800 mb-3'>Related Doctors</h2>
                <p className='text-gray-500 max-w-xl mx-auto'>
                    Explore other {speciality}s available for consultation
                </p>
            </div>

            {/* Doctors Grid */}
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
                {relDoc.slice(0, 4).map((item, index) => (
                    <div 
                        onClick={() => { navigate(`/appointment/${item._id}`); scrollTo(0, 0) }} 
                        key={index}
                        className='group bg-white rounded-2xl border border-gray-100 overflow-hidden cursor-pointer transition-all duration-500 hover:shadow-xl hover:-translate-y-2'
                    >
                        {/* Doctor Image */}
                        <div className='relative overflow-hidden'>
                            <img 
                                className='w-full h-48 object-cover bg-gradient-to-br from-primary/10 to-primary/5 group-hover:scale-110 transition-transform duration-500' 
                                src={item.image} 
                                alt={item.name} 
                            />
                            {/* Availability Badge */}
                            <div className='absolute top-3 right-3'>
                                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm ${
                                    item.available 
                                        ? 'bg-green-500/90 text-white' 
                                        : 'bg-gray-500/90 text-white'
                                }`}>
                                    <span className={`w-1.5 h-1.5 rounded-full ${item.available ? 'bg-white animate-pulse' : 'bg-white'}`}></span>
                                    {item.available ? 'Available' : 'Busy'}
                                </span>
                            </div>
                            {/* Gradient Overlay */}
                            <div className='absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
                        </div>

                        {/* Doctor Info */}
                        <div className='p-5'>
                            <h3 className='text-lg font-bold text-gray-800 mb-1 group-hover:text-primary transition-colors'>
                                {item.name}
                            </h3>
                            <p className='text-sm text-primary font-medium mb-3'>{item.speciality}</p>
                            
                            {/* Rating */}
                            <div className='flex items-center gap-2'>
                                <div className='flex items-center gap-0.5'>
                                    {[1,2,3,4,5].map(star => (
                                        <svg key={star} className='w-4 h-4 text-amber-400 fill-current' viewBox='0 0 20 20'>
                                            <path d='M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z'/>
                                        </svg>
                                    ))}
                                </div>
                                <span className='text-sm text-gray-500'>4.9</span>
                            </div>

                            {/* Book Button */}
                            <button className='w-full mt-4 py-2.5 bg-primary/10 text-primary rounded-xl font-medium group-hover:bg-primary group-hover:text-white transition-all duration-300 flex items-center justify-center gap-2'>
                                <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z'></path>
                                </svg>
                                Book Now
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* View All Button */}
            {relDoc.length > 4 && (
                <div className='text-center mt-10'>
                    <button 
                        onClick={() => { navigate('/doctors'); scrollTo(0, 0) }}
                        className='inline-flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-8 py-3 rounded-full font-medium transition-all duration-300'
                    >
                        View All {speciality}s
                        <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M17 8l4 4m0 0l-4 4m4-4H3'></path>
                        </svg>
                    </button>
                </div>
            )}
        </div>
    )
}

export default RelatedDoctors
