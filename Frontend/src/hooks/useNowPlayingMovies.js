import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addNowPlayingMovies } from "../utils/movieSlice";

const useNowPlayingMovies = () => {
  const dispatch = useDispatch();
  const getNowPlayingMovies = async () => {
    try {
      const data = await fetch("http://localhost:5000/api/tmdb/now_playing");

      const json = await data.json();

      dispatch(addNowPlayingMovies(json.results));
    } catch (error) {
      dispatch(addNowPlayingMovies([])); 
    }
  };

  useEffect(() => {
    getNowPlayingMovies();
  }, []);
};

export default useNowPlayingMovies;
