const fs = require('fs').promises;
const productos = require('./products.js');

class Cart{
    constructor(){
        this.cartFile='./cart.json';
        this.cart = [];
        this.leerCart();
        this.productos = new productos();
    }

    async leerCart (){
        try{
            const cart = await fs.readFile(this.cartFile, 'utf8');
            this.cart = JSON.parse(cart);
        } catch (error){
            if (error.code === 'ENOENT'){
                this.cart = [];
            } else {
                throw error;
            }
        }
    }

    async createCart(){
        try {
            await this.leerCart();
            const idCarrito = this.cart.length + 1;
            const carrito = { id: idCarrito, products: [] };
            this.cart.push(carrito);
            await fs.writeFile(this.cartFile, JSON.stringify(this.cart, null, 2));
            console.log('Carrito creado');
        } catch (error) {
            console.log('Error al crear carrito', error);
        }
    }

    async getCarts(limite){
        try{
            if (limite == null){
                return this.cart;
            }else{
                return this.cart.slice(0, limite);
            }
        }catch(error){
            console.error("Error al consultar carritos", error);
            return [];
        }
    }

    async getCartbyId(id){
        try{
            const cartEncontrado = this.cart.find((carrito) => carrito.id === id);
            if (!cartEncontrado){
                console.log('No se encontro el carrito');
                return;
            }else{
                return cartEncontrado;
            }
        }catch(error){
            console.error("Error al consultar carrito", error);
            return [];
        }
    }

    async addProductToCart(id, prodId) {
        try {
            await this.leerCart();
            await this.productos.leerProductos();
            const productoEncontrado = await this.productos.getProductById(prodId);
            if (productoEncontrado===undefined) {
                throw new Error('Producto inexistente');
            } else {
                const carritoEncontrado = this.cart.find((carrito) => carrito.id == id);
                if (!carritoEncontrado) {
                    throw new Error('Carrito inexistente');
                }
                const productoEnCarrito = carritoEncontrado.products.find((product) => product.id == prodId);
                if (!productoEnCarrito) {
                    carritoEncontrado.products.push({ id: prodId, quantity: 1 });
                }else{
                    productoEnCarrito.quantity++;
                }
            }
            await fs.writeFile(this.cartFile, JSON.stringify(this.cart, null, 2));
            console.log('Producto agregado al carrito');
            return productoEncontrado;
        }catch(error){
            console.log('Error al agregar producto al carrito', error);
        }
    }

}

module.exports = Cart;