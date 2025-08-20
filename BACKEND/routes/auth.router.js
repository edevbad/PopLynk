import express from 'express';
import { RegisterUser,LoginUser } from '../controller/auth.js';
import jwt from "jsonwebtoken";

const authRouter = express.Router();

authRouter.get('/authorize',(req,res)=>{
    const token = req.cookies.accessToken;    
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);    
        req.user = decoded.id;
     res.status(200).json({authenticated : true})
      } catch (err) {        
        res.status(200).json({authenticated : false})
      }
})
authRouter.post('/register',RegisterUser);
authRouter.post('/login',LoginUser);
authRouter.post('/logout',(req,res)=>{
    res.clearCookie("accessToken");
    res.status(200).json({ message: "Logged out successfully" });
});




export default authRouter;