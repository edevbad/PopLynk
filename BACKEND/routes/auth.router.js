import express from 'express';
import { RegisterUser,LoginUser,authorizeUser } from '../controller/auth.js';

const authRouter = express.Router();

authRouter.get('/authorize',authorizeUser)
authRouter.post('/register',RegisterUser);
authRouter.post('/login',LoginUser);
authRouter.post('/logout',(req,res)=>{
    res.clearCookie("accessToken",{
    httpOnly: true,   // Cannot be accessed via JS
    secure: true,    // Set to true in production with HTTPS
    sameSite: "none",
    });
    res.status(200).json({ message: "Logged out successfully" });
});




export default authRouter;
