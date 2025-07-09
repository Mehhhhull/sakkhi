import React, { useState } from "react";

// Hardcoded anonymous experience selector, here only 2 can select and this is minimum you can select
const experiences = [
  { label: "Vaginal birth", emoji: "🌸" },
  { label: "C-Section", emoji: "💪" },
  { label: "NICU Baby", emoji: "👶" },
  { label: "First-time mom", emoji: "🌱" },
  { label: "Postpartum depression", emoji: "🌧️" },
  { label: "Breastfeeding struggles", emoji: "😊" },
  { label: "Stillbirth / miscarriage", emoji: "🕊️" },
];

const Pagefor = () => {
  const [selected, setSelected] = useState([]);
  const [chatStarted, setChatStarted] = useState(false);

  const toggleSelect = (label) => {
    if (selected.includes(label)) {
      setSelected(selected.filter((item) => item !== label));
    } else if (selected.length < 2) {
      setSelected([...selected, label]);
    }
  };

  return (
    <div className="min-h-screen pt-20 flex items-center justify-center bg-gradient-to-b from-[#2d0045] to-[#5b217a] px-4 py-6">
      {!chatStarted ? (
        <div className="w-full max-w-md bg-[#1d102b] rounded-2xl p-6 shadow-xl">
          <h1 className="text-white text-2xl font-semibold text-center mb-2">
            Find Your Circle
          </h1>
          <p className="text-pink-200 text-center text-sm mb-6">
            Select up to 2 experiences that resonate with your journey. You’ll be
            matched with moms who understand.
          </p>

          <div className="space-y-3">
            {experiences.map((exp) => (
              <button
                key={exp.label}
                onClick={() => toggleSelect(exp.label)}
                className={`w-full flex items-center px-4 py-3 rounded-xl transition-all font-medium text-white text-left ${
                  selected.includes(exp.label)
                    ? "bg-pink-600"
                    : "bg-[#3e2753] hover:bg-[#503368]"
                }`}
              >
                <span className="text-lg mr-3">{exp.emoji}</span>
                {exp.label}
              </button>
            ))}
          </div>

          <p className="text-center text-xs text-pink-300 mt-4 mb-2">
            {selected.length}/2 selected
          </p>

          <button
            disabled={selected.length === 0}
            onClick={() => setChatStarted(true)}
            className={`w-full py-3 rounded-full text-white font-semibold transition-all ${
              selected.length > 0
                ? "bg-gradient-to-r from-pink-400 to-pink-600 hover:scale-105"
                : "bg-gray-500 cursor-not-allowed"
            }`}
          >
            Create My Safe Circle
          </button>

          <p className="text-center text-[10px] text-pink-300 mt-3 italic">
            you’re safe here
          </p>
        </div>
      ) : (
        <ChatRoom />
      )}
    </div>
  );
};

// ChatRoom component, text editeddddd
const ChatRoom = () => {
  const [messages, setMessages] = useState([
    {
      name: "Barsha",
      time: "08:21 PM",
      text: "I’m so glad we found each other. Today was harder than I expected.",
    },
    {
      name: "Anonymous",
      time: "08:22 PM",
      text: "Aap akele nahi ho, we also felt the same jab ham ma bane the, aap mujhse share karskti hain",
    },
  ]);
  const [input, setInput] = useState("");
  const [paused, setPaused] = useState(false);

  const handleSend = () => {
    if (!input.trim()) return;

    const newMessage = {
      name: "You",
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      text: input.trim(),
    };

    setMessages([...messages, newMessage]);
    setInput("");

    // Fake reply jo b aayega share hogaaa
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          name: "Willow",
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          text: "Thanks for sharing, ham aapke sath main hainn, aap hame apni pareshani bata sakti hain 💜",
        },
      ]);
    }, 1000);
  };

  return (
    <div className="w-full max-w-2xl bg-[#1d102b] rounded-2xl p-4 shadow-xl h-[90vh] flex flex-col relative">
      {/* Top bar in the chat */}
      <div className="flex justify-between items-center mb-3">
        <div>
          <h2 className="text-white font-semibold text-lg">
            Circle of One — <span className="font-normal">Your Safe Space</span>
          </h2>
          <p className="text-pink-200 text-sm">
            You’re now in a quiet circle of moms who walked a similar road. No names. Just hearts holding hearts.
          </p>
        </div>

        <button
          onClick={() => setPaused(true)}
          className="text-sm bg-[#3e2753] hover:bg-pink-600 transition-all text-white px-4 py-2 rounded-xl"
        >
          Pause Chat
        </button>
      </div>

      {/* Pinned question at the topp*/}
      <div className="bg-[#3e2753] text-pink-100 text-sm px-4 py-3 rounded-xl mb-4 italic">
        🌸 Aaj sabse jyada kya bother kiya tumhe?
      </div>

      {/* Messages olderrr are here, and also idhar m emoticons h jo tum laga skte doent work rn */}
      <div className="flex-1 overflow-y-auto space-y-4 pr-1">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className="bg-[#2a1840] rounded-xl p-4 text-white shadow-md"
          >
            <div className="text-sm text-pink-300 font-semibold mb-1">
              {msg.name} · <span className="text-xs">{msg.time}</span>
            </div>
            <div className="text-sm">{msg.text}</div>
            <div className="flex space-x-3 mt-3 text-lg">
              <span>🌱</span>
              <span>💛</span>
              <span>☁️</span>
            </div>
          </div>
        ))}
      </div>

      {/* Input box , yaha dalskte ho qs*/}
      <div className="mt-4 flex items-center bg-[#3e2753] rounded-full px-4 py-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Aapne dil ki baat batao..."
          className="flex-1 bg-transparent text-white placeholder-pink-300 text-sm focus:outline-none"
        />
        <button
          onClick={handleSend}
          className="ml-2 px-4 py-1 bg-pink-500 text-white rounded-full text-sm hover:bg-pink-600"
        >
          Send
        </button>
      </div>

      <p className="text-[10px] text-pink-300 text-right mt-2 pr-2">Your presence matters</p>

      {/* Pause Modal, here pause ho skta, back b hosktaaaa */}
      {paused && (
        <div className="absolute inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-[#2a1a3a] text-center rounded-2xl p-8 w-80 shadow-xl">
            <div className="flex justify-center mb-4">
              <div className="bg-pink-400 text-white rounded-full p-3">
                <span className="text-xl">❤️</span>
              </div>
            </div>
            <h2 className="text-white text-xl font-semibold mb-2">Take your breath</h2>
            <p className="text-pink-200 text-sm mb-6">
              We’re still here when you return.
            </p>
            <button
              onClick={() => setPaused(false)}
              className="bg-gradient-to-r from-pink-400 to-pink-600 text-white font-medium px-6 py-2 rounded-full hover:scale-105 transition-all"
            >
              Return to Circle
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Pagefor;
