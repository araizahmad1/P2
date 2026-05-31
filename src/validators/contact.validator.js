'use strict';

// ═══════════════════════════════════════
// DecodeLabs P2 — Contact Validators
// ═══════════════════════════════════════

const validateContact = (body) => {
  const errors = [];
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // name
  if (!body.name || typeof body.name !== 'string' || body.name.trim().length < 2) {
    errors.push({ field: 'name', message: 'Name is required and must be at least 2 characters.' });
  }

  // email
  if (!body.email || !emailRegex.test(body.email)) {
    errors.push({ field: 'email', message: 'A valid email address is required.' });
  }

  // subject
  if (!body.subject || typeof body.subject !== 'string' || body.subject.trim().length < 3) {
    errors.push({ field: 'subject', message: 'Subject is required and must be at least 3 characters.' });
  }
  if (body.subject && body.subject.trim().length > 150) {
    errors.push({ field: 'subject', message: 'Subject must not exceed 150 characters.' });
  }

  // message
  if (!body.message || typeof body.message !== 'string' || body.message.trim().length < 10) {
    errors.push({ field: 'message', message: 'Message is required and must be at least 10 characters.' });
  }
  if (body.message && body.message.trim().length > 2000) {
    errors.push({ field: 'message', message: 'Message must not exceed 2000 characters.' });
  }

  return errors;
};

module.exports = { validateContact };
