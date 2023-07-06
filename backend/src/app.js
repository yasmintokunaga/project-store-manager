const express = require('express');
const { productsController, salesController } = require('./controllers');

const app = express();
app.use(express.json());

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.json({ status: 'Store Manager UP!' });
});

app.get('/products/search', productsController.findByName);
app.get('/products', productsController.listAllProducts);
app.get('/products/:id', productsController.findById);
app.post('/products', productsController.addNewProduct);
app.put('/products/:id', productsController.updateName);
app.delete('/products/:id', productsController.deleteProduct);

app.get('/sales', salesController.listAllSales);
app.get('/sales/:id', salesController.findById);
app.post('/sales', salesController.addNewSale);
app.delete('/sales/:id', salesController.deleteSale);
app.put('/sales/:saleId/products/:productId/quantity', salesController.updateQuantity);

module.exports = app;
