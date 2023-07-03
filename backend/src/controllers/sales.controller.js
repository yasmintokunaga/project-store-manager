const { salesService } = require('../services');
const { productsService } = require('../services');
const { productIdQuantityIsRequired } = require('../validations/shema');
const mapStatusHTTP = require('../utils/mapStatusHTTP');

const listAllSales = async (_req, res) => {
  const { status, data } = await salesService.listAllSales();
  return res.status(mapStatusHTTP(status)).json(data);
};

const findById = async (req, res) => {
  const { id } = req.params;
  const { status, data } = await salesService.findById(id);
  if (status === 'NOT_FOUND') {
    return res.status(mapStatusHTTP(status)).json({ message: data });
  }
  return res.status(mapStatusHTTP(status)).json(data);
};

const validateRequiredFields = (arr) => {
  const validateFields = [];
  arr.forEach((product) => {
    const { error } = productIdQuantityIsRequired.validate(product);
    if (error) {
      validateFields.push(error);
    }
  });

  if (validateFields.length >= 1) {
    const { message, type } = validateFields[0].details[0];
    return { 
      status: type === 'any.required' ? 'BAD_REQUEST' : 'INVALID_VALUE',
      data: { message },
    };
  }
  return false;
};

const validateId = async (arrIds) => {
  const { data } = await productsService.listAllProducts();
  const arrAllIds = data.map(({ id }) => id);
  const validateProductId = arrIds.every((id) => arrAllIds.includes(id));
  if (!validateProductId) {
    return {
      status: 'NOT_FOUND',
      data: 'Product not found',
    };
  }
  return false;
};

const addNewSale = async (req, res) => {
  const validateFields = validateRequiredFields(req.body);
  if (validateFields) {
    const { status, data } = validateFields;
    return res.status(mapStatusHTTP(status)).json(data);
  }

  const validateProductId = await validateId(req.body.map(({ productId }) => productId));
  if (validateProductId) {
    const { status, data } = validateProductId;
    return res.status(mapStatusHTTP(status)).json({ message: data });
  }

  const { status, data } = await salesService.addNewSale(req.body);
  return res.status(mapStatusHTTP(status)).json(data);
};

module.exports = {
  listAllSales,
  findById,
  addNewSale,
  validateRequiredFields,
  validateId,
};
