const connection = require('./connection');

const listAllSales = async () => {
  const [sales] = await connection.execute(
    'SELECT StoreManager.sales_products.sale_id AS saleId, '
    + 'StoreManager.sales.date, '
    + 'StoreManager.sales_products.product_id AS productId, '
    + 'StoreManager.sales_products.quantity '
    + 'FROM StoreManager.sales_products '
    + 'INNER JOIN StoreManager.sales '
    + 'ON StoreManager.sales_products.sale_id = StoreManager.sales.id '
    + 'ORDER BY sale_id, product_id;',
  );
  return sales;
};

const findById = async (id) => {
  const [findId] = await connection.execute(
    'SELECT '
    + 'StoreManager.sales.date, '
    + 'StoreManager.sales_products.product_id AS productId, '
    + 'StoreManager.sales_products.quantity '
    + 'FROM StoreManager.sales_products '
    + 'INNER JOIN StoreManager.sales '
    + 'ON StoreManager.sales_products.sale_id = StoreManager.sales.id '
    + 'WHERE sale_id = ? '
    + 'ORDER BY sale_id, product_id;',
    [id],
  );
  return findId;
};

const addNewSale = async (sale) => {
  const [insertNewSale] = await connection.execute(
    'INSERT INTO StoreManager.sales (date) VALUES (DEFAULT);',
  );

  const saleId = insertNewSale.insertId;
  const values = sale
    .map(({ productId, quantity }) => (`(${saleId}, ${productId}, ${quantity})`)).join(', ');

  const query = 'INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) VALUES'
    + `${values}`;
  await connection.execute(query);

  const insertProducts = await findById(saleId);

  const newInsertion = {
    id: insertNewSale.insertId,
    itemsSold: insertProducts.map(({ productId, quantity }) => ({ productId, quantity })),
  };
  return newInsertion;
};

module.exports = {
  listAllSales,
  findById,
  addNewSale,
};
