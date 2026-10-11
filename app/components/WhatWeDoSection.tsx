"use client";

import { Heart, Sparkles, Compass } from "lucide-react";
import Reveal from "./Reveal";

const pillars = [
  {
    icon: Heart,
    title: "Emotional Support",
    desc: "A safe space to be heard. For loneliness, overthinking, heartbreak, and burnout.",
  },
  {
    icon: Sparkles,
    title: "Inner Work & Healing",
    desc: "Counselling meets meditation, breath awareness, and emotional release, guided transformation.",
  },
  {
    icon: Compass,
    title: "Self-Discovery",
    desc: "Understanding yourself, purpose, identity, self-worth, and the patterns that shape your life.",
  },
];

export default function WhatWeDoSection() {
  return (
    <section className="bg-white py-20 md:py-28 px-6 relative overflow-hidden">
      <div className="max-w-5xl mx-auto">
        <Reveal>
          <div className="text-center mb-12">
            <span className="inline-block text-xs tracking-widest uppercase text-emerald-600 font-semibold mb-4">
              Our Approach
            </span>
            <h2 className="text-3xl md:text-5xl text-slate-900 tracking-tight font-serif mb-4">
              How We Help
            </h2>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 mb-12">
          {pillars.map((pillar, i) => {
            const Icon = pillar.icon;
            return (
              <Reveal key={pillar.title} delay={i * 0.15}>
                <div className="flex flex-col items-center text-center group h-full">
                  <div className="relative mb-6">
                    <div className="absolute inset-0 bg-emerald-200/40 rounded-2xl blur-xl group-hover:bg-emerald-300/50 transition-colors" />
                    <div className="relative w-16 h-16 bg-emerald-50 text-emerald-500 rounded-2xl flex items-center justify-center group-hover:bg-emerald-500 group-hover:text-white transition-all duration-300 group-hover:scale-110">
                      <Icon size={28} />
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-3">{pillar.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{pillar.desc}</p>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={0.3}>
          <p className="text-2xl md:text-3xl text-slate-700 font-serif italic text-center">
            Not just coping. Transformation.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
