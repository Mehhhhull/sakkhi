import React from 'react';
import { Waves, Leaf, HeartPulse } from 'lucide-react';

const HealingFeatures = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4 bg-gradient-to-br from-[#a278b5] to-[#f1cfe2] relative">
      {/* Micro Meditations Section For women to feel better & this sec is reusable */}
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
