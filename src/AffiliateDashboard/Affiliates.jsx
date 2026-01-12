import React, { useState } from 'react';
import { useTheme } from "../context/ThemeContext"; // 🚀 Theme logic import
import {
  Users,
  FileText,
  Link2,
  DollarSign,
  TrendingUp,
  CreditCard,
  Headphones,
  Globe,
  Star,
  ChevronDown,
  ArrowRight,
  Calculator,
  MessageCircle,
} from 'lucide-react';

function AffiliatePage() {
  const { darkMode } = useTheme(); // 🚀 Theme state logic

  const stepsData = [
    {
      number: 1,
      icon: FileText,
      title: 'STEP 1 — Apply',
      description: 'Fill out a quick application form — it only takes a few minutes. Our team will review and get back to you within 1–2 business days.',
    },
    {
      number: 2,
      icon: Link2,
      title: 'STEP 2 — Connect',
      description: 'Once approved, share your unique affiliate link across your favorite platforms, communities, or websites.',
    },
    {
      number: 3,
      icon: DollarSign,
      title: 'STEP 3 — Earn',
      description: 'Earn commissions for every successful referral that joins and trades through your link. We offer high commission rates and on-time payouts every week.',
    },
  ];

  const benefitsData = [
    {
      icon: TrendingUp,
      title: 'High Commission Rates',
      description: 'Earn top-tier commissions for every active referral.',
    },
    {
      icon: CreditCard,
      title: 'Weekly Payouts',
      description: 'Receive your payments securely every week — no long waits.',
    },
    {
      icon: Headphones,
      title: 'Dedicated Support',
      description: 'Our affiliate success team is available to help you maximize your results.',
    },
    {
      icon: Globe,
      title: 'Global Reach',
      description: 'Promote to traders worldwide — Binovera supports clients across multiple regions.',
    },
  ];

  const testimonialsData = [
    {
      quote: "Binovera's affiliate system is transparent, easy to use, and rewarding. Their weekly payouts keep the cash flow strong!",
      author: 'Sarah L.',
      title: 'Financial Blogger',
    },
    {
      quote: "The best affiliate dashboard I've used. Real-time stats, clear commission tracking, and instant support.",
      author: 'Ryan T.',
      title: 'YouTuber & Trading Coach',
    },
  ];

  const faqsData = [
    {
      question: 'How can I reset my password?',
      answer: 'Visit the Affiliate Dashboard login page and click "Forgot Password" to receive a password reset email.',
    },
    {
      question: 'When do affiliates get paid?',
      answer: 'Affiliates receive secure payments every week, ensuring no long delays.',
    },
    {
      question: 'How do I track my performance?',
      answer: 'Track your performance via the Affiliate Dashboard, which offers real-time stats and commission tracking.',
    },
  ];

  const resourcesData = [
    {
      icon: FileText,
      title: 'Blog',
      description: 'Stay updated with the latest trading insights and company announcements.',
      link: '/blog',
    },
    {
      icon: Calculator,
      title: 'Fees & Charges',
      description: 'Review our transparent trading, deposit, and withdrawal fee structures.',
      link: '/fees',
    },
    {
      icon: MessageCircle,
      title: '24/7 Chat Support',
      description: 'Our support desk is available 24/7 for any affiliate or trading-related queries.',
      link: '/support',
    },
  ];

  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className={`min-h-screen transition-all duration-500 font-sans ${darkMode ? "bg-black text-white" : "bg-white text-slate-900"}`}>
      
      {/* Hero Section */}
      <section className="relative py-5 md:py-24 overflow-hidden">
        {/* Brand Glows - Opacity adjusted for Light mode */}
        <div className={`absolute top-0 left-1/4 w-96 h-96 rounded-full blur-[120px] ${darkMode ? "bg-[#f99616]/10" : "bg-[#f99616]/5"}`}></div>
        <div className={`absolute bottom-0 right-1/4 w-96 h-96 rounded-full blur-[120px] ${darkMode ? "bg-[#f99616]/5" : "bg-[#f99616]/5"}`}></div>

        <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
          <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tighter italic leading-tight">
            MAXIMIZE YOUR EARNINGS WITH <br />
            <span className="text-[#f99616]">OUR AFFILIATE PROGRAM</span>
          </h1>
          <p className={`mt-6 text-lg max-w-3xl mx-auto font-medium ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
            Join the Binovera Affiliate Program to monetize your audience and connect with a growing network of active traders and investors.
          </p>
          
          <div className={`mt-10 inline-flex items-center gap-3 border px-6 py-3 rounded-2xl shadow-lg transition-all ${darkMode ? "bg-[#111] border-[#f99616]/20" : "bg-gray-50 border-gray-200"}`}>
            <Users className="w-5 h-5 text-[#f99616]" />
            <span className="text-sm font-bold uppercase tracking-widest">
              Join <span className="text-[#f99616]">2,500+ Affiliates</span> Worldwide
            </span>
          </div>

          <div className="mt-10 flex flex-col items-center gap-4">
            <a href="/AffiliateSignup" className="md:px-6 md:py-3 px-3 py-1 bg-[#f99616] hover:bg-[#ffae34] text-black font-black uppercase tracking-widest rounded-xl transition-all shadow-lg active:scale-95">
              Get Started Now
            </a>
            <p className={`text-[11px] font-black uppercase tracking-widest ${darkMode ? "text-gray-600" : "text-gray-400"}`}>
              Already a partner? <a href="/AffiliateLogin" className="text-[#f99616] hover:underline">Dashboard Login</a>
            </p>
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section className={` py-5 md:py-20 transition-all ${darkMode ? "bg-[#050505]" : "bg-gray-50 border-y border-gray-100"}`}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center md:mb-16 mb-5 ">
            <h2 className="text-3xl font-black uppercase italic tracking-wider">How It <span className="text-[#f99616]">Works</span></h2>
            <div className="h-1 w-20 bg-[#f99616] mx-auto mt-4 rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stepsData.map((step) => (
              <div key={step.number} className={`border p-8 rounded-[32px] group relative transition-all duration-300 ${darkMode ? "bg-[#0d0d0d] border-gray-900 hover:border-[#f99616]/30" : "bg-white border-gray-200 shadow-sm hover:shadow-md"}`}>
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-[#f99616] text-black flex items-center justify-center rounded-2xl font-black text-xl italic shadow-lg">
                  {step.number}
                </div>
                <div className={`mb-6 p-4 w-fit rounded-2xl border group-hover:scale-110 transition-transform text-[#f99616] ${darkMode ? "bg-black border-gray-800" : "bg-gray-50 border-gray-200"}`}>
                  <step.icon size={32} />
                </div>
                <h3 className="text-xl font-black uppercase mb-4 tracking-tight">{step.title}</h3>
                <p className={`text-sm leading-relaxed font-medium ${darkMode ? "text-gray-500" : "text-gray-600"}`}>{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="  py-5 md:py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center  md:mb-16 mb-5">
            <h2 className="text-3xl font-black uppercase italic tracking-wider">Why Choose <span className="text-[#f99616]">Binovera?</span></h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefitsData.map((benefit) => (
              <div key={benefit.title} className={`p-6 border rounded-3xl transition-all group ${darkMode ? "bg-[#0d0d0d] border-gray-900 hover:bg-[#111]" : "bg-white border-gray-200 hover:shadow-sm"}`}>
                <div className={`w-12 h-12 flex items-center justify-center rounded-xl mb-6 group-hover:bg-[#f99616] group-hover:text-black transition-all ${darkMode ? "bg-[#f99616]/10 text-[#f99616]" : "bg-orange-50 text-[#f99616]"}`}>
                  <benefit.icon size={24} />
                </div>
                <h3 className="text-lg font-black uppercase mb-2 tracking-tighter">{benefit.title}</h3>
                <p className={`text-xs font-bold leading-relaxed ${darkMode ? "text-gray-500" : "text-gray-600"}`}>{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials (Restored from your 300+ line code) */}
      <section className={`py-5 md:py-20 transition-all ${darkMode ? "bg-[#050505]" : "bg-gray-50 border-y border-gray-100"}`}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center md:mb-16 mb-5">
            <h2 className="text-3xl font-black uppercase italic tracking-wider">What Our <span className="text-[#f99616]">Partners Say</span></h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonialsData.map((testimonial, idx) => (
              <div key={idx} className={`p-8 rounded-3xl border relative ${darkMode ? "bg-[#0d0d0d] border-gray-900" : "bg-white border-gray-200 shadow-md"}`}>
                <Star className="text-[#f99616] absolute top-8 right-4" size={24} />
                <p className={`text-lg italic font-medium mb-6 leading-relaxed ${darkMode ? "text-gray-300" : "text-gray-700"}`}>"{testimonial.quote}"</p>
                <div>
                  <h4 className="font-black uppercase text-[#f99616] tracking-tighter">{testimonial.author}</h4>
                  <p className="text-[10px] uppercase font-bold text-gray-500">{testimonial.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-black uppercase italic text-center mb-12 tracking-widest">F.A.Q</h2>
          <div className="space-y-4">
            {faqsData.map((faq, index) => (
              <div key={index} className={`border rounded-2xl overflow-hidden ${darkMode ? "bg-[#0d0d0d] border-gray-900" : "bg-white border-gray-200"}`}>
                <button 
                  onClick={() => toggleAccordion(index)}
                  className={`w-full flex items-center justify-between p-5 text-left transition-all ${darkMode ? "hover:bg-[#111]" : "hover:bg-gray-50"}`}
                >
                  <span className="font-black text-xs uppercase tracking-widest">{faq.question}</span>
                  <ChevronDown className={`text-[#f99616] transition-transform ${openIndex === index ? 'rotate-180' : ''}`} size={20} />
                </button>
                {openIndex === index && (
                  <div className={`p-5 pt-0 text-xs font-bold leading-relaxed border-t mt-2 ${darkMode ? "text-gray-500 border-gray-900/50" : "text-gray-600 border-gray-100"}`}>
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Resources Section (Restored from your 300+ line code) */}
      <section className={`py-5 md:py-20 transition-all ${darkMode ? "bg-[#050505]" : "bg-gray-50 border-y border-gray-100"}`}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center md:mb-16 mb-5">
            <h2 className="text-3xl font-black uppercase italic tracking-wider">Affiliate <span className="text-[#f99616]">Resources</span></h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {resourcesData.map((resource, idx) => (
              <a href={resource.link} key={idx} className={`p-6 rounded-2xl border group transition-all ${darkMode ? "bg-black border-gray-800 hover:border-[#f99616]" : "bg-white border-gray-200 hover:border-[#f99616] shadow-sm"}`}>
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-[#f99616] text-black rounded-xl group-hover:scale-110 transition-transform">
                    <resource.icon size={20} />
                  </div>
                  <h3 className="font-black uppercase text-sm tracking-widest">{resource.title}</h3>
                </div>
                <p className="text-xs text-gray-500 font-bold mb-4">{resource.description}</p>
                <div className="flex items-center gap-2 text-[#f99616] text-[10px] font-black uppercase">
                  Learn More <ArrowRight size={12} />
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative">
        <div className="max-w-5xl mx-auto px-4">
          <div className="bg-gradient-to-br from-[#f99616] to-[#e88a14] p-10 md:p-12 rounded-[40px] text-center shadow-xl">
            <h2 className="text-3xl md:text-4xl font-black text-black uppercase italic mb-6 leading-tight">Start Earning Today!</h2>
            <p className="text-black/80 font-bold text-base mb-8 max-w-2xl mx-auto">
              Unlock industry-leading commissions and weekly payouts by sharing Binovera's powerful trading platform with your community.
            </p>
            <a href="/AffiliateSignup" className="inline-flex items-center gap-3 md:px-10 md:py-5 px-3 py-2 bg-black text-[#f99616] font-black uppercase tracking-widest rounded-2xl hover:bg-[#111] transition-all shadow-2xl">
              Sign Up Now <ArrowRight size={20} />
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}

export default AffiliatePage;