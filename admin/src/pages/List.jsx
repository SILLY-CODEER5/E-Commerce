import { useEffect, useState } from "react";
import { backendUrl } from "../App";
import axios from "axios";
import { toast } from "react-toastify";
import { currency } from "../App";
const List = ({ token }) => {
  //states
  const [list, setList] = useState([]);
  const [searchId, setSearchId] = useState("");

  const filteredList = list.filter((item) =>
    item._id.toLowerCase().includes(searchId.toLowerCase())
  );

  //functions
  const fetchList = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/v1/products/list");
      // console.log(response.data);
      if (response.data.success === "200") {
        setList(response.data.products);
      } else {
        toast.error(response.data.msg);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const removeProduct = async (id) => {
    try {
      const response = await axios.post(
        backendUrl + "/api/v1/products/remove",
        { id },
        { headers: { token } }
      );
      if (response.data.success === "200") {
        toast.success(response.data.msg);
        await fetchList();
      } else {
        toast.error(response.data.msg);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  // rendered
  return (
    <>
      <div className="flex flex-col mb-6 sticky top-0 z-40 bg-gray-50 pt-8 pb-4 -mx-8 px-8 sm:-mx-12 sm:px-12 lg:-mx-16 lg:px-16 border-b border-gray-200/80 backdrop-blur-md">
        <div className="flex flex-col gap-3">
          <p className="text-xl font-semibold text-gray-800">All Products List</p>
          <div className="w-full sm:w-[350px] relative">
            <input
              type="text"
              placeholder="Search by Product ID..."
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white border border-gray-300 rounded-lg outline-none focus:border-gray-500 focus:ring-0 text-sm shadow-sm transition-colors"
            />
            <svg className="w-4 h-4 text-gray-400 absolute left-3 top-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredList.map((item, index) => (
          <div
            className="flex flex-col bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all hover:-translate-y-1 overflow-hidden"
            key={index}
          >
            <div className="relative">
              <img className="w-full h-56 object-cover" src={item.image[0]} alt="" />
              <span className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-gray-700 px-3 py-1 rounded-full text-xs font-bold tracking-wide shadow-sm border border-gray-100">
                {item.category}
              </span>
            </div>
            
            <div className="p-5 flex flex-col flex-1">
              <div className="flex justify-between items-start mb-1">
                <p className="text-gray-800 font-semibold truncate text-base pr-2">{item.name}</p>
                <p className="text-gray-900 font-bold">{currency}{item.price}</p>
              </div>
              <p className="text-gray-400 text-[11px] font-mono mb-6">ID: {item._id}</p>
              
              <div className="mt-auto">
                <button
                  className="w-full text-red-500 hover:text-white transition-colors bg-red-50 hover:bg-red-500 border border-red-100 hover:border-red-500 px-4 py-2.5 rounded-lg font-medium text-sm shadow-sm"
                  onClick={() => removeProduct(item._id)}
                >
                  Delete Product
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default List;
