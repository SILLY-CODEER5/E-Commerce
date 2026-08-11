import mongoose from 'mongoose';
import 'dotenv/config';
import { v2 as cloudinary } from 'cloudinary';
import { productModel } from '../models/product.model.js';
import { userModel } from '../models/users.model.js';
import { orderModel } from '../models/order.model.js';
import bcrypt from 'bcrypt';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET_KEY,
});

const productsData = [
  {
      _id: "aaaaa",
      name: "Women Round Neck Cotton Top",
      description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
      price: 100,
      image: ["p_img1.png"],
      category: "Women",
      subCategory: "Topwear",
      sizes: ["S", "M", "L"],
      date: 1716634345448,
      bestseller: true
  },
  {
      _id: "aaaab",
      name: "Men Round Neck Pure Cotton T-shirt",
      description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
      price: 200,
      image: ["p_img2_1.png", "p_img2_2.png", "p_img2_3.png", "p_img2_4.png"],
      category: "Men",
      subCategory: "Topwear",
      sizes: ["M", "L", "XL"],
      date: 1716621345448,
      bestseller: true
  },
  {
      _id: "aaaac",
      name: "Girls Round Neck Cotton Top",
      description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
      price: 220,
      image: ["p_img3.png"],
      category: "Kids",
      subCategory: "Topwear",
      sizes: ["S", "L", "XL"],
      date: 1716234545448,
      bestseller: true
  },
  {
      _id: "aaaad",
      name: "Men Round Neck Pure Cotton T-shirt",
      description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
      price: 110,
      image: ["p_img4.png"],
      category: "Men",
      subCategory: "Topwear",
      sizes: ["S", "M", "XXL"],
      date: 1716621345448,
      bestseller: true
  },
  {
      _id: "aaaae",
      name: "Women Round Neck Cotton Top",
      description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
      price: 130,
      image: ["p_img5.png"],
      category: "Women",
      subCategory: "Topwear",
      sizes: ["M", "L", "XL"],
      date: 1716622345448,
      bestseller: true
  },
  {
      _id: "aaaaf",
      name: "Girls Round Neck Cotton Top",
      description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
      price: 140,
      image: ["p_img6.png"],
      category: "Kids",
      subCategory: "Topwear",
      sizes: ["S", "L", "XL"],
      date: 1716623423448,
      bestseller: true
  },
  {
      _id: "aaaag",
      name: "Men Tapered Fit Flat-Front Trousers",
      description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
      price: 190,
      image: ["p_img7.png"],
      category: "Men",
      subCategory: "Bottomwear",
      sizes: ["S", "L", "XL"],
      date: 1716621542448,
      bestseller: false
  },
  {
      _id: "aaaah",
      name: "Men Round Neck Pure Cotton T-shirt",
      description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
      price: 140,
      image: ["p_img8.png"],
      category: "Men",
      subCategory: "Topwear",
      sizes: ["S", "M", "L", "XL"],
      date: 1716622345448,
      bestseller: false
  },
  {
      _id: "aaaai",
      name: "Girls Round Neck Cotton Top",
      description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
      price: 100,
      image: ["p_img9.png"],
      category: "Kids",
      subCategory: "Topwear",
      sizes: ["M", "L", "XL"],
      date: 1716621235448,
      bestseller: false
  },
  {
      _id: "aaaaj",
      name: "Men Tapered Fit Flat-Front Trousers",
      description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
      price: 110,
      image: ["p_img10.png"],
      category: "Men",
      subCategory: "Bottomwear",
      sizes: ["S", "L", "XL"],
      date: 1716622235448,
      bestseller: false
  },
  {
      _id: "aaaak",
      name: "Men Round Neck Pure Cotton T-shirt",
      description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
      price: 120,
      image: ["p_img11.png"],
      category: "Men",
      subCategory: "Topwear",
      sizes: ["S", "M", "L"],
      date: 1716623345448,
      bestseller: false
  },
  {
      _id: "aaaal",
      name: "Men Round Neck Pure Cotton T-shirt",
      description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
      price: 150,
      image: ["p_img12.png"],
      category: "Men",
      subCategory: "Topwear",
      sizes: ["S", "M", "L", "XL"],
      date: 1716624445448,
      bestseller: false
  },
  {
      _id: "aaaam",
      name: "Women Round Neck Cotton Top",
      description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
      price: 130,
      image: ["p_img13.png"],
      category: "Women",
      subCategory: "Topwear",
      sizes: ["S", "M", "L", "XL"],
      date: 1716625545448,
      bestseller: false
  },
  {
      _id: "aaaan",
      name: "Boy Round Neck Pure Cotton T-shirt",
      description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
      price: 160,
      image: ["p_img14.png"],
      category: "Kids",
      subCategory: "Topwear",
      sizes: ["S", "M", "L", "XL"],
      date: 1716626645448,
      bestseller: false
  },
  {
      _id: "aaaao",
      name: "Men Tapered Fit Flat-Front Trousers",
      description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
      price: 140,
      image: ["p_img15.png"],
      category: "Men",
      subCategory: "Bottomwear",
      sizes: ["S", "M", "L", "XL"],
      date: 1716627745448,
      bestseller: false
  },
  {
      _id: "aaaap",
      name: "Girls Round Neck Cotton Top",
      description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
      price: 170,
      image: ["p_img16.png"],
      category: "Kids",
      subCategory: "Topwear",
      sizes: ["S", "M", "L", "XL"],
      date: 1716628845448,
      bestseller: false
  },
  {
      _id: "aaaaq",
      name: "Men Tapered Fit Flat-Front Trousers",
      description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
      price: 150,
      image: ["p_img17.png"],
      category: "Men",
      subCategory: "Bottomwear",
      sizes: ["S", "M", "L", "XL"],
      date: 1716629945448,
      bestseller: false
  },
  {
      _id: "aaaar",
      name: "Boy Round Neck Pure Cotton T-shirt",
      description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
      price: 180,
      image: ["p_img18.png"],
      category: "Kids",
      subCategory: "Topwear",
      sizes: ["S", "M", "L", "XL"],
      date: 1716631045448,
      bestseller: false
  },
  {
      _id: "aaaas",
      name: "Boy Round Neck Pure Cotton T-shirt",
      description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
      price: 160,
      image: ["p_img19.png"],
      category: "Kids",
      subCategory: "Topwear",
      sizes: ["S", "M", "L", "XL"],
      date: 1716632145448,
      bestseller: false
  },
  {
      _id: "aaaat",
      name: "Women Palazzo Pants with Waist Belt",
      description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
      price: 190,
      image: ["p_img20.png"],
      category: "Women",
      subCategory: "Bottomwear",
      sizes: ["S", "M", "L", "XL"],
      date: 1716633245448,
      bestseller: false
  },
  {
      _id: "aaaau",
      name: "Women Zip-Front Relaxed Fit Jacket",
      description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
      price: 170,
      image: ["p_img21.png"],
      category: "Women",
      subCategory: "Winterwear",
      sizes: ["S", "M", "L", "XL"],
      date: 1716634345448,
      bestseller: false
  },
  {
      _id: "aaaav",
      name: "Women Palazzo Pants with Waist Belt",
      description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
      price: 200,
      image: ["p_img22.png"],
      category: "Women",
      subCategory: "Bottomwear",
      sizes: ["S", "M", "L", "XL"],
      date: 1716635445448,
      bestseller: false
  },
  {
      _id: "aaaaw",
      name: "Boy Round Neck Pure Cotton T-shirt",
      description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
      price: 180,
      image: ["p_img23.png"],
      category: "Kids",
      subCategory: "Topwear",
      sizes: ["S", "M", "L", "XL"],
      date: 1716636545448,
      bestseller: false
  },
  {
      _id: "aaaax",
      name: "Boy Round Neck Pure Cotton T-shirt",
      description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
      price: 210,
      image: ["p_img24.png"],
      category: "Kids",
      subCategory: "Topwear",
      sizes: ["S", "M", "L", "XL"],
      date: 1716637645448,
      bestseller: false
  },
  {
      _id: "aaaay",
      name: "Girls Round Neck Cotton Top",
      description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
      price: 190,
      image: ["p_img25.png"],
      category: "Kids",
      subCategory: "Topwear",
      sizes: ["S", "M", "L", "XL"],
      date: 1716638745448,
      bestseller: false
  },
  {
      _id: "aaaaz",
      name: "Women Zip-Front Relaxed Fit Jacket",
      description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
      price: 220,
      image: ["p_img26.png"],
      category: "Women",
      subCategory: "Winterwear",
      sizes: ["S", "M", "L", "XL"],
      date: 1716639845448,
      bestseller: false
  },
  {
      _id: "aaaba",
      name: "Girls Round Neck Cotton Top",
      description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
      price: 200,
      image: ["p_img27.png"],
      category: "Kids",
      subCategory: "Topwear",
      sizes: ["S", "M", "L", "XL"],
      date: 1716640945448,
      bestseller: false
  },
  {
      _id: "aaabb",
      name: "Men Slim Fit Relaxed Denim Jacket",
      description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
      price: 230,
      image: ["p_img28.png"],
      category: "Men",
      subCategory: "Winterwear",
      sizes: ["S", "M", "L", "XL"],
      date: 1716642045448,
      bestseller: false
  },
  {
      _id: "aaabc",
      name: "Women Round Neck Cotton Top",
      description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
      price: 210,
      image: ["p_img29.png"],
      category: "Women",
      subCategory: "Topwear",
      sizes: ["S", "M", "L", "XL"],
      date: 1716643145448,
      bestseller: false
  },
  {
      _id: "aaabd",
      name: "Girls Round Neck Cotton Top",
      description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
      price: 240,
      image: ["p_img30.png"],
      category: "Kids",
      subCategory: "Topwear",
      sizes: ["S", "M", "L", "XL"],
      date: 1716644245448,
      bestseller: false
  },
  {
      _id: "aaabe",
      name: "Men Round Neck Pure Cotton T-shirt",
      description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
      price: 220,
      image: ["p_img31.png"],
      category: "Men",
      subCategory: "Topwear",
      sizes: ["S", "M", "L", "XL"],
      date: 1716645345448,
      bestseller: false
  },
  {
      _id: "aaabf",
      name: "Men Round Neck Pure Cotton T-shirt",
      description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
      price: 250,
      image: ["p_img32.png"],
      category: "Men",
      subCategory: "Topwear",
      sizes: ["S", "M", "L", "XL"],
      date: 1716646445448,
      bestseller: false
  },
  {
      _id: "aaabg",
      name: "Girls Round Neck Cotton Top",
      description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
      price: 230,
      image: ["p_img33.png"],
      category: "Kids",
      subCategory: "Topwear",
      sizes: ["S", "M", "L", "XL"],
      date: 1716647545448,
      bestseller: false
  },
  {
      _id: "aaabh",
      name: "Women Round Neck Cotton Top",
      description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
      price: 260,
      image: ["p_img34.png"],
      category: "Women",
      subCategory: "Topwear",
      sizes: ["S", "M", "L", "XL"],
      date: 1716648645448,
      bestseller: false
  },
  {
      _id: "aaabi",
      name: "Women Zip-Front Relaxed Fit Jacket",
      description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
      price: 240,
      image: ["p_img35.png"],
      category: "Women",
      subCategory: "Winterwear",
      sizes: ["S", "M", "L", "XL"],
      date: 1716649745448,
      bestseller: false
  },
  {
      _id: "aaabj",
      name: "Women Zip-Front Relaxed Fit Jacket",
      description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
      price: 270,
      image: ["p_img36.png"],
      category: "Women",
      subCategory: "Winterwear",
      sizes: ["S", "M", "L", "XL"],
      date: 1716650845448,
      bestseller: false
  },
  {
      _id: "aaabk",
      name: "Women Round Neck Cotton Top",
      description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
      price: 250,
      image: ["p_img37.png"],
      category: "Women",
      subCategory: "Topwear",
      sizes: ["S", "M", "L", "XL"],
      date: 1716651945448,
      bestseller: false
  },
  {
      _id: "aaabl",
      name: "Men Round Neck Pure Cotton T-shirt",
      description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
      price: 280,
      image: ["p_img38.png"],
      category: "Men",
      subCategory: "Topwear",
      sizes: ["S", "M", "L", "XL"],
      date: 1716653045448,
      bestseller: false
  },
  {
      _id: "aaabm",
      name: "Men Printed Plain Cotton Shirt",
      description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
      price: 260,
      image: ["p_img39.png"],
      category: "Men",
      subCategory: "Topwear",
      sizes: ["S", "M", "L", "XL"],
      date: 1716654145448,
      bestseller: false
  },
  {
      _id: "aaabn",
      name: "Men Slim Fit Relaxed Denim Jacket",
      description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
      price: 290,
      image: ["p_img40.png"],
      category: "Men",
      subCategory: "Winterwear",
      sizes: ["S", "M", "L", "XL"],
      date: 1716655245448,
      bestseller: false
  },
  {
      _id: "aaabo",
      name: "Men Round Neck Pure Cotton T-shirt",
      description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
      price: 270,
      image: ["p_img41.png"],
      category: "Men",
      subCategory: "Topwear",
      sizes: ["S", "M", "L", "XL"],
      date: 1716656345448,
      bestseller: false
  },
  {
      _id: "aaabp",
      name: "Boy Round Neck Pure Cotton T-shirt",
      description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
      price: 300,
      image: ["p_img42.png"],
      category: "Kids",
      subCategory: "Topwear",
      sizes: ["S", "M", "L", "XL"],
      date: 1716657445448,
      bestseller: false
  },
  {
      _id: "aaabq",
      name: "Kid Tapered Slim Fit Trouser",
      description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
      price: 280,
      image: ["p_img43.png"],
      category: "Kids",
      subCategory: "Bottomwear",
      sizes: ["S", "M", "L", "XL"],
      date: 1716658545448,
      bestseller: false
  },
  {
      _id: "aaabr",
      name: "Women Zip-Front Relaxed Fit Jacket",
      description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
      price: 310,
      image: ["p_img44.png"],
      category: "Women",
      subCategory: "Winterwear",
      sizes: ["S", "M", "L", "XL"],
      date: 1716659645448,
      bestseller: false
  },
  {
      _id: "aaabs",
      name: "Men Slim Fit Relaxed Denim Jacket",
      description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
      price: 290,
      image: ["p_img45.png"],
      category: "Men",
      subCategory: "Winterwear",
      sizes: ["S", "M", "L", "XL"],
      date: 1716660745448,
      bestseller: false
  },
  {
      _id: "aaabt",
      name: "Men Slim Fit Relaxed Denim Jacket",
      description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
      price: 320,
      image: ["p_img46.png"],
      category: "Men",
      subCategory: "Winterwear",
      sizes: ["S", "M", "L", "XL"],
      date: 1716661845448,
      bestseller: false
  },
  {
      _id: "aaabu",
      name: "Kid Tapered Slim Fit Trouser",
      description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
      price: 300,
      image: ["p_img47.png"],
      category: "Kids",
      subCategory: "Bottomwear",
      sizes: ["S", "M", "L", "XL"],
      date: 1716662945448,
      bestseller: false
  },
  {
      _id: "aaabv",
      name: "Men Slim Fit Relaxed Denim Jacket",
      description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
      price: 330,
      image: ["p_img48.png"],
      category: "Men",
      subCategory: "Winterwear",
      sizes: ["S", "M", "L", "XL"],
      date: 1716664045448,
      bestseller: false
  },
  {
      _id: "aaabw",
      name: "Kid Tapered Slim Fit Trouser",
      description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
      price: 310,
      image: ["p_img49.png"],
      category: "Kids",
      subCategory: "Bottomwear",
      sizes: ["S", "M", "L", "XL"],
      date: 1716665145448,
      bestseller: false
  },
  {
      _id: "aaabx",
      name: "Kid Tapered Slim Fit Trouser",
      description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
      price: 340,
      image: ["p_img50.png"],
      category: "Kids",
      subCategory: "Bottomwear",
      sizes: ["S", "M", "L", "XL"],
      date: 1716666245448, 
      bestseller: false
  },
  {
      _id: "aaaby",
      name: "Women Zip-Front Relaxed Fit Jacket",
      description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
      price: 320,
      image: ["p_img51.png"],
      category: "Women",
      subCategory: "Winterwear",
      sizes: ["S", "M", "L", "XL"],
      date: 1716667345448,
      bestseller: false
  },
  {
      _id: "aaabz",
      name: "Men Slim Fit Relaxed Denim Jacket",
      description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
      price: 350,
      image: ["p_img52.png"],
      category: "Men",
      subCategory: "Winterwear",
      sizes: ["S", "M", "L", "XL"],
      date: 1716668445448,
      bestseller: false
  }
];

async function seedDatabase() {
  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(`${process.env.MONGODB_URI}/e-commerce`);
    console.log("Connected successfully!");

    console.log("Clearing existing products in database...");
    await productModel.deleteMany({});
    console.log("Cleared database!");

    console.log("Wiping all existing images from Cloudinary (this might take a moment)...");
    await cloudinary.api.delete_all_resources({ resource_type: 'image' });
    console.log("Cloudinary wiped clean!");

    console.log(`Starting to seed ${productsData.length} products... This may take a few minutes as it uploads images to Cloudinary.`);
    
    for (const item of productsData) {
      console.log(`Processing: ${item.name}`);
      const uploadedImages = [];
      
      for (const imgFile of item.image) {
        const imagePath = path.resolve(__dirname, "../../frontend/src/assets", imgFile);
        if (fs.existsSync(imagePath)) {
          console.log(`Uploading ${imgFile}...`);
          const result = await cloudinary.uploader.upload(imagePath, { resource_type: "image" });
          uploadedImages.push(result.secure_url);
        } else {
          console.error(`Image not found at path: ${imagePath}`);
        }
      }

      const newProduct = new productModel({
        name: item.name,
        description: item.description,
        price: item.price,
        image: uploadedImages,
        category: item.category,
        subCategory: item.subCategory,
        sizes: item.sizes,
        bestseller: item.bestseller,
        date: item.date
      });

      await newProduct.save();
      console.log(`Saved: ${item.name}`);
    }

    console.log("Products seeding complete!");

    console.log("Clearing existing users and orders...");
    await userModel.deleteMany({});
    await orderModel.deleteMany({});
    console.log("Cleared database!");

    console.log("Creating default dummy users...");
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash("password123", salt);
    const hashedPasswordAdmin = await bcrypt.hash("12345678", salt);

    const user1 = new userModel({
      name: "Admin User",
      email: "admin@forever.com",
      password: hashedPasswordAdmin,
      cartData: {},
    });

    const user2 = new userModel({
      name: "Jane Smith",
      email: "jane@example.com",
      password: hashedPassword,
      cartData: {},
    });

    await user1.save();
    await user2.save();
    console.log("Created 2 dummy users (admin@forever.com [pw: 12345678] and jane@example.com [pw: password123]).");

    console.log("Creating default dummy orders...");
    const products = await productModel.find().limit(2);
    
    if (products.length >= 2) {
      const order1 = new orderModel({
        userId: user1._id.toString(),
        items: [
          {
            _id: products[0]._id.toString(),
            name: products[0].name,
            price: products[0].price,
            quantity: 1,
            size: "M",
            image: products[0].image
          }
        ],
        amount: products[0].price + 10,
        address: {
          firstName: "Admin",
          lastName: "User",
          email: "admin@forever.com",
          street: "123 Main St",
          city: "New York",
          state: "NY",
          zipcode: "10001",
          country: "USA",
          phone: "1234567890"
        },
        status: "Order Placed",
        paymentMethod: "COD",
        payment: false,
        date: Date.now()
      });

      const order2 = new orderModel({
        userId: user2._id.toString(),
        items: [
          {
            _id: products[1]._id.toString(),
            name: products[1].name,
            price: products[1].price,
            quantity: 2,
            size: "L",
            image: products[1].image
          }
        ],
        amount: (products[1].price * 2) + 10,
        address: {
          firstName: "Jane",
          lastName: "Smith",
          email: "jane@example.com",
          street: "456 Market St",
          city: "San Francisco",
          state: "CA",
          zipcode: "94103",
          country: "USA",
          phone: "0987654321"
        },
        status: "Shipped",
        paymentMethod: "Stripe",
        payment: true,
        date: Date.now() - 86400000 
      });

      await order1.save();
      await order2.save();
      console.log("Created 2 dummy orders.");
    }

    console.log("✅ Full Database Reset Complete!");
    process.exit(0);
  } catch (error) {
    console.error("Error resetting database:", error);
    process.exit(1);
  }
}

seedDatabase();
