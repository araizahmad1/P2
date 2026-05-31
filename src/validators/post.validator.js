'use strict';

// ═══════════════════════════════════════
// DecodeLabs P2 — Post Validators
// ═══════════════════════════════════════

const validateCreatePost = (body) => {
  const errors = [];

  // title
  if (!body.title || typeof body.title !== 'string' || body.title.trim().length < 3) {
    errors.push({ field: 'title', message: 'Title is required and must be at least 3 characters.' });
  }
  if (body.title && body.title.trim().length > 150) {
    errors.push({ field: 'title', message: 'Title must not exceed 150 characters.' });
  }

  // content
  if (!body.content || typeof body.content !== 'string' || body.content.trim().length < 10) {
    errors.push({ field: 'content', message: 'Content is required and must be at least 10 characters.' });
  }
  if (body.content && body.content.trim().length > 10000) {
    errors.push({ field: 'content', message: 'Content must not exceed 10,000 characters.' });
  }

  // tags (optional array)
  if (body.tags !== undefined) {
    if (!Array.isArray(body.tags)) {
      errors.push({ field: 'tags', message: 'Tags must be an array of strings.' });
    } else if (body.tags.length > 10) {
      errors.push({ field: 'tags', message: 'Maximum 10 tags allowed.' });
    } else {
      body.tags.forEach((tag, i) => {
        if (typeof tag !== 'string' || tag.trim().length === 0) {
          errors.push({ field: `tags[${i}]`, message: 'Each tag must be a non-empty string.' });
        }
      });
    }
  }

  // published (optional boolean)
  if (body.published !== undefined && typeof body.published !== 'boolean') {
    errors.push({ field: 'published', message: 'Published must be a boolean (true or false).' });
  }

  return errors;
};

const validateUpdatePost = (body) => {
  const errors = [];

  if (body.title !== undefined) {
    if (typeof body.title !== 'string' || body.title.trim().length < 3) {
      errors.push({ field: 'title', message: 'Title must be at least 3 characters.' });
    }
    if (body.title.trim().length > 150) {
      errors.push({ field: 'title', message: 'Title must not exceed 150 characters.' });
    }
  }

  if (body.content !== undefined && body.content.trim().length < 10) {
    errors.push({ field: 'content', message: 'Content must be at least 10 characters.' });
  }

  if (body.tags !== undefined && !Array.isArray(body.tags)) {
    errors.push({ field: 'tags', message: 'Tags must be an array.' });
  }

  if (body.published !== undefined && typeof body.published !== 'boolean') {
    errors.push({ field: 'published', message: 'Published must be true or false.' });
  }

  return errors;
};

module.exports = { validateCreatePost, validateUpdatePost };
