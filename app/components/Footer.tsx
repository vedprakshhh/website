import Link from "next/link";
import { Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 pt-16 pb-8 px-6">
      <div className="max-w-6xl mx-auto flex flex-col items-center gap-6">
        <Link href="/" className="flex justify-center">
          <img
            src="/footer-logo-new.jpg"
            alt="Mind Guide"
            className="h-16 md:h-20 w-auto rounded-xl"
          />
        </Link>

        <p className="text-lg md:text-xl text-slate-300 font-serif italic tracking-wide">
          Feel. Heal. Become.
        </p>

        <div className="flex items-center gap-6">
          <Link
            href="/contact"
            className="hover:text-emerald-400 transition-colors text-sm font-medium"
          >
            Contact
          </Link>
          <div className="w-px h-4 bg-slate-700" />
          <a
            href="mailto:mindguide.fit@gmail.com"
            className="hover:text-emerald-400 transition-colors flex items-center gap-1.5 text-sm font-medium"
          >
            <Mail size={16} />
            Email
          </a>
        </div>
      </div>

      <div className="max-w-6xl mx-auto mt-10 pt-6 border-t border-slate-800 text-xs text-center text-slate-500">
        &copy; {new Date().getFullYear()} Mind Guide. All rights reserved.
      </div>
    </footer>
  );
}
