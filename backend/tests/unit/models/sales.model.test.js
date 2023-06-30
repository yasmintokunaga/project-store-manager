const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/models/connection');
const { salesModel } = require('../../../src/models');
const {
  salesFromDB, 
  salesFromModel,
  saleFromDB,
  saleFromModel,
} = require('../mocks/sales.mock');

describe('Realizando testes - SALES MODEL:', function () {
  afterEach(function () {
    sinon.restore();
  });

  it('Recuperando a lista de todas as vendas', async function () {
    sinon.stub(connection, 'execute').resolves([salesFromDB]);

    const sales = await salesModel.listAllSales();

    expect(sales).to.be.deep.equal(salesFromModel);
  });

  it('Recuperando a venda pelo id', async function () {
    sinon.stub(connection, 'execute').resolves([saleFromDB]);

    const sale = await salesModel.findById(1);

    expect(sale).to.be.deep.equal(saleFromModel);
  });
});
