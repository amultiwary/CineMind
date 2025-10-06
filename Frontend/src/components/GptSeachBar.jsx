import React, { useRef, useState } from "react";
import lang from "../utils/languageConstant";
import { useSelector, useDispatch } from "react-redux";
import { addGptMovieResult } from "../utils/GptSlice.js";
import axios from "axios";

const GptSeachBar = () => {
  const langkey = useSelector((store) => store.config.lang);
  const searchText = useRef(null);
  const [showError, setShowError] = useState(false);
  const dispatch = useDispatch();

  const handleGptSearchClick = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/gemini/gpt-search",
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
    <div className="pt-[35%] md:pt-[10%] flex justify-center relative">
      <form
        className="w-full md:w-1/2 bg-black grid grid-cols-12 items-center"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          ref={searchText}
          type="text"
          className="p-2 m-2 col-span-9 rounded-md outline-none"
          placeholder={lang[langkey].gptSearchPlaceholder}
        />
        <button
          className="col-span-3 m-2 px-4 py-2 bg-red-700 text-white font-semibold rounded-md hover:bg-red-800 transition duration-300"
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
