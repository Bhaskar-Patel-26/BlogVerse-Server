import mongoose from "mongoose";

const ConnectDB = async () => {
  try {
    mongoose.connection.on("connected", () => {
      console.log("MongoDB is connected");
    });

    await mongoose.connect(`${process.env.MONGODB_URI}/blogVerse`);
  } catch (error) {
    console.log(error.message);
  }
};

export default ConnectDB;
