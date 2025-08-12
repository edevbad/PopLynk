import express from "express";
import router from './routes/router.js'
import cors from 'cors';
import {connectToMongoDB} from './connect.js'

import dotenv from 'dotenv'
dotenv.config();


const app = express();
const PORT = process.env.PORT || 3000;

connectToMongoDB(process.env.MONGO_URI)
.then(()=>{console.log("MongoDB Connected");
    
})
app.use(cors({
  origin: "https://pop-lynk.vercel.app", // Replace with your Vercel URL
  methods: "GET,POST,PUT,DELETE",
  credentials: true
}));
app.use(express.json());


app.use('/',router);


app.listen(PORT, () => console.log(`App is listening on ${PORT}`))
