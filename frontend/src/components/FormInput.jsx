const FormInput = ({ label, name, type = 'text', value, onChange, error, ...props }) => (
  <div className="mb-6">
    <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-2">
      {label}
    </label>
    <input
      id={name}
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors ${
        error ? 'border-red-300 bg-red-50' : ''
      }`}
      {...props}
    />
    {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
  </div>
)

export default FormInput
