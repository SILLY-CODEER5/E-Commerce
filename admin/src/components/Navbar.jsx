import React from "react";
import { assets } from "../assests/assets";
const Navbar = ({ setToken }) => {
  return (
    <div className="flex items-center py-3 px-[4%] justify-between bg-white shadow-sm sticky top-0 z-50">
      <img className="w-[max(10%,80px)] " src={assets.logo} alt="" />
      <button
        onClick={() => setToken("")}
        className="bg-black hover:bg-gray-800 transition-colors text-white px-5 py-2 sm:px-7 sm:py-2 rounded-full text-xs sm:text-sm font-medium"
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;
