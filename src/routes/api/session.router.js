import { Router } from "express";
import userModel from '../../../dao/models/user.model.js'

const router = Router();

router.post('/register', async(req, res) => {
    let { name, last_name, email, password, age } = req.body;
    let newUser
    if (!name || !last_name || !email || !password || !age){
        res.send({status: error, message: "Faltan datos"});
    }

    try{
        if (email ==="admin@coder.com" && password === "Cod3r123"){
            newUser = new userModel({name, last_name, email, password, age, isAdmin: 'admin'});
            
        }else{
            newUser = new userModel({name, last_name, email, password, age});
        }
        await newUser.save();
        res.redirect('/');
    }catch(error){
        res.status(500).send({message: "Error al crear el usuario"});
    }
});

router.post('/login', async(req, res) => {
    const { email, password } = req.body;
        try{
            const user = await userModel.findOne({email: email});
            if (!user) {
                return res.status(404).send("Usuario no encontrado");
            }else{
                req.session.user = {
                    id: user._id,
                    name: user.name,
                    last_name: user.last_name,
                    email: user.email,
                    password : user.password,
                    age: user.age
                }
                res.redirect('/products')
            }

        } catch(error) {
            res.status(500).send({message: "Error al buscar el usuario"});
        }
});

router.get('/logout', (req, res) => {
    req.session.destroy((err)=>{
        if (err) return res.status(500).send('Error al cerrar sesión');
        res.redirect('/login');
    });
});



export default router;

