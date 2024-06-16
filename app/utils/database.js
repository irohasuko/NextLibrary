import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_HOST);
  } catch (e) {
    console.log(e);
  }
};

export default connectDB;
