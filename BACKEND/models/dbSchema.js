import mongoose from "mongoose";

const urlSchema = new mongoose.Schema({
    short_URL:{
        type : String,
        required : true,
        unique : true,
    },
    redirect_URL:{
        type : String,
        required : true,
    },
    visits:{
        type : Number,
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref : "user"
    }
});

const URL = mongoose.model('url',urlSchema);

export  {URL};