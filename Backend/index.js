// server.js
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import Sentiment from "sentiment";

const app = express();
const port = 5000;
const sentiment = new Sentiment();

app.use(cors());
app.use(bodyParser.json());

// Some motivational quotes
const quotes = [
  "Believe you can and you're halfway there!",
  "Every day is a new beginning.",
  "Push yourself, because no one else is going to do it for you.",
  "Great things never come from comfort zones.",
  "Stay positive, work hard, make it happen!"
];

// API route
app.post("/analyze", (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ error: "No text provided" });
  }

  // Run sentiment analysis
  const result = sentiment.analyze(text);

  if (result.score > 0) {
    // Positive sentiment → send motivational quotes
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    return res.json({
      sentiment: "positive",
      message: randomQuote
    });
  } else if (result.score < 0) {
    // Negative sentiment → suggest journal page redirect
    return res.json({
      sentiment: "negative",
      redirect: "/journal"
    });
  } else {
    // Neutral
    return res.json({
      sentiment: "neutral",
      message: "Take a deep breath. You're doing great!"
    });
  }
});

app.listen(port, () => {
  console.log(`✅ Server running on http://localhost:${port}`);
});