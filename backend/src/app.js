const express = require('express');
const { productsController, salesController } = require('./controllers');

const app = express();
app.use(express.json());

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.json({ status: 'Store Manager UP!' });
});

app.get('/products', productsController.listAllProducts);
app.get('/products/:id', productsController.findById);

app.get('/sales', salesController.listAllSales);
app.get('/sales/:id', salesController.findById);

module.exports = app;
