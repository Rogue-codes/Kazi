import express from "express";
import cors from "cors";
import morgan from "morgan";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from 'cookie-parser';
import router from "./routes/authRoutes.js";
import userRouter from "./routes/userRoutes.js";
import { authMiddleware } from "./middleware/AuthMiddleware.js";
import taskRouter from "./routes/taskRoutes.js";

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use(cookieParser());

dotenv.config();

const Port = process.env.PORT || 5500;

app.use("/api/v1/kazi/", router);
app.use("/api/v1/kazi/", authMiddleware, userRouter);
app.use("/api/v1/kazi/", authMiddleware, taskRouter);

app.get("/", (req, res) => {
  res.send("Todo App");
});
app.listen(Port, () => {
  console.log(`app running on port: ${Port}`);
});

const URI = process.env.connectionURI;
mongoose
  .connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("mongo DB connection successfull");
  })
  .catch((err) => {
    console.log("an error occured: ", err.message);
  });
