"use client";

import Link from 'next/link';

export default function HeroSection() {
  return (
    <div className="min-h-screen relative flex flex-col bg-gradient-to-br from-[#FAFAF9] via-[#E6F3F2] to-[#CCEDEA] overflow-hidden">
      {/* Navbar */}
      <nav className="relative z-20 px-6 py-6 max-w-7xl mx-auto w-full">
        <div className="flex justify-between items-center bg-white/60 backdrop-blur-md rounded-full px-8 py-4 shadow-sm border border-white/40">
          <div className="flex items-center gap-2">
            <span className="text-slate-900 font-bold text-xl tracking-tight">Mindguide</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-slate-600 hover:text-teal-700 text-sm font-medium transition-colors">Home</Link>
            <Link href="/about" className="text-slate-600 hover:text-teal-700 text-sm font-medium transition-colors">About</Link>
            <Link href="/counsellors" className="text-slate-600 hover:text-teal-700 text-sm font-medium transition-colors">Counsellors</Link>
            <Link href="/services" className="text-slate-600 hover:text-teal-700 text-sm font-medium transition-colors">Services</Link>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/book" className="bg-teal-600 rounded-full px-6 py-2.5 text-white text-sm font-medium hover:bg-teal-700 transition-colors shadow-sm">
              Book Session
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Content */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 py-12 text-center -translate-y-[10%]">
        <h1 className="text-6xl md:text-7xl lg:text-8xl text-slate-900 tracking-tight font-['Instrument_Serif',serif] mb-6">
          Mindguide
        </h1>
        <p className="text-2xl md:text-3xl text-teal-800 font-['Instrument_Serif',serif] mb-10 italic">
          See Clearly. Feel Deeply. Grow Meaningfully.
        </p>
        
        <p className="text-slate-600 text-base md:text-lg max-w-2xl mb-10 leading-relaxed">
          Mindguide is a psychology-based platform dedicated to counselling, research, and emotional well-being. We provide a safe and understanding space where individuals can express themselves freely and gain clarity in their thoughts and lives.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4">
          <Link href="/book" className="bg-teal-600 rounded-full px-8 py-3.5 text-white text-base font-medium hover:bg-teal-700 transition-colors shadow-sm w-full sm:w-auto">
            Book a Session
          </Link>
          <Link href="/services" className="bg-white text-teal-700 rounded-full px-8 py-3.5 text-base font-medium hover:bg-teal-50 transition-colors shadow-sm border border-teal-100 w-full sm:w-auto">
            Explore Services
          </Link>
        </div>
      </div>
    </div>
  );
}