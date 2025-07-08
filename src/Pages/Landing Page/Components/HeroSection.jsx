const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center bg-[#1C1B2E] text-white px-4 text-center mt-8">

      {/* Glowing circle bg : to be made better */}
      <div className="relative z-10 mb-8">
        {/* Background Glow will be made better */}
        <div className="absolute -inset-4 blur-2xl rounded-full bg-gradient-to-tr from-purple-500 via-pink-400 to-blue-500 opacity-30 animate-pulse"></div>

        {/* Foreground circle with emoji,writing emoji */}
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