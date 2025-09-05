// Import required modules
import express from "express";
import { Connect } from "./config/Db.js"; // DB connection function
import { route } from "./routes/teacher.exam.js"; // teacher routes
import cors from "cors";
import path from "path";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();
const app = express();

// ✅ Enable CORS so frontend can make requests (useful during development)
app.use(cors({
  origin: ["https://small-register.vercel.app"], // frontend domain
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

// ✅ Parse incoming JSON requests
app.use(express.json());

// ✅ Mount teacher routes at root
app.use("/", route);

// ✅ Serve frontend production build when in production mode
const __dirname = path.resolve();
if (process.env.NODE_ENV === "production") {
  // Serve static files from React build folder
  app.use(express.static(path.join(__dirname, "frontend", "dist")));

  // For all routes, send index.html (React routing)
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}

// ✅ Connect to MongoDB Atlas and start server on port 3002
async function startServer() {
  await Connect(); // Connect to MongoDB Atlas
  app.listen(process.env.PORT || 3002, () => {
    console.log(
      `Server and frontend running at http://localhost:${
        process.env.PORT || 3002
      }`
    );
  });
}

startServer();
