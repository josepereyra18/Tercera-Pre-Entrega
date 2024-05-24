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
        let cart = await cartsModel.findOne({_id: id});
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
        let carrito = await cartsModel.findOne({_id:id});
        let producto = await productsModel.findOne({_id:pid});

        if ( await cartsModel.findOne({_id: id , products: {$elemMatch: {_id:pid}}})){

            carrito.products.find(prod => prod._id.toString() === producto._id.toString()).quantity++;

        }else{
            carrito.products.push({_id:pid, quantity: 1});
        }
        let prodAgregado = await cartsModel.updateOne({_id:id}, carrito);
        res.send({result: "success", payload: prodAgregado});
    }catch(error){
        console.log(error);
        res.send({message: "No se pudo agregar el producto al carrito"});
    }

})


router.put

router.delete('/cart/:id/product/:pid', async(req, res) => {
    const { id } = req.params;
    const { pid } = req.params;
    let prodAgregado;
    try{
        let carrito = await cartsModel.findOne({_id: id});
        let producto = await productsModel.findOne({_id: pid});
        if (carrito.products.find(prod => prod._id.toString() === producto._id.toString()).quantity > 1){
            carrito.products.find(prod => prod._id.toString() === producto._id.toString()).quantity--;
            prodAgregado = await cartsModel.updateOne({_id: id}, carrito);
            console.log("entro al if");
        }else{
            prodAgregado = await cartsModel.updateOne(
                { _id: id },
                { $pull: { products: { _id: pid } } }
              );
        }
        
        res.send({result: "success", payload: prodAgregado});
    }catch(error){
        console.log(error);
        res.send({message: "No se pudo eliminar el producto del carrito"});
    }
})

router.delete('/cart/:id', async(req, res) => {
    const { id } = req.params;
    try{
        let carrito = await cartsModel.findOne({_id: id});
        carrito.products = [];
        let prodEliminado = await cartsModel.updateOne({_id: id}, carrito);

        res.send({result: "success", payload: prodEliminado});
    }catch(error){
        console.log(error);
        res.send({message: "No se pudo eliminar el producto del carrito"});
    }
})


export default router;

