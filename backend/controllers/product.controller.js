import asyncHandler from "../utils/asyncHandler.js";
import { v2 as cloudinary } from "cloudinary";
import { productModel } from "../models/product.model.js";
import NodeCache from "node-cache";

const cache = new NodeCache();

/**
 * Product Controller Functions
 * Handles adding, removing, and listing products.
 */

const addProduct = asyncHandler(async (req, res) => {
  const { name, description, price, category, subCategory, sizes, bestseller } =
    req.body;


  const image1 = req.files.image1 && req.files.image1[0];
  const image2 = req.files.image2 && req.files.image2[0];
  const image3 = req.files.image3 && req.files.image3[0];
  const image4 = req.files.image4 && req.files.image4[0];

  const images = [image1, image2, image3, image4].filter(
    (item) => item !== undefined
  );



  let imagesUrl = await Promise.all(
    images.map(async (item) => {
      let result = await cloudinary.uploader.upload(item.path, {
        resource_type: "image",
      });
      return result.secure_url;
    })
  );



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



  const product = new productModel(productData);
  const added = await product.save();
  cache.del("all_products");


  res.json({
    status: "201",
    msg: "Product added successfully.",
    product: product,
  });
});

const listProducts = asyncHandler(async (req, res) => {
  res.set("Cache-Control", "public, max-age=60");
  let products = cache.get("all_products");
  if (!products) {
    products = await productModel.find({}).lean();
    cache.set("all_products", products);
    console.log("DATABASE: Fetched products from MongoDB");
  } else {
    console.log("CACHE: Served products from NodeCache");
  }
  res.json({ success: "200", products: products });
});

const removeProduct = asyncHandler(async (req, res) => {
  const product = await productModel.findById(req.body.id);
  if (!product) {
    return res.json({ success: false, msg: "Product not found!" });
  }

  // Delete images from Cloudinary
  if (product.image && product.image.length > 0) {
    for (const imgUrl of product.image) {
      try {
        const parts = imgUrl.split('/');
        const fileName = parts[parts.length - 1];
        const publicId = fileName.split('.')[0];
        await cloudinary.uploader.destroy(publicId);
      } catch (err) {
        console.error("Failed to delete image from Cloudinary:", imgUrl, err);
      }
    }
  }

  await productModel.findByIdAndDelete(req.body.id);
  cache.del("all_products");
  res.json({ success: "200", msg: "Product removed successfully." });
});

const singleProduct = asyncHandler(async (req, res) => {
  const { productId } = req.body;
  const product = await productModel.findById(productId).lean();
  res.json({ success: "200", product: product });
});

export { addProduct, listProducts, removeProduct, singleProduct };
