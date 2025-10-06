import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addPopularMovies } from "../utils/movieSlice";

const usePopularMovies = () => {
  const dispatch = useDispatch();

  const getPopularMovies = async () => {
    try {
      const data = await fetch("https://cinemind-98oc.onrender.com/api/tmdb/popular");
      if (!data.ok) throw new Error("Network response was not ok");
      const json = await data.json();

      dispatch(addPopularMovies(json.results));
    } catch (error) {
      dispatch(addPopularMovies([])); 
    }
  };

  useEffect(() => {
    getPopularMovies();
  }, []);
};

export default usePopularMovies;
