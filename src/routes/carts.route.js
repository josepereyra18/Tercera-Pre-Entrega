import { Router } from "express";
import cartsModel from '../../dao/models/cart.model.js';
import productsModel from '../../dao/models/products.model.js';
const router = Router();

router.get('/cart', async(req, res) => {
    try{
        let carts = await cartsModel.find();
        res.send({result: "success", payload: carts});
    } catch (error){
        console.log(error);
    }
});

router.get('/cart/:id', async(req, res) => {
    const { id } = req.params;
    try{
        let cart = await cartsModel.find({_id: id});
        res.send({result: "success", payload: cart});
    }catch(error){
        console.log(error);
    }
});

router.post('/cart', async(req, res) => {
    await cartsModel.create({});
    res.send({result: "success", message: "Carrito creado"});
})

router.post('/cart/:id/product/:pid', async(req, res) => {
    const { id } = req.params;
    const { pid } = req.params;
    try{
        let carrito = await cartsModel.findOne({_id: id});
        let producto = await productsModel.findOne({_id: pid});
        if (carrito.products.find(prod => prod.productId === producto.productId)){
            carrito.products.find(prod => prod.productId === producto.productId).quantity++;
        }
        else{
            carrito.products.push(producto);
        }
        let prodAgregado = await cartsModel.updateOne({_id: id}, {products: carrito.products});
        res.send({result: "success", payload: prodAgregado});
    }catch(error){
        console.log(error);
    }

})

router.delete('/cart/:id/product/:pid', async(req, res) => {
    const { id } = req.params;
    const { pid } = req.params;
    try{
        let carrito = await cartsModel.findOne({_id: id});
        let producto = await productsModel.findOne({_id: pid});
        carrito.products = carrito.products.filter(prod => prod.productId !== producto.productId);
        let prodEliminado = await cartsModel.updateOne({_id: id}, {products: carrito.products});
        res.send({result: "success", payload: prodEliminado});
    }catch(error){
        console.log(error);
    }
})

export default router;

