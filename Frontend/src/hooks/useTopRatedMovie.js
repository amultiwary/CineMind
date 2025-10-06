import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addTopRatedMovies } from "../utils/movieSlice";

const useTopRatedMovies = () => {
  const dispatch = useDispatch();

  const getTopRatedMovies = async () => {
    try {
      const data = await fetch("https://cinemind-98oc.onrender.com/api/tmdb/top_rated");

      const json = await data.json();
      if (!data.ok) throw new Error("Network response was not ok");

      dispatch(addTopRatedMovies(json.results));
    } catch (error) {
      dispatch(addNowPlayingMovies([])); 
    }
  };

  useEffect(() => {
    getTopRatedMovies();
  }, []);
};

export default useTopRatedMovies;
