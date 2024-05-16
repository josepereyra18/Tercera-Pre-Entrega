import mongoose from 'mongoose';

const cartCollection = 'cart';

const cartSchema = new mongoose.Schema({
    products: [
        {
            productId: { type: mongoose.Schema.Types.ObjectId, ref: 'products' },
            quantity: {type: Number, default: 1},
        }
    ]
});

const cartModel = mongoose.model(cartCollection, cartSchema);

export default cartModel;

