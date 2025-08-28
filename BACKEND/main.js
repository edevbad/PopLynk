import express from "express";
import router from "./routes/router.js";
import cors from "cors";
import { connectToMongoDB } from "./connect.js";
import authRouter from "./routes/auth.router.js";
import cookieParser from "cookie-parser";

import dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
connectToMongoDB(process.env.MONGO_URI).then(() => {
  console.log("MongoDB Connected");
});
app.use(cookieParser());

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

app.use(express.json());

app.get("/health", (req, res) => {
    res.status(200).send("OK");
});
app.use("/", router);
app.use("/auth", authRouter);

app.listen(PORT, () =>
  console.log(`App is listening on http://localhost:${process.env.PORT}`)
);
