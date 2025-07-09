import React, { useState, useEffect } from "react";

const TimerCard = ({ minutes, label, description, onClick }) => (
  <div
    onClick={() => onClick(minutes)}
    className="bg-white/70 backdrop-blur-md p-6 rounded-2xl shadow-md text-center transition hover:scale-105 hover:shadow-lg duration-300 cursor-pointer"
  >
    <div className="w-14 h-14 mx-auto mb-2 flex items-center justify-center rounded-full bg-purple-100 text-purple-600 font-semibold text-lg">
      {minutes}
    </div>
    <p className="text-sm text-purple-700 font-medium">{label}</p>
    <p className="text-xs text-purple-400 mt-1">{description}</p>
  </div>
);

// Timer logic is made here 
const Calm = () => {
  const [activeTimer, setActiveTimer] = useState(null); // in seconds madee
  const [secondsLeft, setSecondsLeft] = useState(null);
  //  timers are made here
  // Define the available timers with their durations, labels, and descriptions
  // Each timer is an object with minutes, label, and description properties
  const timers = [
    { minutes: 2, label: "2 minutes", description: "Quick reset" },
    { minutes: 5, label: "5 minutes", description: "Gentle pause" },
    { minutes: 10, label: "10 minutes", description: "Deep stillness" },
  ];

  const startTimer = (minutes) => {
    const totalSeconds = minutes * 60;
    setActiveTimer(minutes);
    setSecondsLeft(totalSeconds);
  };

  // countdown logic is given hereeeeee
  useEffect(() => {
    if (secondsLeft === null || secondsLeft <= 0) return;

    const interval = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          alert("Time's up! 🌸");
          return null;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [secondsLeft]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4 py-12">
      <h1 className="text-3xl font-semibold text-purple-700">Calm Timer</h1>
      <p className="text-sm text-purple-400 mt-1 mb-8">
        Choose your moment of stillness
      </p>

      {activeTimer && secondsLeft !== null && (
        <div className="mb-4 text-purple-600 font-medium text-xl">
          Time left: {Math.floor(secondsLeft / 60)
            .toString()
            .padStart(2, "0")}
          :
          {(secondsLeft % 60).toString().padStart(2, "0")}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-3xl">
        {timers.map((timer) => (
          <TimerCard
            key={timer.minutes}
            minutes={timer.minutes}
            label={timer.label}
            description={timer.description}
            onClick={startTimer}
          />
        ))}
      </div>
    </div>
  );
};

export default Calm;
