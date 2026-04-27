import HeroSection from './components/HeroSection';
import WhatWeDoSection from './components/WhatWeDoSection';
import AboutSection from './components/AboutSection';
import CounsellorsSection from './components/CounsellorsSection';
import ServicesSection from './components/ServicesSection';
import WhyChooseUsSection from './components/WhyChooseUsSection';
import BookingCTASection from './components/BookingCTASection';
import Footer from './components/Footer';

export default function Home() {
  return (
    <div className="bg-[#FAFAF9] min-h-screen text-slate-900 overflow-x-hidden flex flex-col">
      <HeroSection />
      <WhatWeDoSection />
      <AboutSection />
      <CounsellorsSection />
      <ServicesSection />
      <WhyChooseUsSection />
      <BookingCTASection />
      <Footer />
    </div>
  );
}