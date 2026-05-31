'use strict';

// ═══════════════════════════════════════
// DecodeLabs P2 — Contact Routes
// Base: /api/v1/contact
// ═══════════════════════════════════════

const router     = require('express').Router();
const controller = require('../controllers/contact.controller');
const { validate }        = require('../middleware/validate');
const { validateContact } = require('../validators/contact.validator');

// POST  /api/v1/contact   → submit contact form
// GET   /api/v1/contact   → get all messages (admin)

router.post('/', validate(validateContact), controller.submitContact);
router.get ('/', controller.getAllContacts);

module.exports = router;
