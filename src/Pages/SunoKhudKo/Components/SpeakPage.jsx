import React, { useState, useRef } from "react";
import { Mic, Square } from "lucide-react";

export default function VoiceCheckIn() {
  const [isRecording, setIsRecording] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) audioChunksRef.current.push(event.data);
      };

      mediaRecorder.onstop = () => {
        setShowModal(true);
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (err) {
      console.error("Error accessing microphone", err);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const handleConfirm = () => {
    setShowModal(false);

    // Fake emotion detection for now
    const emotions = ["happy", "sad", "neutral"];
    const detectedEmotion = emotions[Math.floor(Math.random() * emotions.length)];

    if (detectedEmotion === "happy") {
      window.location.href = "/quotes";
    } else if (detectedEmotion === "sad") {
      window.location.href = "/journal";
    } else {
      window.location.href = "/blog";
    }
  };

  const handleCancel = () => {
    setShowModal(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-purple-100 to-pink-100">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">
        Voice Check-in 🎤
      </h1>

      {/* Recording Button */}
      <button
        onClick={isRecording ? stopRecording : startRecording}
        className={`p-6 rounded-full shadow-lg transition transform hover:scale-105 focus:outline-none ${
          isRecording ? "bg-red-500 hover:bg-red-600" : "bg-purple-500 hover:bg-purple-600"
        }`}
      >
        {isRecording ? (
          <Square className="w-10 h-10 text-white" />
        ) : (
          <Mic className="w-10 h-10 text-white" />
        )}
      </button>

      <p className="mt-4 text-gray-600">
        {isRecording ? "Recording... Tap to stop" : "Tap the mic to start check-in"}
      </p>

      {/* Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white p-6 rounded-2xl shadow-xl w-80 text-center">
            <h2 className="text-lg font-semibold mb-4">Use this recording?</h2>
            <div className="flex justify-around">
              <button
                onClick={handleCancel}
                className="px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirm}
                className="px-4 py-2 rounded-lg bg-purple-500 text-white hover:bg-purple-600 transition"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
