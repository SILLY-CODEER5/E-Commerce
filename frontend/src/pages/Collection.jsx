import { useContext, useEffect, useState } from "react";
import useShopStore from "../store/useShopStore";
import { assets } from "../assets/assets.js";
import Title from "../components/Title.jsx";
import ProductItem from "../components/ProductItem.jsx";
const Collection = () => {
  // states
  const { products, search, showSearch, currency } = useShopStore();
  const [showFilter, setShowFilter] = useState(true);
  const [filterProducts, setFilterProducts] = useState([]);
  const [Category, setCategory] = useState([]);
  const [SubCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState("relevant");
  const [maxPrice, setMaxPrice] = useState(1000);

  // functions
  const toggleCategory = (e) => {
    if (Category.includes(e.target.value)) {
      setCategory([]);
    } else {
      setCategory([e.target.value]);
    }
  };

  const toggleSubCategory = (e) => {
    if (SubCategory.includes(e.target.value)) {
      setSubCategory([]);
    } else {
      setSubCategory([e.target.value]);
    }
  };

  useEffect(() => {
    let processedProducts = [...products];

    if (showSearch && search) {
      processedProducts = processedProducts.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (Category.length > 0) {
      processedProducts = processedProducts.filter((item) =>
        Category.includes(item.category)
      );
    }

    if (SubCategory.length > 0) {
      processedProducts = processedProducts.filter((item) =>
        SubCategory.includes(item.subCategory)
      );
    }

    if (maxPrice < 1000) {
      processedProducts = processedProducts.filter(
        (item) => item.price <= maxPrice
      );
    }

    switch (sortType) {
      case "low-high":
        processedProducts.sort((a, b) => a.price - b.price);
        break;
      case "high-low":
        processedProducts.sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }

    setFilterProducts(processedProducts);
  }, [products, Category, SubCategory, search, showSearch, sortType, maxPrice]);

  return (
    <div className="flex flex-col sm:flex-row gap-1 border-t sm:gap-10 pt-10">
      {/* Filter Options */}
      <div className="min-w-60 sm:sticky sm:top-24 h-fit bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <div 
          onClick={() => setShowFilter(!showFilter)}
          className="my-2 flex items-center justify-between cursor-pointer group"
        >
          <p className="text-xl font-bold tracking-tight text-gray-900 group-hover:text-black transition-colors">FILTERS</p>
          <img
            className={`h-4 sm:hidden ${showFilter ? "rotate-90" : ""} transition-transform duration-300 ease-in-out opacity-60`}
            src={assets.dropdown_icon}
            alt=""
          />
        </div>

        <div className={`transition-all duration-300 ease-in-out ${showFilter ? "opacity-100 max-h-[1000px] mt-6" : "opacity-0 max-h-0 overflow-hidden sm:opacity-100 sm:max-h-[1000px] sm:mt-6 sm:overflow-visible"}`}>
          {/* Category Filter */}
          <div className="pb-6 border-b border-gray-100">
            <p className="mb-4 text-sm font-semibold text-gray-800 tracking-wide">CATEGORIES</p>
            <div className="flex flex-col gap-3 text-sm font-medium text-gray-600">
              <label className="flex items-center gap-3 cursor-pointer hover:text-black transition-colors">
                <input className="w-4 h-4 accent-black cursor-pointer" type="checkbox" value={"Men"} checked={Category.includes("Men")} onChange={toggleCategory} />
                Men
              </label>
              <label className="flex items-center gap-3 cursor-pointer hover:text-black transition-colors">
                <input className="w-4 h-4 accent-black cursor-pointer" type="checkbox" value={"Women"} checked={Category.includes("Women")} onChange={toggleCategory} />
                Women
              </label>
              <label className="flex items-center gap-3 cursor-pointer hover:text-black transition-colors">
                <input className="w-4 h-4 accent-black cursor-pointer" type="checkbox" value={"Kids"} checked={Category.includes("Kids")} onChange={toggleCategory} />
                Kids
              </label>
            </div>
          </div>

          {/* SubCategory filter */}
          <div className="py-6 border-b border-gray-100">
            <p className="mb-4 text-sm font-semibold text-gray-800 tracking-wide">TYPE</p>
            <div className="flex flex-col gap-3 text-sm font-medium text-gray-600">
              <label className="flex items-center gap-3 cursor-pointer hover:text-black transition-colors">
                <input className="w-4 h-4 accent-black cursor-pointer" type="checkbox" value={"Topwear"} checked={SubCategory.includes("Topwear")} onChange={toggleSubCategory} />
                Topwear
              </label>
              <label className="flex items-center gap-3 cursor-pointer hover:text-black transition-colors">
                <input className="w-4 h-4 accent-black cursor-pointer" type="checkbox" value={"Bottomwear"} checked={SubCategory.includes("Bottomwear")} onChange={toggleSubCategory} />
                Bottomwear
              </label>
              <label className="flex items-center gap-3 cursor-pointer hover:text-black transition-colors">
                <input className="w-4 h-4 accent-black cursor-pointer" type="checkbox" value={"Winterwear"} checked={SubCategory.includes("Winterwear")} onChange={toggleSubCategory} />
                Winterwear
              </label>
            </div>
          </div>

          {/* Sort Filter */}
          <div className="py-6 border-b border-gray-100">
            <p className="mb-4 text-sm font-semibold text-gray-800 tracking-wide">SORT BY</p>
            <select
              onChange={(e) => setSortType(e.target.value)}
              className="w-full text-sm px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-gray-200 transition-shadow cursor-pointer text-gray-700 font-medium"
              value={sortType}
            >
              <option value="relevant">Relevant</option>
              <option value="low-high">Low to High</option>
              <option value="high-low">High to Low</option>
            </select>
          </div>

          {/* Price Range Filter */}
          <div className="py-6">
            <div className="flex justify-between items-center mb-4">
              <p className="text-sm font-semibold text-gray-800 tracking-wide">MAX PRICE</p>
              <p className="text-sm font-bold text-black bg-gray-100 px-2.5 py-1 rounded-md">{currency}{maxPrice}</p>
            </div>
            <input
              type="range"
              min="0"
              max="1000"
              step="10"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-black"
            />
          </div>
          
          {/* Clear Filters Button */}
          {(Category.length > 0 || SubCategory.length > 0 || maxPrice < 1000 || sortType !== "relevant") && (
            <button
              onClick={() => {
                setCategory([]);
                setSubCategory([]);
                setMaxPrice(1000);
                setSortType("relevant");
              }}
              className="mt-2 w-full text-sm font-semibold bg-red-50 text-red-600 border border-red-100 py-3 rounded-lg hover:bg-red-500 hover:text-white transition-all duration-300 shadow-sm"
            >
              CLEAR ALL FILTERS
            </button>
          )}
        </div>
      </div>

      {/* Right Side */}

      <div className="flex-1 ">
        <div className="flex justify-between text-base sm:text-2xl mb-4">
          <Title text1={"ALL"} text2={"COLLECTIONS"} />
        </div>

        {showSearch && search && (
          <p className="mb-6 text-gray-500 text-sm sm:text-base">
            Showing results for <span className="text-gray-800 font-medium">"{search}"</span>
          </p>
        )}

        {/* Render Products */}

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
          {filterProducts.map((item, index) => (
            <ProductItem
              key={index}
              name={item.name}
              id={item._id}
              price={item.price}
              image={item.image}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Collection;
