import {URL} from '../models/dbSchema.js';
import {createShortUrlWithOutUser} from '../services/url.service.js'


async function generateNewShortUrl(req, res) {
    const body = req.body;
    if (!body.url) return res.status(400).json({ error: "Url is required" });
      const shortid=  await createShortUrlWithOutUser(body)
    return res.json({ id : `${process.env.BACKEND_URL}/${shortid}`})
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

export {generateNewShortUrl,handleRedirection};