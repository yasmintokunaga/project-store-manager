const date = '2023-06-28T18:01:51.000Z';

const salesFromDB = [
  {
    saleId: 1,
    date,
    productId: 1,
    quantity: 5,
  },
  {
    saleId: 1,
    date,
    productId: 2,
    quantity: 10,
  },
  {
    saleId: 2,
    date,
    productId: 3,
    quantity: 15,
  },
];

const salesFromModel = [
  {
    saleId: 1,
    date,
    productId: 1,
    quantity: 5,
  },
  {
    saleId: 1,
    date,
    productId: 2,
    quantity: 10,
  },
  {
    saleId: 2,
    date,
    productId: 3,
    quantity: 15,
  },
];

const saleFromDB = [
  {
    date,
    productId: 1,
    quantity: 5,
  },
  {
    date,
    productId: 2,
    quantity: 10,
  },
];

const saleFromModel = [
  {
    date,
    productId: 1,
    quantity: 5,
  },
  {
    date,
    productId: 2,
    quantity: 10,
  },
];

const newSaleFromDb = [
  {
    productId: 1,
    quantity: 1,
  },
  {
    productId: 2,
    quantity: 5,
  },
];

const newSaleFromDbMissingProductId = [
  {
    quantity: 1,
  },
  {
    productId: 2,
    quantity: 5,
  },
];

const newSaleFromDbMissingQuantity = [
  {
    productId: 2,
  },
];

const newSaleFromDbWithQuantityNegative = [
  {
    productId: 1,
    quantity: -1,
  },
  {
    productId: 2,
    quantity: 5,
  },
];

const newSaleFromDbWithProductIdError = [
  {
    productId: 99,
    quantity: 1,
  },
  {
    productId: 2,
    quantity: 5,
  },
];

const newSaleFromModel = {
  id: 3,
  itemsSold: [
    {
      productId: 1,
      quantity: 1,
    },
    {
      productId: 2,
      quantity: 5,
    },
  ],
};

module.exports = {
  salesFromDB,
  salesFromModel,
  saleFromDB,
  saleFromModel,
  newSaleFromDb,
  newSaleFromModel,
  newSaleFromDbMissingProductId,
  newSaleFromDbMissingQuantity,
  newSaleFromDbWithQuantityNegative,
  newSaleFromDbWithProductIdError,
};
