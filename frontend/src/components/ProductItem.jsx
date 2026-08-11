import { useContext } from "react";
import useShopStore from "../store/useShopStore";
import { Link } from "react-router-dom";

const ProductItem = ({ id, image, name, price }) => {

  const { currency } = useShopStore();

  const getOptimizedUrl = (url, width) => {
    if (url && url.includes('cloudinary.com')) {
      return url.replace('/upload/', `/upload/f_auto,q_auto,w_${width}/`);
    }
    return url;
  };

  const mainSrc = getOptimizedUrl(image[0], 400);
  const srcSet = image[0] && image[0].includes('cloudinary.com')
    ? `${getOptimizedUrl(image[0], 250)} 250w, ${getOptimizedUrl(image[0], 350)} 350w, ${getOptimizedUrl(image[0], 500)} 500w, ${getOptimizedUrl(image[0], 800)} 800w`
    : undefined;

  return (
    <Link className="text-gray-700 cursor-pointer" to={`/product/${id}`}>
      <div className="overflow-hidden">
        <img
          className="w-full h-auto hover:scale-110 transition ease-in-out"
          src={mainSrc}
          srcSet={srcSet}
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
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
