'use strict';

// ═══════════════════════════════════════
// DecodeLabs P2 — Response Helpers
// Standard API response format
// ═══════════════════════════════════════

/**
 * Send a success response
 * @param {object} res        - Express response object
 * @param {number} statusCode - HTTP status code
 * @param {string} message    - Success message
 * @param {*}      data       - Response payload
 * @param {object} meta       - Optional metadata (pagination etc.)
 */
const sendSuccess = (res, statusCode = 200, message = 'Success', data = null, meta = null) => {
  const response = {
    success:   true,
    status:    statusCode,
    message,
    data,
    timestamp: new Date().toISOString(),
  };
  if (meta) response.meta = meta;
  return res.status(statusCode).json(response);
};

/**
 * Send an error response
 * @param {object} res        - Express response object
 * @param {number} statusCode - HTTP status code
 * @param {string} message    - Error message
 * @param {array}  errors     - Validation errors array
 */
const sendError = (res, statusCode = 500, message = 'Internal Server Error', errors = null) => {
  const response = {
    success:   false,
    status:    statusCode,
    message,
    timestamp: new Date().toISOString(),
  };
  if (errors) response.errors = errors;
  return res.status(statusCode).json(response);
};

// HTTP Status Codes — named constants
const STATUS = {
  OK:                  200,
  CREATED:             201,
  NO_CONTENT:          204,
  BAD_REQUEST:         400,
  UNAUTHORIZED:        401,
  FORBIDDEN:           403,
  NOT_FOUND:           404,
  CONFLICT:            409,
  UNPROCESSABLE:       422,
  TOO_MANY_REQUESTS:   429,
  INTERNAL_ERROR:      500,
};

module.exports = { sendSuccess, sendError, STATUS };
