import mongoose from "mongoose";

const connectDB = async() => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (error) {
    console.error(error);
    throw new Error("MongoDB Connection Failed");
  }
};

export default connectDB;
