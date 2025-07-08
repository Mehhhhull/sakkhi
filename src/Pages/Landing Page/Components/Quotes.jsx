import React from "react";

const CardComponent = ({ title, subtitle }) => {
  return (
    <div className="bg-[#2f2746] rounded-lg px-6 py-5 text-center shadow-lg hover:scale-105 transition-all duration-300 border border-purple-900">
      <h3 className="text-2xl md:text-3xl font-semibold text-pink-300">{title}</h3>
      <p className="text-sm text-gray-300 mt-2">{subtitle}</p>
    </div>
  );
};

const Quotes = () => {
  return (
    <section className="bg-[#1f1832] text-white py-20 px-5 md:px-10">
      {/* Quotes Written here */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <h2 className="text-xl md:text-2xl text-gray-200">"The world asked if the baby slept.</h2>
        <p className="text-2xl md:text-3xl italic text-pink-300 font-cursive mt-2">But no one asked about her."</p>
      </div>

      {/* Card Component */}
      <div className="grid gap-6 md:grid-cols-3 max-w-5xl mx-auto mb-8">
        <CardComponent title="1 in 5" subtitle="Indian moms suffer from postpartum depression" />
        <CardComponent title="80%" subtitle="feel emotionally unsupported" />
        <CardComponent title="Only 9%" subtitle="seek any healing" />
      </div>

      {/* Footer line */}
      <p className="text-center italic text-sm text-gray-400">
        Behind every "I'm fine" is a story waiting to be heard.
      </p>
    </section>
  );
};

export default Quotes;
