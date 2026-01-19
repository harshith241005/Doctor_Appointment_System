import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { useNavigate, useParams } from 'react-router-dom'

const Doctors = () => {

  const { speciality } = useParams()
  
  const [filterDoc, setFilterDoc] = useState([])
  const [showFilter, setShowFilter] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const navigate = useNavigate();

  const { doctors } = useContext(AppContext)

  const specialties = [
    'General physician',
    'Gynecologist',
    'Dermatologist',
    'Pediatricians',
    'Neurologist',
    'Gastroenterologist'
  ]

  const applyFilter = () => {
    let filtered = doctors
    
    if (speciality) {
      filtered = filtered.filter(doc => doc.speciality === speciality)
    }
    
    if (searchQuery) {
      filtered = filtered.filter(doc => 
        doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.speciality.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }
    
    setFilterDoc(filtered)
  }

  useEffect(() => {
    applyFilter()
  }, [doctors, speciality, searchQuery])

  return (
    <div className='py-8'>
      {/* Header Section */}
      <div className='mb-8'>
        <h1 className='text-3xl font-bold text-gray-800 mb-2'>Find Your Doctor</h1>
        <p className='text-gray-600'>Browse through our network of qualified healthcare professionals</p>
      </div>

      {/* Search Bar */}
      <div className='mb-8'>
        <div className='relative max-w-md'>
          <input
            type='text'
            placeholder='Search doctors by name or specialty...'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className='w-full px-5 py-4 pl-12 border border-gray-200 rounded-2xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all'
          />
          <span className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-400'>🔍</span>
        </div>
      </div>

      <div className='flex flex-col lg:flex-row gap-8'>
        {/* Filter Sidebar */}
        <div className='lg:w-64 flex-shrink-0'>
          <button 
            onClick={() => setShowFilter(!showFilter)} 
            className={`lg:hidden w-full py-3 px-4 rounded-xl border flex items-center justify-center gap-2 mb-4 transition-all ${showFilter ? 'bg-primary text-white border-primary' : 'bg-white border-gray-200'}`}
          >
            <span>⚙️</span> Filters {showFilter ? '(Hide)' : '(Show)'}
          </button>
          
          <div className={`bg-white rounded-2xl p-6 shadow-card ${showFilter ? 'block' : 'hidden lg:block'}`}>
            <h3 className='font-semibold text-gray-800 mb-4'>Specialties</h3>
            <div className='space-y-2'>
              <button
                onClick={() => navigate('/doctors')}
                className={`w-full text-left px-4 py-3 rounded-xl transition-all ${!speciality ? 'bg-primary text-white' : 'hover:bg-gray-50 text-gray-700'}`}
              >
                All Doctors
              </button>
              {specialties.map((spec, idx) => (
                <button
                  key={idx}
                  onClick={() => speciality === spec ? navigate('/doctors') : navigate(`/doctors/${spec}`)}
                  className={`w-full text-left px-4 py-3 rounded-xl transition-all ${speciality === spec ? 'bg-primary text-white' : 'hover:bg-gray-50 text-gray-700'}`}
                >
                  {spec}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Doctors Grid */}
        <div className='flex-1'>
          {filterDoc.length === 0 ? (
            <div className='text-center py-16'>
              <span className='text-6xl mb-4 block'>🔍</span>
              <h3 className='text-xl font-semibold text-gray-800 mb-2'>No doctors found</h3>
              <p className='text-gray-600'>Try adjusting your search or filter criteria</p>
            </div>
          ) : (
            <>
              <p className='text-gray-600 mb-4'>{filterDoc.length} doctor(s) found</p>
              <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
                {filterDoc.map((item, index) => (
                  <div 
                    onClick={() => { navigate(`/appointment/${item._id}`); scrollTo(0, 0) }} 
                    className='bg-white rounded-2xl overflow-hidden cursor-pointer shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 border border-gray-100' 
                    key={index}
                  >
                    <div className='relative'>
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-56 object-cover bg-gradient-to-br from-primary-light to-emerald-100"
                      />
                      <span className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-medium ${item.available ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-500'}`}>
                        {item.available ? '● Available' : '● Busy'}
                      </span>
                    </div>
                    <div className='p-5'>
                      <h3 className='text-gray-800 text-lg font-semibold mb-1'>{item.name}</h3>
                      <p className='text-primary font-medium text-sm mb-2'>{item.speciality}</p>
                      <div className='flex items-center justify-between'>
                        <div className='flex items-center gap-1'>
                          <span className='text-yellow-400 text-sm'>★★★★★</span>
                          <span className='text-gray-500 text-xs'>(4.9)</span>
                        </div>
                        <button className='text-primary text-sm font-medium hover:underline'>
                          Book Now →
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default Doctors