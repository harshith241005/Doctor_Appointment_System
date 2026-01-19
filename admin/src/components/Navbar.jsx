import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { DoctorContext } from '../context/DoctorContext'
import { AdminContext } from '../context/AdminContext'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {

  const { dToken, setDToken } = useContext(DoctorContext)
  const { aToken, setAToken } = useContext(AdminContext)

  const navigate = useNavigate()

  const logout = () => {
    navigate('/')
    dToken && setDToken('')
    dToken && localStorage.removeItem('dToken')
    aToken && setAToken('')
    aToken && localStorage.removeItem('aToken')
  }

  return (
    <nav className='flex justify-between items-center px-4 sm:px-10 py-4 border-b bg-white shadow-sm'>
      <div className='flex items-center gap-3'>
        <div onClick={() => navigate('/')} className='flex items-center gap-2 cursor-pointer'>
          <div className='w-10 h-10 bg-primary rounded-xl flex items-center justify-center'>
            <span className='text-white font-bold text-xl'>M</span>
          </div>
          <span className='text-xl font-bold text-gray-800 hidden sm:block'>Medi<span className='text-primary'>Book</span></span>
        </div>
        <span className='px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20'>
          {aToken ? '👑 Admin Panel' : '👨‍⚕️ Doctor Portal'}
        </span>
      </div>
      <div className='flex items-center gap-4'>
        <span className='text-gray-600 text-sm hidden sm:block'>
          Welcome, {aToken ? 'Administrator' : 'Doctor'}
        </span>
        <button 
          onClick={() => logout()} 
          className='bg-red-500 hover:bg-red-600 text-white text-sm px-6 py-2 rounded-lg transition-all flex items-center gap-2'
        >
          <span>🚪</span> Logout
        </button>
      </div>
    </nav>
  )
}

export default Navbar
