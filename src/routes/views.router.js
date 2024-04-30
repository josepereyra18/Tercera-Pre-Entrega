import express from 'express';
import Products from '../../utils/products.js';

const router = express.Router();

const products = new Products();

router.get('/', async(req, res) => {
    
    const productos = await products.getProducts();
    res.render('home', {productos})
})

export default router;