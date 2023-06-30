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

const addNewProduct = async (nameProduct) => {
  const [insertNewProduct] = await connection.execute(
    'INSERT INTO StoreManager.products (name) VALUES (?);',
    [nameProduct],
  );

  const newProduct = await findById(insertNewProduct.insertId);
  return newProduct;
};

module.exports = {
  listAllProducts,
  findById,
  addNewProduct,
};
