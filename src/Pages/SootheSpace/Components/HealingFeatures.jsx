import React from 'react';
import { Mic, RefreshCw, Heart, Waves, Leaf, HeartPulse } from 'lucide-react';

const HealingFeatures = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4 bg-gradient-to-br from-[#a278b5] to-[#f1cfe2] relative">
      {/* Blur circles for styling*/}
      <div className="absolute top-20 left-10 w-32 h-32 bg-white opacity-20 rounded-full filter blur-2xl"></div>
      <div className="absolute top-32 right-10 w-32 h-32 bg-white opacity-20 rounded-full filter blur-2xl"></div>

      {/* Quote to show*/}
      <h1 className="text-white text-2xl sm:text-3xl md:text-4xl font-light italic max-w-xl leading-relaxed">
        <span className="block">“Even silence can be healing.</span>
        <span className="block mt-1">This is your space to breathe.”</span>
      </h1>

      {/* Buttons resusable */}
      <div className="mt-10 flex flex-wrap justify-center gap-4">
        <ActionButton icon={<Mic size={18} />} text="Play a 3-minute healing" />
        <ActionButton icon={<RefreshCw size={18} />} text="Try a micro meditation" />
        <ActionButton icon={<Heart size={18} />} text="Leave yourself a gentle message" />
      </div>

      {/* Micro Meditations Section For women to feel better & reusable */}
      <div className="mt-20 w-full max-w-6xl px-4">
        <h2 className="text-2xl sm:text-3xl font-semibold text-purple-800 text-center">Micro Meditations</h2>
        <p className="text-sm text-purple-400 text-center mt-1 mb-6">Small moments of peace, designed for busy minds</p>

        <div className="flex flex-wrap justify-center gap-6">
          <MeditationCard
            icon={<Waves size={28} />}
            title="Breathe with Me"
            subtitle="3-min box breathing"
          />
          <MeditationCard
            icon={<Leaf size={28} />}
            title="Feel Grounded"
            subtitle="foot-to-floor awareness"
          />
          <MeditationCard
            icon={<HeartPulse size={28} />}
            title="Quiet the Storm"
            subtitle="heartbeat sync with audio"
          />
        </div>
      </div>
    </div>
  );
};

// Reusable action button
const ActionButton = ({ icon, text }) => (
  <button className="flex items-center gap-2 bg-white/30 text-white px-4 py-2 rounded-xl backdrop-blur-sm shadow-md hover:bg-white/40 transition">
    {icon}
    {text}
  </button>
);

// Reusable meditation card
const MeditationCard = ({ icon, title, subtitle }) => (
  <div className="bg-white/40 backdrop-blur-sm rounded-xl shadow-md p-6 w-full sm:w-72 text-center hover:shadow-lg transition">
    <div className="text-purple-700 mb-4 flex justify-center">{icon}</div>
    <h3 className="text-lg text-purple-800 font-medium mb-1">{title}</h3>
    <p className="text-sm text-purple-500 mb-4">{subtitle}</p>
    <button className="bg-purple-300 hover:bg-purple-400 text-white text-sm px-4 py-1 rounded-md transition">Begin</button>
  </div>
);

export default HealingFeatures;