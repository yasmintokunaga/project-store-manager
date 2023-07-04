const { salesService } = require('../services');
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

module.exports = {
  listAllSales,
  findById,
  addNewSale,
};
