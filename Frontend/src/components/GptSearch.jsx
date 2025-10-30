import React from "react";
import GptSeachBar from "./GptSeachBar";
import GptMovieSuggestion from "./GptMovieSuggestion";
import bgurl from "../assets/BG_URL.jpg";

const GptSearch = () => {
  return (
    <>
      <div className="fixed -z-10">
        <img
          className="h-screen object-cover md:h-auto md:object-containcontain "
          src={bgurl}
          alt="CineMind logo"
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
