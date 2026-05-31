'use strict';

// ═══════════════════════════════════════
// DecodeLabs P2 — User Validators
// ═══════════════════════════════════════

const VALID_ROLES = ['admin', 'mentor', 'intern'];

// Validate create user input
const validateCreateUser = (body) => {
  const errors = [];

  // name
  if (!body.name || typeof body.name !== 'string' || body.name.trim().length < 2) {
    errors.push({ field: 'name', message: 'Name is required and must be at least 2 characters.' });
  }
  if (body.name && body.name.trim().length > 60) {
    errors.push({ field: 'name', message: 'Name must not exceed 60 characters.' });
  }

  // email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!body.email || !emailRegex.test(body.email)) {
    errors.push({ field: 'email', message: 'A valid email address is required.' });
  }

  // role (optional but must be valid if provided)
  if (body.role && !VALID_ROLES.includes(body.role)) {
    errors.push({ field: 'role', message: `Role must be one of: ${VALID_ROLES.join(', ')}.` });
  }

  // bio (optional, max length)
  if (body.bio && body.bio.length > 300) {
    errors.push({ field: 'bio', message: 'Bio must not exceed 300 characters.' });
  }

  return errors;
};

// Validate update user input
const validateUpdateUser = (body) => {
  const errors = [];

  if (body.name !== undefined) {
    if (typeof body.name !== 'string' || body.name.trim().length < 2) {
      errors.push({ field: 'name', message: 'Name must be at least 2 characters.' });
    }
    if (body.name.trim().length > 60) {
      errors.push({ field: 'name', message: 'Name must not exceed 60 characters.' });
    }
  }

  if (body.role !== undefined && !VALID_ROLES.includes(body.role)) {
    errors.push({ field: 'role', message: `Role must be one of: ${VALID_ROLES.join(', ')}.` });
  }

  if (body.bio !== undefined && body.bio.length > 300) {
    errors.push({ field: 'bio', message: 'Bio must not exceed 300 characters.' });
  }

  return errors;
};

module.exports = { validateCreateUser, validateUpdateUser };
