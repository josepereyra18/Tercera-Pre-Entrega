const express = require('express');
const app = express();
const path = require('path');
const cartRouter = require('./routes/cart.route.js')
const productsRouter = require('./routes/product.route.js')

const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', productsRouter);
app.use('/api', cartRouter);

app.get('/', (req, res) => {
    res.send('/api/products o /api/cart');
});

app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
});
