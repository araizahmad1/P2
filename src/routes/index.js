'use strict';

// ═══════════════════════════════════════════════
// DecodeLabs P2+P3 — Master Router
// ═══════════════════════════════════════════════

const router              = require('express').Router();
const { prisma }          = require('../config/db');        // ← Prisma (naya)
const { sendSuccess, STATUS } = require('../utils/response');
const { validate }        = require('../middleware/validate');

const {
  validateCreateUser, validateUpdateUser,
} = require('../validators/user.validator');

const {
  validateCreatePost, validateUpdatePost,
} = require('../validators/post.validator');

const {
  validateContact,
} = require('../validators/contact.validator');

const userCtrl    = require('../controllers/user.controller');
const postCtrl    = require('../controllers/post.controller');
const contactCtrl = require('../controllers/contact.controller');

// ── API ROOT REDIRECT ─────────────────────────
router.get('/', (req, res) => {
  res.redirect('/');
});

// ── USERS ─────────────────────────────────────
router.get   ('/users',     userCtrl.getAllUsers);
router.post  ('/users',     validate(validateCreateUser), userCtrl.createUser);
router.get   ('/users/:id', userCtrl.getUserById);
router.put   ('/users/:id', validate(validateUpdateUser), userCtrl.updateUser);
router.delete('/users/:id', userCtrl.deleteUser);

// ── POSTS ─────────────────────────────────────
router.get   ('/posts',     postCtrl.getAllPosts);
router.post  ('/posts',     validate(validateCreatePost), postCtrl.createPost);
router.get   ('/posts/:id', postCtrl.getPostById);
router.put   ('/posts/:id', validate(validateUpdatePost), postCtrl.updatePost);
router.delete('/posts/:id', postCtrl.deletePost);

// ── CONTACT ───────────────────────────────────
router.get   ('/contact',            contactCtrl.getAllContacts);
router.post  ('/contact',            validate(validateContact), contactCtrl.submitContact);
router.patch ('/contact/:id/status', contactCtrl.updateContactStatus);

// ── HEALTH ────────────────────────────────────
router.get('/health', async (req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    sendSuccess(res, STATUS.OK, 'API healthy — Neon DB connected ✓', {
      status:    'online',
      database:  'Neon PostgreSQL ✓',
      uptime:    `${Math.floor(process.uptime())}s`,
      timestamp: new Date().toISOString(),
      memory:    `${Math.round(process.memoryUsage().heapUsed / 1024 / 1024)}MB`,
    });
  } catch {
    sendSuccess(res, 503, 'API running but DB connection failed', {
      database: 'disconnected ✗',
    });
  }
});

// ── STATS ─────────────────────────────────────
router.get('/stats', async (req, res, next) => {
  try {
    const [users, posts, contacts, unread] = await Promise.all([
      prisma.user.count(),
      prisma.post.count(),
      prisma.contact.count(),
      prisma.contact.count({ where: { status: 'UNREAD' } }),
    ]);

    sendSuccess(res, STATUS.OK, 'Database statistics', {
      users,
      posts,
      contacts,
      unreadMessages: unread,
    });
  } catch (err) { next(err); }
});

module.exports = router;