import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { NavLink, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const Navbar = () => {

  const navigate = useNavigate()
  const [showMenu, setShowMenu] = useState(false)
  const { token, setToken, userData } = useContext(AppContext)

  const logout = () => {
    localStorage.removeItem('token')
    setToken(false)
    navigate('/login')
  }

  return (
    <nav className='sticky top-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm'>
      <div className='flex items-center justify-between py-4 px-4 md:px-0'>
        {/* Logo */}
        <div onClick={() => navigate('/')} className='flex items-center gap-2 cursor-pointer'>
          <div className='w-10 h-10 bg-primary rounded-xl flex items-center justify-center'>
            <span className='text-white font-bold text-xl'>M</span>
          </div>
          <span className='text-2xl font-bold text-gray-800'>Medi<span className='text-primary'>Book</span></span>
        </div>

        {/* Desktop Navigation */}
        <ul className='md:flex items-center gap-8 font-medium hidden'>
          <NavLink to='/' className={({isActive}) => `py-2 hover:text-primary transition-colors ${isActive ? 'text-primary' : 'text-gray-700'}`}>
            Home
          </NavLink>
          <NavLink to='/doctors' className={({isActive}) => `py-2 hover:text-primary transition-colors ${isActive ? 'text-primary' : 'text-gray-700'}`}>
            Doctors
          </NavLink>
          <NavLink to='/about' className={({isActive}) => `py-2 hover:text-primary transition-colors ${isActive ? 'text-primary' : 'text-gray-700'}`}>
            About
          </NavLink>
          <NavLink to='/contact' className={({isActive}) => `py-2 hover:text-primary transition-colors ${isActive ? 'text-primary' : 'text-gray-700'}`}>
            Contact
          </NavLink>
        </ul>

        {/* Right Side */}
        <div className='flex items-center gap-4'>
          {token && userData ? (
            <div className='flex items-center gap-3 cursor-pointer group relative'>
              <div className='flex items-center gap-2 px-4 py-2 rounded-full bg-gray-50 hover:bg-gray-100 transition-all'>
                <img className='w-8 h-8 rounded-full object-cover border-2 border-primary' src={userData.image} alt='Profile' />
                <span className='hidden md:block text-gray-700 font-medium'>{userData.name?.split(' ')[0]}</span>
                <img className='w-2.5' src={assets.dropdown_icon} alt='' />
              </div>
              {/* Dropdown Menu */}
              <div className='absolute top-full right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200'>
                <div className='p-4 border-b border-gray-100'>
                  <p className='font-semibold text-gray-800'>{userData.name}</p>
                  <p className='text-sm text-gray-500'>{userData.email}</p>
                </div>
                <div className='p-2'>
                  <button onClick={() => navigate('/my-profile')} className='w-full text-left px-4 py-3 rounded-lg hover:bg-gray-50 text-gray-700 flex items-center gap-3 transition-all'>
                    <span>👤</span> My Profile
                  </button>
                  <button onClick={() => navigate('/my-appointments')} className='w-full text-left px-4 py-3 rounded-lg hover:bg-gray-50 text-gray-700 flex items-center gap-3 transition-all'>
                    <span>📅</span> My Appointments
                  </button>
                  <button onClick={logout} className='w-full text-left px-4 py-3 rounded-lg hover:bg-red-50 text-red-600 flex items-center gap-3 transition-all'>
                    <span>🚪</span> Logout
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <button 
              onClick={() => navigate('/login')} 
              className='bg-primary text-white px-8 py-3 rounded-full font-medium hover:bg-primary-dark transition-all duration-300 shadow-md hover:shadow-lg hidden md:block'
            >
              Get Started
            </button>
          )}

          {/* Mobile Menu Button */}
          <button onClick={() => setShowMenu(true)} className='w-10 h-10 flex items-center justify-center rounded-lg hover:bg-gray-100 md:hidden'>
            <img className='w-6' src={assets.menu_icon} alt='Menu' />
          </button>

          {/* Mobile Menu */}
          <div className={`fixed inset-0 z-50 md:hidden ${showMenu ? 'visible' : 'invisible'}`}>
            <div className={`absolute inset-0 bg-black/50 transition-opacity ${showMenu ? 'opacity-100' : 'opacity-0'}`} onClick={() => setShowMenu(false)}></div>
            <div className={`absolute right-0 top-0 bottom-0 w-72 bg-white shadow-2xl transition-transform ${showMenu ? 'translate-x-0' : 'translate-x-full'}`}>
              <div className='flex items-center justify-between p-6 border-b border-gray-100'>
                <span className='text-xl font-bold text-gray-800'>Menu</span>
                <button onClick={() => setShowMenu(false)} className='w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100'>
                  <img src={assets.cross_icon} className='w-5' alt='Close' />
                </button>
              </div>
              <ul className='p-6 space-y-2'>
                <li>
                  <NavLink onClick={() => setShowMenu(false)} to='/' className='block px-4 py-3 rounded-xl hover:bg-primary-light text-gray-700 hover:text-primary font-medium transition-all'>Home</NavLink>
                </li>
                <li>
                  <NavLink onClick={() => setShowMenu(false)} to='/doctors' className='block px-4 py-3 rounded-xl hover:bg-primary-light text-gray-700 hover:text-primary font-medium transition-all'>Doctors</NavLink>
                </li>
                <li>
                  <NavLink onClick={() => setShowMenu(false)} to='/about' className='block px-4 py-3 rounded-xl hover:bg-primary-light text-gray-700 hover:text-primary font-medium transition-all'>About</NavLink>
                </li>
                <li>
                  <NavLink onClick={() => setShowMenu(false)} to='/contact' className='block px-4 py-3 rounded-xl hover:bg-primary-light text-gray-700 hover:text-primary font-medium transition-all'>Contact</NavLink>
                </li>
              </ul>
              {!token && (
                <div className='p-6 border-t border-gray-100'>
                  <button onClick={() => { navigate('/login'); setShowMenu(false); }} className='w-full bg-primary text-white py-3 rounded-xl font-medium'>
                    Get Started
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
