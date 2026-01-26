import React, { useState } from "react";
import MovieCard from "./MovieCard";
import VideoBackground from "./VideoBackground";
import { useDispatch,useSelector } from "react-redux";
import { setSelectedMovieId } from "../utils/movieSlice";




console.log("i am in movielist")


const MovieList = ({ title, movies }) => {
  const dispatch = useDispatch();
  const selectedId = useSelector((state) => state.movies.selectedMovieId);

  return (
    <div className="Px-6">
      <h1 className="text-lg md:text-3xl py-4 text-white">{title}</h1>
      <div className="flex overflow-x-scroll">
        <div className="flex">
          {movies?.map((movie) => (
            <MovieCard
              key={movie.id}
              movieId={movie.id}
              posterPath={movie.poster_path}
              onSelect={(id) => dispatch(setSelectedMovieId(id))}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieList;
