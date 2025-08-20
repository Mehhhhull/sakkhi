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

// Motivational quotes
const quotes = [
  "Believe you can and you're halfway there!",
  "Every day is a new beginning.",
  "Push yourself, because no one else is going to do it for you.",
  "Great things never come from comfort zones.",
  "Stay positive, work hard, make it happen!",
];

// API route (frontend calls this)
app.post("/api/sentiment", (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ error: "No text provided" });
  }

  // Run sentiment analysis
  const result = sentiment.analyze(text);

  if (result.score > 0) {
    // Positive sentiment → send motivational quote
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    return res.json({
      sentiment: "positive",
      message: randomQuote,
    });
  } else if (result.score < 0) {
    // Negative sentiment → either journal or talk
    const redirects = ["/journal", "/talk"];
    const randomRedirect = redirects[Math.floor(Math.random() * redirects.length)];
    return res.json({
      sentiment: "negative",
      redirect: randomRedirect,
    });
  } else {
    // Neutral → redirect to blog
    return res.json({
      sentiment: "neutral",
      redirect: "/blog",
      message: "Take a deep breath. You're doing great!",
    });
  }
});

app.listen(port, () => {
  console.log(`✅ Server running on http://localhost:${port}`);
});
