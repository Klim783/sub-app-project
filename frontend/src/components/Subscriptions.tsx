import { Plus, Search, MoreVertical } from 'lucide-react'

export default function Subscriptions() {
  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">Subscriptions</h1>
          <p className="text-slate-400 mt-1">Manage all your subscriptions</p>
        </div>
        <button className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors">
          <Plus size={20} />
          Add Subscription
        </button>
      </div>

      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
          <input
            type="text"
            placeholder="Search subscriptions..."
            className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-12 pr-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:border-purple-500 transition-colors"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 hover:border-purple-500/50 transition-all group">
          <div className="flex items-start justify-between mb-4">
            <div className="w-14 h-14 bg-red-500/20 rounded-xl flex items-center justify-center">
              <span className="text-3xl">🎬</span>
            </div>
            <button className="text-slate-400 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity">
              <MoreVertical size={20} />
            </button>
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Netflix Premium</h3>
          <p className="text-slate-400 text-sm mb-4">4K Ultra HD, 4 Screens</p>
          <div className="flex items-center justify-between mb-4">
            <div>
              <span className="text-2xl font-bold text-white">$19.99</span>
              <span className="text-slate-400 text-sm">/month</span>
            </div>
            <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-xs font-medium">Active</span>
          </div>
          <div className="pt-4 border-t border-slate-800">
            <p className="text-slate-400 text-xs">Next billing: Oct 15, 2026</p>
          </div>
        </div>

        <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 hover:border-purple-500/50 transition-all group">
          <div className="flex items-start justify-between mb-4">
            <div className="w-14 h-14 bg-green-500/20 rounded-xl flex items-center justify-center">
              <span className="text-3xl">🎵</span>
            </div>
            <button className="text-slate-400 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity">
              <MoreVertical size={20} />
            </button>
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Spotify Family</h3>
          <p className="text-slate-400 text-sm mb-4">Premium, 6 Accounts</p>
          <div className="flex items-center justify-between mb-4">
            <div>
              <span className="text-2xl font-bold text-white">$15.99</span>
              <span className="text-slate-400 text-sm">/month</span>
            </div>
            <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-xs font-medium">Active</span>
          </div>
          <div className="pt-4 border-t border-slate-800">
            <p className="text-slate-400 text-xs">Next billing: Oct 18, 2026</p>
          </div>
        </div>

        <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 hover:border-purple-500/50 transition-all group">
          <div className="flex items-start justify-between mb-4">
            <div className="w-14 h-14 bg-gray-500/20 rounded-xl flex items-center justify-center">
              <span className="text-3xl">💻</span>
            </div>
            <button className="text-slate-400 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity">
              <MoreVertical size={20} />
            </button>
          </div>
          <h3 className="text-xl font-bold text-white mb-2">GitHub Pro</h3>
          <p className="text-slate-400 text-sm mb-4">Developer Tools</p>
          <div className="flex items-center justify-between mb-4">
            <div>
              <span className="text-2xl font-bold text-white">$4.00</span>
              <span className="text-slate-400 text-sm">/month</span>
            </div>
            <span className="px-3 py-1 bg-yellow-500/20 text-yellow-400 rounded-full text-xs font-medium">Due Soon</span>
          </div>
          <div className="pt-4 border-t border-slate-800">
            <p className="text-slate-400 text-xs">Next billing: Oct 20, 2026</p>
          </div>
        </div>

        <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 hover:border-purple-500/50 transition-all group">
          <div className="flex items-start justify-between mb-4">
            <div className="w-14 h-14 bg-blue-500/20 rounded-xl flex items-center justify-center">
              <span className="text-3xl">☁️</span>
            </div>
            <button className="text-slate-400 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity">
              <MoreVertical size={20} />
            </button>
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Google One</h3>
          <p className="text-slate-400 text-sm mb-4">2TB Storage</p>
          <div className="flex items-center justify-between mb-4">
            <div>
              <span className="text-2xl font-bold text-white">$9.99</span>
              <span className="text-slate-400 text-sm">/month</span>
            </div>
            <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-xs font-medium">Active</span>
          </div>
          <div className="pt-4 border-t border-slate-800">
            <p className="text-slate-400 text-xs">Next billing: Oct 22, 2026</p>
          </div>
        </div>

        <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 hover:border-purple-500/50 transition-all group">
          <div className="flex items-start justify-between mb-4">
            <div className="w-14 h-14 bg-purple-500/20 rounded-xl flex items-center justify-center">
              <span className="text-3xl">🎮</span>
            </div>
            <button className="text-slate-400 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity">
              <MoreVertical size={20} />
            </button>
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Xbox Game Pass</h3>
          <p className="text-slate-400 text-sm mb-4">Ultimate, Cloud Gaming</p>
          <div className="flex items-center justify-between mb-4">
            <div>
              <span className="text-2xl font-bold text-white">$14.99</span>
              <span className="text-slate-400 text-sm">/month</span>
            </div>
            <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-xs font-medium">Active</span>
          </div>
          <div className="pt-4 border-t border-slate-800">
            <p className="text-slate-400 text-xs">Next billing: Oct 25, 2026</p>
          </div>
        </div>

        <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 hover:border-purple-500/50 transition-all group">
          <div className="flex items-start justify-between mb-4">
            <div className="w-14 h-14 bg-orange-500/20 rounded-xl flex items-center justify-center">
              <span className="text-3xl">📺</span>
            </div>
            <button className="text-slate-400 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity">
              <MoreVertical size={20} />
            </button>
          </div>
          <h3 className="text-xl font-bold text-white mb-2">YouTube Premium</h3>
          <p className="text-slate-400 text-sm mb-4">Ad-free, Music included</p>
          <div className="flex items-center justify-between mb-4">
            <div>
              <span className="text-2xl font-bold text-white">$11.99</span>
              <span className="text-slate-400 text-sm">/month</span>
            </div>
            <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-xs font-medium">Active</span>
          </div>
          <div className="pt-4 border-t border-slate-800">
            <p className="text-slate-400 text-xs">Next billing: Oct 28, 2026</p>
          </div>
        </div>
      </div>
    </div>
  )
}
