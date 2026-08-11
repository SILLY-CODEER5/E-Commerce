import { useContext } from "react";
import useShopStore from "../store/useShopStore";
import { Link } from "react-router-dom";

const ProductItem = ({ id, image, name, price }) => {

  const { currency } = useShopStore();


  return (
    <Link className="text-gray-700 cursor-pointer" to={`/product/${id}`}>
      <div className="overflow-hidden">
        <img
          className="w-full h-auto hover:scale-110 transition ease-in-out"
          src={image[0]}
          alt={name}
          width="400"
          height="500"
          decoding="async"
        />
      </div>
      <p className="pt-3 pb-1 text-sm">{name}</p>
      <p className="text-sm font-medium">
        {currency}
        {price}
      </p>
    </Link>
  );
};

export default ProductItem;
