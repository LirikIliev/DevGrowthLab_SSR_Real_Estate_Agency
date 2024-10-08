const { Schema, model, default: mongoose } = require('mongoose');
const { URL_REGEX } = require('../config/config');

const propertySchema = new Schema({
  name: {
    type: String,
    require: [true, 'The name of the house is required!'],
    minLength: [3, 'Minimum name length is 3 symbols.'],
    maxLength: [30, 'Maximum name length is 30 symbols.']
  },
  type: {
    type: String,
    require: [true, "The house type is required."],
    minLength: [3, 'Minimum type length is 3 letters'],
    maxLength: [30, 'Maximum type length is 30 symbols']
  },
  year: {
    type: String,
    require: [true, 'The house year is required.'],
    validate: {
      validator: function (year) {
        return Number(year) >= 1850 && Number(year) <= 2024
      },
      message: 'The year must be from 1850 to 2024'
    }
  },
  city: {
    type: String,
    require: [true, 'The city name is required.'],
    minLength: [3, 'Minimum length of city name must be at least 3 letters.']
  },
  image: {
    type: String,
    require: [true, 'The image is required.'],
    validate: {
      validator: function (imageUrl) {
        return URL_REGEX.test(imageUrl)
      },
      message: "The image of the house must be URL."
    }
  },
  description: {
    type: String,
    require: [true, 'Description is required.'],
    minLength: [20, 'Description min length of symbols must be at least 20 symbols'],
    maxLength: [100, 'Description max length of symbols must be 100 symbols']
  },
  availablePieces: {
    type: String,
    require: [true, 'Available places is required.'],
    validate: {
      validator: function (numOfPlaces) {
        Number(numOfPlaces) > 0 && Number(numOfPlaces) <= 15
      },
      message: "The number of free places must be over 0 and bellow or equal to 15."
    }
  },
  owner: {
    type: Schema.Types.ObjectId,
    require: [true, 'The owner Id is required.'],
    ref: 'User'
  },
  rentedAHouse: {
    type: [Schema.Types.ObjectId],
    ref: 'User'
  },
});

propertySchema.statics.updateRentedHouse = async function (propertyId, userId) {
  try {
    const property = await this.findById(propertyId);
    if (!property)
      throw new Error('Property not found');
    if (property.rentedAHouse?.includes(userId))
      throw new Error('User has already rented this property');

    property.rentedAHouse.push(userId);
    return await property.save();
  } catch (error) {
    throw error;
  }
};

module.exports = model('Property', propertySchema);