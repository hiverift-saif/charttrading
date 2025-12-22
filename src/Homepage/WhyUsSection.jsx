import React from "react";
import { motion } from "framer-motion";
import { 
  Users, 
  Copy, 
  Zap, 
  TrendingUp, 
  BarChart2, 
  CreditCard, 
  Cpu, 
  Lock, 
  Headphones 
} from "lucide-react";

const features = [
  {
    id: 1,
    title: "User-Friendly Interface",
    desc: "Our top priority is making sure our clients are satisfied. IQCent has a user-friendly interface that allows our clients to perform quick and easy trades.",
    imgUrl: "https://iqcent.com/assets/env/iqcent/main/img/versatilePlatform.png", 
    fallbackIcon: <Users className="w-16 h-16 text-[#ffae34]" />
  },
  {
    id: 2,
    title: "Copy Trading Tool",
    desc: "CopyTrading has never been so easy. We developed a straight forward system, that allows both active and novice traders to use our system.",
    imgUrl: "https://iqcent.com/assets/env/iqcent/main/img/copyTrading.png",
    fallbackIcon: <Copy className="w-16 h-16 text-[#ffae34]" />
  },
  {
    id: 3,
    title: "Rapid Withdrawals",
    desc: "Our payments integration means you may have your earnings sent to your wallet in minutes.",
    imgUrl: "https://iqcent.com/assets/env/iqcent/main/img/instant.png",
    fallbackIcon: <Zap className="w-16 h-16 text-[#ffae34]" />
  },
  {
    id: 4,
    title: "100+ Trading Assets",
    desc: "With us, you can access a wide variety of assets, from currency pairs, cryptocurrencies, commodities, indices, and more!",
    imgUrl: "https://iqcent.com/assets/env/iqcent/main/img/tradingAssets.png",
    fallbackIcon: <TrendingUp className="w-16 h-16 text-[#ffae34]" />
  },
  {
    id: 5,
    title: "Leverage up to 1:500",
    desc: "Our leverage tool allows you to leverage up to 500 times your current assets. Gain more exposure to assets with minimized risks.",
    imgUrl: "https://iqcent.com/assets/env/iqcent/main/img/laverage.png",
    fallbackIcon: <BarChart2 className="w-16 h-16 text-[#ffae34]" />
  },
  {
    id: 6,
    title: "Payment Method",
    desc: "You may use our service to receive and transfer money using a variety of our payment options, including digital currencies and debit cards.",
    imgUrl: "https://iqcent.com/assets/env/iqcent/main/img/paymentMethods.png",
    fallbackIcon: <CreditCard className="w-16 h-16 text-[#ffae34]" />
  },
  {
    id: 7,
    title: "Advanced Trading Tools",
    desc: "IQCent online trading platform offers users advanced charting and analytical tools to make informed investment decisions.",
    imgUrl: "https://iqcent.com/assets/env/iqcent/main/img/advanced-tools.png",
    fallbackIcon: <Cpu className="w-16 h-16 text-[#ffae34]" />
  },
  {
    id: 8,
    title: "Newest Encryption",
    desc: "Our platform is protected with advanced network security measures, including 256-bit SSL encryption, that protect investments.",
    imgUrl: "https://iqcent.com/assets/env/iqcent/main/img/copy-trading.png", 
    fallbackIcon: <Lock className="w-16 h-16 text-[#ffae34]" />
  },
  {
    id: 9,
    title: "24/7 Customer Support",
    desc: "Our 24/7 customer support team is accessible via live chat, phone, and email to assist with any service issues or inquiries.",
    imgUrl: "https://iqcent.com/assets/env/iqcent/main/img/instant-image.png",
    fallbackIcon: <Headphones className="w-16 h-16 text-[#ffae34]" />
  }
];

// --- Card Entrance Animation ---
const cardEntranceVariants = {
  hidden: (direction) => ({
    opacity: 0,
    x: direction === "left" ? -100 : direction === "right" ? 100 : 0,
    y: direction === "center" ? 100 : 0,
  }),
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: { type: "spring", stiffness: 40, damping: 15, duration: 0.8 }
  }
};

const FeatureCard = ({ item, index }) => {
  let direction = "center";
  if (index % 3 === 0) direction = "left";
  else if (index % 3 === 2) direction = "right";

  return (
    <motion.div
      custom={direction}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={cardEntranceVariants}
      className="h-full"
    >
      <motion.div 
        // Card Height increased slightly (h-[380px]) to fit all content comfortably
        className="h-[280px] bg-[#46146c] rounded-2xl p-6 flex flex-col items-center shadow-lg border border-white/5 relative overflow-hidden cursor-pointer group"
        initial="rest"
        whileHover="hover"
        animate="rest"
      >
        
        {/* Background Hover Glow */}
        <motion.div 
          className="absolute inset-0 bg-[#521c7d] opacity-0" 
          variants={{
            rest: { opacity: 0 },
            hover: { opacity: 1, transition: { duration: 0.3 } }
          }}
        />

        {/* --- Content Container --- */}
        <div className="relative z-10 flex flex-col items-center  justify-evenly h-full py-4">

            {/* 1. IMAGE SECTION */}
            <motion.div 
              className="h-24 w-full flex items-center justify-center mb-4"
              variants={{
                rest: { y: 0, opacity: 1, scale: 1 },
                // Hover: Upar slide karega aur gayab ho jayega
                hover: { y: -100, opacity: 0, scale: 0.8, transition: { duration: 0.4 } } 
              }}
            >
                <img 
                  src={item.imgUrl} 
                  alt={item.title}
                  onError={(e) => {
                    e.target.style.display = 'none'; 
                    e.target.nextSibling.style.display = 'flex';
                  }}
                  className="object-contain h-full max-w-[340px]"
                />
                <div className="hidden items-center justify-center">
                    {item.fallbackIcon}
                </div>
            </motion.div>

            {/* 2. TEXT SECTION (Title + Desc) */}
            <motion.div 
              className="flex flex-col items-center text-center"
              variants={{
                rest: { y: 0 },
                // Hover: Poora text block upar slide karega center position lene ke liye
                hover: { y: -60, transition: { duration: 0.4 } }
              }}
            >
              {/* Title */}
              <h3 className="text-white text-[20px] font-bold mb-3 font-open-sans tracking-wide">
                {item.title}
              </h3>

              {/* Description - AB DEFAULT MEIN BHI DIKHEGA (Opacity 1) */}
              <motion.p 
                className="text-[#e0e0e0] text-[14px] leading-relaxed font-open-sans"
                variants={{
                  rest: { opacity: 1 }, // Default Visible
                  hover: { opacity: 1 } // Hover pe bhi Visible
                }}
              >
                {item.desc}
              </motion.p>
            </motion.div>

        </div>
      </motion.div>
    </motion.div>
  );
};

const WhyUsGrid = () => {
  return (
    <section className="bg-black min-h-screen py-20 px-4">
      <div className="max-w-[1200px] mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center text-white mb-16">
          Why Choose <span className="text-[#ffae34]">IQCent?</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((item, index) => (
            <FeatureCard key={item.id} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyUsGrid;