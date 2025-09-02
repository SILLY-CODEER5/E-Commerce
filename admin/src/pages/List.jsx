import { useEffect, useState } from "react";
import { backendUrl } from "../App";
import axios from "axios";
import { toast } from "react-toastify";
import { currency } from "../App";
const List = ({ token }) => {
  //states
  const [list, setList] = useState([]);

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
      <p className="mb-2">All Products List</p>
      <div className="flex flex-col gap-2 ">
        <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-gray-100 text-sm">
          <b className="text-center">Image</b>
          <b className="text-center">Name</b>
          <b className="text-center">Category</b>
          <b className="text-center">Price</b>
          <b className="text-center">Action</b>
        </div>
        {list.map((item, index) => (
          <div
            className="grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border text-sm"
            key={index}
          >
            <p className=" flex justify-center ">
              <img className="w-12" src={item.image[0]} alt="" />
            </p>
            <p className="text-center">{item.name}</p>
            <p className="text-center">{item.category}</p>
            <p className="text-center">
              {currency}
              {item.price}
            </p>
            <p
              className="text-center  cursor-pointer text-lg  col-start-3 md:col-start-5 col-span-1"
              onClick={() => removeProduct(item._id)}
            >
              X
            </p>
          </div>
        ))}
      </div>
    </>
  );
};

export default List;
