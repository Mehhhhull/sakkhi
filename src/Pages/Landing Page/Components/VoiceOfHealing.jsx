import React from 'react';

const TestimonialCard = ({ quote, name, location, identity }) => {
  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-6 w-full md:w-[280px] backdrop-blur-sm shadow-sm text-left relative">
      {/* Top right decorative dot will be made better and clean */}
      <div className="absolute top-3 right-3 w-3 h-3 rounded-full bg-white/20"></div>

      {/* Quotes section */}
      <p className="italic text-sm text-slate-200 mb-4">“{quote}”</p>

      {/* People info who gabe their testimonial */}
      <p className="text-sm text-white font-medium">— {name}, {location}</p>
      <p className="text-xs text-slate-400">{identity}</p>
    </div>
  );
};

const VoicesOfHealing = () => {
  const testimonials = [
    {
      quote: "This space reminded me of the girl I used to be — before the chaos.",
      name: "Priya",
      location: "Mumbai",
      identity: "Mother of 8-month-old twins",
    },
    {
      quote: "I found my voice again. Not just as ‘mama’, but as me.",
      name: "Ananya",
      location: "Delhi",
      identity: "First-time mother",
    },
    {
      quote: "Finally, someone who understands that loving your baby and missing yourself can coexist.",
      name: "Kavya",
      location: "Bangalore",
      identity: "Mother of two",
    },
  ];

  return (
    <section className="bg-[#1B1430] text-white py-16 px-4 text-center">
      <h2 className="text-3xl md:text-4xl font-light mb-2">
        <span className="italic text-pink-300 font-medium">Voices</span> of Healing
      </h2>
      <p className="text-sm text-slate-300 mb-10">
        Stories from mothers who found their way back
      </p>

      {/* Cards grids starts */}
      <div className="flex flex-wrap justify-center gap-6">
        {testimonials.map((t, index) => (
          <TestimonialCard
            key={index}
            quote={t.quote}
            name={t.name}
            location={t.location}
            identity={t.identity}
          />
        ))}
      </div>

      {/* Scroller to be made */}
      <p className="text-xs text-slate-400 mt-8">← Scroll to read more stories →</p>
    </section>
  );
};

export default VoicesOfHealing;