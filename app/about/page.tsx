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
            Not just coping. Transformation.
          </p>

          <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">Our Philosophy</h2>
          <p className="mb-6">
            Mindguide exists because we believe healing is not just about managing symptoms — it's about understanding yourself deeply. We combine counselling with inner work practices like meditation, breath awareness, and emotional release to create real, lasting change.
          </p>
          <p className="mb-8">
            Most therapy stops at talking. We go further — into the body, the breath, and the patterns that run beneath conscious thought. This is holistic emotional wellness: treating the whole person, not just the problem.
          </p>

          <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">Our Approach</h2>
          <p className="mb-4">
            We offer tiered support because everyone comes at a different stage:
          </p>
          <ul className="list-disc pl-5 mb-8 space-y-2">
            <li><strong>Emotional Support</strong> — for when you just need to be heard</li>
            <li><strong>Personal Counselling</strong> — deeper therapeutic work with tools and reflection</li>
            <li><strong>Deep Healing / Inner Work</strong> — premium transformation combining multiple modalities</li>
            <li><strong>Self-Discovery</strong> — for seekers who want to understand themselves, not just fix something</li>
          </ul>

          <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">What Makes Us Different</h2>
          <p className="mb-4">
            We don't believe in one-size-fits-all therapy. Every session is tailored. More importantly, we believe transformation is accessible — our pricing starts at ₹499 so that anyone can take the first step.
          </p>
          <p className="mb-8">
            Whether you're dealing with heartbreak, burnout, anxiety, relationship struggles, or simply feeling lost — there's a space here for you. No judgment. No labels. Just presence and guidance.
          </p>

          <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">Our Founder</h2>
          <p className="mb-8">
            Gayathri Gurrapu is a holistic emotional wellness practitioner with an MSc in Psychology, a PGD in Counselling Psychology, and years of hands-on experience. Her work spans counselling, meditation, inner engineering, and research. She brings both scientific rigor and deep compassion to every session — creating a space where clients feel safe to explore, heal, and grow.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
