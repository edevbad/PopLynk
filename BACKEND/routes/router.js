import express from 'express';
import {generateNewShortUrl,handleRedirection,getUserUrls,handleDeleteURL} from '../controller/url.js'
import authMiddleware from '../middleWare/auth.middleware.js';
import { URL } from '../models/url.model.js';

const router = express.Router();


router.get("/click-history", authMiddleware, async (req, res) => {
  // Here, req.user contains the logged-in user data
  const history = await URL.find({ user : req.user._id});
  res.json(history);
});
router.post('/create',authMiddleware,generateNewShortUrl);
router.get('/urls',authMiddleware,getUserUrls);
router.delete('/urls/:id',authMiddleware,handleDeleteURL);
router.get('/:id',handleRedirection);

export default router;
