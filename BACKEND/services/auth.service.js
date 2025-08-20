import { USER } from "../models/user.model.js";
import jwt from 'jsonwebtoken'


const createUser = async(body)=>{
const exist = await USER.findOne(
    { email: body.email }
  ) || await USER.findOne(
    { username: body.username }
  )

if(exist) return "user already exists";

await USER.create({
        email:body.email,
        username: body.username,
        password: body.password,
    });
     return "successfully created";
    
}

const verifyUser = async(email,password)=>{
    return  await USER.findOne(
        {
          email : email,
          password:password
        }
    )
}
const signToken = async(id)=>{
    const token = jwt.sign({id}, process.env.JWT_SECRET , {expiresIn : "20m"});
    return token;
    
}

const verifyToken = (token) => {
    try {
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  return decoded; // { id: ..., username: ..., iat: ..., exp: ... }
} catch (err) {
  console.error("Invalid token");
}
}

export {createUser,verifyUser,signToken,verifyToken};