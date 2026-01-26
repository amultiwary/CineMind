import Header from "./Header";
import useNowPlayingMovies from "../hooks/useNowPlayingMovies";
import MainContainer from "./MainContainer";
import { useSelector, useDispatch } from "react-redux";
import SecondaryContainer from "./SecondaryContainer";
import usePopularMovies from "../hooks/usePopularMovies";
import useTopRatedMovies from "../hooks/useTopRatedMovie";
import useUpcomingMovies from "../hooks/useUpcomingMovies";
import GptSearch from "./GptSearch";
import { setSelectedMovieId } from "../utils/movieSlice";
import TrailerModal from "./TrailerModal";

console.log(" i am in Browse");
const Browse = () => {
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);
  const selectedMovieId = useSelector((store) => store.movies.selectedMovieId);
  const dispatch = useDispatch();

  useNowPlayingMovies();
  usePopularMovies();
  useTopRatedMovies();
  useUpcomingMovies();

  const handleCloseModal = () => {
    dispatch(setSelectedMovieId(null));
  };

  return (
    <div className="">
      <Header/>
      
      {selectedMovieId && (
        <TrailerModal 
          movieId={selectedMovieId} 
          onClose={handleCloseModal} 
        />
      )}

      {showGptSearch ? (
        <GptSearch />
      ) : (
        <>
          <MainContainer />
          <SecondaryContainer />
        </>
      )}

    </div>
  );
};

export default Browse;
