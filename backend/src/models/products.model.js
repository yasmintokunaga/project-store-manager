const connection = require('./connection');

const listAllProducts = async () => {
  const [products] = await connection.execute(
    'SELECT * FROM StoreManager.products ORDER BY id',
  );
  return products;
};

const findById = async (id) => {
  const [[findId]] = await connection.execute(
    'SELECT * FROM StoreManager.products WHERE id = ?',
    [id],
  );
  return findId;
};

module.exports = {
  listAllProducts,
  findById,
};
