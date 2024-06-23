import { Router } from "express";
import passport from "passport";

const router = Router();


router.post('/register', passport.authenticate('register', {failureRedirect : 'failregister'}), async(req, res) => {
    res.redirect("/")
});

router.get('/failregister', (req, res) => {
    console.log("Usuario ya registrado");
    res.send({error:"upsi dupsy, usuario ya registrado"})
});

router.post('/login', passport.authenticate('login', {failureRedirect: 'faillogin'}) , async(req, res) => {
    if (!req.user) return res.status(404).send({status: "error",error : "Datos incompletos"});
        try{
            req.session.user = {
                name: req.user.name,
                last_name: req.user.last_name,
                email: req.user.email,
                age: req.user.age,
                cartId: req.user.cartId
               };
               console.log(req.session.user);
            res.redirect('/current')
        } catch(error) {
            res.status(500).send({message: "Error al buscar el usuario"});
        }
});

router.get('/faillogin', (req, res) => {
    console.log("Usuario no encontrado");
    res.send({error: "Usuario no encontrado"});
});

router.get('/logout', (req, res) => {
    req.session.destroy((err)=>{
        if (err) return res.status(500).send('Error al cerrar sesión');
        res.redirect('/');
    });
});

router.get('/github', passport.authenticate('github',{scope:["user:email"]}), async(req,res)=>{ });

router.get('/githubcallback', passport.authenticate('github', {failureRedirect:'/login'}), async(req,res)=>{
    req.session.user = req.user
    res.redirect("/products")
})


export default router;

