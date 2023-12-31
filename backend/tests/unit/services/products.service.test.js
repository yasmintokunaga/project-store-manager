const { expect } = require('chai');
const sinon = require('sinon');
const { productsModel } = require('../../../src/models');
const { productsService } = require('../../../src/services');
const {
  productsFromModel,
  productFromModel,
  newProductFromModel,
  updateProductNameFromModel,
  productFromDB,
} = require('../mocks/products.mock');

describe('Realizando testes - PRODUCTS SERVICE:', function () {
  afterEach(function () {
    sinon.restore();
  });

  it('Recuperando a lista de todos os produtos', async function () {
    sinon.stub(productsModel, 'listAllProducts').resolves([productsFromModel]);

    const response = await productsService.listAllProducts();

    expect(response).to.be.deep.equal({ status: 'SUCCESSFUL', data: [productsFromModel] });
  });

  it('Recuperando um produto pelo id', async function () {
    sinon.stub(productsModel, 'findById').resolves(productFromModel);

    const response = await productsService.findById(1);

    expect(response).to.be.deep.equal({ status: 'SUCCESSFUL', data: productFromModel });
  });

  it('Recuperando um produto por id que não existe', async function () {
    sinon.stub(productsModel, 'findById').resolves(undefined);

    const response = await productsService.findById(99);

    expect(response).to.be.deep.equal({ status: 'NOT_FOUND', data: 'Product not found' });
  });

  it('Adicionando um novo produto', async function () {
    sinon.stub(productsModel, 'addNewProduct').resolves(newProductFromModel);

    const response = await productsService.addNewProduct(newProductFromModel.name);

    expect(response).to.be.deep.equal({ status: 'CREATED', data: newProductFromModel });
  });

  it('Editando o nome de um produto', async function () {
    sinon.stub(productsModel, 'updateName').resolves(updateProductNameFromModel);

    const response = await productsService.updateName(1, updateProductNameFromModel.name);

    expect(response).to.be.deep.equal({ status: 'SUCCESSFUL', data: updateProductNameFromModel });
  });

  it('Deletando um produto', async function () {
    sinon.stub(productsModel, 'deleteProduct').resolves([]);

    const response = await productsService.deleteProduct(1);

    expect(response).to.be.deep.equal({ status: 'NO_CONTENT' });
  });

  it('Pesquisando um produto pelo nome', async function () {
    sinon.stub(productsModel, 'findByName').resolves(productFromDB);

    const response = await productsService.findByName('Martelo');

    expect(response).to.be.deep.equal({ status: 'SUCCESSFUL', data: productFromDB });
  });
});
