import { promises as fs } from 'fs';
import productos from './products.js';

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
    async deleteproductfromcart(id, prodId){
        await this.leerCart();
        const carritoEncontrado = this.cart.find((carrito)=> carrito.id === id);
        if (!carritoEncontrado){
            throw new Error('El carrito no existe');
        }
        
        const productoEnCarrito = carritoEncontrado.products.find((product)=> product.id === prodId);
        if (!productoEnCarrito){
            throw new Error ('el producto no pertenece al carrito');
        }
        let message
        if (productoEnCarrito.quantity > 1){
            productoEnCarrito.quantity--;
            message = 'Se elimino uno de la cantidad total de este producto'
        }else{
            carritoEncontrado.products = carritoEncontrado.products.filter((product)=> product.id !== prodId);
            message = 'Producto eliminado del carrito'
        }
        await fs.writeFile(this.cartFile, JSON.stringify(this.cart, null, 2));
        return { message }
    }

}

export default Cart;