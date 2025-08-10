import express from 'express';
import {generateNewShortUrl,handleRedirection} from '../controller/url.js'

const router = express.Router();


router.post('/create',generateNewShortUrl);

router.get('/:id',handleRedirection);

export default router;
