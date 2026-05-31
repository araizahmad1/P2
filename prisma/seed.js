'use strict';

// ═══════════════════════════════════════════════
// DecodeLabs P3 — Database Seed
// Run: npm run db:seed
// Database mein sample data daalta hai
// ═══════════════════════════════════════════════

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // ── Purana data clean karo ──
  await prisma.post.deleteMany();
  await prisma.contact.deleteMany();
  await prisma.user.deleteMany();
  console.log('✓ Cleared existing data');

  // ── Users create karo ──
  const arham = await prisma.user.create({
    data: {
      name:  'Arham Khalid',
      email: 'arham@decodelabs.dev',
      role:  'ADMIN',
      bio:   'Lead mentor at DecodeLabs',
    },
  });

  const sara = await prisma.user.create({
    data: {
      name:  'Sara Malik',
      email: 'sara@decodelabs.dev',
      role:  'MENTOR',
      bio:   'Backend mentor at DecodeLabs',
    },
  });

  const zaid = await prisma.user.create({
    data: {
      name:  'Zaid Hassan',
      email: 'zaid@decodelabs.dev',
      role:  'INTERN',
      bio:   'Full-stack intern — Cohort 2025',
    },
  });

  console.log(`✓ Created ${3} users`);

  // ── Posts create karo ──
  await prisma.post.createMany({
    data: [
      {
        title:     'Getting Started with HTML5 Semantics',
        content:   'Semantic HTML is the foundation of accessible, well-structured web pages. Learn why it matters and how to implement it correctly in your projects.',
        published: true,
        tags:      ['html5', 'accessibility', 'frontend'],
        authorId:  arham.id,
      },
      {
        title:     'CSS Grid vs Flexbox — When to Use Which',
        content:   'Understanding the difference between CSS Grid and Flexbox is key to building responsive layouts efficiently without fighting the browser.',
        published: true,
        tags:      ['css3', 'grid', 'flexbox', 'layout'],
        authorId:  sara.id,
      },
      {
        title:     'Introduction to Node.js and Express',
        content:   'Node.js allows JavaScript to run on the server. Express makes it simple to build robust APIs quickly with minimal configuration.',
        published: false,
        tags:      ['nodejs', 'express', 'backend', 'api'],
        authorId:  arham.id,
      },
      {
        title:     'PostgreSQL with Prisma ORM',
        content:   'Prisma makes database operations clean, type-safe, and readable. Learn how to connect Neon PostgreSQL with your Node.js backend.',
        published: true,
        tags:      ['postgresql', 'prisma', 'database', 'neon'],
        authorId:  zaid.id,
      },
    ],
  });

  console.log(`✓ Created ${4} posts`);

  // ── Sample Contact ──
  await prisma.contact.create({
    data: {
      name:    'Test User',
      email:   'test@example.com',
      subject: 'Internship Application — beginner',
      message: 'I am interested in joining the DecodeLabs internship program.',
      status:  'UNREAD',
    },
  });

  console.log(`✓ Created 1 contact`);
  console.log('\n✅ Database seeded successfully!\n');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
