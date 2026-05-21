"use client";

import { Heart, Sparkles, Compass } from 'lucide-react';

export default function WhatWeDoSection() {
  return (
    <section className="bg-white py-24 px-6 border-b border-slate-100">
      <div className="max-w-5xl mx-auto text-center">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          <div className="flex flex-col items-center">
            <div className="bg-sky-50 text-sky-500 p-6 rounded-full mb-6">
              <Heart size={32} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Emotional Support</h3>
            <p className="text-slate-500 text-sm">A safe space to be heard. For loneliness, overthinking, heartbreak, and burnout.</p>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="bg-sky-50 text-sky-500 p-6 rounded-full mb-6">
              <Sparkles size={32} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Inner Work & Healing</h3>
            <p className="text-slate-500 text-sm">Counselling meets meditation, breath awareness, and emotional release — guided transformation.</p>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="bg-sky-50 text-sky-500 p-6 rounded-full mb-6">
              <Compass size={32} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Self-Discovery</h3>
            <p className="text-slate-500 text-sm">Understanding yourself — purpose, identity, self-worth, and the patterns that shape your life.</p>
          </div>
        </div>
        
        <p className="text-2xl text-slate-700 font-medium italic font-['Instrument_Serif',serif]">
          Not just coping. Transformation.
        </p>
      </div>
    </section>
  );
}
