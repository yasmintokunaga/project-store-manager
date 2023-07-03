const { expect } = require('chai');
const sinon = require('sinon');
const { salesModel } = require('../../../src/models');
const { salesService } = require('../../../src/services');
const {
  salesFromModel,
  saleFromModel,
  newSaleFromModel,
  newSaleFromDb,
} = require('../mocks/sales.mock');

describe('Realizando testes - SALES SERVICE:', function () {
  afterEach(function () {
    sinon.restore();
  });

  it('Recuperando a lista de todas as vendas', async function () {
    sinon.stub(salesModel, 'listAllSales').resolves([salesFromModel]);

    const response = await salesService.listAllSales();

    expect(response).to.be.deep.equal({ status: 'SUCCESSFUL', data: [salesFromModel] });
  });

  it('Recuperando uma venda pelo id', async function () {
    sinon.stub(salesModel, 'findById').resolves(saleFromModel);

    const response = await salesService.findById(1);

    expect(response).to.be.deep.equal({ status: 'SUCCESSFUL', data: saleFromModel });
  });

  it('Recuperando uma venda por id que não existe', async function () {
    sinon.stub(salesModel, 'findById').resolves([]);

    const response = await salesService.findById(99);

    expect(response).to.be.deep.equal({ status: 'NOT_FOUND', data: 'Sale not found' });
  });

  it('Adicionando uma nova venda', async function () {
    sinon.stub(salesModel, 'addNewSale').resolves(newSaleFromModel);

    const response = await salesService.addNewSale(newSaleFromDb);

    expect(response).to.be.deep.equal({ status: 'CREATED', data: newSaleFromModel });
  });
});
