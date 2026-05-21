import Link from 'next/link';
import { ArrowLeft, Shield, AlertTriangle, IndianRupee } from 'lucide-react';

const sessionTypes = [
  {
    title: "Emotional Support / Venting",
    duration: "45 mins",
    price: "₹499 – ₹799",
    desc: "A listening ear. For loneliness, overthinking, stress, heartbreak, burnout.",
    color: "border-l-teal-400"
  },
  {
    title: "Personal Counselling",
    duration: "50–60 mins",
    price: "₹1,000 – ₹1,800",
    desc: "Emotional exploration, behavioural patterns, coping tools, guided reflection.",
    color: "border-l-teal-500"
  },
  {
    title: "Deep Healing / Inner Work",
    duration: "75–90 mins",
    price: "₹2,000 – ₹3,500",
    desc: "Counselling + meditation + breath awareness + emotional release. Premium transformation.",
    color: "border-l-teal-600"
  },
  {
    title: "Relationship Counselling",
    duration: "60–75 mins",
    price: "₹1,500 – ₹3,000",
    desc: "For couples — communication, trust, emotional disconnect, premarital guidance.",
    color: "border-l-teal-400"
  },
  {
    title: "Teen & Student Counselling",
    duration: "45–50 mins",
    price: "₹500 – ₹1,000",
    desc: "Exam anxiety, low confidence, career confusion, social anxiety. Affordable & relatable.",
    color: "border-l-teal-500"
  },
  {
    title: "Self-Discovery / Life Clarity",
    duration: "60 mins",
    price: "₹1,200 – ₹2,500",
    desc: "Understanding yourself — purpose, self-worth, identity, healing patterns.",
    color: "border-l-teal-600"
  }
];

const packages = [
  { name: "4 Sessions / Month", price: "₹3,500 – ₹5,500", desc: "Weekly sessions for consistent growth" },
  { name: "8-Session Healing Program", price: "₹8,000 – ₹15,000", desc: "Two-month structured deep-dive" },
  { name: "Meditation + Counselling Combo", price: "₹4,999+", desc: "Integrated inner work & therapy" }
];

export default function BookingPage() {
    return (
        <main className="min-h-screen bg-[#FAFAF9] pt-32 pb-20">
            <div className="max-w-4xl mx-auto px-6">
                <Link href="/" className="text-teal-600 flex items-center gap-2 mb-8 hover:underline">
                    <ArrowLeft size={16} /> Back to Home
                </Link>

                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 font-['Instrument_Serif',serif]">Book Your Session</h1>
                    <p className="text-lg text-slate-600">Choose the session that fits where you are right now.</p>
                </div>

                {/* Session Types */}
                <div className="bg-white rounded-2xl p-8 border border-slate-200 mb-8">
                    <h2 className="text-2xl font-bold mb-2 text-slate-900">Session Types</h2>
                    <p className="text-slate-500 text-sm mb-8">All sessions are online (Zoom / Google Meet). In-person sessions coming soon.</p>
                    
                    <div className="space-y-4 mb-8">
                        {sessionTypes.map((s) => (
                            <div key={s.title} className={`border-l-4 ${s.color} bg-slate-50 p-5 rounded-r-xl`}>
                                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-2">
                                    <h3 className="font-bold text-slate-900">{s.title}</h3>
                                    <span className="flex items-center gap-1 text-teal-700 font-semibold text-sm"><IndianRupee size={14} /> {s.price}</span>
                                </div>
                                <p className="text-slate-600 text-sm mb-1">{s.desc}</p>
                                <p className="text-slate-400 text-xs">Duration: {s.duration} | Online</p>
                            </div>
                        ))}
                    </div>

                    {/* Packages */}
                    <h2 className="text-2xl font-bold mb-6 text-slate-900">Healing Packages</h2>
                    <div className="grid md:grid-cols-3 gap-4 mb-8">
                        {packages.map((pkg) => (
                            <div key={pkg.name} className="bg-teal-50 border border-teal-200 p-5 rounded-xl text-center">
                                <h3 className="font-bold text-teal-900 mb-2">{pkg.name}</h3>
                                <p className="text-xl font-bold text-teal-700 mb-1">{pkg.price}</p>
                                <p className="text-teal-600 text-xs">{pkg.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="text-center mb-10 mt-12">
                    <p className="text-2xl text-teal-800 font-['Instrument_Serif',serif] italic">
                        "You don't need to have a big problem to talk. You just need a space to be heard."
                    </p>
                </div>

                {/* Calendly Embed Placeholder */}
                <div className="bg-white rounded-2xl p-8 border border-slate-200 mb-8 text-center">
                    <h2 className="text-2xl font-bold mb-4 text-slate-900">Select Date & Time</h2>
                    {/* REPLACE THIS DIV WITH YOUR CALENDLY EMBED CODE */}
                    <div className="bg-slate-100 h-64 flex items-center justify-center rounded-xl border-dashed border-2 border-slate-300 text-slate-500">
                        Calendly / Google Calendar Embed Goes Here
                    </div>
                </div>

                {/* Notes */}
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-teal-50 border border-teal-100 p-6 rounded-2xl flex gap-4">
                        <Shield className="text-teal-600 shrink-0" size={24} />
                        <div>
                            <h3 className="font-bold text-teal-900 mb-2">Confidentiality Note</h3>
                            <p className="text-sm text-teal-800">Your privacy matters. All sessions are completely confidential, and you may also choose anonymous counselling if you are not comfortable sharing your identity.</p>
                        </div>
                    </div>
                    <div className="bg-red-50 border border-red-100 p-6 rounded-2xl flex gap-4">
                        <AlertTriangle className="text-red-600 shrink-0" size={24} />
                        <div>
                            <h3 className="font-bold text-red-900 mb-2">Important Note</h3>
                            <p className="text-sm text-red-800">This is not emergency mental health support. If you are in crisis, please contact local emergency services immediately.</p>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
