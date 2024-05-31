import mongoose from 'mongoose';

const userCollection = 'users';

const userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    last_name: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    age: {type: Number, required: true},
    isAdmin: {type: String, required: true, default: 'user'}
 });

const userModel = mongoose.model(userCollection, userSchema);

export default userModel;
