"use client";

import Link from "next/link";
import Reveal from "./Reveal";

const counsellors = [
  {
    name: "Gayathri Gurrapu",
    specialization: "Holistic Emotional Wellness & Self-Growth Practitioner",
    photo: "/gayathri.jpeg",
  },
  {
    name: "Madhurya Pathakoti",
    specialization: "Child Counselling & Behavioural Therapy",
    photo: "/madhurya.jpeg",
  },
];

export default function CounsellorsSection() {
  return (
    <section id="counsellors" className="bg-white py-20 md:py-28 px-6 relative overflow-hidden">
      <div className="max-w-5xl mx-auto">
        <Reveal>
          <div className="text-center mb-12">
            <span className="inline-block text-xs tracking-widest uppercase text-emerald-600 font-semibold mb-4">
              Your Guides
            </span>
            <h2 className="text-3xl md:text-5xl text-slate-900 tracking-tight font-serif mb-4">
              Meet Your Psychologists
            </h2>
            <p className="text-slate-500">Dedicated practitioners here to support your journey inward.</p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {counsellors.map((c, i) => (
            <Reveal key={c.name} delay={i * 0.15}>
              <div className="flex flex-col items-center bg-[#FAFAF9] p-8 md:p-10 rounded-3xl card-lift hover:shadow-xl text-center h-full">
                <div className="w-28 h-28 md:w-32 md:h-32 rounded-full overflow-hidden mb-6 ring-4 ring-white shadow-md">
                  <img
                    src={c.photo}
                    alt={c.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl md:text-2xl font-semibold text-slate-900 mb-2">{c.name}</h3>
                <p className="text-emerald-700 text-sm font-medium mb-6 leading-relaxed">
                  {c.specialization}
                </p>
                <Link
                  href="/counsellors"
                  className="bg-white border border-slate-200 text-slate-700 hover:bg-emerald-50 hover:border-emerald-200 hover:text-emerald-700 rounded-full px-6 py-2.5 text-sm font-medium transition-all w-full"
                >
                  View Profile
                </Link>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
