'use strict';

// ═══════════════════════════════════════
// DecodeLabs P2 — App Configuration
// ═══════════════════════════════════════

require('dotenv').config();

const config = {
  server: {
    port:     parseInt(process.env.PORT, 10) || 5000,
    env:      process.env.NODE_ENV || 'development',
    isDev:    process.env.NODE_ENV !== 'production',
  },
  api: {
    version: process.env.API_VERSION || 'v1',
    prefix:  process.env.API_PREFIX  || '/api/v1',
  },
  rateLimit: {
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS, 10) || 15 * 60 * 1000,
    max:      parseInt(process.env.RATE_LIMIT_MAX, 10)        || 100,
  },
};

module.exports = config;
