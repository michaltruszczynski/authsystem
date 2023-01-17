const { validationResult } = require('express-validator');

const defaultErrorMessage = 'Input data validation failed';

const dataErrorHandler = (req, res, next) => {
      const errors = validationResult(req);
      console.log('errors', errors.isEmpty(), errors);

      if (errors.isEmpty()) return next();

      if (!req.dataError) {
            req.dataError = errors.array();
            return next();
      }

      req.dataError = req.dataError.concat(errors.array());

      next();
}


const throwError = (errorMessage = defaultErrorMessage ) => (req, res, next) => {
      if (!req.dataError) return next();

      const error = new Error(errorMessage)
      error.statusCode = 422;
      error.data = [...req.dataError];

      throw error;
}

module.exports = {
      dataErrorHandler,
      throwError
}