import mongoose from "mongoose";

export const connectDb = async (dbUrl: string) => {
  try {
    await mongoose.connect(dbUrl);
    console.log("Database connected successfully ...");
  } catch (error) {
    console.log(error);
    console.log("Database not connected !!");
  }
};
