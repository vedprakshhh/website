import Link from 'next/link';
import { ArrowLeft, Award, GraduationCap } from 'lucide-react';
import Footer from '../components/Footer';

export default function CounsellorsPage() {
  return (
    <div className="min-h-screen bg-[#FAFAF9] flex flex-col">
      <main className="flex-1 max-w-5xl mx-auto px-6 pt-32 pb-24">
        <Link href="/" className="text-teal-600 flex items-center gap-2 mb-12 hover:underline">
          <ArrowLeft size={16} /> Back to Home
        </Link>

        <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6 font-['Instrument_Serif',serif]">
          Meet the Counsellors
        </h1>
        <p className="text-xl text-slate-600 mb-16">Dedicated practitioners here to support your journey inward.</p>

        <div className="space-y-24">
          {/* Gayathri Profile */}
          <div className="flex flex-col md:flex-row gap-12 items-start bg-white p-8 md:p-12 rounded-3xl border border-slate-200">
            <div className="w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden shrink-0 border-4 border-slate-50 shadow-md">
              <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop" alt="Gayathri Gurrapu" className="w-full h-full object-cover" />
            </div>
            
            <div className="flex-1">
              <h2 className="text-3xl font-bold text-slate-900 mb-2">Gayathri Gurrapu</h2>
              <p className="text-teal-700 font-medium mb-6 flex items-center gap-2">
                <GraduationCap size={18} /> MSc Psychology | Holistic Emotional Wellness Practitioner
              </p>
              
              <div className="prose prose-slate mb-6">
                <p>
                  Gayathri Gurrapu is a holistic emotional wellness and self-growth practitioner with a strong academic foundation in BA Psychology, PGD in Counselling Psychology, and MSc Psychology. Her approach goes beyond traditional talk therapy — she integrates counselling with meditation, breath awareness, inner engineering concepts, and emotional release techniques.
                </p>
                <p>
                  Her style is warm yet grounded — creating a space where clients feel safe to be vulnerable while also being guided toward real transformation. She believes the best therapy doesn't just help you cope; it helps you understand yourself.
                </p>
              </div>

              <div className="mb-6">
                <h3 className="font-semibold text-slate-900 mb-2">Primary Focus Areas:</h3>
                <ul className="list-disc pl-5 text-slate-600 space-y-1">
                  <li>Emotional support & venting — a space to be heard</li>
                  <li>Personal counselling & guided self-reflection</li>
                  <li>Deep healing — combining therapy with inner work</li>
                  <li>Self-discovery & life clarity</li>
                  <li>Teen & student emotional wellness</li>
                  <li>Relationship counselling</li>
                </ul>
              </div>

              <div className="bg-teal-50 rounded-xl p-4 flex items-start gap-3">
                <Award className="text-teal-600 shrink-0 mt-1" size={20} />
                <p className="text-sm text-teal-900">
                  <span className="font-semibold block">Recognition:</span>
                  Awarded "Best Counsellor for Adolescents" by Voice for Girls (Zilla Parishad Boarding School), recognizing her impact in student mental health.
                </p>
              </div>
              <p className="mt-4 text-sm text-slate-500 italic">
                In addition to counselling, she is an active researcher with expertise in data collection and analysis, contributing to meaningful psychological studies.
              </p>
            </div>
          </div>

          {/* Madurya Profile */}
          <div className="flex flex-col md:flex-row gap-12 items-start bg-white p-8 md:p-12 rounded-3xl border border-slate-200">
            <div className="w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden shrink-0 border-4 border-slate-50 shadow-md">
              <img src="https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=800&auto=format&fit=crop" alt="Madurya Pathakoti" className="w-full h-full object-cover" />
            </div>
            
            <div className="flex-1">
              <h2 className="text-3xl font-bold text-slate-900 mb-2">Madurya Pathakoti</h2>
              <p className="text-teal-700 font-medium mb-6 flex items-center gap-2">
                <GraduationCap size={18} /> MA Psychology | Child Development Specialist
              </p>
              
              <div className="prose prose-slate mb-6">
                <p>
                  Madurya Pathakoti is a highly experienced psychology professional with 5 years of experience in counselling and research. She holds qualifications in BA Psychology, PGD in Child Psychology, and MA Psychology.
                </p>
                <p>
                  Her approach is friendly and CBT-based (Cognitive Behavioural Therapy), making her sessions both approachable and evidence-based. She is dedicated to helping children and families build healthier behavioural patterns and emotional understanding.
                </p>
              </div>

              <div className="mb-6">
                <h3 className="font-semibold text-slate-900 mb-2">Primary Focus Areas:</h3>
                <ul className="list-disc pl-5 text-slate-600 space-y-1">
                  <li>Autism spectrum conditions</li>
                  <li>ADHD</li>
                  <li>Conduct disorders</li>
                  <li>Behavioural concerns in children</li>
                </ul>
              </div>

              <div className="bg-teal-50 rounded-xl p-4 flex items-start gap-3">
                <Award className="text-teal-600 shrink-0 mt-1" size={20} />
                <div className="text-sm text-teal-900">
                  <span className="font-semibold block mb-1">Recognitions:</span>
                  <ul className="list-disc pl-4 space-y-1">
                    <li>Best Child Specialist – Unique Intelligence Clinic</li>
                    <li>Most Reliable Researcher – Knowledge Bridge Consultancy</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
