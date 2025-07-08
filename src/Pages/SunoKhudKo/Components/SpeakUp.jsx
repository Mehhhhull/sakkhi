import React, { useState } from 'react';

// Reusable Card Component that will be used in the SpeakUp component
// It displays the prompt and has buttons to navigate through prompts
const PromptCard = ({ prompt, onPrev, onNext, onShuffle }) => (
  <div className="bg-[#2a1f3a] text-white rounded-xl p-6 shadow-lg w-full max-w-2xl mx-auto text-center space-y-4">
    <h2 className="text-xl font-light italic">{`"${prompt}"`}</h2>
    <button onClick={onShuffle} className="text-sm text-purple-300 hover:underline">
      ⟳ Shuffle Prompt
    </button>
    <div className="flex justify-between items-center mt-4">
      <button onClick={onPrev} className="text-white text-2xl px-4 hover:text-purple-400">{'<'}</button>
      <button onClick={onNext} className="text-white text-2xl px-4 hover:text-purple-400">{'>'}</button>
    </div>
  </div>
);

// Button Group for better understanding of actions
// Contains buttons for typing an answer or leaving a voice note
const ButtonGroup = () => (
  <div className="mt-6 flex justify-center gap-4">
    <button className="bg-gray-800 text-white px-6 py-2 rounded-full hover:bg-gray-700 text-sm">
      Type my answer
    </button>
    <button className="bg-purple-500 text-white px-6 py-2 rounded-full hover:bg-purple-600 text-sm">
      Leave a voice note 🎤
    </button>
  </div>
);

// Section: Your Voice Matters all about that
const VoiceMattersSection = () => (
  <section className="text-white text-center mt-20 px-4">
    <h2 className="text-xl font-semibold mb-6">Your Voice Matters — Always</h2>
    <div className="bg-[#2a1f3a] rounded-xl py-10 px-6 max-w-3xl mx-auto shadow-lg">
      <p className="text-sm text-purple-200 tracking-wide mb-2">🎧</p>
      <p className="text-md text-purple-300 font-light">Your story is waiting to be heard.</p>
      <p className="text-sm mt-2 text-gray-400">Start by recording your first voice note above.</p>
    </div>
  </section>
);

const SpeakUp = () => {
  const prompts = [
    "Did I feel heard today?",
    "What made me smile today?",
    "What challenged me emotionally?",
    "What do I need more of?",
    "Did I feel loved today?",
  ];
  const [index, setIndex] = useState(0);

  const handleNext = () => setIndex((prev) => (prev + 1) % prompts.length);
  const handlePrev = () => setIndex((prev) => (prev - 1 + prompts.length) % prompts.length);
  const handleShuffle = () => setIndex(Math.floor(Math.random() * prompts.length));

  return (
    <div
      style={{
        background: "linear-gradient(to bottom right, rgb(87,67,97), rgb(33,23,52))",
      }}
      className="min-h-screen flex flex-col items-center py-16 font-sans px-4"
    >


      {/* Section 1 */}
      <h1 className="text-white text-xl font-semibold mb-8">Today, ask yourself…</h1>
      <PromptCard
        prompt={prompts[index]}
        onPrev={handlePrev}
        onNext={handleNext}
        onShuffle={handleShuffle}
      />
      <ButtonGroup />
      <p className="text-sm mt-3 text-gray-400">You don’t need to have the right words. Just begin.</p>

      {/* Section 2 */}
      <VoiceMattersSection />
    </div>
  );
};

export default SpeakUp;
