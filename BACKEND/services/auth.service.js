import { USER } from "../models/user.model.js";
import jwt, { decode } from 'jsonwebtoken'
import bcrypt from 'bcrypt';



const createUser = async(username,email,password)=>{
const exist = await USER.findOne(
    { email }
  ) || await USER.findOne(
    { username: username }
  )
if(exist) return null;

 // hash the password
  const saltRounds = 10; // you can adjust cost factor
  const hashedPassword = await bcrypt.hash(password, saltRounds);

const user = await USER.create({
        email,
        username,
        password : hashedPassword
    });
     return user;
}

const verifyUser = async(email,password)=>{

    const user =   await USER.findOne(
        {
          email : email,
        }
    ).select('+password')
    
       const isMatch =  await bcrypt.compare(password, user.password);   
       if(!isMatch) return null;
        // convert to object and remove password
  const { password: _, ...userWithoutPassword } = user.toObject();
  return userWithoutPassword;  

}

const findUserById = async(id)=>{
    const user = await USER.findOne({_id : id});
    if(!user) return null;
    return user;
}

const signToken = async(id)=>{
    const token = jwt.sign({id}, process.env.JWT_SECRET , {expiresIn : "1h"});
    return token;
    
}

const verifyToken = (token) => {
    try {
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  return decoded; // { id: ..., username: ..., iat: ..., exp: ... }
} catch (err) {
  return null
}
}

export {createUser,verifyUser,signToken,verifyToken,findUserById};