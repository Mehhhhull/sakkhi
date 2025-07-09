import React, { useState } from "react";

const Hero = () => {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="relative">
      {/* Hero section stars hereee the main section of this jiske liye page h */}
      <div className="min-h-screen bg-gradient-to-b from-[#2a0845] to-[#6441a5] flex flex-col items-center justify-center px-6 py-12 text-center text-white">
        <h1 className="text-4xl md:text-5xl font-extrabold text-pink-200 mb-4 font-serif">
          Bharosa Library
        </h1>

        <p className="italic text-pink-100 text-lg md:text-xl mb-6">
          "Stories of women who once whispered… and now roar."
        </p>

        <p className="text-md md:text-lg mb-2 font-light">
          Healing begins the moment silence is broken.
        </p>

        <p className="max-w-2xl text-sm md:text-base text-gray-200 mb-2 leading-relaxed">
          In this space, women from across India - from dusty village lanes to bustling city streets "share their truth". <br />
          Raw. Unfiltered. Brave.
        </p>

        <p className="text-sm md:text-base text-gray-200 mb-4">
          These stories are not polished to please — <br />they are kept sacred to honor their truth.
        </p>

        <p className="italic text-sm md:text-base text-pink-100 mb-6">
          Read gently. Feel deeply. Carry them with grace.
        </p>

        <button
          className="mt-4 px-6 py-3 rounded-full bg-pink-400 hover:bg-pink-500 transition text-sm font-medium text-white shadow-lg"
          onClick={() => setShowForm(true)}
        >
          Share Your Bharosa Story
        </button>
      </div>

      {showForm && <StoryForm onClose={() => setShowForm(false)} />}
    </div>
  );
};

// new story form content

const StoryForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    title: "",
    location: "",
    name: "",
    story: "",
    accepted: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.accepted) {
      alert("Please accept the terms before submitting.");
      return;
    }

    alert("Your story has been sent for verification. It will be posted once approved.");
    onClose(); // Close the modal hereeee
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 px-4 py-10">
      <div className="bg-[#2a0845] text-white w-full max-w-2xl rounded-xl shadow-lg overflow-auto max-h-[90vh] p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-pink-300 hover:text-white text-xl"
        >
          &times;
        </button>

        <h2 className="text-2xl font-bold text-pink-200 mb-1">Share Your Bharosa Story</h2>
        <p className="text-sm text-pink-100 mb-6">
          Your voice matters. Your story can heal someone else.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm block mb-1">Story title *</label>
            <input
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full bg-purple-800 text-white p-2 rounded"
              required
            />
          </div>

          <div>
            <label className="text-sm block mb-1">Your location (city/state) *</label>
            <input
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full bg-purple-800 text-white p-2 rounded"
              required
            />
          </div>

          <div>
            <label className="text-sm block mb-1">How should we call you? *</label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. Sunflower from Mumbai, Anonymous, Maa123"
              className="w-full bg-purple-800 text-white p-2 rounded"
              required
            />
          </div>

          <div>
            <label className="text-sm block mb-1">Your story *</label>
            <textarea
              name="story"
              value={formData.story}
              onChange={handleChange}
              placeholder="Share your truth here. Take your time. Every word matters."
              rows={5}
              className="w-full bg-purple-800 text-white p-2 rounded"
              required
            />
          </div>

          <div className="flex items-start gap-2 text-sm">
            <input
              type="checkbox"
              name="accepted"
              checked={formData.accepted}
              onChange={handleChange}
              className="mt-1"
              required
            />
            //terms and conditions
            <p className="text-pink-100">
              I understand that my story will be reviewed for safety (not grammar) and may be shared publicly to help other mothers. I can request removal at any time.
            </p>
          </div>

          <div className="flex justify-between items-center mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded text-white"
            >
              Back
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-pink-400 hover:bg-pink-500 text-white rounded font-semibold"
            >
              Submit Story
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Hero;
