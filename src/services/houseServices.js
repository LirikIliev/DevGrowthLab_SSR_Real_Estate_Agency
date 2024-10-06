const { ERROR_MESSAGES } = require("./config");

const House = require('../model/house');
const { keyValueCheck } = require("./helpers");

exports.createHouseService = (newHouseData) => {
  const isSomeFieldEmpty = keyValueCheck(newHouseData);

  if (isSomeFieldEmpty) throw ERROR_MESSAGES.emptyField
  return new House(newHouseData).save()
};