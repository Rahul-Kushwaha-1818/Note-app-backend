import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRouter from "./routes/auth.route.js";
import noteRouter from "./routes/note.route.js";

dotenv.config();
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: ["http://localhost:5173"], credentials: true }));

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log("Server is running on port 3000");
});

//import Routes
app.use("/api/auth", authRouter);
app.use("/api/note", noteRouter);

// The errorHandler give always at the last of the code

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal server error ";

  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
