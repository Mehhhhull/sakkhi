import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// Emoji Mood to Numeric Mapping , to show in the graph :It looks cool can change later
const moodMap = {
  "😭": 1,
  "😔": 2,
  "😐": 3,
  "😊": 4,
  "😀": 5,
};

// Mock Reflections
// This is a mock data, you can replace it with your actual data from the backend or can put more fake datas 

const mockReflections = [
  {
    date: "2025-07-08",
    mood: "😊",
    tags: ["frustrated"],
    note: "idk",
  },
  {
    date: "2025-07-07",
    mood: "😐",
    tags: ["lonely"],
    note: "tired",
  },
  {
    date: "2025-07-06",
    mood: "😀",
    tags: ["hopeful", "energized"],
    note: "Felt really good after a walk.",
  },
  {
    date: "2025-07-05",
    mood: "😭",
    tags: ["overwhelmed"],
    note: "Hard day, lots of crying.",
  },
  {
    date: "2025-07-04",
    mood: "😔",
    tags: ["anxious", "tired"],
    note: "Couldn’t sleep well.",
  },
  {
    date: "2025-07-03",
    mood: "😊",
    tags: ["grateful"],
    note: "Had a nice chat with a friend.",
  },
  {
    date: "2025-07-02",
    mood: "😐",
    tags: ["bored"],
    note: "Day felt slow.",
  },
  {
    date: "2025-07-01",
    mood: "😀",
    tags: ["motivated"],
    note: "Started a new book.",
  },
  {
    date: "2025-06-30",
    mood: "😭",
    tags: ["lonely", "sad"],
    note: "Missed my family a lot.",
  },
  {
    date: "2025-06-29",
    mood: "😔",
    tags: ["stressed"],
    note: "Work was overwhelming.",
  },
  {
    date: "2025-06-28",
    mood: "😊",
    tags: ["relaxed"],
    note: "Watched a good movie.",
  },
];

//logic of the whole graph is shown here

const groupBy = (data, period) => {
  const grouped = {};
  data.forEach((entry) => {
    const key =
      period === "week"
        ? entry.date.slice(5)
        : period === "month"
        ? entry.date.slice(0, 7)
        : entry.date.slice(0, 4);
    if (!grouped[key]) grouped[key] = [];
    grouped[key].push(entry);
  });
  return Object.entries(grouped).map(([key, entries]) => {
    const avgMood =
      entries.reduce((acc, e) => acc + (moodMap[e.mood] || 0), 0) /
      entries.length;
    return {
      date: key,
      moodScore: avgMood,
      mood: entries[entries.length - 1].mood,
      tags: entries[entries.length - 1].tags,
      note: entries[entries.length - 1].note,
    };
  });
};

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const { date, mood, tags, note } = payload[0].payload;
    return (
      <div className="bg-white p-3 rounded-lg shadow-md text-sm text-black">
        <p className="font-semibold">{date}</p>
        <p className="text-lg">{mood}</p>
        <p className="capitalize">Feeling: {tags?.join(", ")}</p>
        <p className="italic">"{note}"</p>
      </div>
    );
  }
  return null;
};

const MoodTrack = () => {
  const [view, setView] = useState("week");

  const data = groupBy(mockReflections, view);

  // This is the data that will be used in the graph, you can replace it with your actual data from the backend or can put more fake datas

  return (
     <div className="min-h-screen bg-gradient-to-b from-[#2a0845] to-[#6441a5] flex items-center justify-center px-4 py-12">
    <div className="bg-gradient-to-b from-[#2a0845] to-[#6441a5] p-6 rounded-xl text-white max-w-4xl mx-auto mt-10 shadow-lg">
      <h2 className="text-center text-2xl font-semibold mb-6">Your Healing Timeline</h2>

      {/* Tabs */}
      <div className="flex justify-center gap-4 mb-6">
        {[
          { label: "This Week", value: "week" },
          { label: "This Month", value: "month" },
          { label: "This Year", value: "year" },
        ].map((tab) => (
          <button
            key={tab.value}
            onClick={() => setView(tab.value)}
            className={`px-4 py-2 rounded-full transition font-medium text-sm ${
              view === tab.value
                ? "bg-pink-500 text-white"
                : "bg-white bg-opacity-20 text-black hover:bg-opacity-30"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      //Charts are here, also made itr responsive do make changes here afterwards bro
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <XAxis dataKey="date" stroke="#fff" />
          <YAxis domain={[0, 5]} ticks={[1, 2, 3, 4, 5]} stroke="#fff" />
          <Tooltip content={<CustomTooltip />} />
          <Line
            type="monotone"
            dataKey="moodScore"
            stroke="#ff69b4"
            strokeWidth={3}
            dot={{ r: 6, stroke: "white", strokeWidth: 2, fill: "#ff69b4" }}
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
    </div>
  );
};

export default MoodTrack;
