const { salesService } = require('../services');
const { quantityIsRequired } = require('../validations/shema');
const { validateId, validateRequiredFields } = require('../validations/validations');
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

const deleteSale = async (req, res) => {
  const { id } = req.params;

  const { status: statusVerifyId, data: errorVerifyId } = await salesService.findById(id);
  if (statusVerifyId === 'NOT_FOUND') {
    return res.status(mapStatusHTTP(statusVerifyId)).json({ message: errorVerifyId });
  }

  const { status } = await salesService.deleteSale(id);
  res.status(mapStatusHTTP(status)).json();
};

const updateQuantity = async (req, res) => {
  const { saleId, productId } = req.params;
  const { quantity } = req.body;

  const { error: errorQuantity } = quantityIsRequired.validate({ quantity });
  if (errorQuantity) {
    const { message, type } = errorQuantity.details[0];
    return res.status(mapStatusHTTP(type === 'any.required' ? 'BAD_REQUEST' : 'INVALID_VALUE'))
      .json({ message }); 
  }

  const verifySaleId = await salesService.findById(Number(saleId));
  if (verifySaleId.status === 'NOT_FOUND') {
    return res.status(mapStatusHTTP(verifySaleId.status)).json({ message: verifySaleId.data });
  }
  const verifyProductId = verifySaleId.data.some((sale) => sale.productId === Number(productId));
  if (!verifyProductId) {
    return res.status(mapStatusHTTP('NOT_FOUND')).json({ message: 'Product not found in sale' });
  }

  const { status, data } = await salesService.updateQuantity(saleId, productId, quantity);
  return res.status(mapStatusHTTP(status)).json(data);
};

module.exports = {
  listAllSales,
  findById,
  addNewSale,
  deleteSale,
  updateQuantity,
};
