const Joi = require('@hapi/joi');

const registerValidation = data => {
  const schema = {
    email: Joi.string()
      .email()
      .required(),
    password: Joi.string().required()
  };
  return Joi.validate(data, schema);
};

module.exports.registerValidation = registerValidation;
