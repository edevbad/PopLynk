
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
    createdAt:{
        type : Date,
        default : Date.now()
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref : "user"
    },
    expiresAt:{
        type : Date,
        default : null
    }
});

// TTL index → MongoDB deletes document automatically when expiresAt passes
urlSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

const URL = mongoose.model('url',urlSchema);

export  {URL};