import {URL} from '../models/url.model.js';
import {createShortUrlWithOutUser,createShortUrlWithUser} from '../services/url.service.js'


async function generateNewShortUrl(req, res) {
    const body = req.body;
    if (!body.url) return res.status(400).json({ error: "Url is required" });
    let shortid;    
    if(req.user){
      shortid =  await  createShortUrlWithUser(body,req.user,res)
    }
    else{
       shortid=  await createShortUrlWithOutUser(req.body)
    }

    return res.json({ id : `${process.env.BASE_URL}/${shortid}`})
}
async function handleRedirection(req,res) {
     const shortID = req.params.id;
    const entry = await URL.findOneAndUpdate({
           short_URL : shortID
         },
            {
                $inc: { visits: 1 }
            }
        );
        res.redirect(entry.redirect_URL);
}

async function getUserUrls(req,res) {
  const {user} = req;
 const urls = await  URL.find({user}) 
 res.status(200).json({urls})
}

async function handleDeleteURL(req,res){
 const id =  req.params.id;
 const resss = await URL.deleteOne({_id:id})
 res.status(200).send("Deleted Successfully!");
}

export {generateNewShortUrl,handleRedirection,getUserUrls,handleDeleteURL};
