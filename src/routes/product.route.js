const express = require('express');
const router = express.Router();
const Product = require('../../utils/products.js');

const products = new Product();

router.get('/products', async (req, res) => {
    const productos = await products.getProducts();
    res.json(productos);
});

router.get('/products/:id', async (req, res) => {
    const { id } = req.params;
    idProd = parseInt(id);
    const product = await products.getProductById(idProd);
    res.json(product);
});

router.post('/products', async (req, res) => {
    const product = req.body;
    await products.addProduct(product);
    res.json({ message: 'Producto agregado' });
});

router.put('/products/:id', async (req, res) => {
    const { id } = req.params;
    const product = req.body;
    idProd = parseInt(id);
    await products.modificarProduct(idProd, product);
    res.json({ message: 'Producto modificado' });
});

router.delete('/products/:id', async (req, res) => {
    const { id } = req.params;
    idProd = parseInt(id);
    await products.eliminarProducto(idProd);
    res.json({ message: 'Producto eliminado' });
});

module.exports = router;