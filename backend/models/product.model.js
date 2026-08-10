import mongoose, { Schema, model } from "mongoose";

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: Array,
    required: true,
  },
  category: {
    type: String,
    required: true,
    index: true,
  },
  subCategory: {
    type: String,
    required: true,
    index: true,
  },
  sizes: {
    type: Array,
    required: true,
  },
  bestseller: {
    type: Boolean,
    index: true,
  },
  date: {
    type: Number,
    required: true,
  },
});

export const productModel =
  mongoose.models.product || model("product", productSchema);
