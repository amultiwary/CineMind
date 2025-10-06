import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";
const router = express.Router();
dotenv.config({ quiet: true });

const TMDB_API_KEY = process.env.TMDB_API_KEY;

const TMDB_BASE = "https://api.themoviedb.org/3";

const tmdbFetch = (endpoint) =>
  fetch(
    `${TMDB_BASE}${endpoint}${
      endpoint.includes("?") ? "&" : "?"
    }api_key=${TMDB_API_KEY}`
  ).then((res) => res.json());

router.get("/now_playing", async (req, res) => {
  try {
    const data = await tmdbFetch("/movie/now_playing?page=1");
    res.json(data);
  } catch (error) {
    res.json({ results: [] });
  }
});

router.get("/popular", async (req, res) => {
  try {
    const data = await tmdbFetch("/movie/popular?page=1");
    res.json(data);
  } catch (error) {
    res.json({ results: [] });
  }
});

router.get("/top_rated", async (req, res) => {
  try {
    const data = await tmdbFetch("/movie/top_rated?page=1");
    res.json(data);
  } catch (error) {
    res.json({ results: [] });
  }
});

router.get("/upcoming", async (req, res) => {
  try {
    const data = await tmdbFetch("/movie/upcoming?page=1");
    res.json(data);
  } catch (error) {
    res.json({ results: [] });
  }
});

router.get("/movie/:id/videos", async (req, res) => {
  try {
    const { id } = req.params;
    const data = await tmdbFetch(`/movie/${id}/videos?language=en-US`);
    res.json(data);
  } catch (error) {
    res.json({ results: [] });
  }
});

export default router;
