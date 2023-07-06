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
  allSalesFromModelUpdateQuantity,
  saleFromModelUpdateQuantity,
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

  it('Excluindo uma venda', async function () {
    sinon.stub(connection, 'execute').resolves([]);

    const deletedSale = await salesModel.deleteSale(1);
    
    expect(deletedSale).to.be.equal(undefined);
  });

  it('Editando a quantidade de produtos de uma venda', async function () {
    sinon.stub(connection, 'execute')
      .onCall(0)
          .resolves([{
          fieldCount: 0,
          affectedRows: 1,
          insertId: 0,
          info: 'Rows matched: 1  Changed: 1  Warnings: 0',
          serverStatus: 2,
          warningStatus: 0,
          changedRows: 1,
        }])
      .onCall(1)
        .resolves([allSalesFromModelUpdateQuantity]);

    sinon.stub(salesModel, 'listAllSales').resolves(allSalesFromModelUpdateQuantity);
    const updatedQuantity = await salesModel.updateQuantity(1, 1, 20);
    
    expect(updatedQuantity).to.be.deep.equal(saleFromModelUpdateQuantity);
  });
});
