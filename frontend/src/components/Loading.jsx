import React from "react";

const Loading = () => {
  return (
    <div className="flex justify-center items-center h-[50vh] w-full">
      <div className="w-10 h-10 border-4 border-gray-300 border-t-gray-800 rounded-full animate-spin"></div>
    </div>
  );
};

export default Loading;
