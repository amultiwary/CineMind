import React from "react";

const ShimmerMainContainer = () => {
  return (
    <div className="relative w-screen aspect-video bg-gradient-to-r from-black to-gray-900 animate-pulse">
      <div className="w-screen aspect-video pt-[17%] px-7 md:px-12 absolute">
        <div className="h-10 w-2/3 bg-gray-700 rounded mb-4"></div>
        <div className="h-6 w-1/3 bg-gray-700 rounded mb-6"></div>
        <div className="flex gap-4">
          <div className="h-10 w-32 bg-gray-700 rounded"></div>
          <div className="h-10 w-32 bg-gray-700 rounded"></div>
        </div>
      </div>
      <div className="w-full h-full bg-gray-800 opacity-40"></div>
    </div>
  );
};

export default ShimmerMainContainer;
