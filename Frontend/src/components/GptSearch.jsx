import React from "react";
import GptSeachBar from "./GptSeachBar";
import GptMovieSuggestion from "./GptMovieSuggestion";
import bgurl from "../assets/BG_URL.jpg";


console.log("i am in gptsearch")

const GptSearch = () => {
  return (
    <>
      <div className="fixed inset-0 -z-10">
        <img
          className="h-full w-full object-cover"
          src={bgurl}
          alt="background"
        />
      </div>
      <div className="">
        <GptSeachBar />
        <GptMovieSuggestion />
      </div>
    </>
  );
};

export default GptSearch;
