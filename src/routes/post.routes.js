'use strict';

// ═══════════════════════════════════════
// DecodeLabs P2 — Post Routes
// Base: /api/v1/posts
// ═══════════════════════════════════════

const router     = require('express').Router();
const controller = require('../controllers/post.controller');
const { validate }           = require('../middleware/validate');
const { validateCreatePost, validateUpdatePost } = require('../validators/post.validator');

// GET    /api/v1/posts           → get all posts (?published=true&tag=css3)
// POST   /api/v1/posts           → create post
// GET    /api/v1/posts/:id       → get one post
// PUT    /api/v1/posts/:id       → update post
// DELETE /api/v1/posts/:id       → delete post

router.get   ('/',    controller.getAllPosts);
router.post  ('/',    validate(validateCreatePost), controller.createPost);
router.get   ('/:id', controller.getPostById);
router.put   ('/:id', validate(validateUpdatePost), controller.updatePost);
router.delete('/:id', controller.deletePost);

module.exports = router;
