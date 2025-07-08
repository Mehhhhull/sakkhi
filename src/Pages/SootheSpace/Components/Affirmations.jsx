import React, { useState } from "react";

const AffirmationCard = ({ text }) => {
  const [liked, setLiked] = useState(false);

  return (
    <div className="bg-white/70 backdrop-blur-md rounded-xl p-4 shadow-md hover:shadow-lg transition text-purple-700 text-sm italic relative">
      {text}
      <button
        onClick={() => setLiked(!liked)}
        className="absolute top-2 right-3 text-lg transition transform hover:scale-110"
        aria-label="favorite"
      >
        <span className={liked ? "text-red-500" : "text-purple-300"}>
          {liked ? "❤️" : "♡"}
        </span>
      </button>
    </div>
  );
};

//Affirmations component to display a collection of affirmations
// This component renders a grid of affirmation cards with a title and description , do change later

const Affirmations = () => {
  const affirmations = [
    'You are not behind. You are blooming in your time.',
    "Motherhood didn't erase you. You're still here.",
    'Rest is resistance.',
    'Your feelings are messengers, not your masters.',
    'You are allowed to take up space.',
    "Healing isn't linear, and neither is love.",
    'You can hold the garden and the weeds.',
    'Your softness is your superpower.',
    'Progress, not perfection.',
    'You are enough, exactly as you are today.',
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-purple-50 px-4 py-10">
      <h1 className="text-3xl font-semibold text-purple-700">Affirmation Gallery</h1>
      <p className="text-sm text-purple-400 mt-1 mb-8">
        Words to carry with you, whispered with love
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl">
        {affirmations.map((text, idx) => (
          <AffirmationCard key={idx} text={`"${text}"`} />
        ))}
      </div>
    </div>
  );
};

export default Affirmations;
