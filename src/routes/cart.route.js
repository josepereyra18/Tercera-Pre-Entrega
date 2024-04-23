const express = require('express');
const router = express.Router();
const Cart = require('../../utils/cart');


const Carts = new Cart ();

router.get('/cart', async (req, res) => {
    const carts = await Carts.getCarts();
    res.json(carts);
});

router.get('/cart/:id', async (req, res) => {
    const { id } = req.params;
    const cart = await Carts.getCartbyId(id);
    res.json(cart);
});

router.post('/cart', async (req, res) => {
    await Carts.createCart();
    res.json({ message: 'Carrito creado' });
});

router.post('/cart/:id/product/:pid', async (req, res) => {
    const { id } = req.params;
    const { pid } = req.params;
    cartId = parseInt(id);
    productId = parseInt(pid);
    const prodAgregado = await Carts.addProductToCart(cartId, productId);
    res.json({prodAgregado});
});

module.exports = router;
