import { Router } from "express";
import productsModel from '../../../dao/models/products.model.js';
import cartModel from "../../../dao/models/cart.model.js";

const router = Router();

router.get('/products', async(req, res) => {
    try{
        let productos = await productsModel.find();
        res.send({result: "success", payload: productos});
    } catch (error){
        console.log(error);
    }
});

router.get('/products/:id', async(req, res) => {
    const { id } = req.params;
    try{
        let producto = await productsModel.find({_id: id});
        res.send({result: "success", payload: producto});
    } catch (error){
        console.log(error);
    }
});

router.post('/products', async(req, res) => {
    let { title, description, price, code, stock, status, category } = req.body;
    if (!title || !description || !price || !code || !stock || !status || !category){
        res.send({status: error, message: "Faltan datos"});
    }
    let result = await productsModel.create({title, description, price, code, stock, status, category});
    res.send ({result: "success", payload: result});
})

router.put('/products/:id', async (req, res) => {
    let { id } = req.params;
    let prductModified = req.body;
    if (!prductModified.title || !prductModified.description || !prductModified.price || !prductModified.code || !prductModified.stock || !prductModified.status || !prductModified.category){
        res.send({status: error, message: "Faltan datos"});
    }

    let result = await productsModel.updateOne({_id: id}, prductModified);
    res.send({result: "success", payload: result});
});

router.delete('/products/:id', async(req, res) => {
    let { id } = req.params;
    await cartModel.updateMany({ products: {_id : id}}, { $pull: { products: {_id : id} } });
    let result = await productsModel.deleteOne({_id: id});
    res.send({result: "success", payload: result});
})

export default router;

