import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email:{
        type : String,
        required : true,
        unique : true,
    },
    username:{
        type : String,
        required : true,
        unique : true,
    },
    password:{
        type : String,
        required : true,
        select : false,  // will not return password field in queries by default
    }
});
const USER = mongoose.model('user',userSchema);

export {USER}