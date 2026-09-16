import React, { useState, useEffect } from 'react';
import { api } from '../services/api.js';
import { Newspaper, Plus, Search, Calendar, User, Trash2 } from 'lucide-react';

export default function InsightsManager() {
  const [insights, setInsights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    category: 'Market Insights',
    author: 'iR Research Team',
    excerpt: '',
    content: '',
    status: 'Published'
  });

  useEffect(() => {
    loadInsights();
  }, []);

  const loadInsights = async () => {
    try {
      setLoading(true);
      const data = await api.getInsights();
      const rawList = Array.isArray(data) ? data : data.insights || data.items || [];
      const normalized = rawList.map(art => ({
        ...art,
        publishedAt: art.publishedAt || art.published_at
      }));
      setInsights(normalized);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.createInsight(formData);
      setModalOpen(false);
      setFormData({
        title: '',
        category: 'Market Insights',
        author: 'iR Research Team',
        excerpt: '',
        content: '',
        status: 'Published'
      });
      loadInsights();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this article?')) return;
    try {
      await api.deleteInsight(id);
      loadInsights();
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <Newspaper className="w-6 h-6 text-slate-600" />
            Insights & Blog Manager
          </h1>
          <p className="text-sm text-slate-600 mt-1">Publish industry reports, hiring guides, and market trends.</p>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="px-4 py-2.5 rounded-xl bg-brand-orange hover:bg-brand-orangeHover text-white text-sm font-semibold flex items-center gap-2 shadow-lg shadow-brand-orange/25 transition self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          Publish New Article
        </button>
      </div>

      {/* Grid */}
      {loading ? (
        <div className="text-center py-12 text-slate-600">Loading insight articles...</div>
      ) : insights.length === 0 ? (
        <div className="text-center py-12 bg-white/80 border border-slate-200 rounded-2xl text-slate-600">
          No articles published yet.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {insights.map((art) => (
            <div key={art.id} className="p-6 rounded-2xl bg-white border border-slate-200 space-y-3 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-bold text-slate-600 uppercase tracking-wider">{art.category}</span>
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-600 border border-slate-200">
                      {art.status}
                    </span>
                    <button
                      onClick={() => handleDelete(art.id)}
                      title="Delete article"
                      className="p-1 rounded-lg bg-rose-50 border border-rose-200 text-rose-600 hover:bg-rose-100 transition text-xs"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-2">{art.title}</h3>
                <p className="text-xs text-slate-600 line-clamp-3">{art.excerpt}</p>
              </div>

              <div className="pt-4 border-t border-slate-200 flex items-center justify-between text-xs text-slate-400">
                <span className="flex items-center gap-1"><User className="w-3 h-3 text-slate-600" /> {art.author}</span>
                <span className="flex items-center gap-1"><Calendar className="w-3 h-3 text-slate-600" /> {new Date(art.publishedAt).toLocaleDateString()}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-[#FBF9F5] backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-xl bg-white border border-slate-200 rounded-2xl p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <h2 className="text-lg font-bold text-slate-900">Publish New Insight Article</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Article Title</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-[#FBF9F5] border border-slate-200 text-slate-900 text-sm focus:outline-none focus:border-brand-orange"
                  placeholder="e.g. Scaling Tech Teams in 2026"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-[#FBF9F5] border border-slate-200 text-slate-900 text-sm focus:outline-none focus:border-brand-orange"
                  >
                    <option value="Market Trends">Market Trends</option>
                    <option value="Hiring Strategy">Hiring Strategy</option>
                    <option value="Executive Search">Executive Search</option>
                    <option value="Talent Retention">Talent Retention</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">Author</label>
                  <input
                    type="text"
                    value={formData.author}
                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-[#FBF9F5] border border-slate-200 text-slate-900 text-sm focus:outline-none focus:border-brand-orange"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Summary Excerpt</label>
                <textarea
                  rows="2"
                  required
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-[#FBF9F5] border border-slate-200 text-slate-900 text-sm focus:outline-none focus:border-brand-orange"
                  placeholder="Short summary for card view..."
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Full Content / Article</label>
                <textarea
                  rows="5"
                  required
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-[#FBF9F5] border border-slate-200 text-slate-900 text-sm focus:outline-none focus:border-brand-orange font-sans"
                  placeholder="Write full article here..."
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 text-slate-600 text-sm font-semibold hover:bg-slate-200/50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-brand-orange text-white text-sm font-semibold hover:bg-brand-orangeHover shadow-lg shadow-brand-orange/25"
                >
                  Publish Article
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
