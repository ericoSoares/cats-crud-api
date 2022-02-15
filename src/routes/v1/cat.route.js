const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const catValidation = require('../../validations/cat.validation');
const catController = require('../../controllers/cat.controller');

const router = express.Router();

router
  .route('/')
  .post(validate(catValidation.createCat), catController.createCat)
  .get(validate(catValidation.getCats), catController.getCats);

router
  .route('/:catId')
  .get(validate(catValidation.getCat), catController.getCat)
  .patch(validate(catValidation.updateCat), catController.updateCat)
  .delete(validate(catValidation.deleteCat), catController.deleteCat);

module.exports = router;
