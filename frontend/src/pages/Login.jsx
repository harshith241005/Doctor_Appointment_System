import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [state, setState] = useState('Sign Up')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const navigate = useNavigate()
  const { token, setToken } = useContext(AppContext)
  const backendUrl = "http://localhost:4000"

  const onSubmitHandler = async (event) => {
    event.preventDefault()
    setLoading(true)

    try {
      let response
      if (state === 'Sign Up') {
        response = await axios.post(`${backendUrl}/api/user/register`, { name, email, password })
      } else {
        response = await axios.post(`${backendUrl}/api/user/login`, { email, password })
      }

      const data = response.data

      if (data.success) {
        localStorage.setItem('token', data.token)
        setToken(data.token)
        toast.success(`${state === 'Sign Up' ? 'Account created' : 'Logged in'} successfully!`)
        setTimeout(() => navigate('/'), 1000)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.error("Axios error:", error)
      toast.error(error.response?.data?.message || "Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='min-h-[85vh] flex items-center justify-center py-12'>
      <div className='w-full max-w-md'>
        {/* Logo */}
        <div className='text-center mb-8'>
          <div className='inline-flex items-center gap-2 mb-4'>
            <div className='w-12 h-12 bg-primary rounded-xl flex items-center justify-center'>
              <span className='text-white font-bold text-2xl'>M</span>
            </div>
          </div>
          <h1 className='text-3xl font-bold text-gray-800'>
            {state === 'Sign Up' ? 'Create Account' : 'Welcome Back'}
          </h1>
          <p className='text-gray-500 mt-2'>
            {state === 'Sign Up' 
              ? 'Join MediBook to book appointments with top doctors' 
              : 'Sign in to continue to your account'}
          </p>
        </div>

        {/* Form Card */}
        <form onSubmit={onSubmitHandler} className='bg-white p-8 rounded-2xl shadow-card'>
          <div className='space-y-5'>
            {state === 'Sign Up' && (
              <div>
                <label className='block text-gray-700 font-medium mb-2'>Full Name</label>
                <div className='relative'>
                  <span className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-400'>👤</span>
                  <input
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    className='w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all'
                    type="text"
                    placeholder="John Doe"
                    required
                  />
                </div>
              </div>
            )}

            <div>
              <label className='block text-gray-700 font-medium mb-2'>Email Address</label>
              <div className='relative'>
                <span className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-400'>✉️</span>
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  className='w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all'
                  type="email"
                  placeholder="you@example.com"
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
                  className='w-full pl-12 pr-12 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all'
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  required
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className='absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600'
                >
                  {showPassword ? '👁️' : '👁️‍🗨️'}
                </button>
              </div>
              {state === 'Sign Up' && (
                <p className='text-xs text-gray-500 mt-2'>Must be at least 8 characters</p>
              )}
            </div>
          </div>

          <button
            type="submit"
            className='w-full bg-primary text-white py-4 rounded-xl font-semibold mt-6 hover:bg-primary-dark transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2'
            disabled={loading}
          >
            {loading ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </>
            ) : (
              state === 'Sign Up' ? 'Create Account' : 'Sign In'
            )}
          </button>

          {/* Divider */}
          <div className='flex items-center my-6'>
            <div className='flex-1 border-t border-gray-200'></div>
            <span className='px-4 text-gray-500 text-sm'>or</span>
            <div className='flex-1 border-t border-gray-200'></div>
          </div>

          {/* Toggle State */}
          <p className='text-center text-gray-600'>
            {state === 'Sign Up' ? (
              <>
                Already have an account?{' '}
                <button 
                  type="button"
                  onClick={() => setState('Login')} 
                  className='text-primary font-semibold hover:underline'
                >
                  Sign In
                </button>
              </>
            ) : (
              <>
                Don't have an account?{' '}
                <button 
                  type="button"
                  onClick={() => setState('Sign Up')} 
                  className='text-primary font-semibold hover:underline'
                >
                  Sign Up
                </button>
              </>
            )}
          </p>
        </form>

        {/* Footer Text */}
        <p className='text-center text-gray-500 text-sm mt-6'>
          By continuing, you agree to MediBook's{' '}
          <a href='#' className='text-primary hover:underline'>Terms of Service</a>
          {' '}and{' '}
          <a href='#' className='text-primary hover:underline'>Privacy Policy</a>
        </p>
      </div>
    </div>
  )
}

export default Login
