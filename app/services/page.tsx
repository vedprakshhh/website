import Link from 'next/link';
import { ArrowLeft, Heart, MessageCircle, Sparkles, Users, GraduationCap, Compass, Clock, IndianRupee, Shield } from 'lucide-react';
import Footer from '../components/Footer';

const services = [
  {
    icon: <Heart size={28} />,
    title: "Emotional Support / Venting Session",
    duration: "45 mins",
    price: "₹499 – ₹799",
    ideal: "Loneliness, overthinking, emotional confusion, stress, heartbreak, burnout",
    description: "A space where you can simply be heard. No agenda, no diagnosis — just someone present with you as you process what you're feeling. Sometimes the most healing thing is being truly listened to.",
    positioning: "Entry-level — for anyone who needs a listening ear"
  },
  {
    icon: <MessageCircle size={28} />,
    title: "Personal Counselling / Therapy",
    duration: "50–60 mins",
    price: "₹1,000 – ₹1,800",
    ideal: "Emotional exploration, behavioural patterns, self-awareness, coping",
    description: "Your main therapeutic space. We explore emotional landscapes, identify recurring patterns, and build practical coping tools. Includes guided reflection and actionable insights you can carry into your week.",
    positioning: "Core offering — deep, consistent therapeutic work"
  },
  {
    icon: <Sparkles size={28} />,
    title: "Deep Healing / Inner Work",
    duration: "75–90 mins",
    price: "₹2,000 – ₹3,500",
    ideal: "Those ready for transformation beyond traditional talk therapy",
    description: "This is what sets this practice apart. We combine counselling with meditation, inner engineering concepts, breath awareness, and emotional release techniques. It's not just about managing symptoms — it's about rewiring your inner world.",
    positioning: "Premium — Holistic Emotional Healing & Inner Clarity"
  },
  {
    icon: <Users size={28} />,
    title: "Relationship Counselling",
    duration: "60–75 mins",
    price: "₹1,500 – ₹3,000",
    ideal: "Couples, communication issues, emotional disconnect, trust, premarital guidance",
    description: "Relationships are where our deepest patterns surface. Whether you're navigating conflict, rebuilding trust, or preparing for marriage — these sessions create a neutral space where both voices are heard and understood.",
    positioning: "High-demand — emotionally intensive couple work"
  },
  {
    icon: <GraduationCap size={28} />,
    title: "Teen & Student Counselling",
    duration: "45–50 mins",
    price: "₹500 – ₹1,000",
    ideal: "Exam anxiety, low confidence, emotional instability, career confusion, social anxiety",
    description: "The teenage and early-adult years are overwhelming. This is affordable, relatable support — a space where students can talk about pressure, identity, and the future without judgment.",
    positioning: "Accessible — priced for students who need support now"
  },
  {
    icon: <Compass size={28} />,
    title: "Self-Discovery / Life Clarity",
    duration: "60 mins",
    price: "₹1,200 – ₹2,500",
    ideal: "Understanding yourself, emotional intelligence, purpose, self-worth, identity",
    description: "A signature offering for those who feel lost in their own life. We work on self-understanding, emotional intelligence, and uncovering the patterns that keep you stuck. This is not advice — it's guided self-awareness.",
    positioning: "Signature niche — for seekers, not just sufferers"
  }
];

const packages = [
  { name: "4 Sessions / Month", price: "₹3,500 – ₹5,500", desc: "Weekly sessions for consistent emotional support and growth. Best for ongoing personal counselling.", color: "bg-sky-50 border-sky-200 text-sky-900" },
  { name: "8-Session Healing Program", price: "₹8,000 – ₹15,000", desc: "A structured two-month deep-dive. Includes goal-setting, progress tracking, and an integrated approach across modalities.", color: "bg-sky-100 border-sky-300 text-sky-900" },
  { name: "Meditation + Counselling Combo", price: "₹4,999+", desc: "Inner work paired with therapeutic guidance. Combines breath work, meditation, and counselling in a single integrated session series.", color: "bg-sky-900 border-sky-800 text-white" }
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-[#FAFAF9] flex flex-col">
      <main className="flex-1 max-w-5xl mx-auto px-6 pt-32 pb-24">
        <Link href="/" className="text-sky-500 flex items-center gap-2 mb-12 hover:underline">
          <ArrowLeft size={16} /> Back to Home
        </Link>

        <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6 font-['Instrument_Serif',serif]">
          Services & Pricing
        </h1>
        <p className="text-xl text-slate-600 mb-6 max-w-2xl">
          Every session is designed for where you are right now — whether you just need to vent, or you're ready for deep inner transformation.
        </p>
        <p className="text-slate-500 text-sm mb-16 max-w-2xl italic">
          All sessions are online. In-person sessions coming soon.
        </p>

        {/* Individual Services */}
        <div className="space-y-8 mb-20">
          {services.map((svc, i) => (
            <div key={i} className="bg-white p-8 md:p-10 rounded-3xl border border-slate-200 hover:border-sky-300 hover:shadow-md transition-all">
              <div className="flex flex-col md:flex-row md:items-start gap-6">
                <div className="bg-sky-50 text-sky-500 w-16 h-16 rounded-2xl flex items-center justify-center shrink-0">
                  {svc.icon}
                </div>
                <div className="flex-1">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-3">
                    <h2 className="text-2xl font-bold text-slate-900">{svc.title}</h2>
                    <span className="bg-sky-50 text-sky-700 text-xs font-semibold px-3 py-1 rounded-full whitespace-nowrap">{svc.positioning}</span>
                  </div>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500 mb-4">
                    <span className="flex items-center gap-1"><Clock size={14} /> {svc.duration}</span>
                    <span className="flex items-center gap-1 font-semibold text-slate-800"><IndianRupee size={14} /> {svc.price}</span>
                  </div>
                  <p className="text-slate-600 mb-3">{svc.description}</p>
                  <p className="text-slate-400 text-sm"><span className="font-medium text-slate-500">Ideal for:</span> {svc.ideal}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Packages */}
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 font-['Instrument_Serif',serif] text-center">Healing Packages</h2>
        <p className="text-slate-500 text-center mb-12">Commit to your growth with a structured program.</p>
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {packages.map((pkg) => (
            <div key={pkg.name} className={`${pkg.color} p-8 rounded-3xl border text-center hover:shadow-lg transition-shadow`}>
              <h3 className="text-xl font-bold mb-3">{pkg.name}</h3>
              <p className="text-3xl font-bold mb-2 opacity-90">{pkg.price}</p>
              <p className="text-sm opacity-80">{pkg.desc}</p>
            </div>
          ))}
        </div>

        {/* Note */}
        <div className="bg-sky-50 border border-sky-100 p-6 rounded-2xl flex gap-4 mb-12">
          <Shield className="text-sky-500 shrink-0" size={24} />
          <div>
            <h3 className="font-bold text-sky-900 mb-2">Confidentiality & Safety</h3>
            <p className="text-sm text-sky-800">All sessions are completely confidential. Anonymous counselling is available if you're not comfortable sharing your identity. This is a judgment-free space.</p>
          </div>
        </div>

        <div className="text-center">
          <Link href="/book" className="inline-block bg-sky-500 text-white rounded-full px-10 py-4 text-lg font-bold hover:bg-sky-700 transition-colors shadow-sm">
            Book Your Session
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
