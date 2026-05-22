"use client";

import Link from 'next/link';

const counsellors = [
  {
    name: "Gayathri Gurrapu",
    specialization: "Holistic Emotional Wellness & Self-Growth Practitioner",
    photo: "/gayathri.jpeg",
  },
  {
    name: "Madurya Pathakoti",
    specialization: "Child Counselling & Behavioural Therapy",
    photo: "/madhurya.jpeg",
  }
];

export default function CounsellorsSection() {
  return (
    <section id="counsellors" className="bg-white py-24 px-6 border-b border-slate-100">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl text-slate-900 tracking-tight font-['Instrument_Serif',serif] mb-4">Meet Your Psychologists</h2>
          <p className="text-slate-500">Dedicated practitioners here to support your journey inward.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {counsellors.map((counsellor) => (
            <div key={counsellor.name} className="flex flex-col items-center bg-[#FAFAF9] p-8 rounded-3xl border border-slate-100 text-center">
              <div className="w-32 h-32 rounded-full overflow-hidden mb-6 border-4 border-white shadow-sm">
                <img src={counsellor.photo} alt={counsellor.name} className="w-full h-full object-cover" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">{counsellor.name}</h3>
              <p className="text-emerald-700 text-sm font-medium mb-8">{counsellor.specialization}</p>
              
              <Link href="/counsellors" className="bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 rounded-full px-6 py-2.5 text-sm font-medium transition-colors shadow-sm w-full">
                View Profile
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
