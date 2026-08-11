import { useState } from "react";
import { assets } from "../assests/assets";
import axios from "axios";
import { backendUrl, currency } from "../App";
import { toast } from "react-toastify";

const Add = ({ token }) => {
  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Men");
  const [subCategory, setSubCategory] = useState("Topwear");
  const [bestseller, setBestseller] = useState(false);
  const [sizes, setSizes] = useState([]);
  const sizeOrder = ["S", "M", "L", "XL", "XXL"];
  const toggleSize = (size) => {
    setSizes((prevSizes) => {
      const newSizes = prevSizes.includes(size)
        ? prevSizes.filter((item) => item !== size)
        : [...prevSizes, size];
      newSizes.sort((a, b) => sizeOrder.indexOf(a) - sizeOrder.indexOf(b));

      return newSizes;
    });
  };

  const onSubminHandler = async (e) => {
    e.preventDefault();
    if (!token) {
      console.log("token is empty !", token);
      return;
    }
    try {
      const formData = new FormData();

      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("bestseller", bestseller);
      formData.append("sizes", JSON.stringify(sizes));

      image1 && formData.append("image1", image1);
      image2 && formData.append("image2", image2);
      image3 && formData.append("image3", image3);
      image4 && formData.append("image4", image4);

      const response = await axios.post(
        backendUrl + "/api/v1/products/add",
        formData,
        { headers: { token } }
      );
      console.log(response);
      if (response.data.status === "201") {
        toast.success(response.data.msg);
        setName("");
        setDescription("");
        setImage1(false);
        setImage2(false);
        setImage3(false);
        setImage4(false);
        setPrice("");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <form
      onSubmit={onSubminHandler}
      className="flex flex-col w-full items-start gap-8 pt-6 pb-12 max-w-6xl mx-auto"
      action=""
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center w-full gap-4 pb-4 border-b border-gray-200">
        <div>
          <p className="text-2xl font-semibold text-gray-800">Add New Product</p>
          <p className="text-sm text-gray-500 mt-1">Create a new product for your store.</p>
        </div>
        <button className="px-8 py-2.5 bg-black text-white hover:bg-gray-800 transition-colors rounded-lg shadow-sm font-medium" type="submit">
          Publish Product
        </button>
      </div>

      {/* Two Column Layout */}
      <div className="w-full flex flex-col lg:flex-row gap-8">
        
        {/* Left Column (Main Details) */}
        <div className="flex-1 flex flex-col gap-6">
          
          {/* General Information Card */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col gap-5">
            <h3 className="text-lg font-medium text-gray-800 border-b border-gray-100 pb-2">General Information</h3>
            <div className="w-full">
              <p className="mb-2 text-gray-700 font-medium text-sm">Product Name</p>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg outline-none focus:bg-white focus:ring-2 focus:ring-blue-100 focus:border-gray-500 transition-colors"
                type="text"
                placeholder="Enter product name"
                required
              />
            </div>
            <div className="w-full">
              <p className="mb-2 text-gray-700 font-medium text-sm">Product Description</p>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg outline-none focus:bg-white focus:ring-2 focus:ring-blue-100 focus:border-gray-500 transition-colors"
                rows="4"
                placeholder="Write content here"
                required
              />
            </div>
          </div>

          {/* Media Card */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col gap-5">
            <h3 className="text-lg font-medium text-gray-800 border-b border-gray-100 pb-2">Media</h3>
            <p className="text-sm text-gray-500">Upload up to 4 images. The first image will be the cover.</p>
            <div className="flex flex-wrap gap-4 mt-2">
              <label htmlFor="image1" className="cursor-pointer hover:opacity-80 transition-opacity">
                <img className="w-24 h-24 object-cover rounded-lg border-2 border-dashed border-gray-300 p-1" src={!image1 ? assets.upload_area : URL.createObjectURL(image1)} alt="" />
                <input onChange={(e) => setImage1(e.target.files[0])} type="file" id="image1" hidden />
              </label>
              <label htmlFor="image2" className="cursor-pointer hover:opacity-80 transition-opacity">
                <img className="w-24 h-24 object-cover rounded-lg border-2 border-dashed border-gray-300 p-1" src={!image2 ? assets.upload_area : URL.createObjectURL(image2)} alt="" />
                <input onChange={(e) => setImage2(e.target.files[0])} type="file" id="image2" hidden />
              </label>
              <label htmlFor="image3" className="cursor-pointer hover:opacity-80 transition-opacity">
                <img className="w-24 h-24 object-cover rounded-lg border-2 border-dashed border-gray-300 p-1" src={!image3 ? assets.upload_area : URL.createObjectURL(image3)} alt="" />
                <input onChange={(e) => setImage3(e.target.files[0])} type="file" id="image3" hidden />
              </label>
              <label htmlFor="image4" className="cursor-pointer hover:opacity-80 transition-opacity">
                <img className="w-24 h-24 object-cover rounded-lg border-2 border-dashed border-gray-300 p-1" src={!image4 ? assets.upload_area : URL.createObjectURL(image4)} alt="" />
                <input onChange={(e) => setImage4(e.target.files[0])} type="file" id="image4" hidden />
              </label>
            </div>
          </div>

        </div>

        {/* Right Column (Organization & Pricing) */}
        <div className="w-full lg:w-[350px] flex flex-col gap-6">
          
          {/* Organization Card */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col gap-5">
            <h3 className="text-lg font-medium text-gray-800 border-b border-gray-100 pb-2">Organization</h3>
            <div>
              <p className="mb-2 text-gray-700 font-medium text-sm">Category</p>
              <select
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg outline-none focus:bg-white focus:ring-2 focus:ring-blue-100 focus:border-gray-500 transition-colors cursor-pointer"
              >
                <option value="Men">Men</option>
                <option value="Women">Women</option>
                <option value="Kids">Kids</option>
              </select>
            </div>
            <div>
              <p className="mb-2 text-gray-700 font-medium text-sm">Subcategory</p>
              <select
                onChange={(e) => setSubCategory(e.target.value)}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg outline-none focus:bg-white focus:ring-2 focus:ring-blue-100 focus:border-gray-500 transition-colors cursor-pointer"
              >
                <option value="Topwear">Topwear</option>
                <option value="Bottomwear">Bottomwear</option>
                <option value="Winterwear">Winterwear</option>
              </select>
            </div>
            <div className="pt-3">
              <label className="flex items-center gap-3 cursor-pointer p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors shadow-sm bg-white">
                <input 
                  onChange={() => setBestseller((prev) => !prev)}
                  checked={bestseller}
                  type="checkbox" 
                  className="w-5 h-5 accent-black cursor-pointer" 
                />
                <span className="text-gray-800 font-medium">Mark as Bestseller</span>
              </label>
            </div>
          </div>

          {/* Pricing & Variants Card */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col gap-5">
            <h3 className="text-lg font-medium text-gray-800 border-b border-gray-100 pb-2">Pricing & Variants</h3>
            <div>
              <p className="mb-2 text-gray-700 font-medium text-sm">Price ({currency})</p>
              <input
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg outline-none focus:bg-white focus:ring-2 focus:ring-blue-100 focus:border-gray-500 transition-colors font-mono"
                type="number"
                placeholder="0.00"
                required
              />
            </div>
            <div>
              <p className="mb-3 text-gray-700 font-medium text-sm">Available Sizes</p>
              <div className="flex flex-wrap gap-2">
                {sizeOrder.map((size) => (
                  <div key={size} onClick={() => toggleSize(size)}>
                    <p
                      className={` ${
                        sizes.includes(size) ? "bg-black text-white shadow-md shadow-gray-400/30" : "bg-gray-100 text-gray-600 hover:bg-gray-200 border border-gray-200"
                      } px-5 py-2 cursor-pointer rounded-lg font-semibold text-sm transition-all text-center min-w-[50px]`}
                    >
                      {size}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </form>
  );
};

export default Add;
