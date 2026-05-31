'use strict';

// ═══════════════════════════════════════
// DecodeLabs P2 — Express App Setup
// ═══════════════════════════════════════

const express    = require('express');
const cors       = require('cors');
const helmet     = require('helmet');
const morgan     = require('morgan');
const rateLimit  = require('express-rate-limit');

const config     = require('./config/app.config');
const routes     = require('./routes/index');
const { notFound, errorHandler } = require('./middleware/errorHandler');
const { sendSuccess, STATUS }    = require('./utils/response');

const app = express();

// ── SECURITY MIDDLEWARE ──────────────────────────
app.use(helmet());

// ── CORS ─────────────────────────────────────────
app.use(cors({
  origin:  '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// ── RATE LIMITING ────────────────────────────────
const limiter = rateLimit({
  windowMs: config.rateLimit.windowMs,
  max:      config.rateLimit.max,
  message: {
    success:   false,
    status:    429,
    message:   'Too many requests. Please try again later.',
    timestamp: new Date().toISOString(),
  },
  standardHeaders: true,
  legacyHeaders:   false,
});
app.use(limiter);

// ── BODY PARSING ─────────────────────────────────
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// ── REQUEST LOGGING ──────────────────────────────
if (config.server.isDev) {
  app.use(morgan('dev'));
}

// ── ROOT ENDPOINT ────────────────────────────────
app.get('/', (req, res) => {
  sendSuccess(res, STATUS.OK, 'Welcome to DecodeLabs API', {
    name:        'DecodeLabs Backend API',
    project:     'Project 2 — Backend API Development',
    version:     config.api.version,
    docs:        `${req.protocol}://${req.get('host')}${config.api.prefix}`,
    health:      `${req.protocol}://${req.get('host')}${config.api.prefix}/health`,
    endpoints: {
      users:   `${config.api.prefix}/users`,
      posts:   `${config.api.prefix}/posts`,
      contact: `${config.api.prefix}/contact`,
      health:  `${config.api.prefix}/health`,
      stats:   `${config.api.prefix}/stats`,
    },
  });
});

// ── API ROUTES ───────────────────────────────────
app.use(config.api.prefix, routes);

// ── 404 + ERROR HANDLERS ─────────────────────────
app.use(notFound);
app.use(errorHandler);

module.exports = app;
