exports.errorsDecode = (error) => {
  if (error.name === 'ValidationError') {
    const validationErrors = Object
      .values(error.errors)
      .map(e => e.message)
      .join(', ')
    return ({ message: validationErrors });
  }

  if (error.code === 11000) {
    const field = Object.keys(error.keyPattern)[0];
    return ({ message: `${field.charAt(0).toUpperCase() + field.slice(1)} is already in use!` });
  }

  return error
};