import express from 'express';
const router = express.Router();
import Cart from '../../../dao/utils/cart.js';


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

router.delete("/cart/:id/product/:pid", async (req, res) => {
    try{
        const { id } = req.params;
        const { pid } = req.params;
        cartId = parseInt(id);
        productId = parseInt(pid);
        const resultado = await Carts.deleteproductfromcart(cartId, productId);
        res.json(resultado);
    }catch(error){
        res.status(400).send({ error: error.message });
    }
});

export default router;
