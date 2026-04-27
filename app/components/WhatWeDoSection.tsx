"use client";

import { MessageCircle, FileText, BookOpen } from 'lucide-react';

export default function WhatWeDoSection() {
  return (
    <section className="bg-white py-24 px-6 border-b border-slate-100">
      <div className="max-w-5xl mx-auto text-center">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          <div className="flex flex-col items-center">
            <div className="bg-teal-50 text-teal-600 p-6 rounded-full mb-6">
              <MessageCircle size={32} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Counselling</h3>
            <p className="text-slate-500 text-sm">Professional support for students, teens, adults, and children.</p>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="bg-teal-50 text-teal-600 p-6 rounded-full mb-6">
              <FileText size={32} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Research Guidance</h3>
            <p className="text-slate-500 text-sm">Academic support, data collection, and paper writing assistance.</p>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="bg-teal-50 text-teal-600 p-6 rounded-full mb-6">
              <BookOpen size={32} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Articles & Insights</h3>
            <p className="text-slate-500 text-sm">Knowledge and awareness content on mental health and psychology.</p>
          </div>
        </div>
        
        <p className="text-2xl text-slate-700 font-medium italic font-['Instrument_Serif',serif]">
          Supporting minds with clarity, empathy, and evidence.
        </p>
      </div>
    </section>
  );
}
