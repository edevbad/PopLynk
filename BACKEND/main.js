import express from "express";
import router from './routes/router.js'
import cors from 'cors';
import {connectToMongoDB} from './connect.js'
import authRouter from "./routes/auth.router.js";
import cookieParser from 'cookie-parser';

import dotenv from 'dotenv'
dotenv.config();


const app = express();

connectToMongoDB(process.env.MONGO_URI)
.then(()=>{console.log("MongoDB Connected");

})
app.use(cookieParser());

app.use(cors({
  origin: "https://poplynk.onrender.com",
  credentials: true
}));

app.use(express.json());


app.use('/',router);
app.use('/auth',authRouter);



app.listen(process.env.PORT, () => console.log(`App is listening on http://localhost:${process.env.PORT}`))
