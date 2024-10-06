const { ERROR_MESSAGES } = require("./config");

const Property = require('../model/property');
const { keyValueCheck } = require("./helpers");

exports.createHouseService = (newHouseData) => {
  const isSomeFieldEmpty = keyValueCheck(newHouseData);

  if (isSomeFieldEmpty) throw ERROR_MESSAGES.emptyField
  return new Property(newHouseData).save()
};

exports.sortedPropertiesService = ({ limit }) =>
  Property.find()
    .sort({ _id: -1 })
    .select(['_id', 'image', 'description', 'name'])
    .limit(limit);

exports.getPropertyDetailsService = (propertyId) =>
  Property
    .findById(propertyId)
    .populate('owner');
