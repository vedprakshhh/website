import Link from 'next/link';
import { ArrowLeft, Mail, Phone, MapPin } from 'lucide-react';

export default function ContactPage() {
    return (
        <main className="min-h-screen bg-[#FAFAF9] pt-32 pb-20">
            <div className="max-w-4xl mx-auto px-6">
                <Link href="/" className="text-teal-600 flex items-center gap-2 mb-8 hover:underline">
                    <ArrowLeft size={16} /> Back to Home
                </Link>

                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">Contact Us</h1>
                    <p className="text-lg text-slate-600">Have a question or need to get in touch? We'd love to hear from you.</p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    {/* Contact Form */}
                    <div className="bg-white rounded-2xl p-8 border border-slate-200">
                        <h2 className="text-2xl font-bold mb-6 text-slate-900">Send us a message</h2>
                        <form className="space-y-4">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">Name</label>
                                <input type="text" id="name" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-colors" placeholder="Your name" />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                                <input type="email" id="email" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-colors" placeholder="your@email.com" />
                            </div>
                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-1">Message</label>
                                <textarea id="message" rows={4} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-colors resize-none" placeholder="How can we help you?"></textarea>
                            </div>
                            <button type="button" className="w-full bg-teal-600 hover:bg-teal-700 text-white font-medium py-3 rounded-lg transition-colors">
                                Send Message
                            </button>
                        </form>
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-6">
                        <div className="bg-white rounded-2xl p-8 border border-slate-200">
                            <h2 className="text-2xl font-bold mb-6 text-slate-900">Get in touch</h2>
                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="bg-teal-50 p-3 rounded-full text-teal-600 shrink-0">
                                        <Mail size={20} />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-slate-900">Email</h3>
                                        <p className="text-slate-600 text-sm mt-1">For general inquiries and support.</p>
                                        <a href="mailto:hello@mindguide.com" className="text-teal-600 font-medium mt-1 inline-block hover:underline">hello@mindguide.com</a>
                                    </div>
                                </div>
                                
                                <div className="flex items-start gap-4">
                                    <div className="bg-teal-50 p-3 rounded-full text-teal-600 shrink-0">
                                        <Phone size={20} />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-slate-900">Phone</h3>
                                        <p className="text-slate-600 text-sm mt-1">Mon-Fri from 9am to 6pm.</p>
                                        <a href="tel:+910000000000" className="text-teal-600 font-medium mt-1 inline-block hover:underline">+91 00000 00000</a>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="bg-teal-50 p-3 rounded-full text-teal-600 shrink-0">
                                        <MapPin size={20} />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-slate-900">Office</h3>
                                        <p className="text-slate-600 text-sm mt-1">Come say hello at our office HQ.</p>
                                        <p className="text-slate-800 font-medium mt-1">Hyderabad, India</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
