const fs = require('fs').promises;

class Products{
    constructor(){
        this.productsFile='./products.json';
        this.products = [];
        this.leerProductos();
    }

    async leerProductos(){
        try{
            const productos1 = await fs.readFile(this.productsFile, 'utf8');
            this.products = JSON.parse(productos1); 
        } catch (error){
            if (error.code === 'ENOENT'){
                this.products = [];
            } else {
                throw error;
            }
        }
    }


    async addProduct(product){
        try {
            await this.leerProductos();
            const codigoEncontrado = this.products.find((producto) => producto.code === product.code);
            if (codigoEncontrado) {
                console.log('El codigo ya existe');
                return;
            }
            if (!product.title || !product.description || !product.price || !product.code || !product.stock || !product.status || !product.category) {
                console.log('Debe completar todos los datos');
                return;
            }
            const idProducto = this.products.length + 1;
            const producto = { ...product, id: idProducto };
            this.products.push(producto);
            await fs.writeFile(this.productsFile, JSON.stringify(this.products, null, 2));
            console.log('Producto agregado');
        } catch (error) {
            console.log('Error al agregar producto', error);
        }
    }

    async getProducts(limite){
        try {
            if (limite == null){
                return this.products;
            }else{
                return this.products.slice(0, limite);
            }
            
        } catch (error) {
            console.error("Error al consultar productos", error);
            return [];
        }
    }

    async getProductById(id){
        try {
            const productoEncontrado = this.products.find(producto => producto.id === id);
            if (!productoEncontrado){
                throw new Error('Producto no encontrado');
            } else {
                return productoEncontrado;
            }
        } catch (error) {
            console.error("Error al consultar productos", error);
            return undefined;
        }
    
    }

    async modificarProduct(id, product){
        try{
            await this.leerProductos();
            const productoEncontrado = this.products.find((producto)=> producto.id === id);
            if (!productoEncontrado){
                console.error('Not found');
                return;
            }

            if (!product.title, !product.description, !product.price, !product.code, !product.stock, !product.status, !product.category){
                console.error('Debe completar todos los datos');
                return;
            }

            productoEncontrado.title = product.title;
            productoEncontrado.description = product.description;
            productoEncontrado.price = product.price;
            productoEncontrado.code = product.code;
            productoEncontrado.stock = product.stock;
            productoEncontrado.status = product.status;
            productoEncontrado.category = product.category;
            
            await fs.writeFile(this.productsFile, JSON.stringify(this.products, null, 2));
        } catch(error){
            console.log('Error al modificar producto', error);
        }
    }

    async eliminarProducto(id){
        try{
            await this.leerProductos();
            const productoEncontrado = this.products.find((product)=> product.id === id);
            if (!productoEncontrado){
                console.error('Not found');
                return;
            } else {
                this.products = this.products.filter((product)=> product.id !== id);
                await fs.writeFile(this.productsFile, JSON.stringify(this.products, null, 2));
            }
        } catch(error){
            console.log('Error al eliminar producto', error);
        }
    }
}


module.exports = Products;
