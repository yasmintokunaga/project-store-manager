const connection = require('./connection');

const listAllSales = async () => {
  const [sales] = await connection.execute(
    'SELECT StoreManager.sales_products.sale_id AS saleID, '
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

module.exports = {
  listAllSales,
  findById,
};
