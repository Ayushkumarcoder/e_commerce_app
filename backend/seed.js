// backend/src/seed.js

import mongoose from 'mongoose';
import {productModel} from './models/productModel.js';
require('dotenv').config();

// Sample product data
const products = [
  {
    name: "Classic White T-Shirt",
    description: "A comfortable white t-shirt made from 100% cotton",
    price: 19.99,
    category: "Clothing",
    image: ["https://example.com/images/white-tshirt.jpg"],
    stock: 100
  },
  {
    name: "Denim Jeans",
    description: "Classic blue denim jeans with a straight fit",
    price: 49.99,
    category: "Clothing",
    image: ["https://example.com/images/denim-jeans.jpg"],
    stock: 50
  },
  {
    name: "Running Shoes",
    description: "Lightweight running shoes with cushioned soles",
    price: 79.99,
    category: "Footwear",
    image: ["https://example.com/images/running-shoes.jpg"],
    stock: 30
  },
  {
    name: "Wireless Headphones",
    description: "Noise-cancelling wireless headphones with 20-hour battery life",
    price: 129.99,
    category: "Electronics",
    image: ["https://example.com/images/wireless-headphones.jpg"],
    stock: 25
  },
  {
    name: "Smartphone Case",
    description: "Durable protective case for smartphones",
    price: 14.99,
    category: "Accessories",
    image: ["https://example.com/images/smartphone-case.jpg"],
    stock: 200
  }
  // Add more products as needed
];

const seedProducts = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    
    console.log('MongoDB connected for seeding...');
    
    // Delete existing products (optional - remove this if you want to keep existing products)
    await Product.deleteMany({});
    console.log('Existing products cleared from database');
    
    // Insert new products
    const createdProducts = await Product.insertMany(products);
    console.log(`${createdProducts.length} products added to database`);
    
    console.log('Seed data import complete!');
    mongoose.connection.close();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

// Run the seed function
seedProducts();
