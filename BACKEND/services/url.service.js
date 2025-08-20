import { nanoid } from "nanoid";
import { URL } from "../models/url.model.js";

const createShortUrlWithUser = async (body, user,res) => {
        let shortid
        if (body.slug) {
            const exist = await URL.findOne({short_URL:body.slug})
            if (exist)
                return res.status(400).json({ error: "custom url already exists" });
            else
                shortid = body.slug;
        }
        else
            shortid = nanoid(8);

        await URL.create({
            short_URL: shortid,
            redirect_URL: body.url,
            visits: 0,
            user: user
        });

        return shortid
    
}
const createShortUrlWithOutUser = async (body) => {
    if (!body.url) return res.status(400).json({ error: "Url is required" });
    const shortid = nanoid(8);
    await URL.create({
        short_URL: shortid,
        redirect_URL: body.url,
        visits: 0,
    });

    return shortid
}

export { createShortUrlWithOutUser, createShortUrlWithUser }
