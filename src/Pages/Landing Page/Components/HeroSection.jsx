
import { useEffect, useState } from "react";



const HeroSection = () => {
  // Use public/assets/ for static images
  const images = [
    "/assets/imagesbg1.jpg",
    "/assets/imagesbg2.jpg",
    "/assets/imagesbg3.jpg",
    "/assets/imagesbg4.jpg",
    "/assets/imagesbg5.jpg",
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 2500); // Change image every 2.5 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center bg-[#1C1B2E] text-white px-4 text-center mt-8 overflow-hidden">

      {/* Background Slideshow */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src={images[currentImageIndex]}
          alt="Background"
          className="w-full h-full object-cover transition-opacity duration-1000 opacity-30"
        />
      </div>

      {/* Glowing circle bg : to be made better */}
      <div className="relative z-10 mb-8">
        <div className="absolute -inset-4 blur-2xl rounded-full bg-gradient-to-tr from-purple-500 via-pink-400 to-blue-500 opacity-30 animate-pulse"></div>
        <div className="relative w-28 h-28 rounded-full flex items-center justify-center bg-white/5 border border-white/10 shadow-md backdrop-blur-sm">
          <span className="text-4xl">✍️</span>
        </div>
      </div>

      {/* Headings */}
      <div className="z-10">
        <h1 className="text-4xl font-serif text-pink-300 drop-shadow-[0_0_20px_rgba(255,192,203,0.5)] mb-5">
          Sakkhi
        </h1>
        <p className="text-xl font-light text-white mb-2">Your inner friend.</p>
        <p className="text-md font-medium text-white mb-1">
          <em>The woman behind the mother.</em>
        </p>
        <p className="text-sm text-slate-300 max-w-md mx-auto">
          You gave birth to love. Let’s now give space to <span className="italic">you.</span>
        </p>
      </div>

      {/* Two Buttons */}
      <div className="z-10 mt-6 flex gap-4 flex-wrap justify-center">
        <button className="bg-gradient-to-r from-pink-300 to-purple-400 text-black px-6 py-2 rounded-full shadow-md hover:opacity-90 transition">
          Start My Healing
        </button>
        <button className="bg-slate-800 px-6 py-2 rounded-full border border-slate-500 hover:bg-slate-700 transition">
          Read Her Story
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
