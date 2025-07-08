import React from 'react';

const SpeakPage = () => {
  return (
    <div
      className="min-h-screen flex flex-col justify-center items-center text-center px-4"
      style={{
        background: "linear-gradient(to bottom right, rgb(33,23,52), rgb(87,67,97))",
      }}
    >
      {/* Headings Start Here */}
      <h1 className="text-white text-2xl md:text-4xl font-bold leading-snug mb-2 mt-4">
        Sun lo apni awaaz. <br />
        <span className="text-pink-300">Khud se milne ka waqt aa gaya hai.</span>
      </h1>

      {/* Paragraph*/}
      <p className="text-gray-400 text-xs md:text-sm mt-4 mb-8">
        Not a mood tracker. A moment to feel seen.
      </p>

      {/* Circle with mic emoji:Added some animation on hove */}
      <div
        className="w-40 h-40 rounded-full 
             bg-gradient-to-br from-[#4c2b70] to-[#301d4c] 
             flex items-center justify-center 
             shadow-lg mb-6 
             hover:scale-110 hover:shadow-purple-500/50 
             transition-all duration-300 ease-in-out 
             animate-pulse hover:animate-none cursor-pointer"
      >
        <span className="text-5xl">🎙️</span>
      </div>

      {/* Button */}
      <button className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-6 py-3 rounded-full text-sm font-semibold hover:scale-105 transition">
        Begin My Check-In
      </button>

      {/* Bottom text */}
      <p className="text-2xl text-gray-500 mt-6">
        You don’t need to name it to feel it. You begin.
      </p>
    </div>


  );
}

export default SpeakPage;