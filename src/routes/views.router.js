import express from 'express';
import productsModel from '../../dao/models/products.model.js';
const router = express.Router();

router.get('/', async(req, res) => {
    try {
        const limit = req.query.limit ? parseInt(req.query.limit) : 10;
        const page = req.query.page ? parseInt(req.query.page) : 1;
        const category = req.query.category;
        const status = req.query.status;
        let sort = {};

        if (req.query.sort) {
            if (req.query.sort === "asc") {
                sort = { price: 1 };
            } else if (req.query.sort === "desc") {
                sort = { price: -1 };
            }
        }

        let query = {};
        if (category) {
            query.category = category;
        }
        if (status) {
            query.status = status === 'true';
        }

        const options = {
            page,
            limit,
            sort
        };

        const result = await productsModel.paginate(query, options);

        if (page > result.totalPages) {
            return res.status(404).send('Página no encontrada');
        }

        res.render('home', { productos: result.docs });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener los productos');
    }
});

export default router;
