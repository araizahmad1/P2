'use strict';

// ═══════════════════════════════════════════════
// DecodeLabs P3 — Contact Controller
// Real PostgreSQL via Prisma (Neon)
// ═══════════════════════════════════════════════

const { prisma }               = require('../config/db');
const { sendSuccess, sendError, STATUS } = require('../utils/response');

// ── POST /contact ─────────────────────────────
// Frontend form submit → real database mein save
const submitContact = async (req, res, next) => {
  try {
    const contact = await prisma.contact.create({
      data: {
        name:    req.body.name.trim(),
        email:   req.body.email.toLowerCase().trim(),
        subject: req.body.subject.trim(),
        message: req.body.message.trim(),
        status:  'UNREAD',
      },
    });

    return sendSuccess(
      res,
      STATUS.CREATED,
      'Message received! We will get back to you within 24 hours.',
      { id: contact.id, name: contact.name, email: contact.email }
    );
  } catch (err) { next(err); }
};

// ── GET /contact ──────────────────────────────
const getAllContacts = async (req, res, next) => {
  try {
    // Filter by status: ?status=UNREAD
    const where = {};
    if (req.query.status) {
      where.status = req.query.status.toUpperCase();
    }

    const contacts = await prisma.contact.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });

    return sendSuccess(res, STATUS.OK, `${contacts.length} message(s) found`, contacts, {
      total: contacts.length,
    });
  } catch (err) { next(err); }
};

// ── PATCH /contact/:id/status ─────────────────
// Message ka status update karo (UNREAD → READ → REPLIED)
const updateContactStatus = async (req, res, next) => {
  try {
    const validStatuses = ['UNREAD', 'READ', 'REPLIED'];
    const status = req.body.status?.toUpperCase();

    if (!status || !validStatuses.includes(status)) {
      return sendError(res, STATUS.UNPROCESSABLE, 'Status must be: UNREAD, READ, or REPLIED');
    }

    const updated = await prisma.contact.update({
      where: { id: req.params.id },
      data:  { status },
    });

    return sendSuccess(res, STATUS.OK, `Status updated to ${status}`, updated);
  } catch (err) { next(err); }
};

module.exports = { submitContact, getAllContacts, updateContactStatus };
