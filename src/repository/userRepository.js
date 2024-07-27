export default class usersRepository {
    constructor(dao) {
        this.dao = dao;
    }

    findUser = async (username)=>{
        let result = await this.dao.findUser(username);
        return result;
    }

    createUser = async (user) => {
        let result = await this.dao.createUser(user);
        return result
    }
    
    findUserById = async (id) => {
        let result = await this.dao.findUserById(id);
        return result
    }
}