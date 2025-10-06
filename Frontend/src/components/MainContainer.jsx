import React from "react";
import { useSelector } from "react-redux";
import VideoBackground from "./VideoBackground";
import VideoTitle from "./VideoTitle";
import ShimmerMainContainer from "./ShimmerMainContainer";

const MainContainer = () => {
  const movies = useSelector((store) => store.movies.nowPlayingMovies);

  if (!movies || movies.length === 0) return <ShimmerMainContainer />;
  if (!movies) return;

  const Mainmovie = movies[0];
  if (!Mainmovie) return <Shimmer />;
  const { original_title, overview, id } = Mainmovie;
  return (
    <div className="pt-[30%] bg-black md:pt-0">
      <VideoTitle title={original_title} overview={overview} />
      <VideoBackground movieId={id} />
    </div>
  );
};

export default MainContainer;
