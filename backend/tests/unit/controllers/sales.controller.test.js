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
  newSaleFromDbMissingProductId,
  newSaleFromDbMissingQuantity,
  newSaleFromDbWithQuantityNegative,
  newSaleFromDbWithProductIdError,
  allSalesFromModelUpdateQuantity,
  saleFromModelUpdateQuantity,
} = require('../mocks/sales.mock');
const { NOT_FOUND_SALE } = require('../mocks/serviceResponse');
const { productsFromModel } = require('../mocks/products.mock');

chai.use(sinonChai);

describe('Realizando testes - SALES CONTROLLER:', function () {
  afterEach(function () {
    sinon.restore();
  });

  it('Recuperando a lista de todos as vendas', async function () {
    sinon.stub(salesService, 'listAllSales').resolves({ status: 'SUCCESSFUL', data: [salesFromModel] });

    const req = {};
    const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };
    
    await salesController.listAllSales(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith([salesFromModel]);
  });

  it('Recuperando um produto pelo id', async function () {
    sinon.stub(salesService, 'findById').resolves({ status: 'SUCCESSFUL', data: saleFromModel });

    const req = { params: 1 };
    const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };
    
    await salesController.findById(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(saleFromModel);
  });

  it('Recuperando um produto por id que não existe', async function () {
    sinon.stub(salesService, 'findById').resolves(NOT_FOUND_SALE);

    const req = { params: 99 };
    const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };
    
    await salesController.findById(req, res);

    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({ message: 'Sale not found' });
  });

  it('Adicionando uma nova venda', async function () {
    sinon.stub(productsService, 'listAllProducts').resolves({ data: productsFromModel });
    sinon.stub(salesService, 'addNewSale').resolves({ status: 'CREATED', data: newSaleFromModel });

    const req = { body: newSaleFromDb };
    const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };
    
    await salesController.addNewSale(req, res);

    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).to.have.been.calledWith(newSaleFromModel);
  });

  it('Adicionando uma nova venda sem o campo productId', async function () {
    const req = { body: newSaleFromDbMissingProductId };
    const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };
    
    await salesController.addNewSale(req, res);

    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).to.have.been.calledWith({ message: '"productId" is required' });
  });

  it('Adicionando uma nova venda sem o campo quantity', async function () {
    const req = { body: newSaleFromDbMissingQuantity };
    const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };
    
    await salesController.addNewSale(req, res);

    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).to.have.been.calledWith({ message: '"quantity" is required' });
  });

  it('Adicionando uma nova venda com o campo quantity menor que zero', async function () {
    const req = { body: newSaleFromDbWithQuantityNegative };
    const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };
    
    await salesController.addNewSale(req, res);

    expect(res.status).to.have.been.calledWith(422);
    expect(res.json).to.have.been.calledWith({ message: '"quantity" must be greater than or equal to 1' });
  });

  it('Adicionando uma nova venda com o campo productId inexistente', async function () {
    sinon.stub(productsService, 'listAllProducts').resolves({ data: productsFromModel });

    const req = { body: newSaleFromDbWithProductIdError };
    const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };
    
    await salesController.addNewSale(req, res);

    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
  });

  it('Excluindo uma venda', async function () {
    sinon.stub(salesService, 'findById')
      .resolves(NOT_FOUND_SALE);

    const req = { params: 100 };
    const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };

    await salesController.deleteSale(req, res);
  
    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({ message: 'Sale not found' });
  });

  it('Excluindo uma venda com o sale_id inexistente', async function () {
    sinon.stub(salesService, 'findById').resolves({ status: 'SUCCESSFUL' });
    sinon.stub(salesService, 'deleteSale').resolves({ status: 'NO_CONTENT' });

    const req = { params: 1 };
    const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };

    await salesController.deleteSale(req, res);
  
    expect(res.status).to.have.been.calledWith(204);
    expect(res.json).to.have.been.calledWith();
  });

  it('Editando a quantidade de produtos de uma venda', async function () {
    sinon.stub(salesService, 'findById')
      .resolves({ status: 'SUCCESSFUL', data: allSalesFromModelUpdateQuantity });
    sinon.stub(salesService, 'updateQuantity')
      .resolves({ status: 'SUCCESSFUL', data: saleFromModelUpdateQuantity });

    const req = {
      params: {
        saleId: 1,
        productId: 1,
      },
      body: {
        quantity: 20,
      },
    };
    const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };

    await salesController.updateQuantity(req, res);
  
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(saleFromModelUpdateQuantity);
  });

  it('Editando a quantidade de produtos de uma venda sem passar o campo "quantity"', async function () {
    const req = {
      params: {
        saleId: 1,
        productId: 1,
      },
      body: {},
    };
    const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };

    await salesController.updateQuantity(req, res);
  
    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).to.have.been.calledWith({ message: '"quantity" is required' });
  });

  it('Editando a quantidade de produtos de uma venda com o campo "quantity" < 0', async function () {
    const req = {
      params: {
        saleId: 1,
        productId: 1,
      },
      body: {
        quantity: -20,
      },
    };
    const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };

    await salesController.updateQuantity(req, res);
  
    expect(res.status).to.have.been.calledWith(422);
    expect(res.json).to.have.been
      .calledWith({ message: '"quantity" must be greater than or equal to 1' });
  });

  it('Editando a quantidade de produtos de uma venda com um saleId inexistente', async function () {
    sinon.stub(salesService, 'findById')
      .resolves(NOT_FOUND_SALE);

    const req = {
      params: {
        saleId: 100,
        productId: 1,
      },
      body: {
        quantity: 20,
      },
    };
    const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };

    await salesController.updateQuantity(req, res);
  
    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({ message: 'Sale not found' });
  });

  it('Editando a quantidade de produtos de uma venda com productId inexistente', async function () {
    sinon.stub(salesService, 'findById')
      .resolves({ status: 'SUCCESSFUL', data: allSalesFromModelUpdateQuantity });

    const req = {
      params: {
        saleId: 1,
        productId: 100,
      },
      body: {
        quantity: 20,
      },
    };
    const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };

    await salesController.updateQuantity(req, res);
  
    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({ message: 'Product not found in sale' });
  });
});
