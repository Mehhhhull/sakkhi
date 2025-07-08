import React from 'react';
import { Sparkles } from 'lucide-react';

// Listed the features
const features = [
  {
    icon: '💬',
    title: 'Suno Khud Ko',
    subtitle: 'Voice note mood check-ins',
    description: 'Record your feelings in your own voice. Sometimes speaking feels easier than writing.',
  },
  {
    icon: '✍️',
    title: 'Self-Love Journal',
    subtitle: 'Daily reflective prompts',
    description: 'Gentle questions that help you reconnect with who you are beyond motherhood.',
  },
  {
    icon: '👭',
    title: 'Circle Of One',
    subtitle: 'Anonymous support chatrooms',
    description: 'Connect with other mothers who understand your journey, without judgment.',
  },
  {
    icon: '♀️',
    title: 'SootheSpace',
    subtitle: 'Breathing, meditations, mirror pep talks',
    description: 'Quick moments of peace when the world feels overwhelming.',
  },
  {
    icon: '📖',
    title: 'Bharosa Library',
    subtitle: 'Real mom stories (English/Hindi)',
    description: 'Read stories from mothers who’ve walked this path and found their way back to themselves.',
  },
  {
    icon: '🕯️',
    title: 'MyReflection Room',
    subtitle: 'Auto-built timeline of personal wins',
    description: 'Watch your healing journey unfold as small victories become big transformations.',
  },
];

const FeatureCard = ({ icon, title, subtitle, description }) => (
  <div className="bg-[#1f1b2e] text-white p-6 rounded-2xl shadow-md hover:shadow-lg transition duration-300 max-w-sm w-full h-full">
    <div className="text-3xl mb-3">{icon}</div>
    <h3 className="text-lg font-semibold">{title}</h3>
    <p className="text-sm text-purple-200 italic">{subtitle}</p>
    <p className="text-sm text-gray-300 mt-2">{description}</p>
  </div>
);

const HealingSpaceSection = () => {
  return (
    <div className="bg-gradient-to-b from-[#0e0a1f] to-[#1a1430] text-white py-16 px-4 md:px-12 text-center">
      <h2 className="text-3xl md:text-4xl font-light mb-2">
        Your Personal <span className="italic font-semibold text-pink-300">Healing Space</span>
      </h2>
      <p className="text-gray-300 max-w-xl mx-auto mb-12">Tools designed with love, for the journey back to yourself</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-center items-stretch">
        {features.map((feature, index) => (
          <FeatureCard key={index} {...feature} />
        ))}
      </div>

      <p className="text-sm text-gray-400 mt-14">Every feature is a step closer to finding yourself again</p>

      <button className="mt-4 px-6 py-2 text-sm rounded-full bg-white text-[#1a1430] hover:bg-gray-200 transition font-medium">
        Explore All Features
      </button>
    </div>
  );
};

export default HealingSpaceSection;