const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { catService } = require('../services');

const createCat = catchAsync(async (req, res) => {
  const cat = await catService.createCat(req.body);
  res.status(httpStatus.CREATED).send(cat);
});

const getCats = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'role']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await catService.queryCats(filter, options);
  res.send(result);
});

const getCat = catchAsync(async (req, res) => {
  const cat = await catService.getCatById(req.params.catId);
  if (!cat) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Cat not found');
  }
  res.send(cat);
});

const updateCat = catchAsync(async (req, res) => {
  const cat = await catService.updateCatById(req.params.catId, req.body);
  res.send(cat);
});

const deleteCat = catchAsync(async (req, res) => {
  await catService.deleteCatById(req.params.catId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createCat,
  getCats,
  getCat,
  updateCat,
  deleteCat,
};
