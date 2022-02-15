const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const { toJSON, paginate } = require('./plugins');
const { roles } = require('../config/roles');

const catSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    breed: {
      type: String,
      required: true,
      trim: true,
    },
    birthday: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: false,
      trim: true,
    },
    picture: {
      type: String,
      required: false,
      trim: true,
    }
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
catSchema.plugin(toJSON);
catSchema.plugin(paginate);

/**
 * Check if name is taken
 * @param {string} name - The cat's name
 * @param {ObjectId} [excludeCatId] - The id of the cat to be excluded
 * @returns {Promise<boolean>}
 */
catSchema.statics.isNameTaken = async function (name, excludeCatId) {
  const cat = await this.findOne({ name, _id: { $ne: excludeCatId } });
  return !!cat;
};

/**
 * Check if password matches the cat's password
 * @param {string} password
 * @returns {Promise<boolean>}
 */
catSchema.methods.isPasswordMatch = async function (password) {
  const cat = this;
  return bcrypt.compare(password, cat.password);
};


/**
 * @typedef Cat
 */
const Cat = mongoose.model('Cat', catSchema);

module.exports = Cat;
