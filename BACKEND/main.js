import express from "express";
import router from './routes/router.js'
import cors from 'cors';
import {connectToMongoDB} from './connect.js'

import dotenv from 'dotenv'
dotenv.config();


const app = express();
const PORT = process.env.PORT;

connectToMongoDB(`${process.env.MONGODB_URL}url_shortner`)
.then(()=>{console.log("MongoDB Connected");
    
})
app.use(cors({
  origin: process.env.FRONTEND_URL, // your frontend URL
  credentials: true                // allow cookies
}));
app.use(express.json());


app.use('/',router);


app.listen(PORT, () => console.log(`App is listening on ${process.env.BACKEND_URL}`))