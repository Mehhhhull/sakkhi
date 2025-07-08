import React from "react";

const ReflectionPage = () => {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4 text-center"
        style={{ background: "linear-gradient(to bottom right, rgb(33,23,52), rgb(87,67,97))" }}
    >
      <h1 className="text-white text-2xl sm:text-3xl md:text-4xl max-w-2xl font-light">
        "Every time you listen to yourself, <br className='hidden sm:inline' /> you stitch a
        part of you back together."
      </h1>

      <div className="mt-8 flex gap-4 flex-wrap justify-center">
        <button className="px-6 py-2 rounded-md bg-white/20 text-white border border-white/30 hover:bg-white/30 transition">
          Return to Dashboard
        </button>
        <button className="px-6 py-2 rounded-md bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg hover:opacity-90 transition">
          Visit My Reflection Room
        </button>
      </div>

      <div className="text-sm text-white/60 mt-10 space-y-1">
        <p>It’s okay to stop and rest.</p>
        <p>You are already healing — just by showing up.</p>
        <p>You’re not alone here.</p>
      </div>

      <div className="mt-16 w-full max-w-2xl p-4 sm:p-6 bg-white/10 rounded-xl border border-white/20 backdrop-blur">
        <h2 className="text-white mb-4 text-lg sm:text-xl font-medium">
          Take Your Reflections With You
        </h2>
        <div className="flex flex-wrap gap-4 justify-center">
          <button className="px-4 py-2 bg-white/20 text-white rounded-md hover:bg-white/30 transition">
            Export as PDF
          </button>
          <button className="px-4 py-2 bg-white/20 text-white rounded-md hover:bg-white/30 transition">
            Email to Myself
          </button>
          <button className="px-4 py-2 bg-white/20 text-white rounded-md hover:bg-white/30 transition">
            Move to Journal
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReflectionPage;
