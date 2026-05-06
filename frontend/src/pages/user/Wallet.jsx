import { useEffect, useState } from 'react'
import { apiClient } from '@/services/api'
import Card from '@/components/Card'
import FormInput from '@/components/FormInput'
import Alert from '@/components/Alert'
import { useAuth } from '@/context/AuthContext'

const Wallet = () => {
  const [formData, setFormData] = useState({ amount: '', reference: '' })
  const [balance, setBalance] = useState(0)
  const [history, setHistory] = useState([])
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')
  const { wallet } = useAuth()

  useEffect(() => {
    fetchWalletData()
  }, [])

  const fetchWalletData = async () => {
    try {
      const [balanceRes, historyRes] = await Promise.all([
        apiClient.wallet.balance(),
        apiClient.wallet.history()
      ])
      setBalance(balanceRes.data.balance)
      setHistory(historyRes.data)
    } catch (err) {
      setError('Failed to load wallet data')
    }
  }

  const handleFund = async (e) => {
    e.preventDefault()
    if (parseFloat(formData.amount) < 100) {
      setError('Minimum funding amount is ₦100')
      return
    }

    setLoading(true)
    setError('')
    
    try {
      const res = await apiClient.wallet.fund({
        amount: parseFloat(formData.amount),
        reference: formData.reference || `FUND${Date.now()}`
      })
      setResult(res.data)
      setFormData({ amount: '', reference: '' })
      fetchWalletData()
    } catch (err) {
      setError(err.response?.data?.message || 'Funding failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Balance Card */}
        <Card title="Wallet Balance">
          <div className="text-center">
            <div className="text-4xl font-bold text-primary-600 mb-4">
              ₦{balance.toLocaleString()}
            </div>
            <div className="text-sm text-gray-600 mb-8">Available balance</div>
            
            <form onSubmit={handleFund} className="space-y-4">
              {result && <Alert type="success" message={result.message} />}
              {error && <Alert type="error" message={error} />}
              
              <FormInput
                label="Amount (₦)"
                type="number"
                placeholder="1000"
                min="100"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                required
              />
              
              <FormInput
                label="Reference (optional)"
                placeholder="FUND-12345"
                value={formData.reference}
                onChange={(e) => setFormData({ ...formData, reference: e.target.value })}
              />
              
              <button
                type="submit"
                disabled={loading}
                className="w-full btn-primary py-3 text-lg font-semibold disabled:opacity-50"
              >
                {loading ? 'Processing...' : 'Fund Wallet'}
              </button>
              
              <p className="text-xs text-gray-500 text-center">
                Note: Uses mock payment gateway. Replace backend/services/paymentService.js for production.
              </p>
            </form>
          </div>
        </Card>

        {/* History */}
        <Card title="Transaction History">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-2 text-sm font-semibold text-gray-900">Date</th>
                  <th className="text-left py-3 px-2 text-sm font-semibold text-gray-900">Type</th>
                  <th className="text-right py-3 px-2 text-sm font-semibold text-gray-900">Amount</th>
                </tr>
              </thead>
              <tbody>
                {history.slice(0, 10).map((tx) => (
                  <tr key={tx._id} className="border-b last:border-b-0 hover:bg-gray-50">
                    <td className="py-3 px-2 text-sm">
                      {new Date(tx.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-2 text-sm capitalize">{tx.type}</td>
                    <td className="py-3 px-2 text-sm font-medium text-right">
                      <span className={tx.amount > 0 ? 'text-green-600' : 'text-red-600'}>
                        {tx.amount > 0 ? '+' : ''}₦{Math.abs(tx.amount).toLocaleString()}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {history.length === 0 && (
            <p className="text-gray-500 text-center py-8">No transactions yet</p>
          )}
        </Card>
      </div>
    </div>
  )
}

export default Wallet
