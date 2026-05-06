import React, { createContext, useContext, useReducer, useEffect } from 'react'
import axios from 'axios'

const AuthContext = createContext()

const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true
      }
    case 'LOGOUT':
      return {
        user: null,
        token: null,
        isAuthenticated: false
      }
    case 'LOAD_USER':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true
      }
    default:
      return state
  }
}

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    token: null,
    isAuthenticated: false
  })

  // Set axios defaults
  useEffect(() => {
    if (state.token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${state.token}`
    } else {
      delete axios.defaults.headers.common['Authorization']
    }
  }, [state.token])

  // Load user from localStorage
  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      console.log('🔄 Loading user with token');
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
      // Load user
      axios.get('/api/auth/me')
        .then(res => {
          console.log('✅ Loaded user:', res.data.user.email);
          dispatch({ type: 'LOAD_USER', payload: res.data.user })
        })
        .catch((error) => {
          console.error('💥 Load user failed:', error.response?.status);
          localStorage.removeItem('token')
        })
    }
  }, [])

  const login = async (email, password) => {
    console.log('🌐 Frontend LOGIN to:', '/api/auth/login', { email });
    try {
      const res = await axios.post('/api/auth/login', { email, password })
      localStorage.setItem('token', res.data.token)
      dispatch({ type: 'LOGIN_SUCCESS', payload: res.data })
      console.log('✅ Frontend LOGIN success');
      return { success: true }
    } catch (error) {
      console.error('💥 Frontend LOGIN error:', error.response?.status, error.response?.data);
      return { success: false, message: error.response?.data?.message || 'Login failed' }
    }
  }

  const register = async (email, password) => {
    console.log('🌐 Frontend REGISTER to:', '/api/auth/register', { email });
    try {
      const res = await axios.post('/api/auth/register', { email, password })
      localStorage.setItem('token', res.data.token)
      dispatch({ type: 'LOGIN_SUCCESS', payload: res.data })
      console.log('✅ Frontend REGISTER success');
      return { success: true }
    } catch (error) {
      console.error('💥 Frontend REGISTER error:', error.response?.status, error.response?.data);
      return { success: false, message: error.response?.data?.message || 'Registration failed' }
    }
  }

  const logout = () => {
    localStorage.removeItem('token')
    dispatch({ type: 'LOGOUT' })
  }

  return (
    <AuthContext.Provider value={{
      ...state,
      login,
      register,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
