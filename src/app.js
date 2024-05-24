import express from 'express';
import __dirname from './utils.js';
import handlebars from 'express-handlebars';
import viewsRouter from './routes/views.router.js';
import { Server } from 'socket.io';
import productsRouter from './routes/products.route.js'
import cartRouter from './routes/carts.route.js'
import realTimeProducts from './routes/realTimeProducts.router.js'
import chatRouter from './routes/message.router.js'
import mongoose from 'mongoose';
import productsModel from '../dao/models/products.model.js'
import chatModel from '../dao/models/chat.model.js';
import Handlebars from 'handlebars';
import { allowInsecurePrototypeAccess } from '@handlebars/allow-prototype-access';

const app = express();

const PORT = 8080;
const httpServer = app.listen(PORT, console.log(`Server is running on port ${PORT}`));
const socketServer = new Server(httpServer);

mongoose.connect('mongodb+srv://ecommerce:1234@cluster0.yf8jzfb.mongodb.net/ecommerce?retryWrites=true&w=majority&appName=Cluster0').then(
    () => {console.log('Conectado a la base de datos')}).catch(error => console.log("error en la conexion ", error))

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.engine('handlebars', handlebars.engine({
  handlebars: allowInsecurePrototypeAccess(Handlebars)
}));
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');
app.use(express.static(__dirname + '/public'));
app.use('/api', productsRouter);
app.use('/api', cartRouter);
app.use('/chat', chatRouter)
app.use('/', viewsRouter);
app.use("/realTimeProducts", realTimeProducts )


let historialMensajes = await chatModel.find();
let usuarios = []
socketServer.on('connection', async socket => {
    console.log('Un cliente se ha conectado');
    // soket Chat
    socket.on('authenticate', (data) => {
      usuarios.push(socket); 
      
      socket.emit('messageLog', historialMensajes);
      console.log(historialMensajes)

      usuarios.forEach(client => {
          if (client !== socket) {
              client.emit('newUser', data);
          }
      });
    });

    socket.on('message', async (data) => {
      await chatModel.create({user: data.user, message: data.message});

      usuarios.forEach(client => {
          client.emit('message', data);
      });
  
    });


    // soket RealTimeProducts

    async function productosActualizados (){
      const productosActualizados = await productsModel.find() ;
      socketServer.emit('Lista-Modificada', productosActualizados);
    }

    const productos = await productsModel.find();
    socket.emit('Lista-Modificada', productos);

    // Cuando se elimina un producto
    socket.on ('eliminarProd', async (id) => {
        await productsModel.deleteOne({_id: id});
        productosActualizados();
    })
    // Cuando se agrega un producto
    socket.on('agregarProd', async (product) => {
        await productsModel.create({title: product.title, description: product.description, price: product.price, code: product.code, stock: product.stock, status: product.status, category: product.category});
        productosActualizados();
    })
  // Cuando se modifica un producto
    socket.on('modificarProd', async (product, id) => {
        await productsModel.updateOne({_id: id}, product)
        productosActualizados();
    });


})
