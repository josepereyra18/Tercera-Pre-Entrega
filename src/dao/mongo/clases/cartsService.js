import cartsModel from  '../models/cart.model.js'

// async function getCarts() {
//     return await cartsModel.find();
// }

// async function getCartbyId(cartId) {
//     return await cartsModel.find({ _id: cartId}).populate("products.product");
// }

// async function createCart() {
//     return await cartsModel.create({});
// }

// async function getOneCart(cartId) {
//     return await cartsModel.findOne({_id: cartId});
// }

// async function findProductInCart(id, pid) {
//     return await cartsModel.findOne({_id: id , products: {$elemMatch: {product:pid}}})
// }

// async function updateCart(cartId, cart){
//         return await cartsModel.updateOne({_id:cartId}, cart);
// }


// async function delateproductfromCart(cartId, productId){
//     return await cartsModel.updateOne({ _id: cartId },{ $pull: { products: { product: productId } } });
// }

// async function findCartById(cartId){
//     return await await cartsModel.findById(cartId)
// }

// async function updateMany(prodid){
//     return await cartsModel.updateMany({ $pull: { products: {product : prodid} } });
// }


// export default {
//     createCart,
//     getCarts,
//     getCartbyId,
//     getOneCart,
//     findProductInCart,
//     updateCart,
//     findCartById,
//     delateproductfromCart, 
//     updateMany
// }



export default class Carts{
    createCart = async () => {
        try{
            let result = await cartsModel.create({});
            return result
        }catch(error){
            console.log(error);
            return null
        }
    }

    getCarts = async () => {
        try{
            let result = await cartsModel.find();
            return result;
        }catch(error){
            console.log(error);
            return null;
        }
    }

    getCartbyId = async (cartId) => {
        try{
            let result = await cartsModel.find({ _id: cartId}).populate("products.product")
            return result;
        }catch(error){
            console.log(error);
            return null
        }
    }

    getOneCart = async (cartId) => {
        try{
            let result = await cartsModel.findOne({_id: cartId});
            return result;
        }catch(error){
            console.log(error);
            return null;
        }
    }

    findProductInCart = async (id, pid) => {
        try{
            let result = await cartsModel.findOne({_id: id , products: {$elemMatch: {product:pid}}});
            return result;
        }catch(error){
            console.log(error);
            return null;
        }
    }

    updateCart = async (cartId, cart) => {
        try{
            let result = await cartsModel.updateOne({_id:cartId}, cart);
            return result
        }catch(error){
            console.log(error);
            return null
        }
    }

    delateproductfromCart = async (cartId, productId) => {
        try{
            let result = await cartsModel.updateOne({ _id: cartId },{ $pull: { products: { product: productId } } });
            return result
        }catch(error){
            console.log(error);
            return null
        }
    }
}