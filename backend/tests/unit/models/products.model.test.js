const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/models/connection');
const { productsModel } = require('../../../src/models');
const {
  productsFromDB, 
  productsFromModel,
  productFromDB,
  productFromModel,
  newProductFromDb,
  newProductFromModel,
} = require('../mocks/products.mock');

describe('Realizando testes - PRODUCTS MODEL:', function () {
  afterEach(function () {
    sinon.restore();
  });

  it('Recuperando a lista de todos os produtos', async function () {
    sinon.stub(connection, 'execute').resolves([productsFromDB]);

    const products = await productsModel.listAllProducts();

    expect(products).to.be.deep.equal(productsFromModel);
  });

  it('Recuperando um produto pelo id', async function () {
    sinon.stub(connection, 'execute').resolves([productFromDB]);

    const product = await productsModel.findById(1);

    expect(product).to.be.deep.equal(productFromModel);
  });

  it('Adicionando um novo produto', async function () {
    sinon.stub(connection, 'execute').resolves([[newProductFromDb]]);

    const newProduct = await productsModel.addNewProduct(newProductFromDb.name);

    expect(newProduct).to.be.deep.equal(newProductFromModel);
  });
});
