'use strict';

// ═══════════════════════════════════════
// DecodeLabs P2 — Built-in API Tester
// Run: node src/utils/testApi.js
// ═══════════════════════════════════════

const http = require('http');

const BASE = 'http://localhost:5000/api/v1';
let passed = 0;
let failed = 0;

// ── Helper: make HTTP request ─────────
function request(method, path, body = null) {
  return new Promise((resolve, reject) => {
    const url     = new URL(BASE + path);
    const payload = body ? JSON.stringify(body) : null;
    const options = {
      hostname: url.hostname,
      port:     url.port || 80,
      path:     url.pathname + url.search,
      method,
      headers: {
        'Content-Type':   'application/json',
        'Content-Length': payload ? Buffer.byteLength(payload) : 0,
      },
    };

    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try { resolve({ status: res.statusCode, body: JSON.parse(data) }); }
        catch { resolve({ status: res.statusCode, body: data }); }
      });
    });
    req.on('error', reject);
    if (payload) req.write(payload);
    req.end();
  });
}

// ── Test helper ───────────────────────
async function test(label, fn, expectStatus) {
  try {
    const res = await fn();
    const ok  = res.status === expectStatus;
    if (ok) {
      console.log(`  ✅  ${label} → ${res.status}`);
      passed++;
    } else {
      console.log(`  ❌  ${label} → Expected ${expectStatus}, got ${res.status}`);
      console.log(`      Body: ${JSON.stringify(res.body).substring(0, 120)}`);
      failed++;
    }
  } catch (err) {
    console.log(`  ❌  ${label} → ERROR: ${err.message}`);
    failed++;
  }
}

// ── Run all tests ─────────────────────
async function runTests() {
  console.log('\n══════════════════════════════════════');
  console.log('  DecodeLabs P2 — API Test Suite');
  console.log('══════════════════════════════════════\n');

  // Health
  console.log('── Health ──────────────────────────');
  await test('GET  /health',  () => request('GET',  '/health'), 200);
  await test('GET  /stats',   () => request('GET',  '/stats'),  200);

  // Users
  console.log('\n── Users ───────────────────────────');
  await test('GET  /users',              () => request('GET', '/users'), 200);
  await test('GET  /users/u-001',        () => request('GET', '/users/u-001'), 200);
  await test('GET  /users/not-found',    () => request('GET', '/users/not-found'), 404);
  await test('POST /users (valid)',       () => request('POST', '/users', {
    name: 'Test User', email: 'test@decodelabs.dev', role: 'intern',
  }), 201);
  await test('POST /users (dup email)',   () => request('POST', '/users', {
    name: 'Test User', email: 'arham@decodelabs.dev',
  }), 409);
  await test('POST /users (invalid)',     () => request('POST', '/users', {
    name: 'A', email: 'not-an-email',
  }), 422);

  // Posts
  console.log('\n── Posts ───────────────────────────');
  await test('GET  /posts',              () => request('GET', '/posts'), 200);
  await test('GET  /posts?published=true',() => request('GET', '/posts?published=true'), 200);
  await test('GET  /posts?tag=css3',     () => request('GET', '/posts?tag=css3'), 200);
  await test('GET  /posts/p-001',        () => request('GET', '/posts/p-001'), 200);
  await test('GET  /posts/not-found',    () => request('GET', '/posts/not-found'), 404);
  await test('POST /posts (valid)',       () => request('POST', '/posts', {
    title: 'Test Post Title Here',
    content: 'This is the content of the test post, at least 10 chars.',
    tags: ['test', 'nodejs'],
    published: true,
  }), 201);
  await test('POST /posts (invalid)',     () => request('POST', '/posts', {
    title: 'Hi',
    content: 'Short',
  }), 422);

  // Contact
  console.log('\n── Contact ─────────────────────────');
  await test('POST /contact (valid)',     () => request('POST', '/contact', {
    name:    'John Doe',
    email:   'john@example.com',
    subject: 'Application Inquiry',
    message: 'I am interested in joining the DecodeLabs internship program.',
  }), 201);
  await test('POST /contact (invalid)',   () => request('POST', '/contact', {
    name: 'J', email: 'bad', subject: 'Hi', message: 'Short',
  }), 422);
  await test('GET  /contact',            () => request('GET', '/contact'), 200);

  // 404
  console.log('\n── Error Handling ──────────────────');
  await test('GET  /nonexistent route',  () => request('GET', '/nonexistent'), 404);

  // Summary
  console.log('\n══════════════════════════════════════');
  console.log(`  Results: ${passed} passed · ${failed} failed`);
  console.log(`  Score:   ${Math.round((passed / (passed + failed)) * 100)}%`);
  console.log('══════════════════════════════════════\n');

  process.exit(failed > 0 ? 1 : 0);
}

runTests().catch(err => {
  console.error('\n❌ Could not connect to server.');
  console.error('   Make sure the server is running: npm run dev\n');
  process.exit(1);
});
