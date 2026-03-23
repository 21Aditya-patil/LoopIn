import dotenv from "dotenv";
dotenv.config();  
import { v2 as cloudinary } from "cloudinary";

if (!process.env.CLOUD_NAME || 
    !process.env.CLOUD_API_KEY || 
    !process.env.CLOUD_API_SECRET) {
  throw new Error("Cloudinary environment variables are missing");
}

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME.trim(),
  api_key: process.env.CLOUD_API_KEY.trim(),
  api_secret: process.env.CLOUD_API_SECRET.trim(),
});

console.log("Cloudinary configured successfully");

export default cloudinary;
