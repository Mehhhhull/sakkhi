import React, { useEffect, useRef, useState } from "react";

const Lofi = () => {
  const [volumes, setVolumes] = useState({
    1: 50,
    2: 50,
    3: 50,
  });

  // Sound definitions and icons
  // Each sound has an id, title, description, icon, and file path
  // Icons are emojis for simplicity, but can be replaced with images
  // File paths should point to the actual sound files in your public directory
  // You can add more sounds by following the same structure
  // Make sure to add the sound files in the public/sounds directory
  // Example sound files: rain-lofi.mp3, ocean-flute.mp3, forest-veena.mp3

  const sounds = [
    {
      id: 1,
      title: "Rain + Lo-fi",
      description: "Gentle rainfall with soft beats",
      icon: "🌧️",
      file: "/sounds/rain-lofi.mp3",
    },
    {
      id: 2,
      title: "Ocean + Flute",
      description: "Waves meeting melodic flute",
      icon: "🌊",
      file: "/sounds/ocean-flute.mp3",
    },
    {
      id: 3,
      title: "Forest + Veena",
      description: "Nature sounds with classical strings",
      icon: "🌿",
      file: "/sounds/forest-veena.mp3",
    },
  ];

  // Refs to audio elements
  const audioRefs = useRef({});

  // Load and play sounds
  useEffect(() => {
    sounds.forEach((sound) => {
      const audio = new Audio(sound.file);
      audio.loop = true;
      audio.volume = volumes[sound.id] / 100;
      audio.play();
      audioRefs.current[sound.id] = audio;
    });

    return () => {
      // Stop sounds on unmount 
      Object.values(audioRefs.current).forEach((audio) => {
        audio.pause();
      });
    };
  }, []);

  // Volume handler, incr or decr volume based on slider input
  const handleVolumeChange = (id, value) => {
    setVolumes((prev) => ({ ...prev, [id]: value }));
    const audio = audioRefs.current[id];
    if (audio) {
      audio.volume = value / 100;
    }
  };
// return statement starts here bhai
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
