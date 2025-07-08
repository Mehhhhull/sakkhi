import React, { useState } from "react";

const Lofi = () => {
  const [volumes, setVolumes] = useState({
    1: 50,
    2: 50,
    3: 50,
  });
  //  making constants here
  const sounds = [
    {
      id: 1,
      title: "Rain + Lo-fi",
      description: "Gentle rainfall with soft beats",
      icon: "🌧️",
    },
    {
      id: 2,
      title: "Ocean + Flute",
      description: "Waves meeting melodic flute",
      icon: "🌊",
    },
    {
      id: 3,
      title: "Forest + Veena",
      description: "Nature sounds with classical strings",
      icon: "🌿",
    },
  ];
  // volume handeling can change or remove later
  const handleVolumeChange = (id, value) => {
    setVolumes((prev) => ({ ...prev, [id]: value }));
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-white to-purple-50">
      <h1 className="text-3xl font-semibold text-purple-700 mb-1">Soothing Sound Bar</h1>
      <p className="text-sm text-purple-400 mb-6">Mix your perfect ambient soundscape</p>

      <div className="bg-white rounded-2xl shadow-xl p-6 w-[90%] max-w-2xl space-y-6">
        {sounds.map((sound) => (
          <div
            key={sound.id}
            className="flex flex-col space-y-2 border-b last:border-none pb-6 last:pb-0"
          >
            <div className="flex items-start space-x-3">
              <span className="text-2xl">{sound.icon}</span>
              <div>
                <h2 className="text-sm font-medium text-purple-800">{sound.title}</h2>
                <p className="text-xs text-purple-400">{sound.description}</p>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <input
                type="range"
                min="0"
                max="100"
                value={volumes[sound.id]}
                onChange={(e) => handleVolumeChange(sound.id, parseInt(e.target.value))}
                className="w-full accent-purple-500"
              />
              <span className="ml-4 text-sm text-purple-600 w-10 text-right">
                {volumes[sound.id]}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Lofi;
