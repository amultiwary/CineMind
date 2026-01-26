import React, { useRef, useState } from "react";
import lang from "../utils/languageConstant";
import { useSelector, useDispatch } from "react-redux";
import { addGptMovieResult } from "../utils/GptSlice.js";
import axios from "axios";



console.log("i am in gptsearchbar")

const GptSeachBar = () => {
  const langkey = useSelector((store) => store.config.lang);
  const searchText = useRef(null);
  const [showError, setShowError] = useState(false);
  const dispatch = useDispatch();

  const handleGptSearchClick = async () => {
    try {
      const res = await axios.post(
        "https://cinemind-98oc.onrender.com/api/gemini/gpt-search",
        {
          userQuery: searchText.current.value,
        }
      );
      const { movieNames, movieResults } = res.data;
      dispatch(addGptMovieResult({ movieNames, movieResults }));
      setShowError(false);
    } catch (err) {
      setShowError(true);
    }
  };

  return (
    <div className="pt-[45%] md:pt-[10%] flex justify-center relative z-0">
      <form
        className="w-[95%] md:w-1/2 bg-black/90 grid grid-cols-12 rounded-lg shadow-xl overflow-hidden"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          ref={searchText}
          type="text"
          className="p-3 md:p-4 col-span-8 md:col-span-9 outline-none text-black bg-white focus:bg-gray-100 transition-colors"
          placeholder={lang[langkey].gptSearchPlaceholder}
        />
        <button
          className="col-span-4 md:col-span-3 py-3 px-4 bg-red-700 hover:bg-red-800 text-white font-bold transition-all duration-300 md:text-lg text-sm"
          onClick={handleGptSearchClick}
        >
          {lang[langkey].search}
        </button>
      </form>
      {showError && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-red-600 text-white px-4 py-2 rounded-md text-center z-50 shadow-lg">
          GPT API error! Please try again later.
        </div>
      )}
    </div>
  );
};

export default GptSeachBar;
