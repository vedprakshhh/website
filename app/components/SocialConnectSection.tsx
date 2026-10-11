"use client";

import { Send, Camera } from "lucide-react";
import Reveal from "./Reveal";

export default function SocialConnectSection() {
  return (
    <section className="bg-white py-20 md:py-28 px-6 relative overflow-hidden">
      <div className="max-w-4xl mx-auto">
        <Reveal>
          <div className="text-center mb-12">
            <span className="inline-block text-xs tracking-widest uppercase text-emerald-600 font-semibold mb-4">
              Stay Connected
            </span>
            <h2 className="text-3xl md:text-5xl text-slate-900 tracking-tight font-serif mb-4">
              Join Our Community
            </h2>
            <p className="text-slate-500 max-w-lg mx-auto">
              Mindful updates, healing content, and wellness support, wherever you are.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {/* Telegram */}
          <Reveal delay={0.1}>
            <div className="bg-[#FAFAF9] rounded-3xl p-8 card-lift hover:shadow-xl border border-slate-100 h-full flex flex-col items-center text-center">
              <div className="w-14 h-14 bg-sky-50 rounded-2xl flex items-center justify-center mb-5">
                <Send className="text-sky-500" size={26} />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Telegram Channel</h3>
              <p className="text-slate-500 text-sm mb-6 flex-1">
                Mindful updates, healing content & wellness support
              </p>
              <a
                href="https://t.me/mindguidepersonalhealers"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-sky-500 text-white rounded-full px-7 py-3 text-sm font-medium hover:bg-sky-600 transition-all shadow-sm hover:shadow-md w-full justify-center"
              >
                <Send size={16} />
                Join Telegram
              </a>
            </div>
          </Reveal>

          {/* Instagram */}
          <Reveal delay={0.2}>
            <div className="bg-[#FAFAF9] rounded-3xl p-8 card-lift hover:shadow-xl border border-slate-100 h-full flex flex-col items-center text-center">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-100 via-pink-100 to-orange-100 rounded-2xl flex items-center justify-center mb-5">
                <Camera className="text-pink-500" size={26} />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Instagram</h3>
              <p className="text-slate-500 text-sm mb-6 flex-1">
                Psychology insights, self-growth tips & everyday mental wellness
              </p>
              <a
                href="https://www.instagram.com/mindguide.fit?igsh=M2cwNjAyMGRta2cz"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 text-white rounded-full px-7 py-3 text-sm font-medium hover:shadow-md transition-all w-full justify-center"
              >
                <Camera size={16} />
                Follow on Instagram
              </a>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.3}>
          <p className="text-slate-400 text-sm text-center mt-8">
            Stay connected with Mind Guide, follow on Instagram & join Telegram for inspiring mental health content
          </p>
        </Reveal>
      </div>
    </section>
  );
}
