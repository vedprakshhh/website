"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Reveal from "./Reveal";

export default function AboutSection() {
  return (
    <section id="about" className="bg-[#FAFAF9] py-20 md:py-28 px-6 relative overflow-hidden">
      <div className="max-w-4xl mx-auto text-center">
        <Reveal>
          <span className="inline-block text-xs tracking-widest uppercase text-emerald-600 font-semibold mb-4">
            Who We Are
          </span>
        </Reveal>

        <Reveal delay={0.1}>
          <h2 className="text-3xl md:text-5xl text-slate-900 tracking-tight font-serif mb-4">
            About Mind Guide
          </h2>
        </Reveal>

        <Reveal delay={0.2}>
          <p className="text-slate-600 text-lg md:text-xl leading-relaxed mb-8 max-w-2xl mx-auto">
            Mind Guide is a space for holistic emotional wellness and self-growth, where counselling
            meets inner work. Not just talk therapy, but guided transformation for the heart and mind.
          </p>
        </Reveal>

        <Reveal delay={0.3}>
          <Link
            href="/about"
            className="inline-flex items-center gap-2 text-emerald-600 font-medium hover:text-emerald-800 transition-colors group"
          >
            Read More
            <ArrowRight
              size={18}
              className="group-hover:translate-x-1 transition-transform"
            />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
