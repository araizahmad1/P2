'use strict';

// ═══════════════════════════════════════════════
// DecodeLabs P3 — Post Controller
// Real PostgreSQL via Prisma (Neon)
// ═══════════════════════════════════════════════

const { prisma }               = require('../config/db');
const { sendSuccess, sendError, STATUS } = require('../utils/response');

// ── GET /posts ────────────────────────────────
// Filters: ?published=true, ?tag=css3, ?authorId=xyz
const getAllPosts = async (req, res, next) => {
  try {
    const where = {};

    // Filter: published
    if (req.query.published !== undefined) {
      where.published = req.query.published === 'true';
    }

    // Filter: authorId
    if (req.query.authorId) {
      where.authorId = req.query.authorId;
    }

    // Filter: tag (PostgreSQL array contains)
    if (req.query.tag) {
      where.tags = { has: req.query.tag.toLowerCase() };
    }

    const posts = await prisma.post.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      include: {
        author: {
          select: { id: true, name: true, email: true, role: true },
        },
      },
    });

    return sendSuccess(res, STATUS.OK, `${posts.length} post(s) found`, posts, {
      total:   posts.length,
      filters: req.query,
    });
  } catch (err) { next(err); }
};

// ── GET /posts/:id ────────────────────────────
const getPostById = async (req, res, next) => {
  try {
    const post = await prisma.post.findUnique({
      where:   { id: req.params.id },
      include: {
        author: { select: { id: true, name: true, email: true } },
      },
    });

    if (!post) return sendError(res, STATUS.NOT_FOUND, `Post "${req.params.id}" not found.`);
    return sendSuccess(res, STATUS.OK, 'Post found', post);
  } catch (err) { next(err); }
};

// ── POST /posts ───────────────────────────────
const createPost = async (req, res, next) => {
  try {
    const post = await prisma.post.create({
      data: {
        title:     req.body.title.trim(),
        content:   req.body.content.trim(),
        published: req.body.published || false,
        tags:      Array.isArray(req.body.tags)
                     ? req.body.tags.map(t => t.toLowerCase().trim())
                     : [],
        authorId:  req.body.authorId,
      },
      include: {
        author: { select: { id: true, name: true } },
      },
    });

    return sendSuccess(res, STATUS.CREATED, 'Post created successfully', post);
  } catch (err) { next(err); }
};

// ── PUT /posts/:id ────────────────────────────
const updatePost = async (req, res, next) => {
  try {
    const updated = await prisma.post.update({
      where: { id: req.params.id },
      data: {
        ...(req.body.title     !== undefined && { title:     req.body.title.trim()   }),
        ...(req.body.content   !== undefined && { content:   req.body.content.trim() }),
        ...(req.body.tags      !== undefined && { tags:      req.body.tags            }),
        ...(req.body.published !== undefined && { published: req.body.published       }),
      },
    });

    return sendSuccess(res, STATUS.OK, 'Post updated successfully', updated);
  } catch (err) { next(err); }
};

// ── DELETE /posts/:id ─────────────────────────
const deletePost = async (req, res, next) => {
  try {
    await prisma.post.delete({ where: { id: req.params.id } });
    return sendSuccess(res, STATUS.OK, 'Post deleted successfully', { id: req.params.id });
  } catch (err) { next(err); }
};

module.exports = { getAllPosts, getPostById, createPost, updatePost, deletePost };
