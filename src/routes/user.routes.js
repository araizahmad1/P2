'use strict';

// ═══════════════════════════════════════
// DecodeLabs P2 — User Routes
// Base: /api/v1/users
// ═══════════════════════════════════════

const router     = require('express').Router();
const controller = require('../controllers/user.controller');
const { validate }           = require('../middleware/validate');
const { validateCreateUser, validateUpdateUser } = require('../validators/user.validator');

// GET    /api/v1/users         → get all users
// POST   /api/v1/users         → create user
// GET    /api/v1/users/:id     → get one user
// PUT    /api/v1/users/:id     → update user
// DELETE /api/v1/users/:id     → delete user

router.get   ('/',    controller.getAllUsers);
router.post  ('/',    validate(validateCreateUser), controller.createUser);
router.get   ('/:id', controller.getUserById);
router.put   ('/:id', validate(validateUpdateUser), controller.updateUser);
router.delete('/:id', controller.deleteUser);

module.exports = router;
