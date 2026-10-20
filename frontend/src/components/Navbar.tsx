import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <nav className="bg-white/10 backdrop-blur-lg border-b border-white/20">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold text-white">
            SubManager
          </Link>
          <div className="flex space-x-6">
            <Link
              to="/"
              className="text-white/80 hover:text-white transition-colors"
            >
              Dashboard
            </Link>
            <Link
              to="/subscriptions"
              className="text-white/80 hover:text-white transition-colors"
            >
              Subscriptions
            </Link>
            <Link
              to="/payments"
              className="text-white/80 hover:text-white transition-colors"
            >
              Payments
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
