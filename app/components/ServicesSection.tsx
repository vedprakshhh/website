"use client";

import Link from 'next/link';
import { Heart, MessageCircle, Sparkles, Users, GraduationCap, Compass, Clock, IndianRupee } from 'lucide-react';

const services = [
  {
    title: "Emotional Support / Venting",
    icon: <Heart size={24} />,
    duration: "45 mins",
    price: "₹499 – ₹799",
    description: "For when you just need someone to listen. Loneliness, overthinking, emotional confusion, stress, heartbreak, burnout.",
    highlight: "Safe space to be heard"
  },
  {
    title: "Personal Counselling",
    icon: <MessageCircle size={24} />,
    duration: "50–60 mins",
    price: "₹1,000 – ₹1,800",
    description: "Emotional exploration, behavioural patterns, coping tools, self-awareness, and guided reflection.",
    highlight: "Your main therapeutic space"
  },
  {
    title: "Deep Healing / Inner Work",
    icon: <Sparkles size={24} />,
    duration: "75–90 mins",
    price: "₹2,000 – ₹3,500",
    description: "Counselling combined with meditation, inner engineering, breath awareness, and emotional release exercises.",
    highlight: "Holistic Emotional Healing & Inner Clarity"
  },
  {
    title: "Relationship Counselling",
    icon: <Users size={24} />,
    duration: "60–75 mins",
    price: "₹1,500 – ₹3,000",
    description: "For couples — communication issues, emotional disconnect, trust rebuilding, and premarital guidance.",
    highlight: "High-demand, emotionally intensive"
  },
  {
    title: "Teen & Student Counselling",
    icon: <GraduationCap size={24} />,
    duration: "45–50 mins",
    price: "₹500 – ₹1,000",
    description: "Exam anxiety, low confidence, emotional instability, career confusion, social anxiety.",
    highlight: "Affordable, relatable support"
  },
  {
    title: "Self-Discovery / Life Clarity",
    icon: <Compass size={24} />,
    duration: "60 mins",
    price: "₹1,200 – ₹2,500",
    description: "Understanding yourself — emotional intelligence, purpose, self-worth, identity, and healing patterns.",
    highlight: "Your signature niche"
  }
];

const packages = [
  {
    name: "4 Sessions / Month",
    price: "₹3,500 – ₹5,500",
    desc: "Weekly support for consistent growth"
  },
  {
    name: "8-Session Healing Program",
    price: "₹8,000 – ₹15,000",
    desc: "Structured deep-dive over two months"
  },
  {
    name: "Meditation + Counselling Combo",
    price: "₹4,999+",
    desc: "Inner work paired with therapeutic guidance"
  }
];

export default function ServicesSection() {
  return (
    <section id="services" className="bg-[#FAFAF9] py-24 px-6 border-b border-slate-100">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl text-slate-900 tracking-tight font-['Instrument_Serif',serif] mb-4">Services & Pricing</h2>
          <p className="text-slate-500">Tiered support — from a listening ear to deep inner transformation.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {services.map((service) => (
            <div key={service.title} className="group bg-white p-8 rounded-3xl border border-slate-200 hover:border-sky-300 hover:shadow-md transition-all flex flex-col">
              <div className="bg-sky-50 text-sky-500 w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-sky-500 group-hover:text-white transition-colors">
                {service.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-1">{service.title}</h3>
              <p className="text-sky-500 text-xs font-semibold uppercase tracking-wide mb-3">{service.highlight}</p>
              <p className="text-slate-600 text-sm mb-4 flex-1">{service.description}</p>
              <div className="flex items-center gap-4 text-sm text-slate-500 border-t border-slate-100 pt-4 mt-auto">
                <span className="flex items-center gap-1"><Clock size={14} /> {service.duration}</span>
                <span className="flex items-center gap-1 font-semibold text-slate-800"><IndianRupee size={14} /> {service.price}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Packages */}
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl text-slate-900 tracking-tight font-['Instrument_Serif',serif] mb-4">Healing Packages</h2>
          <p className="text-slate-500 mb-12">Commit to your growth with structured programs.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {packages.map((pkg) => (
            <div key={pkg.name} className="bg-sky-900 text-white p-8 rounded-3xl text-center hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-bold mb-3">{pkg.name}</h3>
              <p className="text-3xl font-bold text-sky-200 mb-2">{pkg.price}</p>
              <p className="text-sky-100 text-sm">{pkg.desc}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link href="/book" className="inline-block bg-sky-500 text-white rounded-full px-10 py-4 text-lg font-bold hover:bg-sky-700 transition-colors shadow-sm">
            Book a Session
          </Link>
        </div>
      </div>
    </section>
  );
}
