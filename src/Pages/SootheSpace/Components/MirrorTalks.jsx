import React from 'react';

const MirrorTalks = () => {
  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center bg-gradient-to-tr from-purple-50 to-white text-center px-4 py-20">
      
      <h1 className="text-3xl sm:text-4xl font-serif font-semibold text-purple-800 mb-2">
        Mirror Pep Talks
      </h1>

      
      <p className="text-sm sm:text-base text-purple-500 mb-10">
        Speak kindness to yourself, watch it reflect back
      </p>

      {/* Card Sextion */}
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-sm transition-all">
        {/* Emoji circle to make it better will experiment with this */}
        <div className="w-16 h-16 mx-auto rounded-full bg-purple-100 flex items-center justify-center text-2xl mb-6">
          ✨
        </div>

        {/* Quotes */}
        <p className="text-gray-700 italic mb-6 text-sm sm:text-base">
          "Let's practice loving words together."
        </p>

        {/* Button */}
        <button className="bg-purple-600 text-white px-4 py-2 text-sm rounded-full hover:bg-purple-700 transition">
          Speak with Kindness
        </button>
      </div>
    </div>
  );
};

export default MirrorTalks;