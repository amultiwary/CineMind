import React from "react";
import MovieList from "./MovieList";
import { useSelector } from "react-redux";


console.log("i am in secondarycontainer")


const SecondaryContainer = () => {
  const movies = useSelector((store) => store.movies);
  console.log("movies in secondatry container ",movies);
  if (!movies) return <div>
     <h3 className="text-white text-center">Please wait while we load the movies...</h3>
  </div>;

  return (
    movies.nowPlayingMovies && (
      <div className="bg-black">
        <div className="mt-0  md:-mt-36 pl-4 md:pl-12 relative  z-20">
          {<MovieList title={"Now Playing"} movies={movies.nowPlayingMovies} />}
          {<MovieList title={"Top Rated"} movies={movies.topRatedMovies} />}
          {<MovieList title={"Popular"} movies={movies.popularMovies} />}
          {<MovieList title={"Upcoming Movies"} movies={movies.upcomingMovies} />}
        </div>
      </div>
    )
  );
};

export default SecondaryContainer;
