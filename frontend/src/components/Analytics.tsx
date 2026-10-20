import { BarChart3, PieChart, TrendingUp, DollarSign } from 'lucide-react'

export default function Analytics() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Analytics</h1>
        <p className="text-slate-400 mt-1">Insights into your subscription spending</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white">Monthly Spending</h2>
            <BarChart3 className="text-purple-400" size={24} />
          </div>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <div className="flex justify-between mb-1">
                  <span className="text-slate-400 text-sm">Jan</span>
                  <span className="text-white text-sm">$245</span>
                </div>
                <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-purple-500 rounded-full" style={{ width: '82%' }}></div>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <div className="flex justify-between mb-1">
                  <span className="text-slate-400 text-sm">Feb</span>
                  <span className="text-white text-sm">$268</span>
                </div>
                <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-purple-500 rounded-full" style={{ width: '89%' }}></div>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <div className="flex justify-between mb-1">
                  <span className="text-slate-400 text-sm">Mar</span>
                  <span className="text-white text-sm">$231</span>
                </div>
                <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-purple-500 rounded-full" style={{ width: '77%' }}></div>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <div className="flex justify-between mb-1">
                  <span className="text-slate-400 text-sm">Apr</span>
                  <span className="text-white text-sm">$289</span>
                </div>
                <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-purple-500 rounded-full" style={{ width: '96%' }}></div>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <div className="flex justify-between mb-1">
                  <span className="text-slate-400 text-sm">May</span>
                  <span className="text-white text-sm">$254</span>
                </div>
                <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-purple-500 rounded-full" style={{ width: '85%' }}></div>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <div className="flex justify-between mb-1">
                  <span className="text-slate-400 text-sm">Jun</span>
                  <span className="text-white text-sm">$276</span>
                </div>
                <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-purple-500 rounded-full" style={{ width: '92%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white">Spending by Category</h2>
            <PieChart className="text-green-400" size={24} />
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 bg-red-500 rounded"></div>
                <span className="text-white">Entertainment</span>
              </div>
              <span className="text-white font-semibold">$142</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 bg-green-500 rounded"></div>
                <span className="text-white">Music</span>
              </div>
              <span className="text-white font-semibold">$45</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 bg-blue-500 rounded"></div>
                <span className="text-white">Cloud Storage</span>
              </div>
              <span className="text-white font-semibold">$38</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 bg-purple-500 rounded"></div>
                <span className="text-white">Gaming</span>
              </div>
              <span className="text-white font-semibold">$22</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800">
          <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center mb-4">
            <TrendingUp className="text-green-400" size={24} />
          </div>
          <h3 className="text-slate-400 text-sm mb-1">Avg Monthly</h3>
          <p className="text-2xl font-bold text-white">$260.50</p>
        </div>
        <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800">
          <div className="w-12 h-12 bg-red-500/20 rounded-xl flex items-center justify-center mb-4">
            <DollarSign className="text-red-400" size={24} />
          </div>
          <h3 className="text-slate-400 text-sm mb-1">Highest Month</h3>
          <p className="text-2xl font-bold text-white">$289.00</p>
        </div>
        <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800">
          <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mb-4">
            <DollarSign className="text-blue-400" size={24} />
          </div>
          <h3 className="text-slate-400 text-sm mb-1">Lowest Month</h3>
          <p className="text-2xl font-bold text-white">$231.00</p>
        </div>
        <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800">
          <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mb-4">
            <TrendingUp className="text-purple-400" size={24} />
          </div>
          <h3 className="text-slate-400 text-sm mb-1">YoY Change</h3>
          <p className="text-2xl font-bold text-green-400">+12%</p>
        </div>
      </div>

      <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800">
        <h2 className="text-xl font-bold text-white mb-6">Top Subscriptions by Cost</h2>
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-red-500/20 rounded-xl flex items-center justify-center">
              <span className="text-xl">🎬</span>
            </div>
            <div className="flex-1">
              <div className="flex justify-between mb-1">
                <span className="text-white font-medium">Netflix Premium</span>
                <span className="text-white font-semibold">$19.99/mo</span>
              </div>
              <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-red-500 rounded-full" style={{ width: '100%' }}></div>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
              <span className="text-xl">🎵</span>
            </div>
            <div className="flex-1">
              <div className="flex justify-between mb-1">
                <span className="text-white font-medium">Spotify Family</span>
                <span className="text-white font-semibold">$15.99/mo</span>
              </div>
              <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-green-500 rounded-full" style={{ width: '80%' }}></div>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center">
              <span className="text-xl">🎮</span>
            </div>
            <div className="flex-1">
              <div className="flex justify-between mb-1">
                <span className="text-white font-medium">Xbox Game Pass</span>
                <span className="text-white font-semibold">$14.99/mo</span>
              </div>
              <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-purple-500 rounded-full" style={{ width: '75%' }}></div>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center">
              <span className="text-xl">📺</span>
            </div>
            <div className="flex-1">
              <div className="flex justify-between mb-1">
                <span className="text-white font-medium">YouTube Premium</span>
                <span className="text-white font-semibold">$11.99/mo</span>
              </div>
              <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-orange-500 rounded-full" style={{ width: '60%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
