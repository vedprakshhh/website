"use client";

import Link from 'next/link';
import { GraduationCap, Users, Baby, Heart, LineChart } from 'lucide-react';

const services = [
  {
    title: "Student Counselling",
    icon: <GraduationCap size={24} />,
    description: "Support for academic stress, peer pressure, and career anxiety."
  },
  {
    title: "Teen Counselling",
    icon: <Users size={24} />,
    description: "Guidance through emotional challenges and identity formation."
  },
  {
    title: "Child Behavioural Therapy",
    icon: <Baby size={24} />,
    description: "CBT-based approach for autism, ADHD, and conduct disorders."
  },
  {
    title: "Women Support",
    icon: <Heart size={24} />,
    description: "Navigating personal, social, and professional pressures."
  },
  {
    title: "Research Guidance",
    icon: <LineChart size={24} />,
    description: "Data collection, analysis, and paper writing assistance."
  }
];

export default function ServicesSection() {
  return (
    <section id="services" className="bg-[#FAFAF9] py-24 px-6 border-b border-slate-100">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl text-slate-900 tracking-tight font-['Instrument_Serif',serif] mb-4">Our Services</h2>
          <p className="text-slate-500">Tailored support for every stage of your journey.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <Link key={service.title} href="/services" className="group bg-white p-8 rounded-3xl border border-slate-200 hover:border-teal-300 hover:shadow-md transition-all">
              <div className="bg-teal-50 text-teal-600 w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-teal-600 group-hover:text-white transition-colors">
                {service.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{service.title}</h3>
              <p className="text-slate-600 text-sm">{service.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}