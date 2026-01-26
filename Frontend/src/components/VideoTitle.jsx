import React from "react";



console.log("i am in videotitle")


const VideoTitle = ({ title, overview }) => {
  return (
    <div className="w-screen aspect-video pt-[17%] px-6 md:px-12 absolute text-white bg-gradient-to-r from-black">
      <h1 className="text-2xl md:text-4xl  font-bold">{title}</h1>
      <p className="hidden md:inline-block py-6 text-sm w-1/4">{overview}</p>
    </div>
  );
};

export default VideoTitle;
