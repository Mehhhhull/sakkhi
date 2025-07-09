import React, { useState, useRef, useEffect } from "react";

const emojis = ["😀", "😊", "😐", "😔", "😭"];
const emotionTags = [
  "anxious", "lonely", "calm", "hopeful", "grateful",
  "overwhelmed", "peaceful", "frustrated"
];
const soundOptions = ["rain", "flute", "silence"];


//sonds are added here, you can add more sounds later on
// Make sure to add the sound files in the public/sounds directory
const soundMap = {
  rain: "/sounds/rain.mp3",
  flute: "/sounds/flute.mp3",
  silence: null,
};

// Function to group reflections by date and calculate average mood
const MoodReflect = () => {
  const [selectedEmoji, setSelectedEmoji] = useState(null);
  const [selectedTags, setSelectedTags] = useState([]);
  const [note, setNote] = useState("");
  const [selectedSound, setSelectedSound] = useState("silence");
  const [selectedDate, setSelectedDate] = useState("");

  const audioRef = useRef(null);

  useEffect(() => {
    const audioSrc = soundMap[selectedSound];

    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }

    if (audioSrc && audioRef.current) {
      audioRef.current.src = audioSrc;
      audioRef.current.play().catch(() => {});
    }
  }, [selectedSound]);

  const handleTagToggle = (tag) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleSubmit = () => {
    const reflectionData = {
      date: selectedDate,
      mood: selectedEmoji,
      tags: selectedTags,
      note,
      sound: selectedSound,
      timestamp: new Date().toISOString(),
    };

    // Here you would typically send the reflectionData to your backend or save it in local storage , for later. But for now it will alert.

    alert(
      `✅ Reflection Saved!\n\n📅 Date: ${selectedDate || "Today"}\n🙂 Mood: ${
        selectedEmoji || "None"
      }\n📝 Note: ${note || "Empty"}\n🔒 Your reflection is safe with us.`
    );

    setSelectedEmoji(null);
    setSelectedTags([]);
    setNote("");
    setSelectedSound("silence");
    setSelectedDate("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#2a0845] to-[#6441a5] flex items-center justify-center px-4 py-12">
      <div className="bg-white bg-opacity-90 backdrop-blur-md rounded-xl p-8 max-w-2xl w-full text-black shadow-xl">
        <h2 className="text-2xl font-bold mb-4 text-center">How are you feeling today?</h2>

       {/* date picker is mde here */}
        <div className="mb-4 text-center">
          <label className="block mb-2 text-sm text-gray-700">Select a day to reflect on:</label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="bg-white text-black p-2 rounded-lg text-sm outline-none border border-gray-300"
          />
        </div>

        {/* Emoji Picker to reflect your emottion */}
        <div className="flex justify-center gap-3 mb-6">
          {emojis.map((emoji) => (
            <button
              key={emoji}
              onClick={() => setSelectedEmoji(emoji)}
              className={`text-3xl px-3 py-1 rounded-full transition transform ${
                selectedEmoji === emoji
                  ? "bg-pink-500 text-white scale-110 shadow-md"
                  : "hover:scale-105"
              }`}
            >
              {emoji}
            </button>
          ))}
        </div>

        {/* Tags to show yopur emotionm */}
        <div className="mb-6 text-center">
          <p className="text-sm text-gray-700 mb-2">Tag your emotion (optional):</p>
          <div className="flex flex-wrap justify-center gap-2">
            {emotionTags.map((tag) => (
              <button
                key={tag}
                className={`px-3 py-1 text-sm rounded-full border transition ${
                  selectedTags.includes(tag)
                    ? "bg-pink-500 text-white"
                    : "bg-gray-200 hover:bg-gray-300 text-black"
                }`}
                onClick={() => handleTagToggle(tag)}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Note can be told here */}
        <div className="mb-6">
          <p className="text-sm text-gray-700 mb-2">Why did you feel this way?</p>
          <textarea
            placeholder="Express yourself gently..."
            value={note}
            onChange={(e) => setNote(e.target.value)}
            rows={4}
            className="w-full px-4 py-2 rounded-lg bg-gray-100 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-400"
          />
        </div>

        {/* Sound are here,good soundsssssss*/}
        <div className="flex justify-center gap-3 mb-6">
          {soundOptions.map((sound) => (
            <button
              key={sound}
              onClick={() => setSelectedSound(sound)}
              className={`px-4 py-1 text-sm rounded-full border ${
                selectedSound === sound
                  ? "bg-pink-500 text-white"
                  : "bg-gray-200 hover:bg-gray-300 text-black"
              }`}
            >
              {sound}
            </button>
          ))}
        </div>

        {/* Submit  */}
        <button
          onClick={handleSubmit}
          className="w-full py-3 bg-gradient-to-r from-pink-400 to-pink-600 rounded-full text-white font-semibold text-lg hover:scale-105 transition"
        >
          Add to Reflection
        </button>

        {/* Audio Element */}
        <audio ref={audioRef} loop />
      </div>
    </div>
  );
};

export default MoodReflect;
