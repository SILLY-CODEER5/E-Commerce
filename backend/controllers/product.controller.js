import asyncHandler from "../utils/asyncHandler.js";
import { v2 as cloudinary } from "cloudinary";
import { productModel } from "../models/product.model.js";

// controllers functions--------

const addProduct = asyncHandler(async (req, res) => {
  const { name, description, price, category, subCategory, sizes, bestseller } =
    req.body;
  //   console.log(
  //     name,
  //     description,
  //     price,
  //     category,
  //     subCategory,
  //     sizes,
  //     bestseller
  //   );

  const image1 = req.files.image1 && req.files.image1[0];
  const image2 = req.files.image2 && req.files.image2[0];
  const image3 = req.files.image3 && req.files.image3[0];
  const image4 = req.files.image4 && req.files.image4[0];

  const images = [image1, image2, image3, image4].filter(
    (item) => item !== undefined
  );

  //   console.log(images);

  let imagesUrl = await Promise.all(
    images.map(async (item) => {
      let result = await cloudinary.uploader.upload(item.path, {
        resource_type: "image",
      });
      return result.secure_url;
    })
  );

  //   console.log(imagesUrl);

  const productData = {
    name,
    description,
    price: Number(price),
    category,
    subCategory,
    bestseller: bestseller === "true" ? true : false,
    sizes: JSON.parse(sizes),
    image: imagesUrl,
    date: Date.now(),
  };

  //   console.log(productData);

  const product = new productModel(productData);
  const added = await product.save();
  //   console.log(added);

  res.json({
    status: "201",
    msg: "Product added successfully !",
    product: product,
  });
});

const listProducts = asyncHandler(async (req, res) => {
  const products = await productModel.find({});
  console.log(products);
  res.json({ success: "200", products: products });
});

const removeProduct = asyncHandler(async (req, res) => {
  await productModel.findByIdAndDelete(req.body.id);
  res.json({ success: "200", msg: "Product removed successfully !" });
});

const singleProduct = asyncHandler(async (req, res) => {
  const { productId } = req.body;
  const product = await productModel.findById(productId);
  res.json({ success: "200", product: product });
});

export { addProduct, listProducts, removeProduct, singleProduct };
