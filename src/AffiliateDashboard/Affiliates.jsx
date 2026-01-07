// import React, { useState } from 'react';
// import Layout from '../AffiliateDashboard/Layout';

// function AffiliatePrograms() {
//   return (
//     <Layout pageTitle="Affiliate Programs">
//       <div className="space-y-6 max-w-[1380px]">
//         <div className="rounded-xl border bg-gray-900/50 border-gray-800 p-8">
//           <div className="space-y-6 text-gray-300 text-sm">
//             <p>
//               The Trade Pro Affiliate Program is designed to reward individuals for promoting our trading platform. Affiliates can earn commissions by referring new traders to Trade Pro. This program is an excellent opportunity for anyone looking to generate additional income by simply sharing their positive experiences with our platform.
//             </p>
//             <div>
//               <h3 className="text-xl text-white font-semibold mb-3">Commission Structure</h3>
//               <p>
//                 Affiliates can earn up to 80% of the broker's trading commissions. This lucrative commission structure motivates affiliates to refer active traders, which in turn increases their potential earnings. The more active traders you bring on board, the higher your commission will be!
//               </p>
//             </div>
//             <div>
//               <h3 className="text-xl text-white font-semibold mb-3">How to Join</h3>
//               <p className="mb-2">Joining the Trade Pro Affiliate Program is simple. Follow these steps:</p>
//               <ol className="list-decimal list-inside space-y-2 pl-4">
//                 <li>Fill out the registration form available on our website.</li>
//                 <li>Accept the terms and conditions of the program.</li>
//                 <li>Receive your unique affiliate link and promotional materials.</li>
//                 <li>Start promoting and earning commissions!</li>
//               </ol>
//             </div>
//             <div>
//               <h3 className="text-xl text-white font-semibold mb-3">Promotional Tools</h3>
//               <p className="mb-2">We provide a variety of marketing materials to help you succeed. These include:</p>
//               <ul className="list-disc list-inside space-y-2 pl-4">
//                 <li>Banners for your website or blog</li>
//                 <li>Referral links to track your leads</li>
//                 <li>Content suggestions for social media posts</li>
//               </ul>
//               <p className="mt-2">These tools are designed to maximize your potential for attracting new traders.</p>
//             </div>
//             <div>
//               <h3 className="text-xl text-white font-semibold mb-3">Support and Resources</h3>
//               <p className="mb-2">Our affiliates have access to a dedicated support team to assist with any questions or challenges. Additionally, we offer:</p>
//               <ul className="list-disc list-inside space-y-2 pl-4">
//                 <li>Frequently Asked Questions (FAQs)</li>
//                 <li>Webinars and training sessions</li>
//                 <li>Access to a community of affiliates</li>
//               </ul>
//               <p className="mt-2">We're committed to helping you succeed in your affiliate marketing journey!</p>
//             </div>
//             <div>
//               <h3 className="text-xl text-white font-semibold mb-3">Success Stories and Testimonials</h3>
//               <p className="mb-4">Read inspiring testimonials from our top-performing affiliates:</p>
//               <div className="space-y-4 bg-gray-800/30 p-4 rounded-lg">
//                 <p className="italic text-gray-300">"Joining the Trade Pro Affiliate Program changed my life! I never thought I could earn this much by simply sharing a link!" - Jane D.</p>
//                 <p className="italic text-gray-300">"The support I received was incredible. The tools provided made it easy to promote and succeed." - John S.</p>
//               </div>
//             </div>
//             <div>
//               <h3 className="text-xl text-white font-semibold mb-3">Regulations and Compliance</h3>
//               <p>
//                 Affiliates must adhere to our ethical marketing guidelines and comply with legal requirements. This ensures that we maintain the integrity of the Trade Pro brand and protect our community. Familiarize yourself with our compliance policy to ensure your marketing efforts align with our standards.
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </Layout>
//   );
// }

// export default AffiliatePrograms;
















// src/components/AffiliatePage.jsx
import React, { useState } from 'react';
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
    <div className="min-h-screen bg-black text-white font-sans">
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        {/* Brand Glows */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#f99616]/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#f99616]/5 rounded-full blur-[120px]"></div>

        <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
          <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tighter italic">
            MAXIMIZE YOUR EARNINGS WITH <br />
            <span className="text-[#f99616]">OUR AFFILIATE PROGRAM</span>
          </h1>
          <p className="mt-6 text-gray-400 text-lg max-w-3xl mx-auto font-medium">
            Join the Binovera Affiliate Program to monetize your audience and connect with a growing network of active traders and investors.
          </p>
          
          <div className="mt-10 inline-flex items-center gap-3 bg-[#111] border border-[#f99616]/20 px-6 py-3 rounded-2xl shadow-[0_0_20px_rgba(249,150,22,0.1)]">
            <Users className="w-5 h-5 text-[#f99616]" />
            <span className="text-sm font-bold uppercase tracking-widest">
              Join <span className="text-[#f99616]">2,500+ Affiliates</span> Worldwide
            </span>
          </div>

          <div className="mt-10 flex flex-col items-center gap-4">
            <a href="/AffiliateSignup" className="px-10 py-4 bg-[#f99616] hover:bg-[#ffae34] text-black font-black uppercase tracking-widest rounded-xl transition-all shadow-[0_10px_30px_-5px_rgba(249,150,22,0.4)] active:scale-95">
              Get Started Now
            </a>
            <p className="text-gray-600 text-[11px] font-black uppercase tracking-widest">
              Already a partner? <a href="/AffiliateLogin" className="text-[#f99616] hover:underline">Dashboard Login</a>
            </p>
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-20 bg-[#050505]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-black uppercase italic tracking-wider">How It <span className="text-[#f99616]">Works</span></h2>
            <div className="h-1 w-20 bg-[#f99616] mx-auto mt-4 rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stepsData.map((step) => (
              <div key={step.number} className="bg-[#0d0d0d] border border-gray-900 p-8 rounded-[32px] hover:border-[#f99616]/30 transition-all group relative">
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-[#f99616] text-black flex items-center justify-center rounded-2xl font-black text-xl italic shadow-lg">
                  {step.number}
                </div>
                <div className="mb-6 p-4 w-fit bg-black rounded-2xl border border-gray-800 text-[#f99616] group-hover:scale-110 transition-transform">
                  <step.icon size={32} />
                </div>
                <h3 className="text-xl font-black uppercase mb-4 tracking-tight">{step.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed font-medium">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-black uppercase italic tracking-wider">Why Choose <span className="text-[#f99616]">Binovera?</span></h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefitsData.map((benefit) => (
              <div key={benefit.title} className="p-6 bg-[#0d0d0d] border border-gray-900 rounded-3xl hover:bg-[#111] transition-all group">
                <div className="w-12 h-12 flex items-center justify-center bg-[#f99616]/10 text-[#f99616] rounded-xl mb-6 group-hover:bg-[#f99616] group-hover:text-black transition-all">
                  <benefit.icon size={24} />
                </div>
                <h3 className="text-lg font-black uppercase mb-2 tracking-tighter">{benefit.title}</h3>
                <p className="text-gray-500 text-xs font-bold leading-relaxed">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-[#050505]">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-black uppercase italic text-center mb-12 tracking-widest">F.A.Q</h2>
          <div className="space-y-4">
            {faqsData.map((faq, index) => (
              <div key={index} className="bg-[#0d0d0d] border border-gray-900 rounded-2xl overflow-hidden">
                <button 
                  onClick={() => toggleAccordion(index)}
                  className="w-full flex items-center justify-between p-5 text-left hover:bg-[#111] transition-all"
                >
                  <span className="font-black text-xs uppercase tracking-widest">{faq.question}</span>
                  <ChevronDown className={`text-[#f99616] transition-transform ${openIndex === index ? 'rotate-180' : ''}`} size={20} />
                </button>
                {openIndex === index && (
                  <div className="p-5 pt-0 text-gray-500 text-xs font-bold leading-relaxed border-t border-gray-900/50 mt-2">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
    <section className="py-14 sm:py-20 relative">
  <div className="max-w-5xl mx-auto px-4">
    <div className="
      bg-gradient-to-br from-[#f99616] to-[#e88a14]
      p-6 sm:p-10 md:p-12
      rounded-2xl sm:rounded-[32px] md:rounded-[40px]
      text-center
      shadow-[0_20px_50px_rgba(249,150,22,0.2)]
    ">
      {/* HEADING */}
      <h2 className="
        text-2xl sm:text-3xl md:text-4xl
        font-black text-black uppercase italic
        mb-4 sm:mb-6
        leading-tight
      ">
        Start Earning Today!
      </h2>

      {/* DESCRIPTION */}
      <p className="
        text-black/80 font-bold
        text-sm sm:text-base
        mb-6 sm:mb-8
        max-w-2xl mx-auto
      ">
        Unlock industry-leading commissions and weekly payouts by sharing
        Binovera's powerful trading platform with your community.
      </p>

      {/* CTA BUTTON */}
      <a
        href="/AffiliateSignup"
        className="
          inline-flex sm:inline-flex
          w-full sm:w-auto
          justify-center items-center gap-3
          px-6 sm:px-10
          py-4 sm:py-5
          bg-black text-[#f99616]
          font-black uppercase tracking-widest
          rounded-xl sm:rounded-2xl
          hover:bg-[#111]
          transition-all
          shadow-2xl
          text-sm sm:text-base
        "
      >
        Sign Up Now <ArrowRight size={18} className="sm:size-[20px]" />
      </a>
    </div>
  </div>
</section>

    </div>
  );
}

export default AffiliatePage;