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
  updateProductNameFromDB,
  updateProductNameFromModel,
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

  it('Editando o nome de um produto', async function () {
    sinon.stub(connection, 'execute')
      .onCall(0)
        .resolves({
          fieldCount: 0,
          affectedRows: 1,
          insertId: 0,
          info: 'Rows matched: 1  Changed: 1  Warnings: 0',
          serverStatus: 2,
          warningStatus: 0,
          changedRows: 1,
        })
      .onCall(1)
        .resolves([[updateProductNameFromModel]]);

    const updateProduct = await productsModel.updateName(1, updateProductNameFromDB.name);

    expect(updateProduct).to.be.deep.equal(updateProduct);
  });
});
