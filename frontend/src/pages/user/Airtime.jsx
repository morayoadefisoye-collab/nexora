import { useState } from 'react'
import { useAuth } from '@/context/AuthContext'
import { apiClient } from '@/services/api'
import Card from '@/components/Card'
import FormInput from '@/components/FormInput'
import Alert from '@/components/Alert'
import Modal from '@/components/Modal'

const Airtime = () => {
  const [formData, setFormData] = useState({
    phoneNumber: '',
    network: 'MTN',
    amount: ''
  })
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')
  const [showSuccess, setShowSuccess] = useState(false)
  const { wallet } = useAuth()

  const networks = ['MTN', 'GLO', 'AIRTEL', '9MOBILE']

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setResult(null)

    if (parseFloat(formData.amount) > wallet.balance) {
      setError('Insufficient wallet balance')
      setLoading(false)
      return
    }

    try {
      const res = await apiClient.orders.create({
        serviceType: 'airtime',
        phoneNumber: formData.phoneNumber,
        network: formData.network,
        amount: parseFloat(formData.amount)
      })
      
      setResult(res.data)
      setShowSuccess(true)
    } catch (err) {
      setError(err.response?.data?.message || 'Purchase failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <Card title="Buy Airtime">
        <div className="mb-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Wallet Balance</h3>
          <div className="text-2xl font-bold text-primary-600">
            ₦{wallet?.balance?.toLocaleString() || '0'}
          </div>
        </div>

        {error && <Alert type="error" message={error} />}

        <form onSubmit={handleSubmit} className="space-y-6">
          <FormInput
            label="Phone Number"
            name="phoneNumber"
            type="tel"
            placeholder="08012345678"
            value={formData.phoneNumber}
            onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
            required
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Network</label>
            <select
              value={formData.network}
              onChange={(e) => setFormData({ ...formData, network: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              required
            >
              {networks.map((network) => (
                <option key={network} value={network}>{network}</option>
              ))}
            </select>
          </div>

          <FormInput
            label="Amount (₦)"
            name="amount"
            type="number"
            placeholder="200"
            min="50"
            step="50"
            value={formData.amount}
            onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full btn-primary py-3 text-lg font-semibold disabled:opacity-50"
          >
            {loading ? 'Processing...' : 'Buy Airtime'}
          </button>
        </form>
      </Card>

      <Modal isOpen={showSuccess} onClose={() => setShowSuccess(false)} title="Success!">
        {result && (
          <div className="space-y-4">
            <Alert type="success" message={result.message} />
            <div className="text-sm text-gray-600">
              <p><strong>Reference:</strong> {result.order.reference}</p>
              <p><strong>New Balance:</strong> ₦{result.balance.toLocaleString()}</p>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}

export default Airtime
