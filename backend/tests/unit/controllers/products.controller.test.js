const chai = require('chai');
const { expect } = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { productsController } = require('../../../src/controllers');
const { productsService } = require('../../../src/services');
const {
  productsFromModel,
  productFromModel,
  newProductFromModel,
  updateProductNameFromDB,
  updateProductNameFromModel,
  productFromDB,
} = require('../mocks/products.mock');
const { NOT_FOUND } = require('../mocks/serviceResponse');

chai.use(sinonChai);

describe('Realizando testes - PRODUCTS CONTROLLER:', function () {
  afterEach(function () {
    sinon.restore();
  });

  it('Recuperando a lista de todos os produtos', async function () {
    sinon.stub(productsService, 'listAllProducts').resolves({ status: 'SUCCESSFUL', data: [productsFromModel] });

    const req = {};
    const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };
    
    await productsController.listAllProducts(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith([productsFromModel]);
  });

  it('Recuperando um produto pelo id', async function () {
    sinon.stub(productsService, 'findById').resolves({ status: 'SUCCESSFUL', data: productFromModel });

    const req = { params: 1 };
    const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };
    
    await productsController.findById(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(productFromModel);
  });

  it('Recuperando um produto por id que não existe', async function () {
    sinon.stub(productsService, 'findById').resolves(NOT_FOUND);

    const req = { params: 99 };
    const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };
    
    await productsController.findById(req, res);

    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
  });

  it('Adicionando um novo produto', async function () {
    sinon.stub(productsService, 'addNewProduct').resolves({ status: 'CREATED', data: newProductFromModel });

    const req = { body: { name: newProductFromModel.name } };
    const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };
    
    await productsController.addNewProduct(req, res);

    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).to.have.been.calledWith(newProductFromModel);
  });

  it('Adicionando um novo produto sem passar o campo "name"', async function () {
    const req = { body: {} };
    const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };
    
    await productsController.addNewProduct(req, res);

    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).to.have.been.calledWith({ message: '"name" is required' });
  });

  it('Adicionando um novo produto com o campo "name" com menos de 5 caracteres', async function () {
    const req = { body: { name: 'ola' } };
    const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };
    
    await productsController.addNewProduct(req, res);

    expect(res.status).to.have.been.calledWith(422);
    expect(res.json).to.have.been.calledWith({ message: '"name" length must be at least 5 characters long' });
  });

  it('Editando o nome de um produto', async function () {
    sinon.stub(productsService, 'findById')
    .resolves({ status: 'SUCCESSFUL', data: updateProductNameFromModel });
    sinon.stub(productsService, 'updateName')
      .resolves({ status: 'SUCCESSFUL', data: updateProductNameFromModel });

    const req = {
      body: updateProductNameFromDB,
      params: 1,
    };
    const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };
    
    await productsController.updateName(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(updateProductNameFromModel);
  });

  it('Editando o nome de um produto sem passar o campo "name"', async function () {
    const req = {
      body: {},
      params: 1,
    };
    const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };
    
    await productsController.updateName(req, res);

    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).to.have.been.calledWith({ message: '"name" is required' });
  });

  it('Editando o nome de um produto com campo "name" com menos de 5 caracteres', async function () {
    const req = {
      body: { name: 'ola' },
      params: 1,
    };
    const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };
    
    await productsController.updateName(req, res);

    expect(res.status).to.have.been.calledWith(422);
    expect(res.json).to.have.been.calledWith({ message: '"name" length must be at least 5 characters long' });
  });

  it('Editando o nome de um produto com um id que não existe', async function () {
    sinon.stub(productsService, 'findById')
    .resolves(NOT_FOUND);

    const req = {
      body: updateProductNameFromDB,
      params: 100,
    };
    const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };
    
    await productsController.updateName(req, res);

    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
  });

  it('Deletando um produto', async function () {
    sinon.stub(productsService, 'findById')
      .resolves({ status: 'SUCCESSFUL', data: productFromModel });

    sinon.stub(productsService, 'deleteProduct')
      .resolves({ status: 'NO_CONTENT' });

    const req = { params: 1 };
    const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };
    
    await productsController.deleteProduct(req, res);

    expect(res.status).to.have.been.calledWith(204);
    expect(res.json).to.have.been.calledWith();
  });

  it('Deletando um produto com id inexistente', async function () {
    sinon.stub(productsService, 'findById')
      .resolves(NOT_FOUND);

    const req = { params: 100 };
    const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };
    
    await productsController.deleteProduct(req, res);

    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
  });

  it('Pesquisando um produto pelo nome', async function () {
    sinon.stub(productsService, 'findByName')
      .resolves({ status: 'SUCCESSFUL', data: productFromDB });

    const req = { query: { q: 'Martelo' } };
    const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };
    
    await productsController.findByName(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(productFromDB);
  });

  it('Pesquisando um produto pelo nome sem passar o nome', async function () {
    sinon.stub(productsService, 'listAllProducts')
      .resolves({ status: 'SUCCESSFUL', data: productsFromModel });

    const req = { query: {} };
    const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };
    
    await productsController.findByName(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(productsFromModel);
  });

  it('Pesquisando um produto pelo nome que não está cadastrado', async function () {
    sinon.stub(productsService, 'findByName')
      .resolves({ status: 'SUCCESSFUL', data: [] });

    const req = { query: { q: 'Carro' } };
    const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };
    
    await productsController.findByName(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith([]);
  });
});
