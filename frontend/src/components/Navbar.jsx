import { useState, useContext, useEffect } from "react";
import { assets } from "../assets/assets";
import { NavLink, Link } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false); // State for the menu
  const [showSearch, setShowSearch] = useState(false); // State for the search overlay

  const { getCartCount, navigate, token, setToken, setCartItems } =
    useContext(ShopContext);

  // Effect to prevent background scrolling when a modal or sidebar is open
  useEffect(() => {
    if (isOpen || showSearch) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen, showSearch]);

  const logout = () => {
    setIsOpen(false); // Close menu on logout
    navigate("/");
    localStorage.removeItem("token");
    setToken("");
    setCartItems({});
    toast.success("You're Logged out.");
  };

  // Animation variants for the menu
  const menuVariants = {
    hidden: { opacity: 0, transition: { duration: 0.3 } },
    visible: { opacity: 1, transition: { duration: 0.3 } },
  };

  const listVariants = {
    hidden: { transition: { staggerChildren: 0.05, staggerDirection: -1 } },
    visible: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { ease: "easeOut" } },
  };

  return (
    <>
      <div className="flex items-center justify-between py-5 font-medium sticky top-0 bg-white z-30 px-4 sm:px-6 lg:px-8">
        <Link to="/">
          <img src={assets.logo} className="w-32 sm:w-36" alt="Logo" />
        </Link>

        {/* --- Desktop Navigation --- */}
        <ul className="hidden sm:flex items-center gap-6 text-sm text-gray-700">
          {["/", "/collection", "/about", "/contact"].map((path, index) => (
            <li key={index}>
              <NavLink
                to={path}
                className="group flex flex-col items-center gap-1"
              >
                <p className="group-[&.active]:font-semibold">
                  {["HOME", "COLLECTION", "ABOUT", "CONTACT"][index]}
                </p>
                <hr className="w-1/2 border-none h-[2px] bg-black hidden group-[&.active]:block" />
              </NavLink>
            </li>
          ))}
        </ul>
        <div className="hidden sm:flex items-center gap-5 sm:gap-6">
          <img
            onClick={() => setShowSearch(true)}
            src={assets.search_icon}
            className="w-5 cursor-pointer"
            alt="Search"
          />
          <div className="group relative">
            <img
              onClick={() => (token ? null : navigate("/login"))}
              src={assets.profile_icon}
              alt="Profile"
              className="w-5 cursor-pointer"
            />
            {token && (
              <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-4 w-40">
                <div className="flex flex-col gap-2 py-3 px-5 bg-slate-100 text-gray-500 rounded shadow-lg">
                  <p className="cursor-pointer hover:text-black">My Profile</p>
                  <p
                    onClick={() => navigate("/orders")}
                    className="cursor-pointer hover:text-black"
                  >
                    Orders
                  </p>
                  <p
                    onClick={logout}
                    className="cursor-pointer hover:text-black"
                  >
                    Logout
                  </p>
                </div>
              </div>
            )}
          </div>
          <Link to="/cart" className="relative">
            <img src={assets.cart_icon} className="w-5" alt="Cart" />
            <p className="absolute -top-1.5 -right-1.5 w-4 h-4 flex items-center justify-center bg-black text-white rounded-full text-[10px]">
              {getCartCount()}
            </p>
          </Link>
        </div>

        {/* --- Mobile Icons --- */}
        <div className="sm:hidden flex items-center gap-5">
          <img
            onClick={() => setShowSearch(true)}
            src={assets.search_icon}
            className="w-5 cursor-pointer"
            alt="Search"
          />
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="z-50"
            aria-label="Toggle menu"
          >
            <img
              src={isOpen ? assets.cross_icon : assets.menu_icon}
              className="w-5 h-5 transition-transform duration-300"
              alt="Menu toggle"
            />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="fixed inset-0 bg-white z-30 flex flex-col justify-center"
          >
            <motion.ul
              variants={listVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="flex flex-col items-center gap-6 text-2xl text-gray-800"
            >
              {/* Main Navigation */}
              {[
                { path: "/", label: "Home" },
                { path: "/collection", label: "Collection" },
                { path: "/about", label: "About" },
                { path: "/contact", label: "Contact" },
              ].map(({ path, label }) => (
                <motion.li key={path} variants={itemVariants}>
                  <NavLink
                    to={path}
                    onClick={() => setIsOpen(false)}
                    // --- THIS LINE IS UPDATED ---
                    className={({ isActive }) =>
                      `px-6 py-2 rounded-full transition-colors duration-300 ${
                        isActive ? "bg-black text-white" : "hover:bg-gray-100"
                      }`
                    }
                  >
                    {label}
                  </NavLink>
                </motion.li>
              ))}
            </motion.ul>

            {/* --- User Actions for Mobile Menu --- */}
            <motion.div
              variants={listVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="flex flex-col items-center gap-4 mt-12 text-lg"
            >
              <motion.div
                variants={itemVariants}
                className="w-4/5 border-t border-gray-200"
              ></motion.div>
              <motion.li variants={itemVariants} className="list-none">
                <Link
                  to="/cart"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3"
                >
                  <img src={assets.cart_icon} className="w-6" alt="Cart" />
                  <p>Cart ({getCartCount()})</p>
                </Link>
              </motion.li>
              {token ? (
                <>
                  <motion.li variants={itemVariants} className="list-none">
                    <Link to="/profile" onClick={() => setIsOpen(false)}>
                      My Profile
                    </Link>
                  </motion.li>
                  <motion.li variants={itemVariants} className="list-none">
                    <Link to="/orders" onClick={() => setIsOpen(false)}>
                      Orders
                    </Link>
                  </motion.li>
                  <motion.li variants={itemVariants} className="list-none">
                    <button
                      onClick={logout}
                      className="bg-black text-white px-8 py-2 rounded-full"
                    >
                      Logout
                    </button>
                  </motion.li>
                </>
              ) : (
                <motion.li variants={itemVariants} className="list-none">
                  <button
                    onClick={() => {
                      navigate("/login");
                      setIsOpen(false);
                    }}
                    className="bg-black text-white px-8 py-2 rounded-full"
                  >
                    Login
                  </button>
                </motion.li>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- Full-Screen Animated Menu (with All Functionality) --- */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="fixed inset-0 bg-white z-30 flex flex-col justify-center"
          >
            <motion.ul
              variants={listVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="flex flex-col items-center gap-6 text-2xl text-gray-800"
            >
              {/* Main Navigation */}
              {[
                { path: "/", label: "Home" },
                { path: "/collection", label: "Collection" },
                { path: "/about", label: "About" },
                { path: "/contact", label: "Contact" },
              ].map(({ path, label }) => (
                <motion.li key={path} variants={itemVariants}>
                  <NavLink
                    to={path}
                    onClick={() => setIsOpen(false)}
                    className={({ isActive }) => (isActive ? "font-bold" : "")}
                  >
                    {label}
                  </NavLink>
                </motion.li>
              ))}
            </motion.ul>

            {/* --- User Actions for Mobile Menu --- */}
            <motion.div
              variants={listVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="flex flex-col items-center gap-4 mt-12 text-lg"
            >
              <motion.div
                variants={itemVariants}
                className="w-4/5 border-t border-gray-200"
              ></motion.div>
              <motion.li variants={itemVariants} className="list-none">
                <Link
                  to="/cart"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3"
                >
                  <img src={assets.cart_icon} className="w-6" alt="Cart" />
                  <p>Cart ({getCartCount()})</p>
                </Link>
              </motion.li>
              {token ? (
                <>
                  <motion.li variants={itemVariants} className="list-none">
                    <Link to="/profile" onClick={() => setIsOpen(false)}>
                      My Profile
                    </Link>
                  </motion.li>
                  <motion.li variants={itemVariants} className="list-none">
                    <Link to="/orders" onClick={() => setIsOpen(false)}>
                      Orders
                    </Link>
                  </motion.li>
                  <motion.li variants={itemVariants} className="list-none">
                    <button
                      onClick={logout}
                      className="bg-black text-white px-8 py-2 rounded-full"
                    >
                      Logout
                    </button>
                  </motion.li>
                </>
              ) : (
                <motion.li variants={itemVariants} className="list-none">
                  <button
                    onClick={() => {
                      navigate("/login");
                      setIsOpen(false);
                    }}
                    className="bg-black text-white px-8 py-2 rounded-full"
                  >
                    Login
                  </button>
                </motion.li>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
