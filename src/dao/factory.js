import mongoose from "mongoose";
import config from "../config/config.js";
import dotenv from "dotenv";
dotenv.config();

export let Carts
export let Products
export let Users
export let Tickets

switch (config.persistence) {
    case "MONGO":
        const connection = mongoose.connect(process.env.MONGO_URL)
        const { default: CartsMongo } = await import("../dao/mongo/clases/cartsService.js");
        Carts = new CartsMongo()
        break;
    case "MEMORY":
        const { default: CartsMemory } = await import("../dao/memory/clases/cartsService.js");
        Carts = new CartsMemory()
        break;
}

switch (config.persistence) {
    case "MONGO":
        const connection = mongoose.connect(process.env.MONGO_URL)
        const { default: ProductsMongo } = await import("../dao/mongo/clases/productsService.js");
        Products = new ProductsMongo()
        break;
    case "MEMORY":
        const { default: ProductsMemory } = await import("../dao/memory/clases/productsService.js");
        Products = new ProductsMemory()
        break;
}


switch (config.persistence) {
    case "MONGO":
        const connection = mongoose.connect(process.env.MONGO_URL)
        const { default: UsersMongo } = await import("../dao/mongo/clases/userService.js");
        Users = new UsersMongo()
        break;
    case "MEMORY":
        const { default: UsersMemory } = await import("../dao/memory/clases/userService.js");
        Users = new UsersMemory()
        break;
}

switch (config.persistence) {
    case "MONGO":
        const connection = mongoose.connect(process.env.MONGO_URL)
        const { default: TicketMongo } = await import("../dao/mongo/clases/ticketService.js");
        Tickets = new TicketMongo()
        break;
    case "MEMORY":
        const { default: TicketMemory } = await import("../dao/memory/clases/ticketService.js");
        Tickets = new TicketMemory()
        break;
}