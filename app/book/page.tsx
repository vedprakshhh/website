import Link from 'next/link';
import { ArrowLeft, Shield, AlertTriangle } from 'lucide-react';

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
                    <p className="text-lg text-slate-600">Taking the first step can feel difficult—we’re here to make it easier.</p>
                </div>

                {/* Session Details & Pricing */}
                <div className="bg-white rounded-2xl p-8 border border-slate-200 mb-8">
                    <h2 className="text-2xl font-bold mb-6 text-slate-900">Session Details</h2>
                    <div className="grid md:grid-cols-2 gap-6 mb-8">
                        <div className="bg-teal-50 p-6 rounded-xl">
                            <p className="font-semibold text-teal-800 mb-2">Duration & Mode</p>
                            <p className="text-teal-700">30–40 minutes | Online (Zoom/Meet)</p>
                        </div>
                        <div className="bg-teal-50 p-6 rounded-xl">
                            <p className="font-semibold text-teal-800 mb-2">Types of Sessions</p>
                            <p className="text-teal-700">Structured / Flexible | Anonymous Available</p>
                        </div>
                    </div>

                    <h2 className="text-2xl font-bold mb-6 text-slate-900">Choose Your Counsellor</h2>
                    <div className="grid md:grid-cols-2 gap-6 mb-8">
                        <div className="border border-slate-200 p-6 rounded-xl hover:shadow-md transition">
                            <h3 className="font-bold text-lg text-slate-900 mb-2">👉 Gayathri Gurrapu</h3>
                            <p className="text-slate-500 text-sm mb-4">(Student, Teen & Women Counselling)</p>
                            <ul className="space-y-2 text-sm text-slate-600">
                                <li className="flex justify-between border-b border-slate-100 pb-2">
                                    <span>🎓 Student Counselling:</span> 
                                    <span className="font-semibold">₹499 – ₹699</span>
                                </li>
                                <li className="flex justify-between">
                                    <span>👩 Women/General:</span> 
                                    <span className="font-semibold">₹699 – ₹999</span>
                                </li>
                            </ul>
                        </div>
                        <div className="border border-slate-200 p-6 rounded-xl hover:shadow-md transition">
                            <h3 className="font-bold text-lg text-slate-900 mb-2">👉 Madurya Pathakoti</h3>
                            <p className="text-slate-500 text-sm mb-4">(Child Counselling & Behavioural Therapy)</p>
                            <ul className="space-y-2 text-sm text-slate-600">
                                <li className="flex justify-between border-b border-slate-100 pb-2">
                                    <span>🧒 Child Counselling:</span> 
                                    <span className="font-semibold">₹999 – ₹1499</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                    
                    <div className="bg-slate-50 border border-slate-200 p-6 rounded-xl">
                        <h3 className="font-bold text-lg text-slate-900 mb-2">📊 Research Guidance</h3>
                        <ul className="space-y-2 text-sm text-slate-600">
                            <li className="flex justify-between border-b border-slate-100 pb-2">
                                <span>Basic consultation:</span> 
                                <span className="font-semibold">₹499</span>
                            </li>
                            <li className="flex justify-between">
                                <span>Full guidance:</span> 
                                <span className="font-semibold">₹1500 – ₹5000 (depends on work)</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="text-center mb-10 mt-12">
                    <p className="text-2xl text-teal-800 font-['Instrument_Serif',serif] italic">
                        “You don’t need to have a big problem to talk. You just need a space to be heard.”
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