import { Link } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'
import Card from '@/components/Card'
import Alert from '@/components/Alert'

const Home = () => {
  const { isAuthenticated } = useAuth()

  const services = [
    {
      title: 'Buy Airtime',
      description: 'Instant airtime top-up for all networks',
      icon: '📱',
      path: '/airtime'
    },
    {
      title: 'Data Bundles',
      description: 'Affordable data plans for MTN, Glo, Airtel',
      icon: '📊',
      path: '/data'
    },
    {
      title: 'Subscriptions',
      description: 'Monthly data subscriptions & more',
      icon: '🔄',
      path: '/subscription'
    },
    {
      title: 'Social Marketing',
      description: 'Grow your social media presence',
      icon: '🚀',
      path: '/social'
    }
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      {/* Hero */}
      <div className="text-center mb-20">
        <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary-600 to-primary-700 bg-clip-text text-transparent mb-6">
          NEXORA
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
          Buy airtime, data bundles, subscriptions and social media marketing services instantly.
          Manage everything from your wallet.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto">
          {!isAuthenticated ? (
            <>
              <Link
                to="/register"
                className="btn-primary py-3 px-8 text-lg font-semibold w-full sm:w-auto text-center"
              >
                Get Started
              </Link>
              <Link to="/login" className="text-lg font-medium text-primary-600 hover:text-primary-700">
                Login
              </Link>
            </>
          ) : (
            <Link
              to="/dashboard"
              className="btn-primary py-3 px-8 text-lg font-semibold w-full sm:w-auto text-center"
            >
              Go to Dashboard
            </Link>
          )}
        </div>
      </div>

      {/* Services */}
      <section>
        <h2 className="text-3xl font-bold text-center mb-16 text-gray-900">Our Services</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <div className="text-4xl mb-4">{service.icon}</div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">{service.title}</h3>
              <p className="text-gray-600 mb-6">{service.description}</p>
              <Link
                to={service.path}
                className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium group-hover:underline"
              >
                Get Started →
              </Link>
            </Card>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="mt-24">
        <div className="grid md:grid-cols-3 gap-8">
          <Card title="Wallet System">
            <p className="text-gray-600">Fund your wallet once and spend on all services securely.</p>
          </Card>
          <Card title="Instant Delivery">
            <p className="text-gray-600">Airtime and data delivered within seconds to your phone.</p>
          </Card>
          <Card title="Admin Panel">
            <p className="text-gray-600">Complete admin dashboard for order management.</p>
          </Card>
        </div>
      </section>

      <Alert type="info" className="mt-16 max-w-2xl mx-auto">
        Ready to connect real APIs? Check <code>backend/services/</code> - just replace the placeholders!
      </Alert>
    </div>
  )
}

export default Home
