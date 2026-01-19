import axios from 'axios'
import React, { useContext, useState } from 'react'
import { DoctorContext } from '../context/DoctorContext'
import { AdminContext } from '../context/AdminContext'
import { toast } from 'react-toastify'

const Login = () => {

  const [state, setState] = useState('Admin')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const backendUrl = import.meta.env.VITE_BACKEND_URL

  const { setDToken } = useContext(DoctorContext)
  const { setAToken } = useContext(AdminContext)

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      if (state === 'Admin') {
        const { data } = await axios.post(backendUrl + '/api/admin/login', { email, password })
        if (data.success) {
          setAToken(data.token)
          localStorage.setItem('aToken', data.token)
          toast.success('Welcome back, Admin!')
        } else {
          toast.error(data.message)
        }
      } else {
        const { data } = await axios.post(backendUrl + '/api/doctor/login', { email, password })
        if (data.success) {
          setDToken(data.token)
          localStorage.setItem('dToken', data.token)
          toast.success('Welcome back, Doctor!')
        } else {
          toast.error(data.message)
        }
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed')
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-4'>
      <div className='w-full max-w-md'>
        {/* Logo & Header */}
        <div className='text-center mb-8'>
          <div className='inline-flex items-center gap-2 mb-6'>
            <div className='w-14 h-14 bg-primary rounded-2xl flex items-center justify-center shadow-lg'>
              <span className='text-white font-bold text-3xl'>M</span>
            </div>
          </div>
          <h1 className='text-3xl font-bold text-gray-800 mb-2'>
            MediBook {state} Portal
          </h1>
          <p className='text-gray-500'>
            {state === 'Admin' 
              ? 'Manage your healthcare platform' 
              : 'Access your appointments and patients'}
          </p>
        </div>

        {/* Role Toggle */}
        <div className='flex bg-gray-100 rounded-xl p-1 mb-6'>
          <button
            type='button'
            onClick={() => setState('Admin')}
            className={`flex-1 py-3 rounded-lg font-medium transition-all ${
              state === 'Admin' 
                ? 'bg-primary text-white shadow-md' 
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            👑 Admin
          </button>
          <button
            type='button'
            onClick={() => setState('Doctor')}
            className={`flex-1 py-3 rounded-lg font-medium transition-all ${
              state === 'Doctor' 
                ? 'bg-primary text-white shadow-md' 
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            👨‍⚕️ Doctor
          </button>
        </div>

        {/* Login Form */}
        <form onSubmit={onSubmitHandler} className='bg-white p-8 rounded-2xl shadow-lg'>
          <div className='space-y-5'>
            <div>
              <label className='block text-gray-700 font-medium mb-2'>Email Address</label>
              <div className='relative'>
                <span className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-400'>✉️</span>
                <input 
                  onChange={(e) => setEmail(e.target.value)} 
                  value={email} 
                  className='w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all' 
                  type="email" 
                  placeholder={state === 'Admin' ? 'admin@medibook.com' : 'doctor@medibook.com'}
                  required 
                />
              </div>
            </div>

            <div>
              <label className='block text-gray-700 font-medium mb-2'>Password</label>
              <div className='relative'>
                <span className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-400'>🔒</span>
                <input 
                  onChange={(e) => setPassword(e.target.value)} 
                  value={password} 
                  className='w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all' 
                  type="password" 
                  placeholder="••••••••"
                  required 
                />
              </div>
            </div>
          </div>

          <button 
            type='submit'
            disabled={loading}
            className='w-full bg-primary text-white py-4 rounded-xl font-semibold mt-6 hover:bg-opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2'
          >
            {loading ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Signing in...
              </>
            ) : (
              <>Sign In as {state}</>
            )}
          </button>
        </form>

        {/* Footer */}
        <p className='text-center text-gray-500 text-sm mt-6'>
          MediBook Healthcare Platform
          <br />
          <span className='text-primary'>Developed by Harsh</span>
        </p>
      </div>
    </div>
  )
}

export default Login