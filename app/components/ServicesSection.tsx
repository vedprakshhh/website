"use client";

import Link from "next/link";
import { Heart, MessageCircle, Sparkles, Users, GraduationCap, Compass, Clock, HelpCircle } from "lucide-react";
import Reveal from "./Reveal";

const services = [
  {
    title: "Consultation",
    icon: HelpCircle,
    duration: "30 mins",
    description: "A short first step to understand what you are experiencing and identify the most appropriate next step, without labelling or rushing into therapy.",
    highlight: "Clarity before commitment",
  },
  {
    title: "Emotional Support / Venting",
    icon: Heart,
    duration: "45 mins",
    description: "For when you just need someone to listen. Loneliness, overthinking, emotional confusion, stress, heartbreak, burnout.",
    highlight: "Safe space to be heard",
  },
  {
    title: "Personal Counselling",
    icon: MessageCircle,
    duration: "50-60 mins",
    description: "Emotional exploration, behavioural patterns, coping tools, self-awareness, and guided reflection.",
    highlight: "Your main therapeutic space",
  },
  {
    title: "Deep Healing / Inner Work",
    icon: Sparkles,
    duration: "75-90 mins",
    description: "Counselling combined with meditation, inner engineering, breath awareness, and emotional release exercises.",
    highlight: "Holistic Emotional Healing & Inner Clarity",
  },
  {
    title: "Relationship Counselling",
    icon: Users,
    duration: "60-75 mins",
    description: "For couples, communication issues, emotional disconnect, trust rebuilding, and premarital guidance.",
    highlight: "High-demand, emotionally intensive",
  },
  {
    title: "Teen & Student Counselling",
    icon: GraduationCap,
    duration: "45-50 mins",
    description: "Exam anxiety, low confidence, emotional instability, career confusion, social anxiety.",
    highlight: "Affordable, relatable support",
  },
  {
    title: "Self-Discovery / Life Clarity",
    icon: Compass,
    duration: "60 mins",
    description: "Understanding yourself, emotional intelligence, purpose, self-worth, identity, and healing patterns.",
    highlight: "Explore your inner world",
  },
];

export default function ServicesSection() {
  return (
    <section id="services" className="bg-[#FAFAF9] py-20 md:py-28 px-6 relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <div className="text-center mb-12">
            <span className="inline-block text-xs tracking-widest uppercase text-emerald-600 font-semibold mb-4">
              What We Offer
            </span>
            <h2 className="text-3xl md:text-5xl text-slate-900 tracking-tight font-serif mb-4">
              Our Services
            </h2>
            <p className="text-slate-500">Tiered support, from a listening ear to deep inner transformation.</p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <Reveal key={service.title} delay={(i % 3) * 0.12}>
                <div className="group bg-white p-7 rounded-3xl card-lift hover:shadow-xl flex flex-col h-full border border-transparent hover:border-emerald-100">
                  <div className="w-12 h-12 bg-emerald-50 text-emerald-500 rounded-xl flex items-center justify-center mb-5 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-300">
                    <Icon size={24} />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-1">{service.title}</h3>
                  <p className="text-emerald-500 text-xs font-semibold uppercase tracking-wide mb-3">
                    {service.highlight}
                  </p>
                  <p className="text-slate-600 text-sm mb-4 flex-1 leading-relaxed">{service.description}</p>
                  <div className="flex items-center gap-2 text-sm text-slate-400 border-t border-slate-100 pt-4 mt-auto">
                    <Clock size={14} />
                    <span>{service.duration}</span>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={0.2}>
          <div className="text-center">
            <Link
              href="/book"
              className="inline-block bg-emerald-500 text-white rounded-full px-10 py-4 text-base font-semibold hover:bg-emerald-600 transition-all shadow-sm hover:shadow-lg"
            >
              Book a Session
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
