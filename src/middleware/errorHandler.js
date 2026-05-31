'use strict';

const logger = require('../utils/logger');
const { sendError, STATUS } = require('../utils/response');
const config = require('../config/app.config');

const notFound = (req, res, next) => {
  const error  = new Error(`Route not found: ${req.method} ${req.originalUrl}`);
  error.status = STATUS.NOT_FOUND;
  next(error);
};

const errorHandler = (err, req, res, next) => {
  let statusCode = err.status || err.statusCode || STATUS.INTERNAL_ERROR;
  let message    = err.message || 'Something went wrong';

  // Prisma — duplicate value (email already exists)
  if (err.code === 'P2002') {
    statusCode = STATUS.CONFLICT;
    message    = `${err.meta?.target?.[0] || 'Field'} already exists.`;
  }

  // Prisma — record not found
  if (err.code === 'P2025') {
    statusCode = STATUS.NOT_FOUND;
    message    = 'Record not found in database.';
  }

  logger.error(`${statusCode} — ${message}`);

  if (config.server.isDev) {
    return res.status(statusCode).json({
      success: false, status: statusCode,
      message, stack: err.stack,
      timestamp: new Date().toISOString(),
    });
  }

  return sendError(res, statusCode, message);
};

module.exports = { notFound, errorHandler };