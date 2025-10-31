import mongoose from "mongoose";
import cloudinary from "cloudinary";
import productModel from "./models/productModel.js"; // Adjust the path to your product model
import { products } from "./assets/assets.js"; // Adjust the path to your assets.js file
import path from "path";
import fs from "fs";

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME, // Replace with your Cloudinary cloud name
  api_key: process.env.CLOUDINARY_API_KEY , // Replace with your Cloudinary API key
  api_secret: process.env.CLOUDINARY_SECRET_KEY, // Replace with your Cloudinary API secret
});

// MongoDB connection URI
const MONGODB_URI = process.env.MONGODB_URI; // Replace with your MongoDB connection string

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
};

// // Seed products into the database
// const seedProducts = async () => {
//   try {
//     // Connect to the database
//     await connectDB();

//     // Clear existing products (optional)
//     await productModel.deleteMany();
//     console.log("Existing products deleted");

//     // Upload images to Cloudinary and add products to the database
//     for (const product of products) {
//       const { name, description, price, category, subCategory, sizes, bestseller, images } = product;

//       // Upload images to Cloudinary
//       const imagesUrl = await Promise.all(
//         images.map(async (imagePath) => {
//           const result = await cloudinary.uploader.upload(imagePath, { resource_type: "image" });
//           return result.secure_url;
//         })
//       );

//       // Create product data
//       const productData = {
//         name,
//         description,
//         price: Number(price),
//         image: imagesUrl,
//         category,
//         subCategory,
//         sizes,
//         bestseller: bestseller === true,
//         date: Date.now(),
//       };

//       // Save product to the database
//       await productModel.create(productData);
//       console.log(`Product "${name}" added to the database`);
//     }

//     // Close the database connection
//     mongoose.connection.close();
//     console.log("Database connection closed");
//   } catch (error) {
//     console.error("Error seeding products:", error);
//     process.exit(1);
//   }
// };



const seedProducts = async () => {
  try {
    // Connect to the database
    await connectDB();

    // Clear existing products (optional)
    await productModel.deleteMany();
    console.log("Existing products deleted");

    // Upload images to Cloudinary and add products to the database
    for (const product of products) {
      const { name, description, price, category, subCategory, sizes, bestseller, images } = product;

      // Resolve image paths and upload to Cloudinary
      const imagesUrl = await Promise.all(
        images.map(async (imagePath) => {
          const resolvedPath = path.resolve(imagePath); // Resolve the file path
          const result = await cloudinary.uploader.upload(resolvedPath, { resource_type: "image" });
          return result.secure_url;
        })
      );

      // Create product data
      const productData = {
        name,
        description,
        price: Number(price),
        image: imagesUrl,
        category,
        subCategory,
        sizes,
        bestseller: bestseller === true,
        date: Date.now(),
      };

      // Save product to the database
      await productModel.create(productData);
      console.log(`Product "${name}" added to the database`);
    }

    // Close the database connection
    mongoose.connection.close();
    console.log("Database connection closed");
  } catch (error) {
    console.error("Error seeding products:", error);
    process.exit(1);
  }
};

// Run the seed script
seedProducts();