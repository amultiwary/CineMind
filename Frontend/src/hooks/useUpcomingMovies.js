import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addUpcomingMovies } from "../utils/movieSlice";

const useUpcomingMovies = () => {
  const dispatch = useDispatch();

  const getUpcomingMovies = async () => {
    try {
      const data = await fetch("http://localhost:5000/api/tmdb/upcoming");
      if (!data.ok) throw new Error("Network response was not ok");

      const json = await data.json();

      dispatch(addUpcomingMovies(json.results));
    } catch (error) {
      dispatch(addUpcomingMovies([])); 
    }
  };

  useEffect(() => {
    getUpcomingMovies();
  }, []);
};

export default useUpcomingMovies;
