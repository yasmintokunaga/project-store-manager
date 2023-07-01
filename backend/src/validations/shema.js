const Joi = require('joi');

const nameIsRequired = Joi.object({
  name: Joi.string().required().error(new Error('"name" is required')),
});

const nameHasMinLength = Joi.object({
  name: Joi.string().min(5).error(new Error('"name" length must be at least 5 characters long')),
});

module.exports = {
  nameIsRequired,
  nameHasMinLength,
};
