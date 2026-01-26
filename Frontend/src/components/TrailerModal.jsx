import React, { useEffect, useState } from 'react';

const TrailerModal = ({ movieId, onClose }) => {
  const [trailerKey, setTrailerKey] = useState(null);

  useEffect(() => {
    const fetchTrailer = async () => {
      try {
        const response = await fetch(
          `https://cinemind-98oc.onrender.com/api/tmdb/movie/${movieId}/videos?language=en-US`
        );
        const json = await response.json();
        
        const filterData = json.results?.filter((video) => video.type === "Trailer");
        const trailer = filterData?.length ? filterData[0] : json.results?.[0];
        setTrailerKey(trailer?.key);
      } catch (error) {
        console.error("Failed to fetch trailer", error);
      }
    };
    
    if (movieId) fetchTrailer();
  }, [movieId]);

  if (!movieId) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90">
      <div className="relative w-full max-w-5xl p-4">
          <button 
            onClick={onClose}
            className="absolute -top-10 right-0 md:-right-10 text-white text-3xl font-bold hover:text-red-500 transition-colors cursor-pointer"
          >
            ✕
          </button>
          
          <div className="bg-black rounded-lg overflow-hidden shadow-2xl border border-gray-800">
            {trailerKey ? (
              <div className="w-full aspect-video">
                 <iframe
                    className="w-full h-full"
                    src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&mute=0&controls=1&showinfo=0&rel=0&modestbranding=1&iv_load_policy=3`}
                    title="Movie Trailer"
                    allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                 ></iframe>
              </div>
            ) : (
              <div className="text-white p-20 text-center text-xl animate-pulse">
                Loading Trailer...
              </div>
            )}
          </div>
      </div>
    </div>
  );
};

export default TrailerModal;
