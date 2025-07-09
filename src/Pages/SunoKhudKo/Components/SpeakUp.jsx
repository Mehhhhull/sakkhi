import React, { useState } from 'react';

// Prompt Card Component
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

// Voice Matters Section
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

// Main Component
const SpeakUp = () => {
  const prompts = [
    "Did I feel heard today?",
    "What made me smile today?",
    "What challenged me emotionally?",
    "What do I need more of?",
    "Did I feel loved today?",
  ];

  const [index, setIndex] = useState(0);
  const [showReflection, setShowReflection] = useState(false);
  const [note, setNote] = useState("");

  const handleNext = () => setIndex((prev) => (prev + 1) % prompts.length);
  const handlePrev = () => setIndex((prev) => (prev - 1 + prompts.length) % prompts.length);
  const handleShuffle = () => setIndex(Math.floor(Math.random() * prompts.length));

  const handleSave = () => {
    if (note.trim() === "") {
      alert("Aapka note khaali hai! Kripya kuch likhein.");
      return;
    }
    alert("Aapka note save ho gaya hai! 😊");
  };

  const currentPrompt = prompts[index]; // ✅ Use this throughout

  // Reflection Page
  if (showReflection) {
    return (
      <div
        className="min-h-screen flex flex-col items-center px-4 py-10"
        style={{
          background: "linear-gradient(to bottom, #1a102b, #3b2c4f)",
          fontFamily: "'Georgia', cursive",
          color: "#ffffff",
        }}
      >
        <h1 className="text-3xl md:text-5xl font-bold mb-2 text-center">
          To Yourself, With Love.
        </h1>
        <p className="text-sm md:text-base text-gray-300 mb-8 text-center">
          No pressure. No rules. Just your voice, on a page, in your own time.
        </p>

        {/* Use same prompt here */}
        <div className="bg-white/10 rounded-lg px-6 py-4 w-full max-w-2xl mb-4 border border-white/20">
          <h2 className="text-lg md:text-xl italic mb-1">{`"${currentPrompt}"`}</h2>
        </div>

        <button className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-full mb-6 text-sm" onClick={handleShuffle}>
          Inspire Me Again
        </button>

        <textarea
          rows={12}
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Let it out. This moment belongs to you..."
          className="w-full max-w-3xl bg-white/10 p-4 rounded-lg text-white border border-white/20 resize-none text-base mb-4 placeholder-gray-300"
        />

        <button
          onClick={handleSave}
          className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-3 rounded-full text-sm font-semibold transition"
        >
          ✏️ Record Emotion
        </button>

        <button
          onClick={() => setShowReflection(false)}
          className="text-sm text-purple-300 mt-4 hover:underline"
        >
          ← Back to prompts
        </button>

        <p className="text-sm text-gray-400 mt-6 italic">
          You matter. Even in this quietest moment.
        </p>
      </div>
    );
  }

  // SpeakUp Page
  return (
    <div
      style={{
        background: "linear-gradient(to bottom right, rgb(87,67,97), rgb(33,23,52))",
      }}
      className="min-h-screen flex flex-col items-center py-16 font-sans px-4"
    >
      <h1 className="text-white text-xl font-semibold mb-8">Today, ask yourself…</h1>

      <PromptCard
        prompt={currentPrompt}
        onPrev={handlePrev}
        onNext={handleNext}
        onShuffle={handleShuffle}
      />

      <div className="mt-6 flex justify-center gap-4">
        <button
          className="bg-gray-800 text-white px-6 py-2 rounded-full hover:bg-gray-700 text-sm"
          onClick={() => setShowReflection(true)}
        >
          Type my answer
        </button>
        <button className="bg-purple-500 text-white px-6 py-2 rounded-full hover:bg-purple-600 text-sm">
          Leave a voice note 🎤
        </button>
      </div>

      <p className="text-sm mt-3 text-gray-400">
        You don’t need to have the right words. Just begin.
      </p>

      <VoiceMattersSection />
    </div>
  );
};

export default SpeakUp;
