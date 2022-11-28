import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connectDB = (url) => {
  return mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

export default connectDB;
