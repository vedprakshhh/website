"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Shield, AlertTriangle, IndianRupee, Clock, ArrowRight, Check, Copy } from "lucide-react";

const sessionTypes = [
  { id: "consultation", title: "Consultation", duration: "30 mins", price: "₹399", desc: "A short first step to understand what you are experiencing and identify the most appropriate next step. Not a diagnosis, just clarity and guidance.", upiId: "mindguide@kotak", isSaturday: false },
  { id: "venting", title: "Emotional Support / Venting", duration: "45 mins", price: "₹499", desc: "A listening ear. For loneliness, overthinking, stress, heartbreak, burnout.", upiId: "mindguide@kotak", isSaturday: false },
  { id: "counselling", title: "Personal Counselling / Therapy", duration: "50-60 mins", price: "₹999", desc: "Emotional exploration, behavioural patterns, coping tools, guided reflection.", upiId: "mindguide@kotak", isSaturday: false },
  { id: "deep-healing", title: "Deep Healing / Inner Work", duration: "75-90 mins", price: "₹1,800", desc: "Counselling + meditation + breath awareness + emotional release.", upiId: "mindguide@kotak", isSaturday: false },
  { id: "relationship", title: "Relationship Counselling", duration: "60-75 mins", price: "₹2,200", desc: "For couples, communication, trust, emotional disconnect, premarital guidance.", upiId: "mindguide@kotak", isSaturday: false },
  { id: "teen", title: "Teen & Student Counselling", duration: "45-50 mins", price: "₹800", desc: "Exam anxiety, low confidence, career confusion, social anxiety.", upiId: "mindguide@kotak", isSaturday: false },
  { id: "self-discovery", title: "Self-Discovery / Life Clarity", duration: "60 mins", price: "₹1,200", desc: "Understanding yourself, purpose, self-worth, identity, healing patterns.", upiId: "mindguide@kotak", isSaturday: false },
  { id: "remedial", title: "Remedial Therapy", duration: "60-80 mins", price: "₹2,999", desc: "Attention enhancement, phonological awareness, behavioural modification, memory training.", upiId: "pathakotimadhurya-1@oksbi", isSaturday: false },
  { id: "art", title: "Art Therapy", duration: "45-50 mins", price: "₹499", desc: "Creative expression through drawing, painting, and activities to explore emotions in a safe, non-verbal way.", upiId: "pathakotimadhurya-1@oksbi", isSaturday: false },
  { id: "personal", title: "Personal Counselling", duration: "50-60 mins", price: "₹999", desc: "One-to-one guidance to understand personal challenges, build confidence, and achieve emotional well-being.", upiId: "pathakotimadhurya-1@oksbi", isSaturday: false },
  { id: "emotional", title: "Emotional Counselling", duration: "45 mins", price: "₹499", desc: "Identify, express, and manage emotions effectively with healthy coping skills for stress, anxiety, and life challenges.", upiId: "pathakotimadhurya-1@oksbi", isSaturday: false },
  { id: "cbt", title: "CBT (Cognitive Behaviour Therapy)", duration: "50-60 mins", price: "₹1,299", desc: "Identify negative thought patterns and change unhealthy behaviours to improve emotional balance and confidence.", upiId: "pathakotimadhurya-1@oksbi", isSaturday: false },
  { id: "pkg-4sessions", title: "4 Sessions / Month", duration: "4 sessions", price: "₹3,500", desc: "Weekly support for consistent growth. One session per week.", upiId: "mindguide@kotak", isSaturday: false },
  { id: "pkg-8sessions", title: "8 Sessions / Month", duration: "8 sessions / month", price: "₹6,999", desc: "Structured monthly deep-dive with guided transformation. 8 sessions every month.", upiId: "mindguide@kotak", isSaturday: false },
  { id: "pkg-combo", title: "Meditation + Counselling Combo", duration: "8 sessions / month", price: "₹4,999", desc: "Inner work paired with therapeutic guidance for holistic healing. 8 sessions per month, combining meditation and counselling.", upiId: "mindguide@kotak", isSaturday: false },
];

export default function BookingPage() {
  // Minimum selectable date for the preferred-date picker (today, local time)
  const todayStr = new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().split("T")[0];
  const [step, setStep] = useState<"select" | "pay" | "questions" | "slot" | "done">("select");
  const [selected, setSelected] = useState<(typeof sessionTypes)[0] | null>(null);
  const [copied, setCopied] = useState(false);
  const [utr, setUtr] = useState("");
  const [utrError, setUtrError] = useState("");
  const [utrValid, setUtrValid] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [apiError, setApiError] = useState("");
  const [fullName, setFullName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [occupation, setOccupation] = useState("");
  const [reason, setReason] = useState("");
  const [challenges, setChallenges] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [preferredTime, setPreferredTime] = useState("");
  const [preferredDate, setPreferredDate] = useState("");
  const [confirmingPaid, setConfirmingPaid] = useState(false);
  // Saturday Special Consultation state
  const [freeSlots, setFreeSlots] = useState<{ id: string; label: string; booked: boolean }[] | null>(null);
  const [freeSaturday, setFreeSaturday] = useState("");
  const [freeSaturdayLabel, setFreeSaturdayLabel] = useState("");
  const [freeAllBooked, setFreeAllBooked] = useState(false);
  const [freeSlotError, setFreeSlotError] = useState("");
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [confirmingFree, setConfirmingFree] = useState(false);
  const [freeBookedInfo, setFreeBookedInfo] = useState<{ saturday: string; slot_label: string } | null>(null);

  const copyUpi = (upiId: string) => {
    navigator.clipboard.writeText(upiId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Fire-and-forget: send stage data to backend for Telegram tracking
  const trackStage = (stage: string, extra: Record<string, string> = {}) => {
    const payload: Record<string, string> = { stage, ...extra };
    fetch("/api/track-stage", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }).catch(() => {}); // silent, best-effort tracking
  };

  const validateUtr = (value: string) => {
    // Strip spaces automatically
    const cleaned = value.replace(/\s/g, "");
    
    // Empty
    if (!cleaned) {
      setUtrError("");
      setUtrValid(false);
      return;
    }
    
    // Minimum length: 4 characters
    if (cleaned.length < 4) {
      setUtrError("Transaction ID must be at least 4 characters.");
      setUtrValid(false);
      return;
    }

    // Maximum length: 40 characters
    if (cleaned.length > 40) {
      setUtrError("Transaction ID must be at most 40 characters.");
      setUtrValid(false);
      return;
    }
    
    // Only alphanumeric, no special characters, no emojis
    if (!/^[A-Za-z0-9]+$/.test(cleaned)) {
      setUtrError("Transaction ID can only contain letters and numbers, no special characters.");
      setUtrValid(false);
      return;
    }
    

    // Reject all-same-character patterns (1111111111, aaaaaaaaaa, etc.)
    if (new Set(cleaned).size === 1) {
      setUtrError("Please enter a valid payment transaction ID / UTR number to confirm your counselling session.");
      setUtrValid(false);
      return;
    }
    
    // Reject purely sequential digits (1234567890, 0987654321, etc.)
    const digitsOnly = cleaned.replace(/[^0-9]/g, "");
    if (digitsOnly.length >= 8) {
      let asc = true, desc = true;
      for (let i = 0; i < digitsOnly.length - 1; i++) {
        if (parseInt(digitsOnly[i + 1]) !== parseInt(digitsOnly[i]) + 1) asc = false;
        if (parseInt(digitsOnly[i + 1]) !== parseInt(digitsOnly[i]) - 1) desc = false;
      }
      if (asc || desc) {
        setUtrError("Please enter a valid payment transaction ID / UTR number to confirm your counselling session.");
        setUtrValid(false);
        return;
      }
    }

    // Reject obvious fake patterns
    const lower = cleaned.toLowerCase();
    const fakePatterns = [
      /^test\d*$/, /^abc\d*$/, /^abcd\d*$/, /^demo\d*$/, /^sample\d*$/,
      /^fake\d*$/, /^paymentdone\d*$/, /^ok\d*$/, /^done\d*$/, /^paid\d*$/,
      /^utr\d*$/, /^txn\d*$/, /^txnid\d*$/, /^ref\d*$/, /^hello\d*$/,
      /^hi\d*$/, /^yes\d*$/, /^no\d*$/, /^xyz\d*$/, /^aaaa+$/, /^bbbb+$/,
      /^cccc+$/, /^dddd+$/, /^eeee+$/,
    ];
    for (const pat of fakePatterns) {
      if (pat.test(lower)) {
        setUtrError("Please enter a valid payment transaction ID / UTR number to confirm your counselling session.");
        setUtrValid(false);
        return;
      }
    }


    // Valid
    setUtrError("");
    setUtrValid(true);
  };

  const handleUtrChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUtr(value);
    validateUtr(value);
  };

  const handleSelect = (session: (typeof sessionTypes)[0]) => {
    setSelected(session);
    setUtr("");
    setUtrError("");
    setUtrValid(false);
    setVerifying(false);
    setApiError("");
    setFullName("");
    setAge("");
    setGender("");
    setOccupation("");
    setReason("");
    setChallenges("");
    setEmail("");
    setWhatsapp("");
    setPreferredTime("");
    setPreferredDate("");
    setConfirmingPaid(false);
    setFreeSlots(null);
    setFreeAllBooked(false);
    setFreeSlotError("");
    setSelectedSlot(null);
    setFreeBookedInfo(null);
    // Saturday Special Consultation is a paid offer (₹299, 25% off) so it also starts with payment
    setStep("pay");
    trackStage("session_selected", { session_type: session.title, session_price: session.price });
  };

  const handlePaid = async () => {
    if (!selected) return;
    setVerifying(true);
    setApiError("");

    try {
      const response = await fetch("/api/verify-booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          transaction_id: utr.replace(/\s/g, ""),
          session_type: selected.title,
          session_price: selected.price,
          user_name: "",
          user_age: "",
          user_gender: "",
          user_occupation: "",
          user_email: "",
          user_whatsapp: "",
          user_reason: "",
          user_challenges: "",
        }),
      });

      const data = await response.json();

      if (data.success) {
        setVerifying(false);
        setStep("questions");
        trackStage("payment_submitted", {
          session_type: selected.title,
          session_price: selected.price,
          transaction_id: utr.replace(/\s/g, ""),
        });
      } else {
        setApiError(data.error || "Verification failed. Please check your transaction ID.");
        setVerifying(false);
      }
    } catch {
      setApiError("Unable to verify payment right now. Please try again.");
      setVerifying(false);
    }
  };

  const loadFreeSlots = async () => {
    try {
      const response = await fetch("/api/free-consultation/slots");
      const data = await response.json();
      if (data.success) {
        setFreeSlots(data.slots);
        setFreeSaturday(data.saturday);
        setFreeSaturdayLabel(data.saturday_label);
        setFreeAllBooked(data.all_booked);
        setFreeSlotError(data.all_booked ? data.full_message : "");
      } else {
        setFreeSlotError("Unable to load slots. Please try again.");
      }
    } catch {
      setFreeSlotError("Unable to load slots. Please try again.");
    }
  };

  const confirmPaidBooking = async () => {
    if (!selected) return;
    setConfirmingPaid(true);
    setApiError("");
    try {
      const response = await fetch("/api/confirm-booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          transaction_id: utr.replace(/\s/g, ""),
          user_name: fullName,
          user_age: age,
          user_gender: gender,
          user_occupation: occupation,
          user_email: email,
          user_whatsapp: whatsapp,
          user_reason: reason,
          user_challenges: challenges,
          preferred_date: preferredDate,
          preferred_time: preferredTime,
        }),
      });
      const data = await response.json();
      if (data.success) {
        setStep("done");
      } else {
        setApiError(data.error || "Unable to confirm your booking. Please try again.");
      }
    } catch {
      setApiError("Unable to confirm your booking right now. Please try again.");
    } finally {
      setConfirmingPaid(false);
    }
  };

  const handleQuestionsDone = () => {
    trackStage("questions_completed", {
      session_type: selected?.title || "",
      session_price: selected?.price || "",
      transaction_id: utr.replace(/\s/g, ""),
      user_name: fullName,
      user_age: age,
      user_gender: gender,
      user_occupation: occupation,
      user_email: email,
      user_whatsapp: whatsapp,
      user_reason: reason,
      user_challenges: challenges,
    });
    if (selected?.isSaturday) {
      // Go to slot picker for Saturday special (no Calendly)
      loadFreeSlots();
      setStep("slot");
    } else {
      // Paid sessions: confirm straight away with the client's preferred date & time
      confirmPaidBooking();
    }
  };

  const handleFreeBook = async () => {
    if (!selectedSlot || !selected) return;
    setConfirmingFree(true);
    setFreeSlotError("");
    try {
      const response = await fetch("/api/free-consultation/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          slot_id: selectedSlot,
          transaction_id: utr.replace(/\s/g, ""),
          user_name: fullName,
          user_age: age,
          user_gender: gender,
          user_occupation: occupation,
          user_email: email,
          user_whatsapp: whatsapp,
          user_reason: reason,
          user_challenges: challenges,
          preferred_time: preferredTime,
        }),
      });
      const data = await response.json();
      if (data.success) {
        setFreeBookedInfo({ saturday: data.saturday, slot_label: data.slot_label });
        setStep("done");
      } else {
        setFreeSlotError(data.error || "Unable to book this slot. Please try again.");
        // Refresh availability in case the slot was taken
        loadFreeSlots();
      }
    } catch {
      setFreeSlotError("Unable to book right now. Please try again.");
    } finally {
      setConfirmingFree(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#FAFAF9] pt-32 pb-20">
      <div className="max-w-4xl mx-auto px-6">
        <Link href="/" className="text-emerald-500 flex items-center gap-2 mb-8 hover:underline">
          <ArrowLeft size={16} /> Back to Home
        </Link>

        {/* Progress bar */}
        <div className="flex items-center gap-2 mb-12 justify-center">
          {(selected?.isSaturday
            ? (["select", "pay", "questions", "slot", "done"] as string[])
            : (["select", "pay", "questions", "done"] as string[])
          ).map((s, i, arr) => (
            <div key={s} className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                step === s ? "bg-emerald-500 text-white" : 
                arr.indexOf(step as string) > i ? "bg-emerald-200 text-emerald-800" : 
                "bg-slate-200 text-slate-400"
              }`}>{i + 1}</div>
              {i < arr.length - 1 && <div className={`w-8 h-0.5 ${arr.indexOf(step as string) > i ? "bg-emerald-300" : "bg-slate-200"}`} />}
            </div>
          ))}
        </div>
        <div className="flex justify-center gap-2 text-xs text-slate-400 mb-12 -mt-8">
          {selected?.isSaturday ? (
            <><span>Select</span><span>→</span><span>Pay</span><span>→</span><span>Questions</span><span>→</span><span>Slot</span><span>→</span><span>Done</span></>
          ) : (
            <><span>Select</span><span>→</span><span>Pay</span><span>→</span><span>Questions</span><span>→</span><span>Done</span></>
          )}
        </div>

        {/* STEP 1: Select session */}
        {step === "select" && (
          <>
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 font-['Instrument_Serif',serif]">Book Your Session</h1>
              <p className="text-lg text-slate-600">Choose the session that fits where you are right now.</p>
            </div>

            {/* Consultation - separate first step option */}
            <div className="mb-10">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-slate-900 font-['Instrument_Serif',serif] mb-2">Consultation</h2>
                <p className="text-slate-500 text-sm max-w-2xl mx-auto">
                  Not sure whether you need therapy, counselling, or simply someone to help you understand what you are going through? Start here.
                </p>
              </div>
              {sessionTypes.filter(s => s.id === "consultation").map((s) => (
                <button
                  key={s.id}
                  onClick={() => handleSelect(s)}
                  className="w-full text-left bg-emerald-50 p-6 md:p-8 rounded-2xl border-2 border-emerald-200 hover:border-emerald-500 hover:shadow-md transition-all group"
                >
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-3 mb-3">
                    <div>
                      <h3 className="font-bold text-slate-900 text-xl group-hover:text-emerald-700 mb-1">{s.title}</h3>
                      <p className="text-emerald-700 text-sm font-medium">First step · clarity before commitment</p>
                    </div>
                    <span className="text-emerald-700 font-bold text-lg shrink-0">{s.price}</span>
                  </div>
                  <p className="text-slate-600 text-sm mb-3 leading-relaxed">{s.desc}</p>
                  <p className="text-slate-500 text-sm mb-3 leading-relaxed">
                    You can openly talk about what you are experiencing. The professional will help you understand your concerns and discuss what kind of support may be appropriate, such as counselling, psychological therapy, further assessment, a specific intervention, or simply guidance at this stage. The consultation helps us understand your concerns and identify the most appropriate next step.
                  </p>
                  <div className="flex items-center gap-1 text-slate-400 text-xs">
                    <Clock size={12} /> {s.duration} · Online
                  </div>
                </button>
              ))}
            </div>

            {/* Individual sessions */}
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-slate-900 font-['Instrument_Serif',serif] mb-2">Sessions</h2>
              <p className="text-slate-500 text-sm mb-6">Choose a focused session if you already know the support you need.</p>
            </div>
            <div className="grid md:grid-cols-2 gap-4 mb-12">
              {sessionTypes.filter(s => s.id !== "consultation" && s.id !== "free-saturday" && !s.id.startsWith("pkg-")).map((s) => (
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

            {/* Healing Packages */}
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-slate-900 font-['Instrument_Serif',serif] mb-2">Healing Packages</h2>
              <p className="text-slate-500 text-sm mb-6">Commit to your growth with structured programs.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
              {sessionTypes.filter(s => s.id.startsWith("pkg-")).map((s) => (
                <button
                  key={s.id}
                  onClick={() => handleSelect(s)}
                  className="text-left bg-emerald-50 border border-emerald-100 hover:border-emerald-400 hover:shadow-md rounded-2xl p-6 text-center transition-all group"
                >
                  <h3 className="font-bold text-slate-900 group-hover:text-emerald-700 mb-2">{s.title}</h3>
                  <p className="text-2xl font-bold text-emerald-600 mb-1">{s.price}</p>
                  <p className="text-slate-500 text-sm">{s.desc}</p>
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
              {selected.isSaturday && (
                <p className="text-emerald-600 text-sm mt-2">
                  Special Saturday offer, 25% off: <span className="line-through text-slate-400">₹399</span>{" "}
                  <span className="font-semibold">₹299 only</span>
                </p>
              )}
            </div>
            <div className="max-w-md mx-auto">
              {/* QR Code */}
              <div className="bg-white rounded-2xl p-8 border border-slate-200 text-center mb-6">
                <h3 className="font-bold text-slate-900 mb-4 text-lg">Scan with any UPI app</h3>
                <div className="bg-slate-100 rounded-xl p-4 inline-block mb-4">
                  <img src={selected.upiId === "pathakotimadhurya-1@oksbi" ? "/pathakoti-qr.jpeg" : "/phonepe.jpeg"} alt="UPI QR Code" className="w-48 h-48 object-contain mx-auto" />
                </div>
                <p className="text-slate-500 text-sm mb-4">PhonePe · Google Pay · Paytm · Any UPI</p>
                
                {/* UPI ID */}
                <div className="bg-slate-50 rounded-xl p-4 flex items-center justify-between gap-3">
                  <div className="text-left">
                    <p className="text-xs text-slate-400 mb-1">UPI ID</p>
                    <p className="text-slate-900 font-mono font-medium text-sm">{selected.upiId}</p>
                  </div>
                  <button onClick={() => copyUpi(selected.upiId)} className="flex items-center gap-1 text-emerald-500 hover:text-emerald-700 text-sm font-medium">
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
                <div className="relative">
                  <input
                    type="text"
                    value={utr}
                    onChange={handleUtrChange}
                    placeholder="Paste your transaction reference number"
                    className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-colors text-sm pr-10 ${
                      utr.trim() && utrValid ? "border-green-400 bg-green-50" : 
                      utrError ? "border-red-300 bg-red-50 focus:ring-red-500 focus:border-red-500" : 
                      "border-slate-300"
                    }`}
                  />
                  {utr.trim() && utrValid && (
                    <Check size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500" />
                  )}
                  {utrError && (
                    <AlertTriangle size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-red-400" />
                  )}
                </div>
                {utrError && (
                  <p className="text-xs text-red-500 mt-2 flex items-center gap-1">
                    {utrError}
                  </p>
                )}
                {apiError && (
                  <p className="text-xs text-red-500 mt-2 flex items-center gap-1">
                    ⚠ {apiError}
                  </p>
                )}
                {!utrError && !apiError && utrValid && (
                  <p className="text-xs text-green-600 mt-2">✓ Transaction ID format looks valid</p>
                )}
                {!utrError && !utrValid && (
                  <p className="text-xs text-slate-400 mt-2">You can find this in your UPI app under transaction history.</p>
                )}
              </div>

              <button
                onClick={handlePaid}
                disabled={!utrValid || verifying}
                className={`w-full rounded-full py-4 font-bold text-lg transition-colors flex items-center justify-center gap-2 ${
                  utrValid && !verifying
                    ? "bg-emerald-500 text-white hover:bg-emerald-700"
                    : "bg-slate-200 text-slate-400 cursor-not-allowed"
                }`}
              >
                {verifying ? (
                  <>Verifying Payment <span className="animate-spin">⏳</span></>
                ) : (
                  <>Confirm Payment & Continue <ArrowRight size={20} /></>
                )}
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

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Gmail <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your.email@gmail.com"
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-colors text-sm"
                />
              </div>

              {/* Mobile Number */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Mobile Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(e.target.value)}
                  placeholder="+91 98765 43210"
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-colors text-sm"
                />
                <p className="text-xs text-slate-400 mt-1">We use this to contact you and arrange your session time.</p>
              </div>

              {/* Preferred Time (Saturday special consultation only) */}
              {selected?.isSaturday && (
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Preferred Time <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={preferredTime}
                    onChange={(e) => setPreferredTime(e.target.value)}
                    placeholder="e.g. 11 AM, 3 PM, after 6 PM..."
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-colors text-sm"
                  />
                  <p className="text-xs text-slate-400 mt-1">Tell us a time that works best for you on Saturday, and we will try our best to match it.</p>
                </div>
              )}

              {/* Preferred Date & Time (paid sessions; we arrange the exact time by call) */}
              {!selected?.isSaturday && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Preferred Date <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      min={todayStr}
                      value={preferredDate}
                      onChange={(e) => setPreferredDate(e.target.value)}
                      className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-colors text-sm"
                    />
                    <p className="text-xs text-slate-400 mt-1">Pick a date that suits you, and we will confirm it with you by phone.</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Preferred Time <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={preferredTime}
                      onChange={(e) => setPreferredTime(e.target.value)}
                      placeholder="e.g. 11 AM, 3 PM, after 6 PM..."
                      className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-colors text-sm"
                    />
                    <p className="text-xs text-slate-400 mt-1">Tell us the time that works best for you on that date.</p>
                  </div>
                </>
              )}

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

              {apiError && !selected?.isSaturday && (
                <p className="text-sm text-red-500 text-center">{apiError}</p>
              )}

              <button
                onClick={handleQuestionsDone}
                disabled={
                  !fullName.trim() || !age.trim() || !occupation.trim() || !email.trim() || !whatsapp.trim() || !reason.trim() || !challenges.trim() ||
                  (selected?.isSaturday ? !preferredTime.trim() : !preferredDate.trim() || !preferredTime.trim()) ||
                  confirmingPaid
                }
                className={`w-full rounded-full py-4 font-bold text-lg transition-colors flex items-center justify-center gap-2 ${
                  fullName.trim() && age.trim() && occupation.trim() && email.trim() && whatsapp.trim() && reason.trim() && challenges.trim() &&
                  (selected?.isSaturday ? preferredTime.trim() : preferredDate.trim() && preferredTime.trim()) && !confirmingPaid
                    ? "bg-emerald-500 text-white hover:bg-emerald-700"
                    : "bg-slate-200 text-slate-400 cursor-not-allowed"
                }`}
              >
                {selected?.isSaturday ? (
                  "Continue to Slot Selection"
                ) : confirmingPaid ? (
                  <>Confirming Your Booking <span className="animate-spin">⏳</span></>
                ) : (
                  <>Confirm My Booking <ArrowRight size={20} /></>
                )}
              </button>
            </div>
          </>
        )}

        {/* STEP 4: Saturday slot picker (paid offer) */}
        {step === "slot" && selected?.isSaturday && (
          <>
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-slate-900 mb-2 font-['Instrument_Serif',serif]">Pick Your Saturday Slot</h2>
              <p className="text-slate-600">
                Saturday Special Consultation · <span className="font-medium text-emerald-700">{freeSaturdayLabel || freeSaturday}</span>
              </p>
              <p className="text-emerald-600 text-sm mt-2">✅ Payment received: ₹299 (25% off). First come, first served.</p>
              <p className="text-slate-500 text-sm mt-2">We will call you on your mobile number to confirm the exact time, keeping your preferred time in mind. The 3 slots never overlap.</p>
            </div>

            {freeAllBooked ? (
              <div className="max-w-xl mx-auto bg-amber-50 border border-amber-200 rounded-2xl p-8 text-center">
                <p className="text-amber-900 font-medium">{freeSlotError}</p>
                <p className="text-slate-500 text-sm mt-3">
                  Saturday offer slots reset every Saturday. Please check again for next Saturday, or email us at mindguide.fit@gmail.com to arrange a refund or another session.
                </p>
              </div>
            ) : (
              <div className="max-w-xl mx-auto">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                  {(freeSlots || []).map((slot) => {
                    const isSelected = selectedSlot === slot.id;
                    const disabled = slot.booked;
                    return (
                      <button
                        key={slot.id}
                        onClick={() => !disabled && setSelectedSlot(slot.id)}
                        disabled={disabled}
                        className={`p-6 rounded-2xl border-2 text-center transition-all ${
                          disabled
                            ? "bg-slate-50 border-slate-200 text-slate-300 cursor-not-allowed"
                            : isSelected
                            ? "bg-emerald-500 border-emerald-500 text-white shadow-lg"
                            : "bg-white border-slate-200 hover:border-emerald-400 hover:shadow-md"
                        }`}
                      >
                        <div className="text-lg font-bold mb-1">{slot.label}</div>
                        <div className={`text-xs ${disabled ? "text-slate-400" : isSelected ? "text-emerald-100" : "text-slate-400"}`}>
                          {disabled ? "Booked" : "Available"}
                        </div>
                      </button>
                    );
                  })}
                </div>

                {freeSlotError && (
                  <p className="text-sm text-red-500 mb-4 text-center">{freeSlotError}</p>
                )}

                <button
                  onClick={handleFreeBook}
                  disabled={!selectedSlot || confirmingFree}
                  className={`w-full rounded-full py-4 font-bold text-lg transition-colors flex items-center justify-center gap-2 ${
                    selectedSlot && !confirmingFree
                      ? "bg-emerald-500 text-white hover:bg-emerald-700"
                      : "bg-slate-200 text-slate-400 cursor-not-allowed"
                  }`}
                >
                  {confirmingFree ? (
                    <>Confirming <span className="animate-spin">⏳</span></>
                  ) : (
                    <>Confirm My Saturday Slot <ArrowRight size={20} /></>
                  )}
                </button>
                <p className="text-xs text-slate-400 text-center mt-4">
                  Only 3 slots every Saturday at ₹299 (25% off the usual ₹399). Your slot is reserved the moment you confirm.
                </p>
              </div>
            )}
          </>
        )}

        {/* STEP 5: Done */}
        {step === "done" && (
          <div className="max-w-lg mx-auto text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check size={40} className="text-green-500" />
            </div>
            <h2 className="text-3xl font-bold text-slate-900 mb-4 font-['Instrument_Serif',serif]">All Set!</h2>
            {selected?.isSaturday && freeBookedInfo ? (
              <>
                <p className="text-slate-600 text-lg mb-8">
                  Your Saturday Special consultation is confirmed for <span className="font-semibold text-emerald-700">{freeBookedInfo.slot_label}</span> on <span className="font-semibold text-emerald-700">{freeBookedInfo.saturday}</span>.
                </p>
                <div className="bg-white rounded-2xl p-6 border border-slate-200 mb-6 text-left">
                  <h4 className="font-bold text-slate-900 mb-3">What happens next?</h4>
                  <ul className="text-sm text-slate-600 space-y-2 list-disc pl-4">
                    <li>We will call you on your mobile number to confirm the exact time, keeping your preferred time in mind</li>
                    <li>You will receive a confirmation email with your joining link</li>
                    <li>You paid ₹299 for this 30-minute consultation, 25% off the usual ₹399 (special Saturday offer)</li>
                    <li>If there is any issue, we will reach out via email or WhatsApp</li>
                  </ul>
                </div>
              </>
            ) : (
              <>
                <p className="text-slate-600 text-lg mb-8">
                  Your booking is confirmed. We will call you to fix the exact session time around your preference.
                </p>
                <div className="bg-white rounded-2xl p-6 border border-slate-200 mb-6 text-left">
                  <h4 className="font-bold text-slate-900 mb-3">Your preferred slot</h4>
                  {preferredDate && (
                    <p className="text-slate-700 mb-1">📅 {new Date(preferredDate + "T00:00:00").toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long" })}</p>
                  )}
                  {preferredTime && (
                    <p className="text-slate-700 mb-4">🕐 Around {preferredTime}</p>
                  )}
                  <h4 className="font-bold text-slate-900 mb-3">What happens next?</h4>
                  <ul className="text-sm text-slate-600 space-y-2 list-disc pl-4">
                    <li>We verify your payment (usually within 2-4 hours)</li>
                    <li>We call you to confirm the exact session date and time</li>
                    <li>You receive an email with your session joining link</li>
                    <li>If there is any issue, we will reach out via email or WhatsApp</li>
                  </ul>
                </div>
              </>
            )}
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
