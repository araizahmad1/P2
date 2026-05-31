'use strict';

// ═══════════════════════════════════════
// DecodeLabs P2 — Validation Middleware
// ═══════════════════════════════════════

const { sendError, STATUS } = require('../utils/response');

/**
 * Middleware factory — runs a validator function and
 * returns 422 if there are any errors.
 * @param {Function} validatorFn  — validator that returns errors[]
 */
const validate = (validatorFn) => (req, res, next) => {
  const errors = validatorFn(req.body);
  if (errors.length > 0) {
    return sendError(
      res,
      STATUS.UNPROCESSABLE,
      'Validation failed. Please check your input.',
      errors
    );
  }
  next();
};

module.exports = { validate };
