"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { Star, ThumbsUp, ShieldCheck, ArrowLeft, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import Footer from '../components/Footer';

// ══════════════════════════════════════════════════════════════
// CONFIG — Replace this with your real Google Client ID
// ══════════════════════════════════════════════════════════════
const GOOGLE_CLIENT_ID = "65673222474-u455at0fpig391pv80v4cfgpnl2d7ogj.apps.googleusercontent.com";

// ══════════════════════════════════════════════════════════════
// TYPES
// ══════════════════════════════════════════════════════════════

interface GoogleUser {
  google_id: string;
  email: string;
  name: string;
}

interface Review {
  id: number;
  rating: number;
  review_text: string;
  display_name: string;
  display_preference: string;
  is_featured: number;
  helpful_count: number;
  created_at: string;
}

// ══════════════════════════════════════════════════════════════
// HELPERS
// ══════════════════════════════════════════════════════════════

function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
}

function StarRating({ rating, setRating, interactive = false }: {
  rating: number;
  setRating?: (r: number) => void;
  interactive?: boolean;
}) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type={interactive ? "button" : undefined}
          disabled={!interactive}
          onClick={() => interactive && setRating?.(star)}
          className={`${interactive ? 'cursor-pointer hover:scale-110' : 'cursor-default'} transition-transform`}
        >
          <Star
            size={interactive ? 28 : 18}
            fill={star <= rating ? '#f59e0b' : 'none'}
            stroke={star <= rating ? '#f59e0b' : '#cbd5e1'}
          />
        </button>
      ))}
    </div>
  );
}

// ══════════════════════════════════════════════════════════════
// MAIN PAGE
// ══════════════════════════════════════════════════════════════

export default function ReviewsPage() {
  const [user, setUser] = useState<GoogleUser | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [avgRating, setAvgRating] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [myReview, setMyReview] = useState<any>(null);
  const [googleReady, setGoogleReady] = useState(false);

  // Form state
  const [showForm, setShowForm] = useState(false);
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [gender, setGender] = useState('');
  const [displayPref, setDisplayPref] = useState('name');
  const [submitting, setSubmitting] = useState(false);
  const [submitMsg, setSubmitMsg] = useState('');
  const [submitError, setSubmitError] = useState('');

  const googleBtnRef = useRef<HTMLDivElement>(null);

  // Check if Google Client ID is actually configured
  const isGoogleConfigured = GOOGLE_CLIENT_ID && !!GOOGLE_CLIENT_ID;

  // ── Load public reviews ──
  const loadReviews = useCallback(async () => {
    try {
      const res = await fetch('/api/reviews');
      const data = await res.json();
      setReviews(data.reviews || []);
      setAvgRating(data.average_rating);
    } catch (e) {
      console.error('Failed to load reviews', e);
    } finally {
      setLoading(false);
    }
  }, []);

  // ── Load user's own review ──
  const loadMyReview = useCallback(async () => {
    if (!user) return;
    const credential = sessionStorage.getItem('mg_credential');
    if (!credential) return;
    try {
      const res = await fetch('/api/reviews/my', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ credential }),
      });
      const data = await res.json();
      if (data.review) {
        setMyReview(data.review);
        setRating(data.review.rating);
        setReviewText(data.review.review_text);
        setGender(data.review.gender || '');
        setDisplayPref(data.review.display_preference || 'name');
      }
    } catch {}
  }, [user]);

  useEffect(() => { loadReviews(); }, [loadReviews]);
  useEffect(() => { if (user) loadMyReview(); }, [user, loadMyReview]);

  // ── Restore session ──
  useEffect(() => {
    const saved = sessionStorage.getItem('mg_user');
    if (saved) {
      try { setUser(JSON.parse(saved)); } catch {}
    }
  }, []);

  // ── Initialize Google Sign-In ──
  useEffect(() => {
    if (!isGoogleConfigured) {
      setGoogleReady(true); // Show "not configured" state
      return;
    }

    const scriptId = 'google-gsi-script';
    if (document.getElementById(scriptId)) {
      setGoogleReady(true);
      return;
    }

    const script = document.createElement('script');
    script.id = scriptId;
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    script.onload = () => {
      if (!(window as any).google) return;

      const google = (window as any).google;
      google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback: async (response: any) => {
          try {
            const res = await fetch('/api/auth/google', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ credential: response.credential }),
            });
            const data = await res.json();
            if (data.success) {
              setUser(data.user);
              sessionStorage.setItem('mg_user', JSON.stringify(data.user));
              sessionStorage.setItem('mg_credential', response.credential);
              // Re-check for existing review
              setShowForm(true);
            }
          } catch {}
        },
      });
      setGoogleReady(true);
    };
    document.head.appendChild(script);

    return () => {
      const el = document.getElementById(scriptId);
      if (el) el.remove();
    };
  }, []);

  // ── Render Google button after ref is attached ──
  useEffect(() => {
    if (!googleReady || !isGoogleConfigured || !googleBtnRef.current) return;
    const google = (window as any).google;
    if (!google?.accounts?.id) return;
    google.accounts.id.renderButton(googleBtnRef.current, {
      theme: 'outline',
      size: 'large',
      text: 'signin_with',
      shape: 'pill',
      width: 300,
    });
  }, [googleReady, isGoogleConfigured]);

  // ── Sign out ──
  const handleSignOut = () => {
    setUser(null);
    setMyReview(null);
    sessionStorage.removeItem('mg_user');
    sessionStorage.removeItem('mg_credential');
    setShowForm(false);
    // Disable Google auto sign-in on next visit
    if ((window as any).google) {
      (window as any).google.accounts.id.disableAutoSelect();
    }
  };

  // ── Submit review ──
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitMsg('');
    setSubmitError('');

    if (!rating) { setSubmitError('Please select a rating'); return; }
    if (reviewText.trim().length < 15) { setSubmitError('Review must be at least 15 characters'); return; }
    if (!gender) { setSubmitError('Please select your gender'); return; }

    setSubmitting(true);
    const credential = sessionStorage.getItem('mg_credential');
    if (!credential) {
      setSubmitError('Please sign in with Google first');
      setSubmitting(false);
      return;
    }

    const endpoint = myReview ? `/api/reviews/${myReview.id}/edit` : '/api/reviews/submit';
    const method = myReview ? 'PUT' : 'POST';

    try {
      const res = await fetch(endpoint, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          credential,
          rating,
          review_text: reviewText.trim(),
          gender,
          display_preference: displayPref,
          recaptcha_token: 'dev-mode',
        }),
      });
      const data = await res.json();

      if (data.success) {
        setSubmitMsg(data.message || 'Review submitted!');
        if (!myReview) {
          setRating(0);
          setReviewText('');
          setGender('');
          setDisplayPref('name');
        }
        loadReviews();
        loadMyReview();
      } else {
        setSubmitError(data.error || 'Submission failed');
      }
    } catch {
      setSubmitError('Network error. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  // ── Mark helpful ──
  const handleHelpful = async (reviewId: number) => {
    if (!user) return;
    const credential = sessionStorage.getItem('mg_credential');
    if (!credential) return;
    try {
      const res = await fetch(`/api/reviews/${reviewId}/helpful`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ credential }),
      });
      if (res.ok) loadReviews();
    } catch {}
  };

  // ══════════════════════════════════════════════════════════
  // RENDER
  // ══════════════════════════════════════════════════════════
  return (
    <div className="min-h-screen bg-[#FAFAF9] flex flex-col">
      <main className="flex-1 max-w-5xl mx-auto px-6 pt-32 pb-24 w-full">
        <Link href="/" className="text-emerald-500 flex items-center gap-2 mb-12 hover:underline">
          <ArrowLeft size={16} /> Back to Home
        </Link>

        {/* ── Header ── */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6 font-['Instrument_Serif',serif]">
            Client Reviews
          </h1>
          <p className="text-xl text-slate-600 mb-6 max-w-2xl mx-auto">
            Real experiences from people who have worked with us.
          </p>

          {avgRating && (
            <div className="flex items-center justify-center gap-3">
              <StarRating rating={Math.round(avgRating)} />
              <span className="text-3xl font-bold text-slate-900">{avgRating}</span>
              <span className="text-slate-500">({reviews.length} review{reviews.length !== 1 ? 's' : ''})</span>
            </div>
          )}
        </div>

        {/* ── Sign-In Area ── */}
        <div className="text-center mb-12">
          {!user ? (
            <div>
              {!googleReady ? (
                <p className="text-slate-400">Loading sign-in...</p>
              ) : isGoogleConfigured ? (
                <div className="flex justify-center">
                  <div ref={googleBtnRef}></div>
                </div>
              ) : (
                <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 max-w-md mx-auto text-left">
                  <p className="text-amber-800 font-medium mb-2">Google Sign-In not configured yet</p>
                  <p className="text-amber-700 text-sm mb-4">
                    To enable reviews, you need to set up a Google OAuth Client ID.
                    <br /><br />
                    1. Go to <a href="https://console.cloud.google.com" className="underline" target="_blank">Google Cloud Console</a>
                    <br />
                    2. Create an OAuth 2.0 Client ID for a Web Application
                    <br />
                    3. Add <code className="bg-amber-100 px-1 rounded">https://mindguide.fit</code> as an authorized origin
                    <br />
                    4. Paste the Client ID into this page's code and the backend .env
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="inline-flex items-center gap-3 bg-white border border-emerald-200 rounded-full px-6 py-2.5 text-emerald-700">
              <CheckCircle size={18} />
              <span>Signed in as <strong>{user.name}</strong></span>
              <button onClick={handleSignOut} className="text-slate-400 hover:text-slate-600 ml-2 text-sm underline">
                Sign out
              </button>
            </div>
          )}
        </div>

        {/* ── Write Review Button ── */}
        {user && !showForm && (
          <div className="text-center mb-12">
            <button
              onClick={() => setShowForm(true)}
              className="bg-emerald-500 text-white rounded-full px-8 py-3 text-base font-medium hover:bg-emerald-700 transition-colors shadow-sm"
            >
              {myReview ? 'Edit Your Review' : 'Write a Review'}
            </button>
          </div>
        )}

        {/* ── Review Form ── */}
        {user && showForm && (
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm mb-16 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-slate-900 mb-6 font-['Instrument_Serif',serif]">
              {myReview ? 'Edit Your Review' : 'Share Your Experience'}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Rating */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Your Rating</label>
                <StarRating rating={rating} setRating={setRating} interactive />
              </div>

              {/* Review text */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Your Review</label>
                <textarea
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  placeholder="Share your experience with Mind Guide..."
                  className="w-full border border-slate-200 rounded-2xl p-4 min-h-[120px] text-slate-700 focus:border-emerald-300 focus:ring-1 focus:ring-emerald-300 outline-none"
                  maxLength={2000}
                />
                <p className="text-xs text-slate-400 mt-1">{reviewText.length}/2000</p>
              </div>

              {/* Gender */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Gender</label>
                <div className="flex flex-wrap gap-3">
                  {[
                    { value: 'male', label: 'Male' },
                    { value: 'female', label: 'Female' },
                    { value: 'other', label: 'Other' },
                    { value: 'prefer_not', label: 'Prefer not to say' },
                  ].map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => setGender(opt.value)}
                      className={`px-4 py-2 rounded-full border text-sm transition-colors ${
                        gender === opt.value
                          ? 'bg-emerald-500 text-white border-emerald-500'
                          : 'bg-white text-slate-600 border-slate-200 hover:border-emerald-300'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Display Preference */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">How should we display your identity?</label>
                <div className="flex flex-wrap gap-3">
                  {[
                    { value: 'name', label: 'Show my name (e.g., Priya S.)' },
                    { value: 'gender', label: 'Show only my gender (e.g., Female Client)' },
                    { value: 'anonymous', label: 'Post anonymously' },
                  ].map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => setDisplayPref(opt.value)}
                      className={`px-4 py-2 rounded-full border text-sm transition-colors ${
                        displayPref === opt.value
                          ? 'bg-emerald-500 text-white border-emerald-500'
                          : 'bg-white text-slate-600 border-slate-200 hover:border-emerald-300'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Privacy notice */}
              <div className="bg-emerald-50 border border-emerald-100 p-4 rounded-2xl flex gap-3">
                <ShieldCheck className="text-emerald-500 shrink-0 mt-0.5" size={18} />
                <p className="text-sm text-emerald-800">
                  By submitting a review, you consent to having your testimonial displayed publicly according to your selected privacy preference. Your email address will never be shown.
                </p>
              </div>

              {/* Messages */}
              {submitMsg && (
                <div className="bg-green-50 border border-green-200 text-green-800 rounded-2xl p-4 text-sm">{submitMsg}</div>
              )}
              {submitError && (
                <div className="bg-red-50 border border-red-200 text-red-800 rounded-2xl p-4 text-sm">{submitError}</div>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-emerald-500 text-white rounded-full py-3.5 text-base font-bold hover:bg-emerald-700 transition-colors shadow-sm disabled:opacity-50"
              >
                {submitting ? 'Submitting...' : myReview ? 'Update Review' : 'Submit Review'}
              </button>
            </form>
          </div>
        )}

        {/* ── Reviews Grid ── */}
        {loading ? (
          <div className="text-center text-slate-400 py-12">Loading reviews...</div>
        ) : reviews.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-slate-500 text-lg mb-2">No reviews yet.</p>
            <p className="text-slate-400">Be the first to share your experience!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {reviews.map((review) => (
              <div
                key={review.id}
                className={`bg-white p-6 rounded-3xl border transition-all ${
                  review.is_featured
                    ? 'border-emerald-300 shadow-md ring-1 ring-emerald-100'
                    : 'border-slate-200 hover:border-emerald-200 hover:shadow-sm'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <StarRating rating={review.rating} />
                    {review.is_featured ? (
                      <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full font-medium">Featured</span>
                    ) : null}
                  </div>
                  <span className="text-xs text-slate-400">{formatDate(review.created_at)}</span>
                </div>

                <p className="text-slate-700 mb-4 leading-relaxed">{review.review_text}</p>

                <div className="flex items-center justify-between border-t border-slate-100 pt-4">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 text-sm font-bold">
                      {review.display_name.charAt(0)}
                    </div>
                    <div>
                      <span className="text-sm font-medium text-slate-800">{review.display_name}</span>
                      <span className="flex items-center gap-1 text-xs text-emerald-600">
                        <ShieldCheck size={12} /> Verified Client
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleHelpful(review.id)}
                    className="flex items-center gap-1.5 text-slate-400 hover:text-emerald-500 transition-colors text-sm"
                  >
                    <ThumbsUp size={16} />
                    {review.helpful_count > 0 && review.helpful_count}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
