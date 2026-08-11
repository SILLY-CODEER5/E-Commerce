import React from "react";
import { assets } from "../assets/assets";

const Hero = () => {
  return (
    <div className="flex flex-col sm:flex-row border border-gray-200 rounded-3xl overflow-hidden shadow-sm my-8 min-h-[500px] sm:min-h-[650px]">
      {/* Hero left side */}
      <div className="w-full sm:w-1/2 flex items-center justify-center py-20 sm:py-0 px-8 bg-gray-50/50">
        <div className="text-gray-800">
          <div className="flex items-center gap-3 mb-2">
            <p className="w-8 md:w-11 h-[2px] bg-gray-800"></p>
            <p className="font-semibold text-xs md:text-sm tracking-widest text-gray-500 uppercase">Our Bestsellers</p>
          </div>
          <h1 className="prata-regular text-4xl sm:py-3 lg:text-6xl leading-tight mb-4">
            Latest Arrivals
          </h1>
          <div className="flex items-center gap-3 group cursor-pointer w-max">
            <p className="font-semibold text-sm md:text-base tracking-wide group-hover:text-black transition-colors">SHOP NOW</p>
            <p className="w-8 md:w-11 h-[2px] bg-gray-800 group-hover:w-12 transition-all duration-300"></p>
          </div>
        </div>
      </div>

      {/* Hero right side */}
      <div className="w-full sm:w-1/2 min-h-[400px] sm:min-h-0 relative">
        <div 
          className="absolute -inset-1 bg-cover bg-center"
          style={{ backgroundImage: `url(${assets.hero_img})` }}
        ></div>
      </div>
    </div>
  );
};

export default Hero;
