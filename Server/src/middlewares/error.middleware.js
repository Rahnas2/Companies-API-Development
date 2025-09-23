const { httpStatusCodes } = require('../utils/httpStatusCodes');

exports.notFound = (req, res, next) => {
res.status(httpStatusCodes.NOT_FOUND).json({ message: 'Route not found' });
};


exports.errorHandler = (err, req, res, next) => {
console.error(err);
const status = err.status || httpStatusCodes.INTERNAL_SERVER_ERROR;
res.status(status).json({ message: err.message || 'Server Error' });
};