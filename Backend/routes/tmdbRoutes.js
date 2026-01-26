import express from "express";
import {
  getNowPlaying,
  getPopular,
  getTopRated,
  getUpcoming,
  getMovieVideos,
} from "../controllers/tmdbController.js";

const router = express.Router();

router.get("/now_playing", getNowPlaying);
router.get("/popular", getPopular);
router.get("/top_rated", getTopRated);
router.get("/upcoming", getUpcoming);
router.get("/movie/:id/videos", getMovieVideos);

export default router;
