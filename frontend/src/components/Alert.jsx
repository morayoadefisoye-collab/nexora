const Alert = ({ type = 'info', message, className = '' }) => {
  const colors = {
    success: 'bg-green-100 border-green-400 text-green-700',
    error: 'bg-red-100 border-red-400 text-red-700',
    warning: 'bg-yellow-100 border-yellow-400 text-yellow-700',
    info: 'bg-blue-100 border-blue-400 text-blue-700'
  }

  if (!message) return null

  return (
    <div className={`border rounded-lg p-4 mb-6 ${colors[type]} ${className}`}>
      <div className="flex">
        <div className="flex-shrink-0">
          {type === 'success' && '✅'}
          {type === 'error' && '❌'}
          {type === 'warning' && '⚠️'}
          {type === 'info' && 'ℹ️'}
        </div>
        <div className="ml-3">
          <p className="text-sm">{message}</p>
        </div>
      </div>
    </div>
  )
}

export default Alert
