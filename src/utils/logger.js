'use strict';

// ═══════════════════════════════════════
// DecodeLabs P2 — Logger Utility
// ═══════════════════════════════════════

const colors = {
  reset:  '\x1b[0m',
  green:  '\x1b[32m',
  yellow: '\x1b[33m',
  red:    '\x1b[31m',
  blue:   '\x1b[34m',
  cyan:   '\x1b[36m',
  grey:   '\x1b[90m',
  bold:   '\x1b[1m',
};

const timestamp = () => new Date().toLocaleTimeString('en-US', { hour12: false });

const logger = {
  info:    (msg) => console.log(`${colors.cyan}[${timestamp()}]${colors.reset} ${colors.blue}INFO${colors.reset}  ${msg}`),
  success: (msg) => console.log(`${colors.cyan}[${timestamp()}]${colors.reset} ${colors.green}✓ OK${colors.reset}   ${msg}`),
  warn:    (msg) => console.log(`${colors.cyan}[${timestamp()}]${colors.reset} ${colors.yellow}WARN${colors.reset}  ${msg}`),
  error:   (msg) => console.log(`${colors.cyan}[${timestamp()}]${colors.reset} ${colors.red}ERROR${colors.reset} ${msg}`),
  server:  (msg) => console.log(`${colors.bold}${colors.green}${msg}${colors.reset}`),
  divider: ()    => console.log(`${colors.grey}${'─'.repeat(55)}${colors.reset}`),
};

module.exports = logger;
