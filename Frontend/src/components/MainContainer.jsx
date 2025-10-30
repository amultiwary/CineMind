import React from "react";
import { useSelector, useDispatch } from "react-redux";
import VideoBackground from "./VideoBackground";
import VideoTitle from "./VideoTitle";
import ShimmerMainContainer from "./ShimmerMainContainer";
import { setSelectedMovieId } from "../utils/movieSlice";

const MainContainer = () => {
  const dispatch = useDispatch();

  const {
    nowPlayingMovies,
    popularMovies,
    topRatedMovies,
    upcomingMovies,
    selectedMovieId,
  } = useSelector((store) => store.movies);

  // Combine all categories into one
  const allMovies = [
    ...(nowPlayingMovies || []),
    ...(popularMovies || []),
    ...(topRatedMovies || []),
    ...(upcomingMovies || []),
  ];

  if (!allMovies.length) return <ShimmerMainContainer />;

  // Find selected movie across all categories
  const selectedMovie = allMovies.find((movie) => movie.id === selectedMovieId);
  const movieToShow = selectedMovie || nowPlayingMovies?.[0];

  if (!movieToShow) return null;

  const { original_title, overview, id } = movieToShow;

  return (
    <div className="pt-[30%] bg-black md:pt-0 relative">
      <VideoTitle title={original_title} overview={overview} />
      <VideoBackground movieId={id} />

     
    </div>
  );
};

export default MainContainer;
