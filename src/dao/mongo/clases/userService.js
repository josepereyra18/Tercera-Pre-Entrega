import User from '../models/user.model.js';
export default class Users{
    constructor(){

    }

    findUser = async (username) => {
            let result = await User.findOne({ email: username });
            return result
    }

    createUser = async (user) => {
            let result = await User.create(user);
            return result
    }

    findUserById = async (id) => {
            let result = await User.findById(id);
            return result
    }


}