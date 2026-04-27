import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import Footer from '../components/Footer';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#FAFAF9] flex flex-col">
      <main className="flex-1 max-w-4xl mx-auto px-6 pt-32 pb-24">
        <Link href="/" className="text-teal-600 flex items-center gap-2 mb-12 hover:underline">
          <ArrowLeft size={16} /> Back to Home
        </Link>

        <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-12 font-['Instrument_Serif',serif]">
          About Mindguide
        </h1>

        <div className="prose prose-lg text-slate-600">
          <p className="text-2xl text-teal-800 font-['Instrument_Serif',serif] italic mb-8">
            Mindguide was built on a simple yet powerful idea—every thought deserves clarity, and every voice deserves to be heard.
          </p>

          <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">Our Story</h2>
          <p className="mb-6">
            The name "Mindguide" represents our commitment to providing clarity, transparency, and insight (like a guide), while emphasizing expression, documentation, and research (understanding the mind). Together, it reflects our belief that every experience should be understood with clear guidance.
          </p>
          <p className="mb-8">
            Our platform is designed for individuals seeking counselling, students needing academic & emotional guidance, and researchers looking for support and collaboration. We also aim to publish research, articles, and insights that contribute meaningfully to the field of psychology.
          </p>

          <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">Our Mission</h2>
          <p className="mb-8">
            To provide a safe, empathetic, and non-judgmental space for individuals who struggle to express themselves, helping them open up, understand their emotions, and navigate life with clarity.
          </p>

          <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">Our Vision</h2>
          <p className="mb-8">
            To build a platform where mental health support and psychological research go hand in hand, making both accessible, reliable, and impactful.
          </p>
          
          <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">Our Approach</h2>
          <p className="mb-8">
            We believe the best therapeutic work emerges when compassion meets scientific rigor. Our process uses proven methodologies like CBT to translate insights into lasting mental wellness.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
