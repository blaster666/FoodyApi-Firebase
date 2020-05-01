const Joi = require('@hapi/joi');

const createFoodValidation = data => {
  const schema = {
    name: Joi.string().required(),
    price: Joi.number().required()
  };
  return Joi.validate(data, schema);
};

module.exports.createFoodValidation = createFoodValidation;
