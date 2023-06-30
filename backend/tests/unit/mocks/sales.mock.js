const date = '2023-06-28T18:01:51.000Z';

const salesFromDB = [
  {
    saleID: 1,
    date,
    productId: 1,
    quantity: 5,
  },
  {
    saleID: 1,
    date,
    productId: 2,
    quantity: 10,
  },
  {
    saleID: 2,
    date,
    productId: 3,
    quantity: 15,
  },
];

const salesFromModel = [
  {
    saleID: 1,
    date,
    productId: 1,
    quantity: 5,
  },
  {
    saleID: 1,
    date,
    productId: 2,
    quantity: 10,
  },
  {
    saleID: 2,
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

module.exports = {
  salesFromDB,
  salesFromModel,
  saleFromDB,
  saleFromModel,
};
