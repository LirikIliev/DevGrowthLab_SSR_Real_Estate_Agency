const { ERROR_MESSAGES } = require("./config");

const Property = require('../model/property');
const { keyValueCheck } = require("./helpers");

exports.createHouseService = (newHouseData) => {
  const isSomeFieldEmpty = keyValueCheck(newHouseData);

  if (isSomeFieldEmpty) throw ERROR_MESSAGES.emptyField;
  return new Property(newHouseData).save()
};

exports.sortedPropertiesService = ({ limit }) =>
  Property.find()
    .sort({ _id: -1 })
    .select(['_id', 'image', 'description', 'name'])
    .limit(limit);

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