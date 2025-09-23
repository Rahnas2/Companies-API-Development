const { httpStatusCodes } = require("../utils/httpStatusCodes");

exports.validateBody = (schema) => (req, res, next) => {
    const { error, value } = schema.validate(req.body, { abortEarly: false, stripUnknown: true });
    if (error) {
        const details = error.details.map(d => d.message);
        return res.status(httpStatusCodes.BAD_REQUEST).json({ message: 'Validation error', details });
    }
    req.body = value;
    next();
};

exports.validateParams = (schema) => (req, res, next) => {
    const { error } = schema.validate(req.params)
    if (error) {
        const details = error.details.map(d => d.message);
        return res.status(httpStatusCodes.BAD_REQUEST).json({ message: 'Validation error', details });
    }
    next()
}