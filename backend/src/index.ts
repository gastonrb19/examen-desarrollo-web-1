import "reflect-metadata";
import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import { AppDataSource } from "./config/database";
import { errorHandler } from "./middlewares/errorHandler";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Routes will be registered here
import apiRoutes from "./routes";
app.use("/api", apiRoutes);
// Error Handler Middleware should be last
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

const connectDB = async (retries = 5) => {
  while (retries) {
    try {
      await AppDataSource.initialize();
      console.log("Database connected successfully");
      app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
      });
      break;
    } catch (error) {
      console.log(`Database connection error, retrying... (${retries} left)`);
      retries -= 1;
      await new Promise(res => setTimeout(res, 5000)); // wait 5 seconds
      if (retries === 0) {
        console.error("Failed to connect to database", error);
        process.exit(1);
      }
    }
  }
};

connectDB();
