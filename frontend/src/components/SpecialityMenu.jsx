import React from 'react'
import { specialityData } from '../assets/assets'
import { Link } from 'react-router-dom'

const SpecialityMenu = () => {
    return (
        <section id='speciality' className='py-16'>
            {/* Section Header */}
            <div className='text-center mb-12'>
                <span className='inline-block px-4 py-2 bg-primary-light text-primary rounded-full text-sm font-medium mb-4'>
                    Medical Specialties
                </span>
                <h2 className='text-3xl md:text-4xl font-bold text-gray-800'>
                    Find Your <span className='text-primary'>Specialist</span>
                </h2>
                <p className='mt-4 text-gray-600 max-w-2xl mx-auto'>
                    Browse through our wide range of medical specialties and find the right doctor 
                    for your specific health needs.
                </p>
            </div>

            {/* Speciality Cards */}
            <div className='flex justify-center gap-6 overflow-x-auto pb-4 px-4'>
                {specialityData.map((item, index) => (
                    <Link 
                        to={`/doctors/${item.speciality}`} 
                        onClick={() => scrollTo(0, 0)} 
                        className='flex flex-col items-center p-6 min-w-[140px] bg-white rounded-2xl shadow-card hover:shadow-card-hover hover:-translate-y-2 transition-all duration-300 cursor-pointer border border-gray-100 group' 
                        key={index}
                    >
                        <div className='w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-primary-light to-emerald-100 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform'>
                            <img className='w-10 sm:w-12' src={item.image} alt={item.speciality} />
                        </div>
                        <p className='text-gray-700 font-medium text-center text-sm'>{item.speciality}</p>
                    </Link>
                ))}
            </div>
        </section>
    )
}

export default SpecialityMenu