import Link from 'next/link';
import { ArrowLeft, MessageCircle, LineChart, BookOpen, Clock } from 'lucide-react';
import Footer from '../components/Footer';

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-[#FAFAF9] flex flex-col">
      <main className="flex-1 max-w-5xl mx-auto px-6 pt-32 pb-24">
        <Link href="/" className="text-teal-600 flex items-center gap-2 mb-12 hover:underline">
          <ArrowLeft size={16} /> Back to Home
        </Link>

        <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6 font-['Instrument_Serif',serif]">
          Our Services
        </h1>
        <p className="text-xl text-slate-600 mb-16 max-w-2xl">
          Comprehensive support tailored to your unique psychological, academic, and emotional needs.
        </p>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white p-8 rounded-3xl border border-slate-200">
            <div className="bg-teal-50 text-teal-600 w-12 h-12 rounded-xl flex items-center justify-center mb-6">
              <MessageCircle size={24} />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Counselling Services</h2>
            <ul className="space-y-3 text-slate-600">
              <li className="flex items-start gap-2"><span className="text-teal-600">•</span> Student Counselling</li>
              <li className="flex items-start gap-2"><span className="text-teal-600">•</span> Teen & Adolescent Counselling</li>
              <li className="flex items-start gap-2"><span className="text-teal-600">•</span> Women's Emotional Support</li>
              <li className="flex items-start gap-2"><span className="text-teal-600">•</span> Child Counselling & Behavioural Therapy</li>
              <li className="flex items-start gap-2"><span className="text-teal-600">•</span> Life Coaching</li>
            </ul>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-slate-200">
            <div className="bg-teal-50 text-teal-600 w-12 h-12 rounded-xl flex items-center justify-center mb-6">
              <LineChart size={24} />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Research & Academic</h2>
            <ul className="space-y-3 text-slate-600">
              <li className="flex items-start gap-2"><span className="text-teal-600">•</span> Research guidance for students</li>
              <li className="flex items-start gap-2"><span className="text-teal-600">•</span> Data collection & analysis support</li>
              <li className="flex items-start gap-2"><span className="text-teal-600">•</span> Paper writing assistance</li>
              <li className="flex items-start gap-2"><span className="text-teal-600">•</span> Collaboration on psychological studies</li>
            </ul>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-slate-200">
            <div className="bg-teal-50 text-teal-600 w-12 h-12 rounded-xl flex items-center justify-center mb-6">
              <BookOpen size={24} />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Knowledge & Content</h2>
            <ul className="space-y-3 text-slate-600">
              <li className="flex items-start gap-2"><span className="text-teal-600">•</span> Articles & blogs on mental health</li>
              <li className="flex items-start gap-2"><span className="text-teal-600">•</span> Research publications</li>
              <li className="flex items-start gap-2"><span className="text-teal-600">•</span> Awareness content</li>
            </ul>
          </div>
        </div>

        {/* Session Details Info */}
        <div className="bg-teal-900 text-white p-8 md:p-12 rounded-3xl flex flex-col md:flex-row items-center gap-8 justify-between">
          <div>
            <h2 className="text-3xl font-['Instrument_Serif',serif] mb-4">Session Details</h2>
            <ul className="space-y-2 text-teal-100">
              <li className="flex items-center gap-2"><Clock size={16} /> Mode: Online (initial sessions)</li>
              <li className="flex items-center gap-2"><Clock size={16} /> Duration: 30–40 minutes</li>
              <li className="flex items-center gap-2"><Clock size={16} /> Type: Based on client needs (structured / flexible)</li>
              <li className="flex items-center gap-2"><Clock size={16} /> Option: Anonymous counselling available</li>
            </ul>
          </div>
          <Link href="/book" className="bg-white text-teal-900 px-8 py-4 rounded-full font-bold hover:bg-teal-50 transition-colors shrink-0">
            Book a Session
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
