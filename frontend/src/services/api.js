import axios from 'axios'

const API_BASE = '/api'

const api = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Request interceptor for auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export const apiClient = {
  auth: {
    me: () => api.get('/auth/me')
  },
  wallet: {
    balance: () => api.get('/wallet/balance'),
    history: () => api.get('/wallet/history'),
    fund: (data) => api.post('/wallet/fund', data)
  },
  orders: {
    create: (data) => api.post('/orders', data),
    list: () => api.get('/orders')
  },
  admin: {
    users: () => api.get('/admin/users'),
    orders: () => api.get('/admin/orders'),
    updateOrder: (data) => api.patch('/admin/orders', data)
  }
}

export default api
