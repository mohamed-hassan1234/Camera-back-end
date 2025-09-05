import mongoose from "mongoose";

// ✅ Function to connect to MongoDB Atlas
export async function Connect() {
  try {
    await mongoose.connect(
      process.env.MONGO_URI,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log("Connected to MongoDB Atlas Successfully");
  } catch (error) {
    console.error("MongoDB connection failed:", error);
  }
}
