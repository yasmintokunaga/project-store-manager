const { productIdQuantityIsRequired } = require('./shema');
const { productsService } = require('../services');

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

module.exports = {
  validateRequiredFields,
  validateId,
};
