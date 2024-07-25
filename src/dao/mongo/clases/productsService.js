import productsModel from '../models/products.model.js'

// async function getProducts() {
//     return await productsModel.find()
// }


// async function getProductById(productId) {
//     return await productsModel.findById(productId)
// }


// async function createProduct(product) {
//     return await productsModel.create(product)
// }

// async function updateProduct(productId, product) {
//     return await productsModel.updateOne({_id: productId}, product)
// }

// async function deleteProduct(productId) {
//     return await productsModel.deleteOne({_id: productId});
// }


// export default {
//     getProducts,
//     getProductById,
//     createProduct,
//     updateProduct,
//     deleteProduct
// }

export default class Products{
    getProducts = async () => {
        try{
            let productos = await productsModel.find();
            return productos;
        }catch(error){
            console.log(error);
            return null;
        }
    }


    getProductById = async (productId) => {
        try{
            let producto = await productsModel.findById(productId);
            return producto;
        }catch(error){
            console.log(error);
            return null;
        }
    }


    createProduct = async (product) => {
        try{
            let result = await productsModel.create(product);
            return result;
        }catch(error){
            console.log(error);
            return null;
        }
    }


    updateProduct = async (productId, product) => {
        try{
            let result = productsModel.updateOne({_id: productId}, product)
            return result;
        }catch(error){
            console.log(error);
            return null;
        }
    }

    deleteProduct = async (productId) => {
        try{
            let result = productsModel.deleteOne({_id: productId});
            return result;
        }catch(error){
            console.log(error);
            return null;
        }
    }

}