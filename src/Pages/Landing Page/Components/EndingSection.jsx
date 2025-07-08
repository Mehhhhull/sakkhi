import React from 'react';

const EndingSection = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1c152b] to-[#241a34] flex flex-col justify-center items-center text-center px-4 relative overflow-hidden">
      
      <h1 className="text-white text-3xl sm:text-4xl md:text-5xl font-light leading-snug">
        "The baby is fine. <br />
        <span className="text-pink-300 italic font-semibold text-4xl sm:text-5xl md:text-6xl">
          Now let’s ask , are you?
        </span>"
      </h1>

      <p className="text-gray-300 mt-4 text-sm sm:text-base">
        Your healing matters. Your story matters. YOU MATTER.
      </p>

      <div className="relative mt-8">
        {/* Glowing blur behind button */}
        <div className="absolute inset-0 w-[280px] h-[60px] rounded-full blur-2xl bg-pink-300 opacity-20 z-0" />
        
        <button className="relative z-10 bg-pink-200 text-black px-8 py-3 rounded-full font-medium shadow-md hover:bg-pink-300 transition duration-300">
          Begin My Journey
        </button>
      </div>

      <p className="text-gray-400 mt-6 text-xs italic">
        Join thousands of mothers who "CHOSE" THEMselves
      </p>
    </div>
  );
};

export default EndingSection;