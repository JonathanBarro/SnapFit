const mongoose = require("mongoose");
require('dotenv').config();  // Ensures that environment variables are loaded

const uri = process.env.MONGODB_URI;

if (!uri) {
  console.error("No MongoDB connection URI defined in .env");
  process.exit(1); // Stops execution if no URI is defined
}

exports.connectDB = async () => {
  try {
    await mongoose.connect(uri);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB: ", error);
    process.exit(1);
  }
};
