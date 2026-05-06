import { useEffect, useState } from 'react'
import { apiClient } from '@/services/api'
import Card from '@/components/Card'
import Alert from '@/components/Alert'
import { Link } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'

const Dashboard = () => {
  const [wallet, setWallet] = useState({ balance: 0 })
  const [history, setHistory] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const { user } = useAuth()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [balanceRes, historyRes] = await Promise.all([
          apiClient.wallet.balance(),
          apiClient.wallet.history()
        ])
        setWallet(balanceRes.data)
        setHistory(historyRes.data.slice(0, 5))
      } catch (err) {
        setError('Failed to load dashboard data')
      } finally {
        setLoading(false)
      }
    }
    
    fetchData()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading dashboard...</div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, {user?.email}</h1>
        <p className="text-gray-600">Manage your services and wallet</p>
      </div>

      {error && <Alert type="error" message={error} />}

      <div className="grid lg:grid-cols-4 gap-8 mb-12">
        <Card title="Wallet Balance" className="lg:col-span-1">
          <div className="text-3xl font-bold text-primary-600 mb-2">
            ₦{wallet.balance?.toLocaleString() || '0'}
          </div>
          <Link to="/wallet" className="text-primary-600 hover:text-primary-700 font-medium text-sm">
            Manage Wallet →
          </Link>
        </Card>

        <Card title="Quick Actions" className="lg:col-span-3">
          <div className="grid md:grid-cols-4 gap-4">
            <Link to="/airtime" className="group p-6 border-2 border-dashed border-gray-200 rounded-xl hover:border-primary-300 hover:shadow-md transition-all">
              <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">📱</div>
              <div className="font-medium text-gray-900 mb-1">Buy Airtime</div>
              <div className="text-sm text-gray-500">Instant top-up</div>
            </Link>
            <Link to="/data" className="group p-6 border-2 border-dashed border-gray-200 rounded-xl hover:border-primary-300 hover:shadow-md transition-all">
              <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">📊</div>
              <div className="font-medium text-gray-900 mb-1">Data Bundles</div>
              <div className="text-sm text-gray-500">All networks</div>
            </Link>
            <Link to="/subscription" className="group p-6 border-2 border-dashed border-gray-200 rounded-xl hover:border-primary-300 hover:shadow-md transition-all">
              <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">🔄</div>
              <div className="font-medium text-gray-900 mb-1">Subscriptions</div>
              <div className="text-sm text-gray-500">Monthly plans</div>
            </Link>
            <Link to="/social" className="group p-6 border-2 border-dashed border-gray-200 rounded-xl hover:border-primary-300 hover:shadow-md transition-all">
              <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">🚀</div>
              <div className="font-medium text-gray-900 mb-1">Social Marketing</div>
              <div className="text-sm text-gray-500">Grow your audience</div>
            </Link>
          </div>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <Card title="Recent Transactions">
          {history.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No transactions yet</p>
          ) : (
            <div className="space-y-3">
              {history.map((tx) => (
                <div key={tx._id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <div>
                    <div className="font-medium text-gray-900">{tx.description || tx.type}</div>
                    <div className="text-sm text-gray-500">{new Date(tx.createdAt).toLocaleDateString()}</div>
                  </div>
                  <div className={`font-semibold ${tx.amount > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {tx.amount > 0 ? '+' : ''}₦{Math.abs(tx.amount).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          )}
          <Link to="/wallet" className="block mt-4 text-center text-primary-600 hover:text-primary-700 font-medium">
            View Full History
          </Link>
        </Card>

        <Card title="Your Role">
          <div className="text-2xl font-bold text-gray-900 mb-4 capitalize">
            {user?.role}
          </div>
          {user?.role === 'admin' && (
            <Link to="/admin" className="btn-primary w-full text-center py-2">
              Admin Dashboard
            </Link>
          )}
        </Card>

        <Card title="Quick Stats">
          <div className="grid grid-cols-2 gap-4 text-center p-4">
            <div>
              <div className="text-2xl font-bold text-primary-600">0</div>
              <div className="text-sm text-gray-600">Total Orders</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">₦0</div>
              <div className="text-sm text-gray-600">Total Spent</div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}

export default Dashboard
