const { ERROR_MESSAGES } = require("./config");

const Property = require('../model/property');
const { keyValueCheck } = require("./helpers");

exports.createPropertyService = (newHouseData) => {
  const isSomeFieldEmpty = keyValueCheck(newHouseData);

  if (isSomeFieldEmpty) throw ERROR_MESSAGES.emptyField;
  return new Property(newHouseData).save()
};

exports.getPropertiesService = () => Property.find();

exports.sortedPropertiesService = ({ limit, select }) => {
  return Property.find()
    .sort({ _id: -1 })
    .select(select)
    .limit(limit);
}

exports.getPropertyDetailsService = ({ propertyId, populateRow }) => {
  if (populateRow)
    return Property
      .findById(propertyId)
      .populate(populateRow);

  return Property
    .findById(propertyId);
};

exports.updatePropertyDetailsService = ({ propertyId, updatedData }) => {
  const isSomeFieldEmpty = keyValueCheck(updatedData);

  if (isSomeFieldEmpty) throw ERROR_MESSAGES.emptyField;
  return Property.findByIdAndUpdate(propertyId, updatedData)
};

exports.deletePropertyService = (propertyId) => Property.findByIdAndDelete(propertyId);

exports.rentPropertyService = ({ propertyId, userId }) => Property.updateRentedHouse(propertyId, userId)