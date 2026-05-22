"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Shield, AlertTriangle, IndianRupee, Clock, ArrowRight, Check, Copy } from "lucide-react";

const sessionTypes = [
  { id: "venting", title: "Emotional Support / Venting", duration: "45 mins", price: "₹499", desc: "A listening ear. For loneliness, overthinking, stress, heartbreak, burnout." },
  { id: "counselling", title: "Personal Counselling", duration: "50–60 mins", price: "₹999", desc: "Emotional exploration, behavioural patterns, coping tools, guided reflection." },
  { id: "deep-healing", title: "Deep Healing / Inner Work", duration: "75–90 mins", price: "₹1,800", desc: "Counselling + meditation + breath awareness + emotional release." },
  { id: "relationship", title: "Relationship Counselling", duration: "60–75 mins", price: "₹2,200", desc: "For couples — communication, trust, emotional disconnect, premarital guidance." },
  { id: "teen", title: "Teen & Student Counselling", duration: "45–50 mins", price: "₹800", desc: "Exam anxiety, low confidence, career confusion, social anxiety." },
  { id: "self-discovery", title: "Self-Discovery / Life Clarity", duration: "60 mins", price: "₹1,200", desc: "Understanding yourself — purpose, self-worth, identity, healing patterns." },
];

// REPLACE WITH YOUR ACTUAL CALENDLY LINK
const CALENDLY_URL = "https://calendly.com/mindguide-fit";

const UPI_ID = "gayathrigurrapu@axl"; // REPLACE WITH YOUR ACTUAL UPI ID

export default function BookingPage() {
  const [step, setStep] = useState<"select" | "pay" | "questions" | "schedule" | "done">("select");
  const [selected, setSelected] = useState<(typeof sessionTypes)[0] | null>(null);
  const [copied, setCopied] = useState(false);
  const [utr, setUtr] = useState("");

  // Intake questions
  const [fullName, setFullName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [occupation, setOccupation] = useState("");
  const [reason, setReason] = useState("");
  const [challenges, setChallenges] = useState("");

  const handleSelect = (session: (typeof sessionTypes)[0]) => {
    setSelected(session);
    setUtr("");
    setFullName("");
    setAge("");
    setGender("");
    setOccupation("");
    setReason("");
    setChallenges("");
    setStep("pay");
  };

  const handlePaid = () => {
    setStep("questions");
  };

  const handleQuestionsDone = () => {
    setStep("schedule");
  };

  const handleScheduled = () => {
    setStep("done");
  };

  const copyUpi = () => {
    navigator.clipboard.writeText(UPI_ID);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main className="min-h-screen bg-[#FAFAF9] pt-32 pb-20">
      <div className="max-w-4xl mx-auto px-6">
        <Link href="/" className="text-emerald-500 flex items-center gap-2 mb-8 hover:underline">
          <ArrowLeft size={16} /> Back to Home
        </Link>

        {/* Progress bar */}
        <div className="flex items-center gap-2 mb-12 justify-center">
          {(["select", "pay", "questions", "schedule", "done"] as const).map((s, i) => (
            <div key={s} className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                step === s ? "bg-emerald-500 text-white" : 
                ["select","pay","questions","schedule","done"].indexOf(step) > i ? "bg-emerald-200 text-emerald-800" : 
                "bg-slate-200 text-slate-400"
              }`}>{i + 1}</div>
              {i < 4 && <div className={`w-8 h-0.5 ${["select","pay","questions","schedule","done"].indexOf(step) > i ? "bg-emerald-300" : "bg-slate-200"}`} />}
            </div>
          ))}
        </div>
        <div className="flex justify-center gap-2 text-xs text-slate-400 mb-12 -mt-8">
          <span>Select</span><span>→</span><span>Pay</span><span>→</span><span>Questions</span><span>→</span><span>Schedule</span><span>→</span><span>Done</span>
        </div>

        {/* STEP 1: Select session */}
        {step === "select" && (
          <>
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 font-['Instrument_Serif',serif]">Book Your Session</h1>
              <p className="text-lg text-slate-600">Choose the session that fits where you are right now.</p>
            </div>
            <div className="grid md:grid-cols-2 gap-4 mb-12">
              {sessionTypes.map((s) => (
                <button
                  key={s.id}
                  onClick={() => handleSelect(s)}
                  className="text-left bg-white p-6 rounded-2xl border border-slate-200 hover:border-emerald-400 hover:shadow-md transition-all group"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-slate-900 group-hover:text-emerald-700">{s.title}</h3>
                    <span className="flex items-center gap-1 text-emerald-700 font-semibold text-sm shrink-0">{s.price}</span>
                  </div>
                  <p className="text-slate-600 text-sm mb-2">{s.desc}</p>
                  <div className="flex items-center gap-1 text-slate-400 text-xs">
                    <Clock size={12} /> {s.duration} · Online
                  </div>
                </button>
              ))}
            </div>
          </>
        )}

        {/* STEP 2: Pay (BEFORE scheduling) */}
        {step === "pay" && selected && (
          <>
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-slate-900 mb-2 font-['Instrument_Serif',serif]">Complete Payment</h2>
              <p className="text-slate-600">{selected.title} · <span className="font-semibold text-emerald-700">{selected.price}</span></p>
            </div>
            <div className="max-w-md mx-auto">
              {/* QR Code */}
              <div className="bg-white rounded-2xl p-8 border border-slate-200 text-center mb-6">
                <h3 className="font-bold text-slate-900 mb-4 text-lg">Scan with any UPI app</h3>
                <div className="bg-slate-100 rounded-xl p-4 inline-block mb-4">
                  <img src="/phonepe.jpeg" alt="PhonePe QR Code" className="w-48 h-48 object-contain mx-auto" />
                </div>
                <p className="text-slate-500 text-sm mb-4">PhonePe · Google Pay · Paytm · Any UPI</p>
                
                {/* UPI ID */}
                <div className="bg-slate-50 rounded-xl p-4 flex items-center justify-between gap-3">
                  <div className="text-left">
                    <p className="text-xs text-slate-400 mb-1">UPI ID</p>
                    <p className="text-slate-900 font-mono font-medium text-sm">{UPI_ID}</p>
                  </div>
                  <button onClick={copyUpi} className="flex items-center gap-1 text-emerald-500 hover:text-emerald-700 text-sm font-medium">
                    {copied ? <><Check size={16} /> Copied</> : <><Copy size={16} /> Copy</>}
                  </button>
                </div>
              </div>

              {/* Instructions */}
              <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-6 mb-6">
                <h4 className="font-bold text-emerald-900 mb-2">How it works</h4>
                <ol className="text-sm text-emerald-800 space-y-2 list-decimal pl-4">
                  <li>Scan the QR or pay to the UPI ID above</li>
                  <li>Enter the amount: <span className="font-semibold">{selected.price}</span></li>
                  <li>Copy the UTR / Transaction ID from your payment app</li>
                  <li>Paste it below to unlock scheduling</li>
                </ol>
              </div>

              {/* UTR Input */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  UTR / Transaction ID <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={utr}
                  onChange={(e) => setUtr(e.target.value)}
                  placeholder="Paste your transaction reference number"
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-colors text-sm"
                />
                <p className="text-xs text-slate-400 mt-2">You can find this in your UPI app under transaction history.</p>
              </div>

              <button
                onClick={handlePaid}
                disabled={!utr.trim()}
                className={`w-full rounded-full py-4 font-bold text-lg transition-colors flex items-center justify-center gap-2 ${
                  utr.trim()
                    ? "bg-emerald-500 text-white hover:bg-emerald-700"
                    : "bg-slate-200 text-slate-400 cursor-not-allowed"
                }`}
              >
                Confirm Payment & Continue <ArrowRight size={20} />
              </button>
            </div>
          </>
        )}

        {/* STEP 3: Quick Questions (after payment, before scheduling) */}
        {step === "questions" && selected && (
          <>
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-slate-900 mb-2 font-['Instrument_Serif',serif]">A Few Quick Questions</h2>
              <p className="text-slate-600">Help us understand you better before your session.</p>
            </div>
            <div className="max-w-xl mx-auto bg-white rounded-2xl p-8 border border-slate-200 space-y-6">
              {/* Full Name */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Your full name"
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-colors text-sm"
                />
              </div>

              {/* Age */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Age <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  placeholder="Your age"
                  min="1"
                  max="120"
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-colors text-sm"
                />
              </div>

              {/* Gender */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Gender <span className="text-slate-400 text-xs font-normal">(optional)</span>
                </label>
                <div className="flex gap-3 flex-wrap">
                  {["Male", "Female", "Non-binary", "Prefer not to say"].map((g) => (
                    <button
                      key={g}
                      type="button"
                      onClick={() => setGender(gender === g ? "" : g)}
                      className={`px-4 py-2 rounded-full text-sm border transition-colors ${
                        gender === g
                          ? "bg-emerald-500 text-white border-emerald-500"
                          : "bg-white text-slate-600 border-slate-300 hover:border-emerald-400"
                      }`}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </div>

              {/* Occupation */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Occupation / Student <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={occupation}
                  onChange={(e) => setOccupation(e.target.value)}
                  placeholder="e.g. Software Engineer, Student, Homemaker..."
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-colors text-sm"
                />
              </div>

              {/* Reason for seeking counselling */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  What made you decide to seek counselling right now? <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="Share what brought you here..."
                  rows={3}
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-colors text-sm resize-none"
                />
              </div>

              {/* Current challenges */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  What are the main challenges you are currently facing? <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={challenges}
                  onChange={(e) => setChallenges(e.target.value)}
                  placeholder="Describe what you're going through..."
                  rows={3}
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-colors text-sm resize-none"
                />
              </div>

              <button
                onClick={handleQuestionsDone}
                disabled={!fullName.trim() || !age.trim() || !occupation.trim() || !reason.trim() || !challenges.trim()}
                className={`w-full rounded-full py-4 font-bold text-lg transition-colors flex items-center justify-center gap-2 ${
                  fullName.trim() && age.trim() && occupation.trim() && reason.trim() && challenges.trim()
                    ? "bg-emerald-500 text-white hover:bg-emerald-700"
                    : "bg-slate-200 text-slate-400 cursor-not-allowed"
                }`}
              >
                Continue to Scheduling <ArrowRight size={20} />
              </button>
            </div>
          </>
        )}

        {/* STEP 4: Schedule (after questions) */}
        {step === "schedule" && selected && (
          <>
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-slate-900 mb-2 font-['Instrument_Serif',serif]">Pick Your Time</h2>
              <p className="text-slate-600">
                <span className="font-medium">{selected.title}</span> · {selected.duration}
              </p>
              <p className="text-emerald-600 text-sm mt-2">✅ Payment confirmed — UTR: {utr}</p>
            </div>
            <div className="bg-white rounded-2xl p-4 border border-slate-200 overflow-hidden">
              <iframe
                src={CALENDLY_URL}
                width="100%"
                height="650"
                frameBorder="0"
                title="Schedule a session"
                className="rounded-xl"
              />
            </div>
            <div className="text-center mt-6">
              <button onClick={handleScheduled} className="bg-emerald-500 text-white rounded-full px-8 py-3 font-medium hover:bg-emerald-700 transition-colors">
                I&apos;ve Scheduled My Session
              </button>
            </div>
          </>
        )}

        {/* STEP 5: Done */}
        {step === "done" && (
          <div className="max-w-lg mx-auto text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check size={40} className="text-green-500" />
            </div>
            <h2 className="text-3xl font-bold text-slate-900 mb-4 font-['Instrument_Serif',serif]">All Set!</h2>
            <p className="text-slate-600 text-lg mb-8">
              Your session is booked and payment is being verified. You&apos;ll receive a confirmation email with the Google Meet link shortly.
            </p>
            <div className="bg-white rounded-2xl p-6 border border-slate-200 mb-6 text-left">
              <h4 className="font-bold text-slate-900 mb-3">What happens next?</h4>
              <ul className="text-sm text-slate-600 space-y-2 list-disc pl-4">
                <li>We verify your payment (usually within 2-4 hours)</li>
                <li>You get a confirmation email with your session link</li>
                <li>Join the Google Meet at your scheduled time</li>
                <li>If there&apos;s any issue, we&apos;ll reach out via email</li>
              </ul>
            </div>
            <Link href="/" className="inline-block text-emerald-500 hover:text-emerald-700 font-medium">
              ← Back to Home
            </Link>
          </div>
        )}

        {/* Notes (shown on select step) */}
        {step === "select" && (
          <div className="grid md:grid-cols-2 gap-6 mt-8">
            <div className="bg-emerald-50 border border-emerald-100 p-6 rounded-2xl flex gap-4">
              <Shield className="text-emerald-500 shrink-0" size={24} />
              <div>
                <h3 className="font-bold text-emerald-900 mb-2">Confidentiality Note</h3>
                <p className="text-sm text-emerald-800">Your privacy matters. All sessions are completely confidential, and you may choose anonymous counselling.</p>
              </div>
            </div>
            <div className="bg-red-50 border border-red-100 p-6 rounded-2xl flex gap-4">
              <AlertTriangle className="text-red-600 shrink-0" size={24} />
              <div>
                <h3 className="font-bold text-red-900 mb-2">Important Note</h3>
                <p className="text-sm text-red-800">This is not emergency mental health support. If you are in crisis, contact local emergency services immediately.</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
