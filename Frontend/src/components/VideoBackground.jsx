import { useSelector } from "react-redux";
import useMovieTrailer from "../hooks/useMovieTrailer";
import { useState } from "react";



const VideoBackground = ({ movieId }) => {
  const trailerVideo = useSelector((store) => store.movies?.trailerVideo);
  const [isMuted, setIsMuted] = useState(true);
  const toggleMute = () => setIsMuted((prev) => !prev);

  useMovieTrailer(movieId);

  return (
    <div className="w-screen">
      <iframe
        className="w-screen aspect-video"
        src={
          "https://www.youtube.com/embed/" +
          trailerVideo?.key +
          `?autoplay=1&mute=${isMuted ? 1 : 0}&controls=0&loop=1&playlist=` +
          trailerVideo?.key
        }
        title="Youtube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      ></iframe>

      <button
        onClick={toggleMute}
        className="relative bottom-48 left-6 bg-white/80 text-black font-semibold px-4 py-2 rounded-lg shadow-md hover:bg-white transition"
      >
        {isMuted ? "🔈 Unmute" : "🔇 Mute"}
      </button>
    </div>
  );
};

export default VideoBackground;
