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

router.get('/cart/:cid', async(req, res) => {
    const cartId = req.params.cid;
    try {
        const cart = await cartsModel.find({ _id: cartId}).populate("products.product");
        if (!cart) {
            return res.status(404).send({ message: "Carrito no encontrado" });
        }
        console.log(JSON.stringify(cart, null, '\t'))
        res.send({result: "success", payload: cart});
    } catch (error) {
        console.log(error);
    }
});


router.post('/cart', async(req, res) => {
    await cartsModel.create({});
    res.send({result: "success", message: "Carrito creado"});
})

router.post('/cart/:id/product/:pid', async(req, res) => {
    let { id } = req.params;
    let { pid } = req.params;
    try{
        let carrito = await cartsModel.findOne({_id:id});
        let producto = await productsModel.findOne({_id:pid});
        if (!carrito || !producto){
            return res.status(404).send({ message: "Datos inexistentes" });
        }

        if ( await cartsModel.findOne({_id: id , products: {$elemMatch: {_id:pid}}})){

            carrito.products.find(prod => prod._id.toString() === producto._id.toString()).quantity++;

        }else{
            carrito.products.push({product: producto._id.toString(), quantity: 1});
        }
        let prodAgregado = await cartsModel.updateOne({_id:id}, carrito);
        res.send({result: "success", payload: prodAgregado});
    }catch(error){
        console.log(error);
        res.send({message: "No se pudo agregar el producto al carrito"});
    }

})


router.put ('/carts/:cid', async(req, res) => {
    let arregloProductos = req.body;
    let { cid } = req.params;

    try{
        let cart = await cartsModel.findById(cid);
        if (!cart){
            return res.status(404).send({message: "El carrito no existe"});
        }

        cart.products = arregloProductos;

        let cartUpdated = await cartsModel.updateOne({_id: cid}, cart);
        res.send({result: "success", payload: cartUpdated});
    }catch(error){
        console.log(error);
        res.send({message: "Existe un error en los datos brindados. No se pudo modificar el carrito"});
    }    
})


router.put('/carts/:cid/products/:pid', async (req, res) => {

    let { cid } = req.params;
    let { pid } = req.params;
    let { quantity } = req.body;

    try {
        let cart = await cartsModel.findById(cid);
        if (!cart) {
            return res.status(404).send({ message: "Carrito no encontrado" });
        }
        let producto = cart.products.find(prod => prod.product.toString() === pid);
        if (producto === undefined) {
            return res.status(404).send({ message: "Producto no encontrado en el carrito" });
        }
        producto.quantity = quantity;

        let cartUpdated = await cartsModel.updateOne({ _id: cid }, cart);

        res.send({ result: "success", payload: cartUpdated });
    } catch (error) {
        console.log(error);
        res.send({ message: "No se pudo actualizar la cantidad del producto en el carrito" });
    }
});

router.delete('/cart/:id/product/:pid', async(req, res) => {
    let { id } = req.params;
    let { pid } = req.params;
    let prodAgregado;
    try{
        let carrito = await cartsModel.findOne({_id: id});
        let producto = await productsModel.findOne({_id: pid});
        if (!carrito || !producto){
            return res.status(404).send({ message: "Datos inexistentes" });
        }
        if (carrito.products.find(prod => prod.product.toString() === producto._id.toString()).quantity > 1){
            carrito.products.find(prod => prod.product.toString() === producto._id.toString()).quantity--;
            prodAgregado = await cartsModel.updateOne({_id: id}, carrito);
        }else{
            prodAgregado = await cartsModel.updateOne(
                { _id: id },
                { $pull: { products: { product: pid } } }
              );
        }
        
        res.send({result: "success", payload: prodAgregado});
    }catch(error){
        console.log(error);
        res.send({message: "No se pudo eliminar el producto del carrito"});
    }
})



router.delete('/cart/:id', async(req, res) => {
    let { id } = req.params;
    try{
        let carrito = await cartsModel.findOne({_id: id});
        if (!carrito){
            return res.status(404).send({ message: "Carrito no encontrado" });
        }
        carrito.products = [];
        let prodEliminado = await cartsModel.updateOne({_id: id}, carrito);

        res.send({result: "success", payload: prodEliminado});
    }catch(error){
        console.log(error);
        res.send({message: "No se pudo eliminar el producto del carrito"});
    }
})


export default router;

