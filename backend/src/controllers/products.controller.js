const { productsService } = require('../services');
const mapStatusHTTP = require('../utils/mapStatusHTTP');

const listAllProducts = async (_req, res) => {
  const { status, data } = await productsService.listAllProducts();
  return res.status(mapStatusHTTP(status)).json(data);
};

const findById = async (req, res) => {
  const { id } = req.params;
  const { status, data } = await productsService.findById(id);
  return res.status(mapStatusHTTP(status)).json(data);
};

module.exports = {
  listAllProducts,
  findById,
};
