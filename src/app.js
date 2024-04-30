import express from 'express';
import __dirname from './utils.js';
import handlebars from 'express-handlebars';
import viewsRouter from './routes/views.router.js';
import { Server } from 'socket.io';
import cartRouter from './routes/cart.route.js'
import productsRouter from './routes/product.route.js'
import realTimeProducts from './routes/realTimeProducts.router.js'
import Products from '../utils/products.js';
const products = new Products();


const app = express();
const PORT = 8080;
const httpServer = app.listen(PORT, console.log(`Server is running on port ${PORT}`));
// const products = require('../utils/products.js');

const socketServer = new Server(httpServer);


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');
app.use(express.static(__dirname + '/public'));
app.use('/api', productsRouter);
app.use('/api', cartRouter);

app.use('/', viewsRouter);
app.use("/realTimeProducts", realTimeProducts )


socketServer.on('connection', async socket => {
    console.log('Un cliente se ha conectado');

    async function productosActualizados (){
      await products.leerProductos();
      const productosActualizados = await products.getProducts();
      socketServer.emit('Lista-Modificada', productosActualizados);
    }


    const products = new Products();
    await products.leerProductos();
    const productos = await products.getProducts();
    socket.emit('Lista-Modificada', productos);

    // Cuando se elimina un producto
    socket.on ('eliminarProd', async (id) => {
        products.eliminarProducto(id);
        productosActualizados();
    })
    // Cuando se agrega un producto
    socket.on('agregarProd', async (product) => {
        await products.addProduct(product);
        productosActualizados();
    })
  // Cuando se modifica un producto
    socket.on('modificarProd', async (product) => {
      const id = parseInt(product.id);
        products.modificarProduct(id, product);
        productosActualizados();
    });
})

