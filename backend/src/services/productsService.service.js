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

const addNewProduct = async (nameProduct) => {
  const newProduct = await productsModel.addNewProduct(nameProduct);

  return { status: 'CREATED', data: newProduct };
};

const updateName = async (id, name) => {
  const productUpdate = await productsModel.updateName(id, name);

  return { status: 'SUCCESSFUL', data: productUpdate };
};

const deleteProduct = async (id) => {
  await productsModel.deleteProduct(id);
  return { status: 'NO_CONTENT' };
};

const findByName = async (name) => {
  const listFind = await productsModel.findByName(name);
  return { status: 'SUCCESSFUL', data: listFind };
};

module.exports = {
  listAllProducts,
  findById,
  addNewProduct,
  updateName,
  deleteProduct,
  findByName,
};
