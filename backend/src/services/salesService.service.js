const { salesModel } = require('../models');

const listAllSales = async () => {
  const sales = await salesModel.listAllSales();

  return { status: 'SUCCESSFUL', data: sales };
};

const findById = async (id) => {
  const sale = await salesModel.findById(id);
  if (sale.length === 0) {
    return { status: 'NOT_FOUND', data: 'Sale not found' };
  }
  return { status: 'SUCCESSFUL', data: sale };
};

const addNewSale = async (sale) => {
  const newSale = await salesModel.addNewSale(sale);
  return { status: 'CREATED', data: newSale };
};

const deleteSale = async (id) => {
  await salesModel.deleteSale(id);
  return { status: 'NO_CONTENT' };
};

const updateQuantity = async (saleId, productId, quantity) => {
  const updatedQuantity = await salesModel.updateQuantity(saleId, productId, quantity);
  return { status: 'SUCCESSFUL', data: updatedQuantity };
};

module.exports = {
  listAllSales,
  findById,
  addNewSale,
  deleteSale,
  updateQuantity,
};
