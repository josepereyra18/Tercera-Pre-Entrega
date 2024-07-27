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
    constructor(){

    }
    getProducts = async () => {
            let productos = await productsModel.find();
            return productos;
    }


    getProductById = async (productId) => {
            let producto = await productsModel.findById(productId);
            return producto;
    }


    createProduct = async (product) => {
            let result = await productsModel.create(product);
            return result;
    }


    updateProduct = async (productId, product) => {
            let result = productsModel.updateOne({_id: productId}, product)
            return result;
    }

    deleteProduct = async (productId) => {
            let result = productsModel.deleteOne({_id: productId});
            return result;
    }

}