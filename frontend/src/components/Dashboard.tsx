import { CreditCard, TrendingUp, Calendar, AlertTriangle } from 'lucide-react'

export default function Dashboard() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Dashboard</h1>
        <p className="text-slate-400 mt-1">Welcome back, John</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 hover:border-purple-500/50 transition-all">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center">
              <CreditCard className="text-purple-400" size={24} />
            </div>
            <span className="text-green-400 text-sm font-medium">+2 this month</span>
          </div>
          <h3 className="text-slate-400 text-sm mb-1">Total Subscriptions</h3>
          <p className="text-3xl font-bold text-white">12</p>
        </div>

        <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 hover:border-green-500/50 transition-all">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
              <TrendingUp className="text-green-400" size={24} />
            </div>
            <span className="text-red-400 text-sm font-medium">+$12 vs last month</span>
          </div>
          <h3 className="text-slate-400 text-sm mb-1">Monthly Cost</h3>
          <p className="text-3xl font-bold text-white">$247.89</p>
        </div>

        <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 hover:border-blue-500/50 transition-all">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
              <Calendar className="text-blue-400" size={24} />
            </div>
            <span className="text-slate-400 text-sm font-medium">This month</span>
          </div>
          <h3 className="text-slate-400 text-sm mb-1">Payments Made</h3>
          <p className="text-3xl font-bold text-white">8</p>
        </div>

        <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 hover:border-yellow-500/50 transition-all">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-yellow-500/20 rounded-xl flex items-center justify-center">
              <AlertTriangle className="text-yellow-400" size={24} />
            </div>
            <span className="text-yellow-400 text-sm font-medium">Action needed</span>
          </div>
          <h3 className="text-slate-400 text-sm mb-1">Renewals Due</h3>
          <p className="text-3xl font-bold text-white">3</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800">
          <h2 className="text-xl font-bold text-white mb-6">Upcoming Renewals</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-slate-800/50 rounded-xl">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-red-500/20 rounded-lg flex items-center justify-center">
                  <span className="text-lg">🎬</span>
                </div>
                <div>
                  <p className="text-white font-medium">Netflix Premium</p>
                  <p className="text-slate-400 text-sm">Tomorrow</p>
                </div>
              </div>
              <span className="text-white font-semibold">$19.99</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-slate-800/50 rounded-xl">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                  <span className="text-lg">🎵</span>
                </div>
                <div>
                  <p className="text-white font-medium">Spotify Family</p>
                  <p className="text-slate-400 text-sm">In 3 days</p>
                </div>
              </div>
              <span className="text-white font-semibold">$15.99</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-slate-800/50 rounded-xl">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-gray-500/20 rounded-lg flex items-center justify-center">
                  <span className="text-lg">💻</span>
                </div>
                <div>
                  <p className="text-white font-medium">GitHub Pro</p>
                  <p className="text-slate-400 text-sm">In 5 days</p>
                </div>
              </div>
              <span className="text-white font-semibold">$4.00</span>
            </div>
          </div>
        </div>

        <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800">
          <h2 className="text-xl font-bold text-white mb-6">Recent Activity</h2>
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 bg-slate-800/50 rounded-xl">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <div className="flex-1">
                <p className="text-white font-medium">Netflix Premium renewed</p>
                <p className="text-slate-400 text-sm">Auto-renewal successful</p>
              </div>
              <span className="text-slate-400 text-sm">2h ago</span>
            </div>
            <div className="flex items-center gap-4 p-4 bg-slate-800/50 rounded-xl">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <div className="flex-1">
                <p className="text-white font-medium">Spotify payment processed</p>
                <p className="text-slate-400 text-sm">$15.99 charged</p>
              </div>
              <span className="text-slate-400 text-sm">1d ago</span>
            </div>
            <div className="flex items-center gap-4 p-4 bg-slate-800/50 rounded-xl">
              <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
              <div className="flex-1">
                <p className="text-white font-medium">Xbox Game Pass expiring soon</p>
                <p className="text-slate-400 text-sm">Renew in 7 days</p>
              </div>
              <span className="text-slate-400 text-sm">2d ago</span>
            </div>
            <div className="flex items-center gap-4 p-4 bg-slate-800/50 rounded-xl">
              <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
              <div className="flex-1">
                <p className="text-white font-medium">New subscription added</p>
                <p className="text-slate-400 text-sm">YouTube Premium</p>
              </div>
              <span className="text-slate-400 text-sm">5d ago</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
