"use client";

import Link from "next/link";
import Reveal from "./Reveal";

export default function BookingCTASection() {
  return (
    <section className="relative bg-emerald-900 py-24 md:py-32 px-6 overflow-hidden">
      {/* Ambient glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-teal-500/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-4xl mx-auto text-center">
        <Reveal>
          <span className="inline-block text-xs tracking-widest uppercase text-emerald-300 font-semibold mb-4">
            Get Started
          </span>
          <h2 className="text-3xl md:text-5xl text-white font-serif mb-4 tracking-tight">
            Ready to Begin?
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="text-emerald-200 text-lg mb-4 max-w-xl mx-auto leading-relaxed">
            Take the first step toward emotional wellness. Your journey starts here.
          </p>
          <p className="text-emerald-100 text-base mb-10 max-w-xl mx-auto leading-relaxed">
            Not sure which session is right for you? Begin with a Consultation for ₹399.
          </p>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            <div className="bg-white/10 backdrop-blur-sm px-5 py-2 rounded-full text-emerald-100 text-sm border border-white/10">
              All sessions online
            </div>
            <div className="bg-white/10 backdrop-blur-sm px-5 py-2 rounded-full text-emerald-100 text-sm border border-white/10">
              Consultation from ₹399
            </div>
            <div className="bg-white/10 backdrop-blur-sm px-5 py-2 rounded-full text-emerald-100 text-sm border border-white/10">
              Anonymous option available
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.3}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/book"
              className="inline-block bg-white text-emerald-900 rounded-full px-12 py-4 text-lg font-bold hover:bg-emerald-50 hover:scale-105 transition-all shadow-xl"
            >
              Book a Consultation
            </Link>
            <Link
              href="/book"
              className="inline-block bg-white/10 text-white border border-white/30 rounded-full px-12 py-4 text-lg font-bold hover:bg-white/20 hover:scale-105 transition-all"
            >
              Book a Session
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
