import React, { useState, useRef } from "react";

const SpeakPage = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [audioUrl, setAudioUrl] = useState(null);
  const [copied, setCopied] = useState(false);
  const [fileName, setFileName] = useState("My Recording");
  const [language, setLanguage] = useState("hi-IN");
  const [backendResponse, setBackendResponse] = useState(null);

  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const recognitionRef = useRef(null);

  const startRecording = async () => {
    // Start voice recording
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    audioChunksRef.current = [];
    const mediaRecorder = new MediaRecorder(stream);
    mediaRecorderRef.current = mediaRecorder;

    mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        audioChunksRef.current.push(event.data);
      }
    };

    mediaRecorder.onstop = () => {
      const audioBlob = new Blob(audioChunksRef.current, { type: "audio/webm" });
      const url = URL.createObjectURL(audioBlob);
      setAudioUrl(url);
    };

    mediaRecorder.start();

    // Start speech recognition
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Speech Recognition not supported in your browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = language;
    recognition.continuous = true;
    recognition.interimResults = true;

    let finalTranscript = "";
    recognition.onresult = (event) => {
      let interimTranscript = "";
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        const piece = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += piece + " ";
        } else {
          interimTranscript += piece;
        }
      }
      setTranscript(finalTranscript + interimTranscript);
    };

    recognition.onerror = (e) => {
      console.error("Speech Recognition Error:", e);
    };

    recognitionRef.current = recognition;
    recognition.start();

    setIsRecording(true);
  };

  const stopRecording = async () => {
    // Stop media recorder
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
      mediaRecorderRef.current.stop();
    }

    // Stop speech recognition
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }

    setIsRecording(false);

    // 🔥 Call backend with transcript after stopping
    if (transcript.trim()) {
      try {
        const res = await fetch("http://localhost:5000/analyze", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text: transcript }),
        });

        const data = await res.json();
        setBackendResponse(data);

        if (data.sentiment === "negative" && data.redirect) {
          // redirect to journal page
          window.location.href = data.redirect;
        }
      } catch (err) {
        console.error("Error calling backend:", err);
      }
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(transcript).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div
      className="min-h-screen flex flex-col justify-center items-center text-center px-4"
      style={{
        background:
          "linear-gradient(to bottom right, rgb(33,23,52), rgb(87,67,97))",
      }}
    >
      <h1 className="text-white text-2xl md:text-4xl font-bold leading-snug mb-2 mt-4">
        Speak to Reflect <br />
        <span className="text-pink-300">Your voice matters.</span>
      </h1>

      <p className="text-gray-400 text-xs md:text-sm mt-4 mb-6">
        Hold the mic button to record. Release to stop.
      </p>

      {/* Language Selector */}
      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
        className="mb-4 px-3 py-1 rounded bg-white/10 text-white border border-white/20"
      >
        <option value="hi-IN">Hindi</option>
        <option value="en-IN">English (India)</option>
        <option value="en-US">English (US)</option>
        <option value="ta-IN">Tamil</option>
        <option value="bn-IN">Bengali</option>
        <option value="te-IN">Telugu</option>
        <option value="mr-IN">Marathi</option>
      </select>

      {/* Mic Button */}
      <div
        onMouseDown={startRecording}
        onMouseUp={stopRecording}
        onTouchStart={startRecording}
        onTouchEnd={stopRecording}
        className={`w-40 h-40 rounded-full bg-gradient-to-br from-[#4c2b70] to-[#301d4c] flex items-center justify-center shadow-lg mb-6 cursor-pointer transition-all duration-300 ease-in-out ${
          isRecording ? "animate-pulse scale-110" : "hover:scale-105"
        }`}
      >
        <span className="text-5xl">{isRecording ? "🔴" : "🎙️"}</span>
      </div>

      {/* Rename Input */}
      <input
        type="text"
        value={fileName}
        onChange={(e) => setFileName(e.target.value)}
        placeholder="Rename your recording"
        className="mb-4 px-4 py-2 rounded bg-white/10 text-white border border-white/20 w-full max-w-md"
      />

      {/* Audio Player */}
      {audioUrl && (
        <audio controls src={audioUrl} className="mb-4 max-w-md w-full" />
      )}

      {/* Transcript */}
      <textarea
        value={transcript}
        readOnly
        rows={6}
        className="w-full max-w-md bg-white/10 text-white border border-white/20 p-3 rounded mb-4"
        placeholder="Your spoken words will appear here..."
      />

      {/* Copy Button */}
      <button
        onClick={handleCopy}
        className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-6 py-2 rounded-full font-semibold hover:scale-105 transition"
      >
        {copied ? "Copied!" : "Copy Text"}
      </button>

      {/* Backend response */}
      {backendResponse && backendResponse.sentiment === "positive" && (
        <div className="mt-4 p-4 bg-green-500/20 border border-green-400 rounded text-white max-w-md">
          🌟 {backendResponse.message}
        </div>
      )}

      {backendResponse && backendResponse.sentiment === "neutral" && (
        <div className="mt-4 p-4 bg-yellow-500/20 border border-yellow-400 rounded text-white max-w-md">
          😌 {backendResponse.message}
        </div>
      )}
    </div>
  );
};

export default SpeakPage;
