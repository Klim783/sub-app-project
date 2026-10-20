import { Download, Filter } from 'lucide-react'

export default function Payments() {
  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">Payment History</h1>
          <p className="text-slate-400 mt-1">Track all your subscription payments</p>
        </div>
        <button className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors border border-slate-700">
          <Download size={20} />
          Export
        </button>
      </div>

      <div className="mb-6 flex items-center gap-4">
        <div className="relative flex-1">
          <Filter className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
          <select className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-12 pr-4 py-3 text-white appearance-none focus:outline-none focus:border-purple-500 transition-colors cursor-pointer">
            <option value="all">All Services</option>
            <option value="netflix">Netflix</option>
            <option value="spotify">Spotify</option>
            <option value="github">GitHub</option>
          </select>
        </div>
        <div className="relative flex-1">
          <Filter className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
          <select className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-12 pr-4 py-3 text-white appearance-none focus:outline-none focus:border-purple-500 transition-colors cursor-pointer">
            <option value="all">All Status</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
            <option value="failed">Failed</option>
          </select>
        </div>
      </div>

      <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden mb-8">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-800">
              <th className="text-left p-4 text-slate-400 font-semibold text-sm">Service</th>
              <th className="text-left p-4 text-slate-400 font-semibold text-sm">Date</th>
              <th className="text-left p-4 text-slate-400 font-semibold text-sm">Amount</th>
              <th className="text-left p-4 text-slate-400 font-semibold text-sm">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-slate-800 hover:bg-slate-800/50 transition-colors">
              <td className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-red-500/20 rounded-lg flex items-center justify-center">
                    <span>🎬</span>
                  </div>
                  <span className="text-white font-medium">Netflix Premium</span>
                </div>
              </td>
              <td className="p-4 text-slate-400">Oct 1, 2026</td>
              <td className="p-4 text-white font-semibold">$19.99</td>
              <td className="p-4">
                <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-xs font-medium">
                  Completed
                </span>
              </td>
            </tr>
            <tr className="border-b border-slate-800 hover:bg-slate-800/50 transition-colors">
              <td className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                    <span>🎵</span>
                  </div>
                  <span className="text-white font-medium">Spotify Family</span>
                </div>
              </td>
              <td className="p-4 text-slate-400">Oct 1, 2026</td>
              <td className="p-4 text-white font-semibold">$15.99</td>
              <td className="p-4">
                <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-xs font-medium">
                  Completed
                </span>
              </td>
            </tr>
            <tr className="border-b border-slate-800 hover:bg-slate-800/50 transition-colors">
              <td className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                    <span>🎮</span>
                  </div>
                  <span className="text-white font-medium">Xbox Game Pass</span>
                </div>
              </td>
              <td className="p-4 text-slate-400">Sep 28, 2026</td>
              <td className="p-4 text-white font-semibold">$14.99</td>
              <td className="p-4">
                <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-xs font-medium">
                  Completed
                </span>
              </td>
            </tr>
            <tr className="border-b border-slate-800 hover:bg-slate-800/50 transition-colors">
              <td className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-orange-500/20 rounded-lg flex items-center justify-center">
                    <span>📺</span>
                  </div>
                  <span className="text-white font-medium">YouTube Premium</span>
                </div>
              </td>
              <td className="p-4 text-slate-400">Sep 25, 2026</td>
              <td className="p-4 text-white font-semibold">$11.99</td>
              <td className="p-4">
                <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-xs font-medium">
                  Completed
                </span>
              </td>
            </tr>
            <tr className="border-b border-slate-800 hover:bg-slate-800/50 transition-colors">
              <td className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                    <span>☁️</span>
                  </div>
                  <span className="text-white font-medium">Google One</span>
                </div>
              </td>
              <td className="p-4 text-slate-400">Sep 20, 2026</td>
              <td className="p-4 text-white font-semibold">$9.99</td>
              <td className="p-4">
                <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-xs font-medium">
                  Completed
                </span>
              </td>
            </tr>
            <tr className="hover:bg-slate-800/50 transition-colors">
              <td className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-500/20 rounded-lg flex items-center justify-center">
                    <span>💻</span>
                  </div>
                  <span className="text-white font-medium">GitHub Pro</span>
                </div>
              </td>
              <td className="p-4 text-slate-400">Oct 18, 2026</td>
              <td className="p-4 text-white font-semibold">$4.00</td>
              <td className="p-4">
                <span className="px-3 py-1 bg-yellow-500/20 text-yellow-400 rounded-full text-xs font-medium">
                  Pending
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800">
          <h3 className="text-slate-400 text-sm mb-2">This Month</h3>
          <p className="text-3xl font-bold text-white">$76.96</p>
          <p className="text-green-400 text-sm mt-2">+$4.01 vs last month</p>
        </div>
        <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800">
          <h3 className="text-slate-400 text-sm mb-2">Last Month</h3>
          <p className="text-3xl font-bold text-white">$72.95</p>
          <p className="text-slate-400 text-sm mt-2">8 payments</p>
        </div>
        <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800">
          <h3 className="text-slate-400 text-sm mb-2">Year to Date</h3>
          <p className="text-3xl font-bold text-white">$897.52</p>
          <p className="text-slate-400 text-sm mt-2">92 payments</p>
        </div>
      </div>
    </div>
  )
}
