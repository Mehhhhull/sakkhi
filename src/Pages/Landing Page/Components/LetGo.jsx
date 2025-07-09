import React, { useState } from "react";

const LetGo = () => {
  const [text, setText] = useState("");
  const [isFading, setIsFading] = useState(false);

  const handleLetGo = () => {
    setIsFading(true);
    setTimeout(() => {
      setText("");
      setIsFading(false);
    }, 500);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#1F1832] px-4 py-8">
      {/* Top Heading */}
      <h2 className="text-4xl font-bold text-white mb-8 text-center">
        Kuch Bolna Chahti Ho?
      </h2>

      <div className="bg-white/70 backdrop-blur-md border border-purple-200 rounded-xl shadow-lg p-6 max-w-lg w-full transition-all">
        <h1 className="text-3xl font-semibold text-purple-700 text-center">
          Write, Then Let Go
        </h1>
        <p className="text-sm text-purple-400 text-center mt-1">
          Release what weighs heavy on your heart
        </p>

        <div className="mt-6">
          <label
            htmlFor="thoughts"
            className="block text-lg italic font-medium text-purple-600 mb-2"
          >
            What's heavy right now?
          </label>
          <textarea
            id="thoughts"
            rows="6"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Let your thoughts flow here... there's no judgement, only release."
            className={`w-full p-4 rounded-lg border border-purple-200 bg-white/50 text-purple-700 placeholder-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-300 resize-none shadow-sm transition-opacity duration-500 ${
              isFading ? "opacity-0" : "opacity-100"
            }`}
          ></textarea>

          <button
            onClick={handleLetGo}
            className="mt-4 w-full bg-purple-500 hover:bg-purple-600 text-white font-medium py-2 px-4 rounded-xl transition-all duration-300 ease-in-out shadow-md hover:shadow-lg"
          >
            Let Go ✨
          </button>
        </div>
      </div>
    </div>
  );
};

export default LetGo;
