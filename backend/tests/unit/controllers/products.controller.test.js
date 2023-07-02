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
} = require('../mocks/products.mock');

chai.use(sinonChai);

describe('Realizando testes - PRODUCTS CONTROLLER:', function () {
  afterEach(function () {
    sinon.restore();
  });

  it('Recuperando a lista de todos os produtos', async function () {
    sinon.stub(productsService, 'listAllProducts').resolves({ status: 'SUCCESSFUL', data: [productsFromModel] });

    const req = {};
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    
    await productsController.listAllProducts(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith([productsFromModel]);
  });

  it('Recuperando um produto pelo id', async function () {
    sinon.stub(productsService, 'findById').resolves({ status: 'SUCCESSFUL', data: productFromModel });

    const req = { params: 1 };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    
    await productsController.findById(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(productFromModel);
  });

  it('Recuperando um produto por id que não existe', async function () {
    sinon.stub(productsService, 'findById').resolves({ status: 'NOT_FOUND', data: 'Product not found' });

    const req = { params: 99 };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    
    await productsController.findById(req, res);

    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
  });

  it('Adicionando um novo produto', async function () {
    sinon.stub(productsService, 'addNewProduct').resolves({ status: 'CREATED', data: newProductFromModel });

    const req = { body: { name: newProductFromModel.name } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    
    await productsController.addNewProduct(req, res);

    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).to.have.been.calledWith(newProductFromModel);
  });

  it('Adicionando um novo produto sem passar o campo "name"', async function () {
    const req = { body: {} };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    
    await productsController.addNewProduct(req, res);

    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).to.have.been.calledWith({ message: '"name" is required' });
  });

  it('Adicionando um novo produto com o campo "name" com menos de 5 caracteres', async function () {
    const req = { body: { name: 'ola' } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    
    await productsController.addNewProduct(req, res);

    expect(res.status).to.have.been.calledWith(422);
    expect(res.json).to.have.been.calledWith({ message: '"name" length must be at least 5 characters long' });
  });
});
