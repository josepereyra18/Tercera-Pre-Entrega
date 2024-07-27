import mongoose from 'mongoose';

const ticketCollection = 'ticket';

const ticketSchema = new mongoose.Schema({ 
    code: { type: String, required: true, max: 100 },
    purchaseDate: { type: Date, required: true },
    amount: { type: Number, required: true },
    purcherser: { type: String, required: true },
    userId: {type: mongoose.Schema.Types.ObjectId,ref: 'users'},
});

const ticketModel  = mongoose.model(ticketCollection, ticketSchema);

export default ticketModel;
