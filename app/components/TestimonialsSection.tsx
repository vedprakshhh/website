"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Star, Quote, Sparkles } from "lucide-react";
import Reveal from "./Reveal";

interface Testimonial {
  name?: string;
  age?: number;
  text: string;
  tag?: string;
  anonymous?: boolean;
  initials?: string;
  gender?: "male" | "female";
}

const testimonials: Testimonial[] = [
  {
    name: "Priya Sharma",
    age: 28,
    text: "I walked in thinking I just needed someone to talk to. But I ended up understanding parts of myself I'd been ignoring for years. The sessions felt like conversations with someone who genuinely cared, not like a doctor's appointment.",
    tag: "Personal Counselling",
    gender: "female",
  },
  {
    name: "Arjun Menon",
    age: 34,
    text: "I was dealing with constant stress from work and it was affecting my sleep, my mood, everything. After a few sessions, I started to notice small changes, I was breathing easier, reacting less, and slowly finding my balance again.",
    tag: "Stress & Anxiety Support",
    gender: "male",
  },
  {
    name: "Kavya Reddy",
    age: 17,
    text: "I was really nervous before my first session. I thought the counsellor would judge me or tell my parents everything. But she made me feel so comfortable, like talking to an older sister who actually listens.",
    tag: "Teen Counselling",
    gender: "female",
  },
  {
    name: "Rahul Nair",
    age: 22,
    text: "College pressure, career confusion, and constant overthinking, I didn't even know where to start. My counsellor helped me untangle things one by one. For the first time in months, my mind felt a little quieter.",
    tag: "Student Support",
    gender: "male",
  },
  {
    name: "Ananya Iyer",
    age: 31,
    text: "After my breakup, I thought I was fine. But the sadness kept creeping back. Talking it out in a space where I didn't feel judged helped me process what I was actually feeling, not just 'move on' but really heal.",
    tag: "Emotional Wellness",
    gender: "female",
  },
  {
    name: "Vikram Patel",
    age: 41,
    text: "I was hesitant about therapy. In our culture, men don't talk about their emotions. But I reached a point where I had to. The experience changed my perspective completely, this isn't weakness, it's taking care of yourself.",
    tag: "Personal Counselling",
    gender: "male",
  },
  {
    name: "Meera Joshi",
    age: 25,
    text: "I used to cry before every presentation, avoid social situations, and constantly doubt myself. Through CBT sessions, I slowly learned to catch those negative thoughts before they spiralled. It's still a journey, but I feel so much lighter now.",
    tag: "CBT Support",
    gender: "female",
  },
  {
    name: "Sandeep Kumar",
    age: 38,
    text: "Marriage counselling saved our relationship. We were stuck in the same arguments, the same silences. Our counsellor didn't take sides, she helped us actually hear each other for the first time in years.",
    tag: "Relationship Counselling",
    gender: "male",
  },
  {
    name: "Divya Krishnan",
    age: 19,
    text: "My self-esteem was at zero. I kept comparing myself to everyone on social media and felt like I wasn't good enough. My counsellor taught me to see myself differently, not by giving me compliments, but by helping me understand where those feelings came from.",
    tag: "Confidence & Self-Esteem",
    gender: "female",
  },
  {
    name: "Nikhil Verma",
    age: 29,
    text: "The meditation and mindfulness sessions were completely different from what I expected. It wasn't just sitting with eyes closed, it was actually learning to sit with my own thoughts without running away from them. Surprisingly powerful.",
    tag: "Mindfulness & Meditation",
    gender: "male",
  },
  {
    text: "I was scared to share things I'd never told anyone. But from the very first session, I felt heard, not analysed, not labelled, just heard. That alone started something healing in me.",
    tag: "Personal Counselling",
    anonymous: true,
    initials: "SK",
    gender: "female",
  },
  {
    text: "I didn't believe talking could help. I thought my problems were too small to bother anyone with. But every session left me feeling a little less heavy. Like someone finally understood what I was carrying.",
    tag: "Emotional Wellness",
    anonymous: true,
    initials: "RM",
    gender: "male",
  },
  {
    text: "My anxiety used to control my whole day, what I ate, who I met, where I went. It's not gone completely, but I now have tools to manage it. And knowing I have someone to talk to when it gets bad makes all the difference.",
    tag: "Stress & Anxiety Support",
    anonymous: true,
    initials: "AD",
    gender: "female",
  },
  {
    text: "The best part was that nothing felt forced. I could talk at my own pace, share only what I was ready to, and never once felt pressured. That sense of safety is something I'll always be grateful for.",
    tag: "Teen Counselling",
    anonymous: true,
    initials: "VS",
    gender: "male",
  },
  {
    text: "I came in feeling completely lost. No direction, no motivation, just emptiness. Through the sessions, I slowly started to understand my emotions instead of being afraid of them. I'm not 'fixed', but I finally feel hopeful.",
    tag: "Emotional Wellness",
    anonymous: true,
    initials: "NP",
    gender: "female",
  },
];

const genderEmojis: Record<string, string> = {
  female: "👩",
  male: "👨",
};

function StarRating() {
  return (
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <Star key={i} size={14} className="fill-amber-400 text-amber-400" />
      ))}
    </div>
  );
}

function TestimonialCard({ testimonial, index }: { testimonial: Testimonial; index: number }) {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.05 }}
      className="flex-shrink-0 w-[85vw] sm:w-[320px] md:w-[360px] bg-white rounded-3xl border border-slate-100 card-lift hover:shadow-xl p-6 flex flex-col gap-4 snap-start"
    >
      <div className="flex items-start gap-3">
        {testimonial.anonymous ? (
          <div className="relative flex-shrink-0">
            <div className="w-11 h-11 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-sm font-bold">
              {testimonial.initials}
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-emerald-500 rounded-full flex items-center justify-center ring-2 ring-white">
              <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
          </div>
        ) : (
          <div className="relative flex-shrink-0">
            <div className="w-11 h-11 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 text-white flex items-center justify-center text-lg leading-none">
              {genderEmojis[testimonial.gender || "female"]}
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-emerald-500 rounded-full flex items-center justify-center ring-2 ring-white">
              <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
          </div>
        )}

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 flex-wrap">
            {testimonial.anonymous ? (
              <span className="text-sm font-bold text-slate-800">Anonymous</span>
            ) : (
              <>
                <span className="text-sm font-bold text-slate-800 truncate">{testimonial.name}</span>
                <span className="text-xs text-slate-400">·</span>
                <span className="text-xs text-slate-400">{testimonial.age}</span>
              </>
            )}
          </div>
          <StarRating />
        </div>

        <Quote size={22} className="text-emerald-200 flex-shrink-0 mt-0.5" />
      </div>

      <p className="text-slate-600 text-sm leading-relaxed">
        &ldquo;{testimonial.text}&rdquo;
      </p>

      {testimonial.tag && (
        <div className="mt-auto pt-1">
          <span className="inline-block text-[11px] font-medium text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
            {testimonial.tag}
          </span>
        </div>
      )}
    </motion.div>
  );
}

export default function TestimonialsSection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section ref={sectionRef} id="testimonials" className="bg-[#FAFAF9] py-20 md:py-28 px-6 border-b border-slate-100 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 mb-3">
              <Sparkles size={18} className="text-emerald-400" />
              <span className="text-xs tracking-widest uppercase text-emerald-600 font-semibold">
                A safe space for growth and healing
              </span>
              <Sparkles size={18} className="text-emerald-400" />
            </div>
            <h2 className="text-3xl md:text-5xl text-slate-900 tracking-tight font-serif mb-4">
              What People Say
            </h2>
            <p className="text-slate-400 text-sm max-w-md mx-auto">
              Every journey shared here reflects trust and support
            </p>
          </div>
        </Reveal>

        <div className="flex gap-5 overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-hide">
          {testimonials.map((t, i) => (
            <TestimonialCard key={`${t.name || t.initials}-${i}`} testimonial={t} index={i} />
          ))}
        </div>

        <p className="text-center text-xs text-slate-300 mt-2 md:hidden">
          swipe to see more
        </p>
      </div>
    </section>
  );
}
