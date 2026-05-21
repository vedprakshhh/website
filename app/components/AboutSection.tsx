"use client";

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function AboutSection() {
  return (
    <section id="about" className="bg-[#FAFAF9] py-24 px-6 border-b border-slate-100">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl text-slate-900 tracking-tight font-['Instrument_Serif',serif] mb-6">
          About Mind Guide
        </h2>
        
        <p className="text-slate-600 text-lg md:text-xl leading-relaxed mb-8">
          Mind Guide is a space for holistic emotional wellness and self-growth — where counselling meets inner work. Not just talk therapy, but guided transformation for the heart and mind.
        </p>
        
        <Link href="/about" className="inline-flex items-center gap-2 text-sky-500 font-medium hover:text-sky-800 transition-colors">
          Read More <ArrowRight size={18} />
        </Link>
      </div>
    </section>
  );
}