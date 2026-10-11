"use client";

import { useState, useEffect } from "react";
import { Star, Trash2, Check, X, Flag, Edit3, Eye, EyeOff, ShieldCheck, ArrowLeft, Download } from 'lucide-react';
import Link from 'next/link';

// ══════════════════════════════════════════════════════════════
// TYPES
// ══════════════════════════════════════════════════════════════

interface Review {
  id: number;
  google_id: string;
  email: string;
  name: string;
  rating: number;
  review_text: string;
  gender: string;
  display_preference: string;
  status: string;
  is_featured: number;
  helpful_count: number;
  admin_notes: string | null;
  created_at: string;
  updated_at: string | null;
}

interface StatusCounts {
  pending: number;
  approved: number;
  rejected: number;
  spam: number;
}

// ══════════════════════════════════════════════════════════════
// MAIN PAGE
// ══════════════════════════════════════════════════════════════

export default function AdminReviewsPage() {
  const [apiKey, setApiKey] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [counts, setCounts] = useState<StatusCounts>({ pending: 0, approved: 0, rejected: 0, spam: 0 });
  const [filter, setFilter] = useState('');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Restore session
  useEffect(() => {
    const saved = sessionStorage.getItem('mg_admin_key');
    if (saved) {
      setApiKey(saved);
      setAuthenticated(true);
    }
  }, []);

  // Load reviews when authenticated or filter/search changes
  useEffect(() => {
    if (authenticated) loadReviews();
  }, [authenticated, filter]);

  const headers = () => ({
    'Content-Type': 'application/json',
    'X-API-Key': apiKey,
  });

  const loadReviews = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (filter) params.set('status', filter);
      if (search) params.set('search', search);

      const res = await fetch(`/api/admin/reviews?${params}`, { headers: headers() });
      if (res.status === 401) {
        setAuthenticated(false);
        sessionStorage.removeItem('mg_admin_key');
        return;
      }
      const data = await res.json();
      setReviews(data.reviews || []);
      setCounts(data.status_counts || { pending: 0, approved: 0, rejected: 0, spam: 0 });
    } catch (e) {
      setError('Failed to load reviews');
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    sessionStorage.setItem('mg_admin_key', apiKey);
    setAuthenticated(true);
  };

  const updateReview = async (id: number, updates: Record<string, any>) => {
    try {
      const res = await fetch(`/api/admin/reviews/${id}`, {
        method: 'PUT',
        headers: headers(),
        body: JSON.stringify(updates),
      });
      if (res.ok) loadReviews();
    } catch {}
  };

  const deleteReview = async (id: number) => {
    if (!confirm('Permanently delete this review?')) return;
    try {
      await fetch(`/api/admin/reviews/${id}`, {
        method: 'DELETE',
        headers: headers(),
      });
      loadReviews();
    } catch {}
  };

  const exportReviews = async () => {
    try {
      const res = await fetch('/api/admin/reviews/export', { headers: headers() });
      const data = await res.json();
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `reviews-export-${new Date().toISOString().slice(0, 10)}.json`;
      a.click();
      URL.revokeObjectURL(url);
    } catch {}
  };

  const statusBadge = (status: string) => {
    const styles: Record<string, string> = {
      pending: 'bg-yellow-100 text-yellow-800',
      approved: 'bg-green-100 text-green-800',
      rejected: 'bg-red-100 text-red-800',
      spam: 'bg-orange-100 text-orange-800',
    };
    return (
      <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${styles[status] || 'bg-slate-100'}`}>
        {status}
      </span>
    );
  };

  // ── Login Screen ──
  if (!authenticated) {
    return (
      <div className="min-h-screen bg-[#FAFAF9] flex items-center justify-center px-6">
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm max-w-md w-full">
          <h1 className="text-2xl font-bold text-slate-900 mb-2 font-['Instrument_Serif',serif]">
            Admin Dashboard
          </h1>
          <p className="text-slate-500 mb-6">Enter your admin API key to access the reviews dashboard.</p>

          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="Admin API Key"
              className="w-full border border-slate-200 rounded-2xl p-3 text-slate-700 focus:border-emerald-300 focus:ring-1 focus:ring-emerald-300 outline-none"
            />
            <button
              type="submit"
              className="w-full bg-emerald-500 text-white rounded-full py-3 font-bold hover:bg-emerald-700 transition-colors"
            >
              Access Dashboard
            </button>
          </form>

          <Link href="/" className="block text-center text-emerald-500 mt-6 text-sm hover:underline">
            ← Back to Home
          </Link>
        </div>
      </div>
    );
  }

  // ── Dashboard ──
  return (
    <div className="min-h-screen bg-[#FAFAF9]">
      <main className="max-w-6xl mx-auto px-6 pt-8 pb-24">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
          <div>
            <Link href="/" className="text-emerald-500 flex items-center gap-2 mb-2 hover:underline text-sm">
              <ArrowLeft size={14} /> Back to Site
            </Link>
            <h1 className="text-3xl font-bold text-slate-900 font-['Instrument_Serif',serif]">
              Review Moderation
            </h1>
          </div>
          <button
            onClick={exportReviews}
            className="flex items-center gap-2 bg-white border border-slate-200 rounded-full px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 transition-colors"
          >
            <Download size={16} /> Export
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          {[
            { key: 'pending', label: 'Pending', color: 'bg-yellow-50 border-yellow-200 text-yellow-800' },
            { key: 'approved', label: 'Approved', color: 'bg-green-50 border-green-200 text-green-800' },
            { key: 'rejected', label: 'Rejected', color: 'bg-red-50 border-red-200 text-red-800' },
            { key: 'spam', label: 'Spam', color: 'bg-orange-50 border-orange-200 text-orange-800' },
          ].map(({ key, label, color }) => (
            <button
              key={key}
              onClick={() => setFilter(filter === key ? '' : key)}
              className={`rounded-2xl border p-4 text-center transition-all ${
                filter === key
                  ? `${color} ring-2 ring-current/20`
                  : 'bg-white border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="text-3xl font-bold">{(counts as any)[key] || 0}</div>
              <div className="text-sm font-medium mt-1">{label}</div>
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="mb-6">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && loadReviews()}
            placeholder="Search by name, email, or review text..."
            className="w-full max-w-md border border-slate-200 rounded-full px-5 py-2.5 text-sm text-slate-700 focus:border-emerald-300 focus:ring-1 focus:ring-emerald-300 outline-none"
          />
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-800 rounded-2xl p-4 mb-6 text-sm">{error}</div>
        )}

        {/* Reviews table */}
        {loading ? (
          <div className="text-center text-slate-400 py-12">Loading...</div>
        ) : reviews.length === 0 ? (
          <div className="text-center py-12 text-slate-500">No reviews found.</div>
        ) : (
          <div className="space-y-4">
            {reviews.map((review) => (
              <div
                key={review.id}
                className="bg-white p-5 rounded-2xl border border-slate-200"
              >
                <div className="flex items-start justify-between gap-4 flex-wrap">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <span className="font-bold text-slate-900">{review.name}</span>
                      <span className="text-xs text-slate-400">{review.email}</span>
                      {statusBadge(review.status)}
                      {review.is_featured ? (
                        <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full font-medium">
                          Featured
                        </span>
                      ) : null}
                    </div>

                    <div className="flex gap-1 mb-2">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star key={s} size={14} fill={s <= review.rating ? '#f59e0b' : 'none'} stroke={s <= review.rating ? '#f59e0b' : '#cbd5e1'} />
                      ))}
                    </div>

                    <p className="text-slate-700 text-sm mb-3 leading-relaxed">{review.review_text}</p>

                    <div className="flex gap-4 text-xs text-slate-400">
                      <span>Display: <strong>{review.display_preference}</strong></span>
                      <span>Gender: {review.gender || '—'}</span>
                      <span>Helpful: {review.helpful_count}</span>
                      <span>{new Date(review.created_at).toLocaleDateString()}</span>
                    </div>

                    {review.admin_notes && (
                      <p className="mt-2 text-xs text-slate-500 italic">Notes: {review.admin_notes}</p>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {review.status === 'pending' && (
                      <>
                        <button
                          onClick={() => updateReview(review.id, { status: 'approved' })}
                          className="p-2 rounded-full bg-green-50 text-green-600 hover:bg-green-100 transition-colors"
                          title="Approve"
                        >
                          <Check size={16} />
                        </button>
                        <button
                          onClick={() => updateReview(review.id, { status: 'rejected' })}
                          className="p-2 rounded-full bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
                          title="Reject"
                        >
                          <X size={16} />
                        </button>
                        <button
                          onClick={() => updateReview(review.id, { status: 'spam' })}
                          className="p-2 rounded-full bg-orange-50 text-orange-600 hover:bg-orange-100 transition-colors"
                          title="Mark as Spam"
                        >
                          <Flag size={16} />
                        </button>
                      </>
                    )}
                    {review.status === 'approved' && (
                      <button
                        onClick={() => updateReview(review.id, { status: 'rejected' })}
                        className="p-2 rounded-full bg-slate-50 text-slate-500 hover:bg-red-50 hover:text-red-600 transition-colors"
                        title="Hide from public"
                      >
                        <EyeOff size={16} />
                      </button>
                    )}
                    {review.status === 'rejected' && (
                      <button
                        onClick={() => updateReview(review.id, { status: 'approved' })}
                        className="p-2 rounded-full bg-slate-50 text-slate-500 hover:bg-green-50 hover:text-green-600 transition-colors"
                        title="Show publicly"
                      >
                        <Eye size={16} />
                      </button>
                    )}
                    <button
                      onClick={() => updateReview(review.id, { is_featured: review.is_featured ? 0 : 1 })}
                      className={`p-2 rounded-full transition-colors ${
                        review.is_featured
                          ? 'bg-emerald-50 text-emerald-600'
                          : 'bg-slate-50 text-slate-400 hover:text-emerald-500'
                      }`}
                      title="Toggle Featured"
                    >
                      <Star size={16} fill={review.is_featured ? 'currentColor' : 'none'} />
                    </button>
                    <button
                      onClick={() => deleteReview(review.id)}
                      className="p-2 rounded-full bg-slate-50 text-slate-400 hover:bg-red-50 hover:text-red-600 transition-colors"
                      title="Delete Permanently"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
