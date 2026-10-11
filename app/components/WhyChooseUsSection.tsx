"use client";

import { ShieldCheck, Sparkles, Award, Eye, Video } from "lucide-react";
import Reveal from "./Reveal";

const reasons = [
  { icon: ShieldCheck, text: "Safe & confidential space" },
  { icon: Sparkles, text: "Holistic multi-modal approach" },
  { icon: Award, text: "Experienced practitioner" },
  { icon: Eye, text: "Anonymous support available" },
  { icon: Video, text: "Flexible online sessions" },
];

export default function WhyChooseUsSection() {
  return (
    <section className="bg-white py-20 md:py-28 px-6 relative overflow-hidden">
      <div className="max-w-4xl mx-auto text-center">
        <Reveal>
          <span className="inline-block text-xs tracking-widest uppercase text-emerald-600 font-semibold mb-4">
            Why Mind Guide
          </span>
          <h2 className="text-3xl md:text-5xl text-slate-900 tracking-tight font-serif mb-4">
            Why Choose Us
          </h2>
        </Reveal>

        <div className="flex flex-wrap justify-center gap-5 max-w-3xl mx-auto mt-12">
          {reasons.map((reason, i) => {
            const Icon = reason.icon;
            return (
              <Reveal key={reason.text} delay={i * 0.1}>
                <div className="flex flex-col items-center gap-3 p-6 rounded-2xl bg-[#FAFAF9] card-lift hover:shadow-lg w-[160px] sm:w-[180px]">
                  <div className="w-12 h-12 bg-emerald-50 text-emerald-500 rounded-xl flex items-center justify-center">
                    <Icon size={24} />
                  </div>
                  <span className="text-slate-700 font-medium text-sm text-center leading-snug">
                    {reason.text}
                  </span>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
