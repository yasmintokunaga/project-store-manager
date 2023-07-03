const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/models/connection');
const { salesModel } = require('../../../src/models');
const {
  salesFromDB, 
  salesFromModel,
  saleFromDB,
  saleFromModel,
  newSaleFromDb,
  newSaleFromModel,
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

  it('Adicionando uma nova venda', async function () {
    sinon.stub(connection, 'execute')
      .onCall(0).resolves([{
        fieldCount: 0,
        affectedRows: 1,
        insertId: 3,
        info: '',
        serverStatus: 2,
        warningStatus: 0,
      }])
      .onCall(1)
      .resolves([{
        fieldCount: 0,
        affectedRows: 2,
        insertId: 0,
        info: 'Records: 2  Duplicates: 0  Warnings: 0',
        serverStatus: 2,
        warningStatus: 0,
      }])
      .onCall(2)
      .resolves([[
        {
          date: '2023-07-03T17:18:44.000Z',
          productId: 1,
          quantity: 1,
        },
        {
          date: '2023-07-03T17:18:44.000Z',
          productId: 2,
          quantity: 5,
        },
      ]]);

    const newSale = await salesModel.addNewSale([newSaleFromDb]);

    expect(newSale).to.be.deep.equal(newSaleFromModel);
  });
});
