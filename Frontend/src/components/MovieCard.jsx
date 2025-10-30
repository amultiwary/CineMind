
import React from "react";
import { IMG_CDN_URL } from "../utils/constant";

const MovieCard = ({ movieId, posterPath, onSelect }) => {
  if (!posterPath) return null;
  return (
    <div className="w-36 md:w-48 pr-4">
      <img
        className="hover:cursor-pointer"
        onClick={() => onSelect(movieId)}
        alt="Movie Card"
        src={IMG_CDN_URL + posterPath}
      />
    </div>
  );
};

export default MovieCard;
