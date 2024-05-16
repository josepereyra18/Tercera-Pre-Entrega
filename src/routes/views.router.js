import express from 'express';
import productsModel from '../../dao/models/products.model.js';

const router = express.Router();

router.get('/', async(req, res) => {
    
    const productos = await productsModel.find();
    res.render('home', {productos});
});

export default router;