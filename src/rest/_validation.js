const Joi = require('joi');

const JOI_OPTIONS = {
  abortEarly: true,
  allowUnknown: false,
  context: true,
  convert: true,
  presence: 'requited',
  
};

const cleanupJoiError = (error) => error.details.reduce((resultObj, {
  message,
  path,
  type,
}) => {
  const joinedPath = path.join('.') || 'value';
  if (!resultObj[joinedPath]) {
    resultObj[joinedPath] = [];
  }
  resultObj[joinedPath].push({
    type,
    message,
  });

  return resultObj;
}, {});

const validate = (schema) => {
  if (!schema) { // validate(null)
    schema = {
      query: {},
      body: {},
      params: {}
    };
  }

  return (ctx, next) => {
    const errors = {};  
    if (!Joi.isSchema(schema.params)) {
      schema.params = Joi.object(schema.params || {}); // als params === undifiend, {} gebruiken
    }

    const {
      error: paramsError,
      value: paramsValue,
    } = schema.params.validate(
      ctx.params,
      JOI_OPTIONS,
    );

    if (paramsError) {
      errors.params = cleanupJoiError(paramsError);
    } else {
      ctx.params = paramsValue;
    }

    if (Object.keys(errors).length > 0) {
      ctx.throw(400, 'Validaton failed, check details for more information', {
        code: 'VALIDATION_FAILED',
        details: errors
      });
    }

    return next();
  };
};

module.exports = validate;