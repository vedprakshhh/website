import Link from 'next/link';
import { Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 py-12 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div>
          <Link href="/" className="text-white font-bold text-xl tracking-tight mb-2 flex items-center gap-2">
            <img src="/logo.jpg" alt="Mind Guide" className="h-9 w-auto brightness-0 invert" />
          </Link>
          <p className="text-sm">Feel. Heal. Become.</p>
        </div>
        
        <div className="flex items-center gap-6">
          <a href="/contact" className="hover:text-white transition-colors">Contact</a>
          <a href="mailto:mindguide.fit@gmail.com" className="hover:text-white transition-colors"><Mail size={20} /></a>
        </div>
      </div>
      <div className="max-w-6xl mx-auto mt-8 pt-8 border-t border-slate-800 text-sm text-center md:text-left">
        &copy; {new Date().getFullYear()} Mind Guide. All rights reserved.
      </div>
    </footer>
  );
}
