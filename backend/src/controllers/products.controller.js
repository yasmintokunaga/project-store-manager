const { productsService } = require('../services');
const mapStatusHTTP = require('../utils/mapStatusHTTP');
const {
  nameIsRequired,
  nameHasMinLength,
  nameIsRequiredHasMinLength,
} = require('../validations/shema');

const listAllProducts = async (_req, res) => {
  const { status, data } = await productsService.listAllProducts();
  return res.status(mapStatusHTTP(status)).json(data);
};

const findById = async (req, res) => {
  const { id } = req.params;
  const { status, data } = await productsService.findById(id);
  if (status === 'NOT_FOUND') {
  return res.status(mapStatusHTTP(status)).json({ message: data });
  }
  return res.status(mapStatusHTTP(status)).json(data);
};

const addNewProduct = async (req, res) => {
  const { name } = req.body;

  const { error: errorNameRequired } = nameIsRequired.validate({ name });
  if (errorNameRequired) {
    return res.status(mapStatusHTTP('BAD_REQUEST'))
    .json({ message: errorNameRequired.message });
  }

  const { error: errorNameLength } = nameHasMinLength.validate({ name });
  if (errorNameLength) {
    return res.status(mapStatusHTTP('INVALID_VALUE'))
      .json({ message: errorNameLength.message });
  }

  const { status, data } = await productsService.addNewProduct(name);
  return res.status(mapStatusHTTP(status)).json(data);
};

const updateName = async (req, res) => {
  const { name } = req.body;
  const { id } = req.params;

  const { error } = nameIsRequiredHasMinLength.validate({ name });
  if (error) {
    const { message, type } = error.details[0];
    return res
    .status(mapStatusHTTP(type === 'any.required' ? 'BAD_REQUEST' : 'INVALID_VALUE'))
    .json({ message });
  }

  const { status: statusFindId, data: dataFindId } = await productsService.findById(id);
  if (statusFindId === 'NOT_FOUND') {
    return res.status(mapStatusHTTP(statusFindId)).json({ message: dataFindId });
  }

  const { status, data } = await productsService.updateName(id, name);
  return res.status(mapStatusHTTP(status)).json(data);
};

module.exports = {
  listAllProducts,
  findById,
  addNewProduct,
  updateName,
};
