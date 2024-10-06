
exports.keyValueCheck = (objectData) =>
  Object
    .keys(objectData)
    .some(key => !objectData[key]);
