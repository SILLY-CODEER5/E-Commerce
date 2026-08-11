import { useContext, useState, useRef } from "react";
import { assets } from "../assets/assets";
import { NavLink, Link, useLocation, useNavigate } from "react-router-dom";
import useShopStore from "../store/useShopStore";
import { toast } from "react-toastify";

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const {
    showSearch,
    setShowSearch,
    search,
    setSearch,
    getCartCount,
    token,
    setToken,
    setCartItems,
    userData,
  } = useShopStore();
  const navigate = useNavigate();
  const location = useLocation();
  const searchInputRef = useRef(null);

  const handleSearchClick = () => {
    navigate("/collection");
    setShowSearch(true);
    setTimeout(() => {
      searchInputRef.current?.focus();
    }, 100);
  };

  const logout = () => {
    navigate("/");
    localStorage.removeItem("token");
    setToken("");
    setCartItems({});
    toast.success("You're Logged out.");
  };

  return (
    <div
      className="flex items-center justify-between py-5
 font-medium md:sticky md:top-0 bg-white z-50"
    >
      <Link to="/" aria-label="Home">
        <img src={assets.logo} className="w-36" alt="Forever Logo" />
      </Link>

      <nav className="hidden sm:flex gap-5 text-sm text-gray-700" aria-label="Main Navigation">
        <NavLink to="/" className="flex flex-col items-center gap-1">
          <p>HOME</p>
          <hr className="w-2/4 border-none h-[2px] bg-gray-700 opacity-0 transition-opacity" />
        </NavLink>
        <NavLink to="/collection" className="flex flex-col items-center gap-1">
          <p>COLLECTION</p>
          <hr className="w-2/4 border-none h-[2px] bg-gray-700 opacity-0 transition-opacity" />
        </NavLink>
        <NavLink to="/about" className="flex flex-col items-center gap-1">
          <p>ABOUT</p>
          <hr className="w-2/4 border-none h-[2px] bg-gray-700 opacity-0 transition-opacity" />
        </NavLink>
        <NavLink to="/contact" className="flex flex-col items-center gap-1">
          <p>CONTACT</p>
          <hr className="w-2/4 border-none h-[2px] bg-gray-700 opacity-0 transition-opacity" />
        </NavLink>
      </nav>

      <div className="flex items-center gap-6">
        <div className="relative w-5 h-5 flex items-center justify-end">
          <img
            onClick={handleSearchClick}
            src={assets.search_icon}
            className={`w-5 cursor-pointer ${showSearch && location.pathname.includes('collection') ? 'hidden' : 'block'}`}
            alt="Search"
            aria-label="Search"
            role="button"
          />
          <div className={`absolute right-0 flex items-center bg-white border border-gray-400 rounded-full py-2 transition-all duration-300 ease-in-out z-50 ${showSearch && location.pathname.includes('collection') ? 'w-[65vw] sm:w-72 md:w-96 opacity-100 px-5' : 'w-0 border-transparent opacity-0 px-0 pointer-events-none'}`}>
             <input
                ref={searchInputRef}
                type="text"
                placeholder="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full outline-none bg-transparent text-base"
             />
             <img 
               onClick={() => {
                 setShowSearch(false);
                 setSearch("");
               }}
               src={assets.cross_icon} 
               className="w-3 cursor-pointer flex-shrink-0 ml-2" 
               alt="" 
             />
          </div>
        </div>
        <Link 
          to="/cart" 
          aria-label="View Cart"
          className={`relative p-2 rounded-full transition-all flex items-center justify-center ${location.pathname === '/cart' ? 'bg-gray-200 scale-110' : 'hover:bg-gray-100 hover:scale-110'}`}
        >
          <img src={assets.cart_icon} className="w-5 min-w-5" alt="Cart" />
          <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-xs">
            {getCartCount()}
          </p>
        </Link>
        {token && userData?.avatar ? (
          <div className={`rounded-full transition-all overflow-hidden flex items-center justify-center ${location.pathname === '/profile' ? 'ring-2 ring-gray-200 scale-110' : 'hover:ring-2 hover:ring-gray-100 hover:scale-110'}`}>
            <img
              onClick={() => navigate("/profile")}
              src={userData.avatar}
              alt="Profile"
              className="w-9 h-9 object-cover cursor-pointer"
            />
          </div>
        ) : (
          <div className={`p-2 rounded-full transition-all flex items-center justify-center ${location.pathname === '/profile' ? 'bg-gray-200 scale-110' : 'hover:bg-gray-100 hover:scale-110'}`}>
            <img
              onClick={() => (token ? navigate("/profile") : navigate("/login"))}
              src={assets.profile_icon}
              alt="Profile"
              className="w-5 cursor-pointer"
            />
          </div>
        )}
        <button
          onClick={() => setVisible(true)}
          className="p-2 sm:hidden hover:bg-gray-100 rounded-full"
          aria-label="Open Menu"
        >
          <img
            src={assets.menu_icon}
            className="w-5 cursor-pointer"
            alt="Menu"
          />
        </button>
      </div>

      {/* Sidebar menu for small screens */}
      <div
        className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white z-2 ${
          visible ? "w-full" : "w-0"
        } `}
      >
        <div className="flex flex-col text-gray-600">
          <div
            onClick={() => setVisible(false)}
            className="flex flex-row-reverse items-center gap-4 p-3 border-b"
          >
            <p>BACK</p>
            <img src={assets.dropdown_icon} className="h-4 rotate-180" alt="" />
          </div>
          <NavLink
            onClick={() => setVisible(false)}
            to="/"
            className="py-2 pl-6 text-center"
          >
            HOME
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            to="/collection"
            className="py-2 pl-6 text-center "
          >
            COLLECTION
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            to="/about"
            className="py-2 pl-6 text-center "
          >
            ABOUT
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            to="/contact"
            className="py-2 pl-6 text-center "
          >
            CONTACT
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
