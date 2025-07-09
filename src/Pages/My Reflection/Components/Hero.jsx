import React from "react";

// Heart Icon using Heroicons (you can replace with any SVG or image)
const HeartIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5 mr-2"
    fill="currentColor"
    viewBox="0 0 20 20"
  >
    <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
  </svg>
);

const Hero = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#2a0845] to-[#6441a5] flex items-center justify-center px-4">
      <div className="text-center max-w-xl">
        {/* Title of the page is here*/}
        <h1 className="text-white text-4xl md:text-5xl font-serif font-semibold mb-4">
          Sakkhi's Emotional Mirror
        </h1>

        {/* Subtitle of the timeline*/}
        <p className="text-pink-200 text-base md:text-lg mb-2">
          A "safe space" for your emotional journey.
        </p>
        <p className="text-pink-200 text-sm md:text-base mb-6">
          Welcome to your personal reflection sanctuary.
        </p>

        {/* Button her*/}
        <button
          className="flex items-center justify-center mx-auto px-6 py-3 bg-gradient-to-r from-pink-400 to-pink-600 text-white font-medium rounded-full shadow-lg hover:scale-105 transition-transform"
        >
          <HeartIcon />
          Enter MyReflection
        </button>

        {/* Footer note */}
        <p className="text-pink-300 text-xs mt-4">
          Your healing journey starts with a single step.
        </p>
      </div>
    </div>
  );
};

export default Hero;
