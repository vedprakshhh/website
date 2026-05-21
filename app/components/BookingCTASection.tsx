"use client";

import Link from 'next/link';

export default function BookingCTASection() {
  return (
    <section className="bg-teal-900 py-24 px-6">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl text-white font-['Instrument_Serif',serif] mb-4">
          Ready to begin?
        </h2>
        <p className="text-teal-200 text-lg mb-10 max-w-xl mx-auto">
          Whether you need to vent, heal, or discover yourself — there's a session for where you are.
        </p>
        
        <div className="flex flex-wrap justify-center gap-6 mb-12">
          <div className="bg-white/10 backdrop-blur px-4 py-2 rounded-full text-teal-100 text-sm">
            💻 All sessions online
          </div>
          <div className="bg-white/10 backdrop-blur px-4 py-2 rounded-full text-teal-100 text-sm">
            ⏱️ 45–90 min sessions
          </div>
          <div className="bg-white/10 backdrop-blur px-4 py-2 rounded-full text-teal-100 text-sm">
            🎭 Anonymous option available
          </div>
          <div className="bg-white/10 backdrop-blur px-4 py-2 rounded-full text-teal-100 text-sm">
            💰 Starting at ₹499
          </div>
        </div>

        <Link href="/book" className="inline-block bg-white text-teal-900 rounded-full px-10 py-4 text-lg font-bold hover:bg-teal-50 hover:scale-105 transition-all shadow-lg">
          Book Now
        </Link>
      </div>
    </section>
  );
}
