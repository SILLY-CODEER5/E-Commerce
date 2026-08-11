import React from "react";
import { assets } from "../assets/assets";

const OurPolicy = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 py-20 max-w-6xl mx-auto px-4">
      <div className="bg-white border border-gray-100 rounded-2xl p-8 flex flex-col items-center justify-center text-center shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group">
        <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
          <img src={assets.exchange_icon} className="w-8 opacity-80" alt="Exchange" />
        </div>
        <p className="font-bold text-lg text-gray-900 mb-2">Easy Exchange Policy</p>
        <p className="text-gray-500 text-sm">We offer hassle free exchange policy</p>
      </div>
      <div className="bg-white border border-gray-100 rounded-2xl p-8 flex flex-col items-center justify-center text-center shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group">
        <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
          <img src={assets.quality_icon} className="w-8 opacity-80" alt="Quality" />
        </div>
        <p className="font-bold text-lg text-gray-900 mb-2">7 Days Return Policy</p>
        <p className="text-gray-500 text-sm">We provide 7 days free return policy</p>
      </div>
      <div className="bg-white border border-gray-100 rounded-2xl p-8 flex flex-col items-center justify-center text-center shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group">
        <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
          <img src={assets.support_img} className="w-8 opacity-80" alt="Support" />
        </div>
        <p className="font-bold text-lg text-gray-900 mb-2">Best Customer Support</p>
        <p className="text-gray-500 text-sm">We provide 24/7 customer support</p>
      </div>
    </div>
  );
};

export default OurPolicy;
