const Card = ({ children, className = '', title }) => (
  <div className={`card ${className}`}>
    {title && (
      <h3 className="text-xl font-semibold text-gray-900 mb-6 border-b pb-4">
        {title}
      </h3>
    )}
    {children}
  </div>
)

export default Card
