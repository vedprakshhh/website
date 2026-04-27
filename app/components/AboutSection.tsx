"use client";

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function AboutSection() {
  return (
    <section id="about" className="bg-[#FAFAF9] py-24 px-6 border-b border-slate-100">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl text-slate-900 tracking-tight font-['Instrument_Serif',serif] mb-6">
          About Mindguide
        </h2>
        
        <p className="text-slate-600 text-lg md:text-xl leading-relaxed mb-8">
          Mindguide is a space where thoughts are understood with clarity and expressed without fear. We combine counselling and research to support emotional and intellectual growth.
        </p>
        
        <Link href="/about" className="inline-flex items-center gap-2 text-teal-600 font-medium hover:text-teal-800 transition-colors">
          Read More <ArrowRight size={18} />
        </Link>
      </div>
    </section>
  );
}