import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const TopDoctors = () => {

    const navigate = useNavigate()
    const { doctors } = useContext(AppContext)

    return (
        <section className='py-16 md:mx-10'>
            {/* Section Header */}
            <div className='text-center mb-12'>
                <span className='inline-block px-4 py-2 bg-primary-light text-primary rounded-full text-sm font-medium mb-4'>
                    Our Medical Experts
                </span>
                <h2 className='text-3xl md:text-4xl font-bold text-gray-800'>
                    Meet Our <span className='text-primary'>Top Doctors</span>
                </h2>
                <p className='mt-4 text-gray-600 max-w-2xl mx-auto'>
                    Choose from our highly qualified and experienced medical professionals 
                    who are dedicated to providing you the best healthcare.
                </p>
            </div>

            {/* Doctors Grid */}
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6'>
                {doctors.slice(0, 10).map((item, index) => (
                    <div 
                        onClick={() => { navigate(`/appointment/${item._id}`); scrollTo(0, 0) }} 
                        className='bg-white border border-gray-100 rounded-2xl overflow-hidden cursor-pointer shadow-card hover:shadow-card-hover hover:-translate-y-2 transition-all duration-300' 
                        key={index}
                    >
                        <div className='relative'>
                            <img className='w-full h-48 object-cover bg-gradient-to-br from-primary-light to-emerald-100' src={item.image} alt={item.name} />
                            <span className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-medium ${item.available ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-500'}`}>
                                {item.available ? '• Available' : '• Busy'}
                            </span>
                        </div>
                        <div className='p-4'>
                            <h3 className='text-gray-800 text-lg font-semibold'>{item.name}</h3>
                            <p className='text-primary text-sm font-medium'>{item.speciality}</p>
                            <div className='flex items-center gap-1 mt-2'>
                                <span className='text-yellow-400'>★★★★★</span>
                                <span className='text-gray-500 text-xs'>(4.9)</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* View All Button */}
            <div className='text-center mt-12'>
                <button 
                    onClick={() => { navigate('/doctors'); scrollTo(0, 0) }} 
                    className='bg-primary text-white px-10 py-4 rounded-full font-medium hover:bg-primary-dark transition-all duration-300 shadow-lg hover:shadow-xl'
                >
                    View All Doctors →
                </button>
            </div>
        </section>
    )
}

export default TopDoctors