import React from "react";

const TimerCard = ({ minutes, label, description }) => (
  <div className="bg-white/70 backdrop-blur-md p-6 rounded-2xl shadow-md text-center transition hover:scale-105 hover:shadow-lg duration-300">
    <div className="w-14 h-14 mx-auto mb-2 flex items-center justify-center rounded-full bg-purple-100 text-purple-600 font-semibold text-lg">
      {minutes}
    </div>
    <p className="text-sm text-purple-700 font-medium">{label}</p>
    <p className="text-xs text-purple-400 mt-1">{description}</p>
  </div>
);

const Calm = () => {
  const timers = [
    { minutes: 2, label: "2 minutes", description: "Quick reset" },
    { minutes: 5, label: "5 minutes", description: "Gentle pause" },
    { minutes: 10, label: "10 minutes", description: "Deep stillness" },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4 py-12">
      <h1 className="text-3xl font-semibold text-purple-700">Calm Timer</h1>
      <p className="text-sm text-purple-400 mt-1 mb-8">
        Choose your moment of stillness
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-3xl">
        {timers.map((timer) => (
          <TimerCard
            key={timer.minutes}
            minutes={timer.minutes}
            label={timer.label}
            description={timer.description}
          />
        ))}
      </div>
    </div>
  );
};

export default Calm;