const { productsModel } = require('../models');

const listAllProducts = async () => {
  const products = await productsModel.listAllProducts();

  return { status: 'SUCCESSFUL', data: products };
};

const findById = async (id) => {
  const product = await productsModel.findById(id);
  if (!product) {
    return { status: 'NOT_FOUND', data: 'Product not found' };
  }
  return { status: 'SUCCESSFUL', data: product };
};

module.exports = {
  listAllProducts,
  findById,
};
