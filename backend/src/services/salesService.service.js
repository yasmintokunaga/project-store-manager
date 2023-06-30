const { salesModel } = require('../models');

const listAllSales = async () => {
  const sales = await salesModel.listAllSales();

  return { status: 'SUCCESSFUL', data: sales };
};

const findById = async (id) => {
  const sale = await salesModel.findById(id);
  if (!sale) {
    return { status: 'NOT_FOUND', data: 'Sale not found' };
  }
  return { status: 'SUCCESSFUL', data: sale };
};

module.exports = {
  listAllSales,
  findById,
};
