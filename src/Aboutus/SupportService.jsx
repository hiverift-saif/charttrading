import React from 'react';
import { 
  Headphones, HelpCircle, BookOpen, MessageSquare, 
  ShieldCheck, Zap, LifeBuoy, ChevronRight, CheckCircle2,
  Clock, Mail, Send
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const SupportService = () => {
  const { darkMode } = useTheme();

  const faqs = [
    { q: "How to reset my trading password?", a: "Go to the login page and click 'Forgot Password'. A reset link will be sent to your registered email instantly." },
    { q: "What is the minimum withdrawal amount?", a: "The minimum withdrawal depends on the method, starting from $10 for UPI and $50 for USDT." },
    { q: "How long does verification take?", a: "Our KYC team typically reviews documents within 2-4 hours during business days." },
    { q: "Are my funds secure?", a: "Yes, we use segregated accounts and SSL encryption to ensure 100% security of client capital." }
  ];

  return (
    <div className={`min-h-screen md:pt-24 md:pb-20 pt-5 pb-5 transition-colors duration-500  ${darkMode ? "bg-black text-white" : "bg-white text-black"}`}>
      <div className="max-w-6xl mx-auto px-5">
        
        {/* --- 1. HERO HEADER --- */}
        <div className="text-center mb-16">
          <div className="inline-flex p-3 rounded-2xl bg-[#f99616]/10 text-[#f99616] mb-6">
            <LifeBuoy size={32} className="animate-spin-slow" />
          </div>
          <h4 className="text-[#f99616] font-black uppercase tracking-[0.4em] text-[10px] mb-2">Help Center</h4>
          <h1 className="text-4xl md:text-7xl font-black uppercase italic tracking-tighter leading-none mb-6">
            Support <span className="text-[#f99616]">& Service</span>
          </h1>
          <p className="max-w-2xl mx-auto text-gray-500 font-bold uppercase text-[10px] md:text-xs tracking-widest leading-relaxed italic">
            Empowering your trading journey with 24/7 technical expertise and personalized service solutions.
          </p>
        </div>

        {/* --- 2. SERVICE CARDS GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {[
            { t: "Knowledge Base", d: "Detailed guides on how to use the trading terminal and tools.", i: <BookOpen/> },
            { t: "Live Assistance", d: "Real-time chat with our professional support engineers.", i: <MessageSquare/> },
            { t: "Account Safety", d: "Specialized desk for security and 2FA related inquiries.", i: <ShieldCheck/> }
          ].map((service, i) => (
            <div key={i} className={`p-8 rounded-[2.5rem] border transition-all hover:border-[#f99616]/40 ${darkMode ? "bg-[#0d0d0d] border-gray-800" : "bg-gray-50 border-gray-100 shadow-xl"}`}>
              <div className="text-[#f99616] mb-6">{service.i}</div>
              <h3 className="text-xl font-black uppercase italic mb-3">{service.t}</h3>
              <p className="text-xs text-gray-500 font-bold leading-relaxed uppercase mb-6">{service.d}</p>
              <button className="flex items-center gap-2 text-[10px] font-black uppercase text-[#f99616] hover:gap-4 transition-all">
                Explore More <ChevronRight size={14}/>
              </button>
            </div>
          ))}
        </div>

        {/* --- 3. THE SUPPORT PROCESS (LONG CONTENT) --- */}
        <div className={`p-10 md:p-16 rounded-[3.5rem] border mb-20 relative overflow-hidden ${darkMode ? "bg-white/5 border-gray-800" : "bg-orange-50 border-orange-100"}`}>
           <h2 className="text-3xl font-black uppercase italic mb-12 text-center md:text-left tracking-tighter">Our <span className="text-[#f99616]">Service</span> Commitment</h2>
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                 {[
                   { t: "15-Minute Response", d: "Our average ticket response time is under 15 minutes for all users." },
                   { t: "Global Coverage", d: "Support available in 10+ major languages across all time zones." },
                   { t: "Expert Resolutions", d: "No bots. Real trading experts handling your technical queries." },
                   { t: "Refund Protection", d: "Dedicated billing desk for instant withdrawal and deposit tracking." }
                 ].map((item, idx) => (
                   <div key={idx} className="flex gap-4">
                      <div className="bg-[#f99616] rounded-full p-1 h-fit text-white"><CheckCircle2 size={16}/></div>
                      <div>
                         <h5 className="text-xs font-black uppercase mb-1">{item.t}</h5>
                         <p className="text-[10px] text-gray-500 font-bold uppercase">{item.d}</p>
                      </div>
                   </div>
                 ))}
              </div>
              <div className="hidden lg:block relative">
                 <div className="absolute inset-0 bg-[#f99616]/10 blur-[100px] rounded-full"></div>
                 <Headphones size={250} className="text-[#f99616] opacity-10 mx-auto" />
              </div>
           </div>
        </div>

        {/* --- 4. FAQ SECTION --- */}
        <div className="mb-20">
           <h3 className="text-2xl font-black uppercase italic mb-10 text-center tracking-widest">Common <span className="text-[#f99616]">Questions</span></h3>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {faqs.map((faq, i) => (
                <div key={i} className={`p-6 rounded-2xl border ${darkMode ? "bg-[#0d0d0d] border-gray-800" : "bg-white border-gray-100"}`}>
                   <div className="flex items-start gap-3 mb-3">
                      <HelpCircle size={18} className="text-[#f99616] shrink-0" />
                      <h4 className="text-[11px] font-black uppercase tracking-tight italic leading-tight">{faq.q}</h4>
                   </div>
                   <p className="text-[10px] text-gray-500 font-bold leading-relaxed ml-7 uppercase tracking-tighter">{faq.a}</p>
                </div>
              ))}
           </div>
        </div>

        {/* --- 5. CONTACT CTA --- */}
    <div className={`p-6 md:p-12 rounded-2xl md:rounded-[3rem] border flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8 ${darkMode ? "bg-[#0d0d0d] border-gray-800" : "bg-gray-50 border-gray-100 shadow-xl"}`}>
   
   {/* Text Section */}
   <div className="text-center md:text-left">
      <h3 className="text-xl md:text-2xl font-black uppercase italic mb-1 md:mb-2">
        Still Need <span className="text-[#f99616]">Help?</span>
      </h3>
      <p className="text-[9px] md:text-[10px] font-black text-gray-500 uppercase tracking-widest">
        Connect with us on our official channels
      </p>
   </div>

   {/* Buttons Container */}
   <div className="flex flex-row gap-3 w-full md:w-auto">
      <button className="flex-1 md:flex-none bg-[#f99616] text-white px-4 md:px-8 py-3.5 md:py-4 rounded-xl font-black text-[9px] md:text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-[#e88a14] transition-all active:scale-95">
         <Mail size={14} className="md:size-4"/> Email
      </button>
      
      <button className="flex-1 md:flex-none bg-[#0088cc] text-white px-4 md:px-8 py-3.5 md:py-4 rounded-xl font-black text-[9px] md:text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-[#0077b5] transition-all active:scale-95">
         <Send size={14} className="md:size-4"/> Telegram
      </button>
   </div>
</div>

      </div>
    </div>
  );
};

export default SupportService;