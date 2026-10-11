"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Mail, Phone, Menu, X } from "lucide-react";

export default function HeroSection() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/counsellors", label: "Counsellors" },
    { href: "/services", label: "Services" },
  ];

  return (
    <div className="min-h-screen relative flex flex-col bg-gradient-to-b from-[#FAFAF9] via-[#F0F9F6] to-[#E6F3F2] overflow-hidden">
      {/* Soft ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-emerald-200/20 rounded-full blur-3xl pointer-events-none" />

      {/* Navbar */}
      <nav className="relative z-30 px-6 py-4 max-w-7xl mx-auto w-full">
        <div
          className={`flex justify-between items-center rounded-2xl px-4 sm:px-6 py-3 transition-all duration-300 ${
            scrolled
              ? "glass shadow-md border border-white/60"
              : "bg-white/40 backdrop-blur-sm border border-white/30"
          }`}
        >
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <img src="/logo.jpg" alt="Mind Guide" className="h-10 sm:h-11 w-auto rounded-lg" />
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-7">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-slate-600 hover:text-emerald-700 text-sm font-medium transition-colors relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-emerald-500 group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
          </div>

          {/* Desktop actions */}
          <div className="hidden md:flex items-center gap-2">
            <a
              href="tel:+919405444888"
              className="flex items-center gap-1.5 bg-emerald-500 rounded-full px-4 py-2 text-white text-sm font-medium hover:bg-emerald-600 transition-all shadow-sm hover:shadow-md"
            >
              <Phone size={14} />
              <span>94054 44888</span>
            </a>
            <a
              href="mailto:mindguide.fit@gmail.com"
              className="flex items-center gap-1.5 bg-white border border-slate-200 rounded-full px-4 py-2 text-slate-700 text-sm font-medium hover:bg-slate-50 hover:border-slate-300 transition-all"
            >
              <Mail size={14} />
              <span>Email</span>
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden flex items-center justify-center w-10 h-10 rounded-lg bg-white/60 border border-white/40 text-slate-700"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden mt-2 glass rounded-2xl shadow-lg border border-white/60 p-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="px-4 py-3 text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 rounded-xl text-sm font-medium transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <div className="flex gap-2 mt-2 pt-2 border-t border-slate-200">
              <a
                href="tel:+919405444888"
                className="flex-1 flex items-center justify-center gap-1.5 bg-emerald-500 rounded-full px-4 py-2.5 text-white text-sm font-medium"
              >
                <Phone size={14} /> Call
              </a>
              <a
                href="mailto:mindguide.fit@gmail.com"
                className="flex-1 flex items-center justify-center gap-1.5 bg-white border border-slate-200 rounded-full px-4 py-2.5 text-slate-700 text-sm font-medium"
              >
                <Mail size={14} /> Email
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Content */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 py-12 text-center">
        <div className="animate-[fadeIn_0.8s_ease-out]">
          <img
            src="/logo.png"
            alt="Mind Guide"
            className="w-64 sm:w-80 md:w-96 lg:w-[28rem] h-auto mb-6 drop-shadow-md"
          />
        </div>

        <p className="text-xl sm:text-2xl md:text-3xl text-emerald-800 font-serif italic mb-8 tracking-wide">
          Feel. Heal. Become.
        </p>

        <p className="text-slate-600 text-base md:text-lg max-w-xl mb-5 leading-relaxed">
          Holistic emotional wellness and self-growth, a space where counselling meets inner work.
          Not just talk therapy, but guided transformation for the heart and mind.
        </p>

        <p className="text-emerald-800 text-base md:text-lg max-w-xl mb-10 leading-relaxed font-medium">
          Not sure which session is right for you, or still making sense of what you are going through? Start with a Consultation.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4">
          <Link
            href="/book"
            className="bg-emerald-500 rounded-full px-8 py-3.5 text-white text-base font-medium hover:bg-emerald-600 transition-all shadow-sm hover:shadow-lg w-full sm:w-auto text-center"
          >
            Book a Consultation
          </Link>
          <Link
            href="/book"
            className="bg-white/80 text-emerald-700 rounded-full px-8 py-3.5 text-base font-medium hover:bg-white hover:shadow-md transition-all border border-emerald-100 w-full sm:w-auto text-center"
          >
            Book a Session
          </Link>
          <Link
            href="/services"
            className="bg-white/80 text-slate-600 rounded-full px-8 py-3.5 text-base font-medium hover:bg-white hover:shadow-md transition-all border border-slate-200 w-full sm:w-auto text-center"
          >
            Explore Services
          </Link>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
