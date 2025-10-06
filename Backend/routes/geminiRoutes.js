import express from "express";
const router = express.Router();
import dotenv from "dotenv";
dotenv.config({ quiet: true });
import fetch from "node-fetch";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const TMDB_API_KEY = process.env.TMDB_API_KEY;

async function askGemini(query) {
  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: query }] }],
        }),
      }
    );
    const data = await response.json();
    "Full Gemini API response:", data;
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || "";
    return text;
  } catch (err) {
    console.error("Gemini API error:", err);
    throw err;
  }
}

async function searchMovieTMDB(movie) {
  const url = `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(
    movie
  )}`;
  const res = await fetch(url);
  const json = await res.json();
  return json.results;
}

router.post("/gpt-search", async (req, res) => {
  try {
    const { userQuery } = req.body;
    const gptQuery = `Act as a Movie Recommendation system and suggest some movies for the query: ${userQuery}. Only give me names of 5 movies, comma separated. Example: Gadar,Sholay,Don,Golmaal,Koi Mil Gya`;
    const gptText = await askGemini(gptQuery);

    const movieNames = gptText.split(",");
    const movieResults = [];
    for (const name of movieNames) {
      movieResults.push(await searchMovieTMDB(name));
    }

    res.json({ movieNames, movieResults });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
