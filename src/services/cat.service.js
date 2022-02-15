const httpStatus = require('http-status');
const { Cat } = require('../models');
const ApiError = require('../utils/ApiError');
/**
 * Create a cat
 * @param {Object} catBody
 * @returns {Promise<Cat>}
 */
const createCat = async (catBody) => {
  if (await Cat.isNameTaken(catBody.name)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Name already taken');
  }
  return Cat.create(catBody);
};

/**
 * Query for cats
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryCats = async (filter, options) => {
  const cats = await Cat.paginate(filter, options);
  return cats;
};

/**
 * Get cat by id
 * @param {ObjectId} id
 * @returns {Promise<Cat>}
 */
const getCatById = async (id) => {
  return Cat.findById(id);
};

/**
 * Get cat by email
 * @param {string} email
 * @returns {Promise<Cat>}
 */
const getCatByEmail = async (email) => {
  return Cat.findOne({ email });
};

/**
 * Update cat by id
 * @param {ObjectId} catId
 * @param {Object} updateBody
 * @returns {Promise<Cat>}
 */
const updateCatById = async (catId, updateBody) => {
  const cat = await getCatById(catId);
  if (!cat) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Cat not found');
  }
  Object.assign(cat, updateBody);
  await cat.save();
  return cat;
};

/**
 * Delete cat by id
 * @param {ObjectId} catId
 * @returns {Promise<Cat>}
 */
const deleteCatById = async (catId) => {
  const cat = await getCatById(catId);
  if (!cat) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Cat not found');
  }
  await cat.remove();
  return cat;
};

module.exports = {
  createCat,
  queryCats,
  getCatById,
  getCatByEmail,
  updateCatById,
  deleteCatById,
};
