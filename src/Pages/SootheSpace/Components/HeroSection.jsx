import React from 'react';
import { Mic, RefreshCw, Heart } from 'lucide-react';

const HeroSection = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4 bg-gradient-to-br from-[#a278b5] to-[#f1cfe2] relative">
      {/* Blur circles for style */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-white opacity-20 rounded-full filter blur-2xl"></div>
      <div className="absolute top-32 right-10 w-32 h-32 bg-white opacity-20 rounded-full filter blur-2xl"></div>

      {/* Quotes to make it better */}
      <h1 className="text-white text-2xl sm:text-3xl md:text-4xl font-light italic max-w-xl leading-relaxed">
        <span className="block">“Even silence can be healing.</span>
        <span className="block mt-1">This is your space to breathe.”</span>
      </h1>

      {/* Buttons in the bottom */}
      <div className="mt-10 flex flex-wrap justify-center gap-4">
        <button className="flex items-center gap-2 bg-white/30 text-white px-4 py-2 rounded-xl backdrop-blur-sm shadow-md hover:bg-white/40 transition">
          <Mic size={18} />
          Play a 3-minute healing
        </button>

        <button className="flex items-center gap-2 bg-white/30 text-white px-4 py-2 rounded-xl backdrop-blur-sm shadow-md hover:bg-white/40 transition">
          <RefreshCw size={18} />
          Try a micro meditation
        </button>

        <button className="flex items-center gap-2 bg-white/30 text-white px-4 py-2 rounded-xl backdrop-blur-sm shadow-md hover:bg-white/40 transition">
          <Heart size={18} />
          Leave yourself a gentle message
        </button>
      </div>
    </div>
  );
};

export default HeroSection;