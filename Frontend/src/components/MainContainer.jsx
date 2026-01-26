import React from "react";
import { useSelector, useDispatch } from "react-redux";
import VideoBackground from "./VideoBackground";
import VideoTitle from "./VideoTitle";
import ShimmerMainContainer from "./ShimmerMainContainer";
import { setSelectedMovieId } from "../utils/movieSlice";



console.log("i am in maincontainer")



const MainContainer = () => {
  const dispatch = useDispatch();
  const nowPlayingMovies = useSelector((store) => store.movies?.nowPlayingMovies);

  if (!nowPlayingMovies) return <ShimmerMainContainer />;

  const movieToShow = nowPlayingMovies[0];
   

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
