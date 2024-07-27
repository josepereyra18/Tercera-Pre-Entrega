import express from 'express';
import { isUser } from '../../middlewares/isUser.js';

const router = express.Router();

router.get('/', isUser ,(req, res) => {
    res.render('chat', {})
})

export default router;