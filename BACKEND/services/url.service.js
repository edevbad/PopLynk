import { nanoid } from "nanoid";
import { URL } from "../models/dbSchema.js";

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

export { createShortUrlWithOutUser }
