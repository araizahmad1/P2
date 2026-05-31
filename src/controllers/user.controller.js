'use strict';

// ═══════════════════════════════════════════════
// DecodeLabs P3 — User Controller
// Real PostgreSQL via Prisma (Neon)
// ═══════════════════════════════════════════════

const { prisma }               = require('../config/db');
const { sendSuccess, sendError, STATUS } = require('../utils/response');

// ── GET /users ────────────────────────────────
// SELECT * FROM users ORDER BY createdAt DESC
const getAllUsers = async (req, res, next) => {
  try {
    const users = await prisma.user.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        _count: { select: { posts: true } }, // har user ke kitne posts hain
      },
    });

    return sendSuccess(res, STATUS.OK, `${users.length} user(s) found`, users, {
      total: users.length,
    });
  } catch (err) { next(err); }
};

// ── GET /users/:id ────────────────────────────
const getUserById = async (req, res, next) => {
  try {
    const user = await prisma.user.findUnique({
      where:   { id: req.params.id },
      include: { posts: { orderBy: { createdAt: 'desc' } } },
    });

    if (!user) return sendError(res, STATUS.NOT_FOUND, `User "${req.params.id}" not found.`);
    return sendSuccess(res, STATUS.OK, 'User found', user);
  } catch (err) { next(err); }
};

// ── POST /users ───────────────────────────────
// INSERT INTO users (name, email, role, bio) VALUES (...)
const createUser = async (req, res, next) => {
  try {
    const user = await prisma.user.create({
      data: {
        name:  req.body.name.trim(),
        email: req.body.email.toLowerCase().trim(),
        role:  req.body.role  || 'INTERN',
        bio:   req.body.bio   || null,
      },
    });

    return sendSuccess(res, STATUS.CREATED, 'User created successfully', user);
  } catch (err) { next(err); } // Prisma P2002 = duplicate email → errorHandler handle karega
};

// ── PUT /users/:id ────────────────────────────
// UPDATE users SET ... WHERE id = ?
const updateUser = async (req, res, next) => {
  try {
    const updated = await prisma.user.update({
      where: { id: req.params.id },
      data: {
        ...(req.body.name && { name: req.body.name.trim()  }),
        ...(req.body.bio  !== undefined && { bio: req.body.bio }),
        ...(req.body.role && { role: req.body.role }),
      },
    });

    return sendSuccess(res, STATUS.OK, 'User updated successfully', updated);
  } catch (err) { next(err); } // Prisma P2025 = not found → errorHandler handle karega
};

// ── DELETE /users/:id ─────────────────────────
// DELETE FROM users WHERE id = ?
const deleteUser = async (req, res, next) => {
  try {
    await prisma.user.delete({ where: { id: req.params.id } });
    return sendSuccess(res, STATUS.OK, 'User deleted successfully', { id: req.params.id });
  } catch (err) { next(err); }
};

module.exports = { getAllUsers, getUserById, createUser, updateUser, deleteUser };
