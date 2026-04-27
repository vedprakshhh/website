"use client";

import { CheckCircle2 } from 'lucide-react';

const reasons = [
  "Safe & confidential space",
  "Experienced professionals",
  "Research-based approach",
  "Anonymous support available"
];

export default function WhyChooseUsSection() {
  return (
    <section className="bg-white py-24 px-6 border-b border-slate-100">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-5xl text-slate-900 tracking-tight font-['Instrument_Serif',serif] mb-12">Why Choose Us</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-12 text-left max-w-2xl mx-auto">
          {reasons.map((reason) => (
            <div key={reason} className="flex items-center gap-3">
              <CheckCircle2 className="text-teal-600 shrink-0" size={24} />
              <span className="text-slate-700 font-medium text-lg">{reason}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
