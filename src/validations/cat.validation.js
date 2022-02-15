const Joi = require('joi');
const { password, objectId } = require('./custom.validation');

const createCat = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    breed: Joi.string().required(),
    birthday: Joi.string().required(),
    description: Joi.string().required(),
    picture: Joi.string().required(),
  }),
};

const getCats = {
  query: Joi.object().keys({
    name: Joi.string(),
    role: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getCat = {
  params: Joi.object().keys({
    catId: Joi.string().custom(objectId),
  }),
};

const updateCat = {
  params: Joi.object().keys({
    catId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      name: Joi.string().required(),
      breed: Joi.string().required(),
      birthday: Joi.string().required(),
      description: Joi.string().required(),
      picture: Joi.string().required()
    })
    .min(1),
};

const deleteCat = {
  params: Joi.object().keys({
    catId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createCat,
  getCats,
  getCat,
  updateCat,
  deleteCat,
};
