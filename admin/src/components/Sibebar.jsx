import { NavLink } from "react-router-dom";
import { assets } from "../assests/assets";

const Sibebar = () => {
  return (
    <div className="w-[18%] min-h-[calc(100vh-64px)] border-r-2 bg-white">
      <div className="flex flex-col gap-4 pt-6 pl-[20%] text-[15px]">
        <NavLink
          className={({ isActive }) => `flex items-center gap-3 border border-r-0 px-4 py-2.5 rounded-l transition-all ${isActive ? 'bg-gray-100 font-semibold border-gray-400 text-black' : 'border-gray-300 bg-white hover:bg-gray-50 text-gray-600'}`}
          to="/add"
        >
          <img className="w-5 h-5" src={assets.add_icon} alt="" />
          <p className="hidden md:block">Add Items</p>
        </NavLink>
        <NavLink
          className={({ isActive }) => `flex items-center gap-3 border border-r-0 px-4 py-2.5 rounded-l transition-all ${isActive ? 'bg-gray-100 font-semibold border-gray-400 text-black' : 'border-gray-300 bg-white hover:bg-gray-50 text-gray-600'}`}
          to="/list"
        >
          <img className="w-5 h-5" src={assets.order_icon} alt="" />
          <p className="hidden md:block">List Items</p>
        </NavLink>
        <NavLink
          className={({ isActive }) => `flex items-center gap-3 border border-r-0 px-4 py-2.5 rounded-l transition-all ${isActive ? 'bg-gray-100 font-semibold border-gray-400 text-black' : 'border-gray-300 bg-white hover:bg-gray-50 text-gray-600'}`}
          to="/orders"
        >
          <img className="w-5 h-5" src={assets.order_icon} alt="" />
          <p className="hidden md:block">Orders</p>
        </NavLink>
      </div>
    </div>
  );
};

export default Sibebar;
