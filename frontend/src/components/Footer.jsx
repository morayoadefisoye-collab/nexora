const Footer = () => (
  <footer className="bg-gray-900 text-white mt-auto">
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="col-span-1 md:col-span-2">
          <h3 className="text-xl font-bold mb-4 text-primary-400">NEXORA</h3>
          <p className="text-gray-400 mb-6">
            Your one-stop platform for airtime, data bundles, subscriptions, 
            and social media marketing services.
          </p>
        </div>
        
        <div>
          <h4 className="text-lg font-semibold mb-4">Services</h4>
          <ul className="space-y-2 text-gray-400">
            <li><a href="/airtime" className="hover:text-white transition-colors">Airtime</a></li>
            <li><a href="/data" className="hover:text-white transition-colors">Data</a></li>
            <li><a href="/subscription" className="hover:text-white transition-colors">Subscriptions</a></li>
            <li><a href="/social" className="hover:text-white transition-colors">Marketing</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-semibold mb-4">Company</h4>
          <ul className="space-y-2 text-gray-400">
            <li><a href="/faq" className="hover:text-white transition-colors">FAQ</a></li>
            <li><a href="/contact" className="hover:text-white transition-colors">Contact</a></li>
            <li><a href="/terms" className="hover:text-white transition-colors">Terms</a></li>
            <li><a href="/privacy" className="hover:text-white transition-colors">Privacy</a></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
        <p>&copy; 2024 NEXORA. All rights reserved.</p>
      </div>
    </div>
  </footer>
)

export default Footer
