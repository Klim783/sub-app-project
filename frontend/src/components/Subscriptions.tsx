import { useState, useEffect } from 'react';
import { Plus, Search, MoreVertical, Edit, Trash2, X } from 'lucide-react';
import { subscriptionService } from '../services/subscriptions';
import { useAuth } from '../context/AuthContext';
import type { Subscription, SubscriptionCreate, SubscriptionUpdate } from '../types';

export default function Subscriptions() {
  const { user } = useAuth();
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingSubscription, setEditingSubscription] = useState<Subscription | null>(null);
  const [formData, setFormData] = useState<SubscriptionCreate>({
    user_id: 0,
    name: '',
    provider: '',
    price: 0,
    currency: 'USD',
    billing_cycle: 'monthly',
  });

  useEffect(() => {
    loadSubscriptions();
  }, []);

  useEffect(() => {
    if (user) {
      setFormData(prev => ({ ...prev, user_id: user.id }));
    }
  }, [user]);

  const loadSubscriptions = async () => {
    try {
      const data = await subscriptionService.getAll();
      setSubscriptions(data);
    } catch (error) {
      console.error('Failed to load subscriptions:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    setEditingSubscription(null);
    setFormData({
      user_id: user?.id || 0,
      name: '',
      provider: '',
      price: 0,
      currency: 'USD',
      billing_cycle: 'monthly',
    });
    setShowModal(true);
  };

  const handleEdit = (subscription: Subscription) => {
    setEditingSubscription(subscription);
    setFormData({
      user_id: subscription.user_id,
      name: subscription.name,
      provider: subscription.provider,
      price: subscription.price,
      currency: subscription.currency,
      billing_cycle: subscription.billing_cycle,
    });
    setShowModal(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this subscription?')) return;
    try {
      await subscriptionService.delete(id);
      loadSubscriptions();
    } catch (error) {
      console.error('Failed to delete subscription:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingSubscription) {
        await subscriptionService.update(editingSubscription.id, formData);
      } else {
        await subscriptionService.create(formData);
      }
      setShowModal(false);
      loadSubscriptions();
    } catch (error) {
      console.error('Failed to save subscription:', error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500/20 text-green-400';
      case 'cancelled': return 'bg-red-500/20 text-red-400';
      case 'expired': return 'bg-gray-500/20 text-gray-400';
      case 'pending': return 'bg-yellow-500/20 text-yellow-400';
      default: return 'bg-slate-500/20 text-slate-400';
    }
  };

  const getEmoji = (provider: string) => {
    const lower = provider.toLowerCase();
    if (lower.includes('netflix')) return '🎬';
    if (lower.includes('spotify')) return '🎵';
    if (lower.includes('github')) return '💻';
    if (lower.includes('google')) return '☁️';
    if (lower.includes('xbox') || lower.includes('microsoft')) return '🎮';
    if (lower.includes('youtube')) return '📺';
    if (lower.includes('amazon')) return '📦';
    if (lower.includes('apple')) return '🍎';
    return '📦';
  };

  if (loading) {
    return (
      <div className="p-8">
        <div className="text-white">Loading subscriptions...</div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">Subscriptions</h1>
          <p className="text-slate-400 mt-1">Manage all your subscriptions</p>
        </div>
        <button
          onClick={handleAdd}
          className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors"
        >
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
        {subscriptions.map((subscription) => (
          <div key={subscription.id} className="bg-slate-900 rounded-2xl p-6 border border-slate-800 hover:border-purple-500/50 transition-all group">
            <div className="flex items-start justify-between mb-4">
              <div className="w-14 h-14 bg-purple-500/20 rounded-xl flex items-center justify-center">
                <span className="text-3xl">{getEmoji(subscription.provider)}</span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(subscription)}
                  className="text-slate-400 hover:text-white p-1 rounded hover:bg-slate-800 transition-colors"
                >
                  <Edit size={18} />
                </button>
                <button
                  onClick={() => handleDelete(subscription.id)}
                  className="text-slate-400 hover:text-red-400 p-1 rounded hover:bg-slate-800 transition-colors"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">{subscription.name}</h3>
            <p className="text-slate-400 text-sm mb-4">{subscription.provider}</p>
            <div className="flex items-center justify-between mb-4">
              <div>
                <span className="text-2xl font-bold text-white">${subscription.price.toFixed(2)}</span>
                <span className="text-slate-400 text-sm">/{subscription.billing_cycle}</span>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(subscription.status)}`}>
                {subscription.status.charAt(0).toUpperCase() + subscription.status.slice(1)}
              </span>
            </div>
            <div className="pt-4 border-t border-slate-800">
              <p className="text-slate-400 text-xs">
                {subscription.next_billing_date
                  ? `Next billing: ${new Date(subscription.next_billing_date).toLocaleDateString()}`
                  : 'No billing date set'}
              </p>
            </div>
          </div>
        ))}

        {subscriptions.length === 0 && (
          <div className="col-span-full text-center py-12">
            <p className="text-slate-400 text-lg">No subscriptions yet. Add your first one!</p>
          </div>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-slate-900 rounded-2xl p-8 border border-slate-800 w-full max-w-md">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">
                {editingSubscription ? 'Edit Subscription' : 'Add Subscription'}
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-slate-400 hover:text-white"
              >
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-purple-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Provider</label>
                <input
                  type="text"
                  value={formData.provider}
                  onChange={(e) => setFormData({ ...formData, provider: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-purple-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Price</label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-purple-500"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Currency</label>
                  <select
                    value={formData.currency}
                    onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-purple-500"
                  >
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                    <option value="GBP">GBP</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Billing Cycle</label>
                  <select
                    value={formData.billing_cycle}
                    onChange={(e) => setFormData({ ...formData, billing_cycle: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-purple-500"
                  >
                    <option value="monthly">Monthly</option>
                    <option value="yearly">Yearly</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg transition-colors"
              >
                {editingSubscription ? 'Update Subscription' : 'Add Subscription'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
