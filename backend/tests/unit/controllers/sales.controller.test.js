const chai = require('chai');
const { expect } = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { salesController } = require('../../../src/controllers');
const { productsService } = require('../../../src/services');
const { salesService } = require('../../../src/services');
const {
  salesFromModel,
  saleFromModel,
  newSaleFromModel,
  newSaleFromDb,
} = require('../mocks/sales.mock');
const { productsFromModel } = require('../mocks/products.mock');

chai.use(sinonChai);

describe('Realizando testes - SALES CONTROLLER:', function () {
  afterEach(function () {
    sinon.restore();
  });

  it('Recuperando a lista de todos as vendas', async function () {
    sinon.stub(salesService, 'listAllSales').resolves({ status: 'SUCCESSFUL', data: [salesFromModel] });

    const req = {};
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    
    await salesController.listAllSales(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith([salesFromModel]);
  });

  it('Recuperando um produto pelo id', async function () {
    sinon.stub(salesService, 'findById').resolves({ status: 'SUCCESSFUL', data: saleFromModel });

    const req = { params: 1 };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    
    await salesController.findById(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(saleFromModel);
  });

  it('Recuperando um produto por id que não existe', async function () {
    sinon.stub(salesService, 'findById').resolves({ status: 'NOT_FOUND', data: 'Sale not found' });

    const req = { params: 99 };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    
    await salesController.findById(req, res);

    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({ message: 'Sale not found' });
  });

  it('Adicionando uma nova venda', async function () {
    sinon.stub(productsService, 'listAllProducts').resolves({ data: productsFromModel });
    sinon.stub(salesService, 'addNewSale').resolves({ status: 'CREATED', data: newSaleFromModel });

    const req = { body: newSaleFromDb };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    
    await salesController.addNewSale(req, res);

    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).to.have.been.calledWith(newSaleFromModel);
  });
});
