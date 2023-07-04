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

const updateName = async (id, name) => {
  await connection.execute(
    'UPDATE StoreManager.products SET name = ? WHERE id = ?;',
    [name, id],
  );

  const productUpdate = await findById(id);
  return productUpdate;
};

const deleteProduct = async (id) => {
  const [product] = await connection.execute(
    'DELETE FROM StoreManager.products WHERE id = ?;',
    [id],
  );
  return product;
};

module.exports = {
  listAllProducts,
  findById,
  addNewProduct,
  updateName,
  deleteProduct,
};
