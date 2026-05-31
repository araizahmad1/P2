<div align="center">

```
██████╗ ███████╗ ██████╗ ██████╗ ██████╗ ███████╗██╗      █████╗ ██████╗ ███████╗
██╔══██╗██╔════╝██╔════╝██╔═══██╗██╔══██╗██╔════╝██║     ██╔══██╗██╔══██╗██╔════╝
██║  ██║█████╗  ██║     ██║   ██║██║  ██║█████╗  ██║     ███████║██████╔╝███████╗
██║  ██║██╔══╝  ██║     ██║   ██║██║  ██║██╔══╝  ██║     ██╔══██║██╔══██╗╚════██║
██████╔╝███████╗╚██████╗╚██████╔╝██████╔╝███████╗███████╗██║  ██║██████╔╝███████║
╚═════╝ ╚══════╝ ╚═════╝ ╚═════╝ ╚═════╝ ╚══════╝╚══════╝╚═╝  ╚═╝╚═════╝ ╚══════╝
```

<h1>Project 2 + 3 — Backend API & Database Integration</h1>

<p><em>A production-grade RESTful API built with Node.js + Express,<br/>connected to Neon PostgreSQL via Prisma ORM.</em></p>

<br/>

[![Node.js](https://img.shields.io/badge/Node.js-18.x-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org)
[![Express](https://img.shields.io/badge/Express-4.x-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Neon-00E599?style=for-the-badge&logo=postgresql&logoColor=white)](https://neon.tech)
[![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748?style=for-the-badge&logo=prisma&logoColor=white)](https://prisma.io)
[![License](https://img.shields.io/badge/License-MIT-C9A84C?style=for-the-badge)](./LICENSE)

<br/>

[![API Live](https://img.shields.io/badge/📡_API_Live-View_Endpoints-339933?style=for-the-badge)](https://YOUR-RENDER-URL.onrender.com/api/v1/health)
[![GitHub](https://img.shields.io/badge/💻_GitHub-Source_Code-24292e?style=for-the-badge&logo=github)](https://github.com/araizahmad1/decodelabs)

<br/>

---

</div>

## 📋 Table of Contents

- [Overview](#-overview)
- [Project Evolution](#-project-evolution-p2--p3)
- [API Endpoints](#-api-endpoints)
- [Database Schema](#-database-schema)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Architecture](#-architecture)
- [Security](#-security)
- [Screenshots](#-screenshots)
- [Roadmap](#-roadmap)
- [Author](#-author)

<br/>

---

## 🎯 Overview

This covers **Project 2 and Project 3** of the **DecodeLabs Full-Stack Internship Program.**

**Project 2** — Built a RESTful backend API with Node.js + Express. Full CRUD endpoints, input validation, error handling, rate limiting, and security middleware. Connected to the P1 frontend.

**Project 3** — Upgraded from in-memory storage to a real **Neon PostgreSQL** cloud database using **Prisma ORM**. Data now persists permanently with proper relations and type-safe queries.

> **Result: A complete full-stack application — Frontend ↔ Backend ↔ Database**

<br/>

---

## 📈 Project Evolution — P2 → P3

| Feature | Project 2 | Project 3 |
|---|---|---|
| Data Storage | RAM (in-memory) | Neon PostgreSQL ✅ |
| Server Restart | Data lost ❌ | Data persists ✅ |
| Relations | None | User → Posts ✅ |
| Queries | Custom JS arrays | Prisma ORM ✅ |
| Type Safety | Manual | Prisma Client ✅ |
| Cloud DB | None | Neon Serverless ✅ |

<br/>

---

## 📡 API Endpoints

### Health & Stats
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/v1/health` | Health check + DB ping |
| GET | `/api/v1/stats` | Database statistics |

### Users
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/v1/users` | Get all users |
| POST | `/api/v1/users` | Create user |
| GET | `/api/v1/users/:id` | Get user + their posts |
| PUT | `/api/v1/users/:id` | Update user |
| DELETE | `/api/v1/users/:id` | Delete user |

### Posts
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/v1/posts` | Get all posts |
| POST | `/api/v1/posts` | Create post |
| GET | `/api/v1/posts/:id` | Get post + author |
| PUT | `/api/v1/posts/:id` | Update post |
| DELETE | `/api/v1/posts/:id` | Delete post |

> Filters supported: `?published=true` · `?tag=css3` · `?authorId=xyz`

### Contact
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/v1/contact` | Submit contact form |
| GET | `/api/v1/contact` | Get all messages |
| PATCH | `/api/v1/contact/:id/status` | Update message status |

<br/>

---

## 🗄️ Database Schema

```
┌──────────────────┐         ┌──────────────────┐
│      User        │         │      Post        │
├──────────────────┤         ├──────────────────┤
│ id (uuid PK)     │──────── │ id (uuid PK)     │
│ name             │    1:N  │ title            │
│ email (unique)   │         │ content          │
│ role (enum)      │         │ published        │
│ bio              │         │ tags (array)     │
│ createdAt        │         │ authorId (FK)    │
│ updatedAt        │         │ createdAt        │
└──────────────────┘         │ updatedAt        │
                             └──────────────────┘

┌──────────────────┐
│    Contact       │
├──────────────────┤
│ id (uuid PK)     │
│ name             │
│ email            │
│ subject          │
│ message          │
│ status (enum)    │
│ createdAt        │
└──────────────────┘

Enums:
Role    → ADMIN · MENTOR · INTERN
Status  → UNREAD · READ · REPLIED
```

<br/>

---

## 🛠 Tech Stack

```
Runtime      →  Node.js 18.x
Framework    →  Express.js 4.x
Database     →  Neon PostgreSQL (Serverless)
ORM          →  Prisma 5.x
Security     →  Helmet · CORS · Rate Limiting
Logging      →  Morgan
Deployment   →  Render (Backend) + Vercel (Frontend)
```

<br/>

---

## 📁 Project Structure

```
P2/
├── 📁 prisma/
│   ├── schema.prisma          # Database schema + relations
│   └── seed.js                # Sample data seeder
│
├── 📁 src/
│   ├── 📁 config/
│   │   ├── app.config.js      # Environment configuration
│   │   └── db.js              # Prisma client singleton
│   │
│   ├── 📁 controllers/
│   │   ├── user.controller.js      # User CRUD logic
│   │   ├── post.controller.js      # Post CRUD logic
│   │   └── contact.controller.js   # Contact form logic
│   │
│   ├── 📁 middleware/
│   │   ├── validate.js             # Validation middleware factory
│   │   └── errorHandler.js         # Global error handler
│   │
│   ├── 📁 models/
│   │   └── db.js                   # (Replaced by Prisma in P3)
│   │
│   ├── 📁 routes/
│   │   └── index.js                # All routes + health + stats
│   │
│   ├── 📁 validators/
│   │   ├── user.validator.js       # User input rules
│   │   ├── post.validator.js       # Post input rules
│   │   └── contact.validator.js    # Contact input rules
│   │
│   ├── 📁 utils/
│   │   ├── response.js             # Standard JSON responses
│   │   ├── logger.js               # Colored terminal logger
│   │   └── testApi.js              # Built-in API tester
│   │
│   ├── app.js                      # Express app setup
│   └── server.js                   # Entry point
│
├── .env.example                    # Environment template
├── .gitignore
├── package.json
└── README.md
```

<br/>

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- Neon PostgreSQL account (free at neon.tech)

### Installation

```bash
# 1. Clone
git clone https://github.com/araizahmad1/decodelabs.git
cd decodelabs/P2

# 2. Install dependencies
npm install

# 3. Setup environment
cp .env.example .env
# .env mein DATABASE_URL daalo (Neon se copy karo)

# 4. Database setup
npm run db:generate    # Prisma client generate
npm run db:push        # Tables create karo
npm run db:seed        # Sample data daalo

# 5. Run
npm run dev
```

Server starts at: `http://localhost:5000`

### Prisma Commands

```bash
npm run db:generate   # Client generate (schema change ke baad)
npm run db:push       # Schema → Database sync
npm run db:studio     # Visual DB browser (port 5555)
npm run db:seed       # Sample data daalo
npm test              # API test suite chalao
```

<br/>

---

## 🏗️ Architecture

```
Request Flow:
─────────────────────────────────────────────────

Frontend (P1)
    │
    │  fetch('/api/v1/contact', { method: 'POST' })
    │
    ▼
Express Server (Port 5000)
    │
    ├── helmet()         → Security headers
    ├── cors()           → Cross-origin allow
    ├── rateLimit()      → 100 req/15min
    ├── express.json()   → Body parse
    └── morgan()         → Request logging
    │
    ▼
Router (routes/index.js)
    │
    ▼
Middleware (validate.js)
    │  → Run validator function
    │  → Errors? Return 422
    │  → OK? Call next()
    │
    ▼
Controller (contact.controller.js)
    │
    ▼
Prisma ORM
    │
    ▼
Neon PostgreSQL (Cloud)
    │
    ▼
Response → { success, status, message, data }
    │
    ▼
Frontend shows Toast Notification ✅
```

<br/>

---

## 🔒 Security

| Feature | Implementation |
|---|---|
| Security Headers | Helmet.js — 15+ headers |
| CORS | Configured for frontend origin |
| Rate Limiting | 100 requests per 15 minutes |
| Body Size Limit | 10KB max payload |
| Input Validation | Frontend + Backend dual validation |
| Error Handling | Prisma errors + global handler |
| Secrets | `.env` file — never committed |

<br/>

---

## 📊 Standard API Response Format

### Success
```json
{
  "success":   true,
  "status":    200,
  "message":   "1 message(s) found",
  "data":      { ... },
  "timestamp": "2026-05-11T18:46:23.062Z",
  "meta":      { "total": 1 }
}
```

### Error
```json
{
  "success":   false,
  "status":    422,
  "message":   "Validation failed.",
  "errors": [
    { "field": "email", "message": "Valid email required." }
  ],
  "timestamp": "2026-05-11T18:46:23.062Z"
}
```

<br/>

---

## 📸 Screenshots

| API Health Check | Database Stats |
|---|---|
| ![Health](./assets/health.png) | ![Stats](./assets/stats.png) |

| Neon Dashboard | Tables |
|---|---|
| ![Neon](./assets/neon.png) | ![Tables](./assets/tables.png) |

<br/>

---

## 🗺 Roadmap

```
✅  Project 1 — Responsive Frontend Interface
✅  Project 2 — Backend API Development
✅  Project 3 — Database Integration (Neon + Prisma)
⬜  Project 4 — React Application
⬜  Project 5 — Full-Stack Integration + Deploy
⬜  Project 6 — Capstone Product
```

**Future improvements:**
- [ ] JWT Authentication
- [ ] Pagination on GET endpoints
- [ ] File upload support
- [ ] Email notifications (Nodemailer)
- [ ] API documentation (Swagger)

<br/>

---

## 👨‍💻 Author

<div align="center">

**Araiz Ahmad**

[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/YOUR-PROFILE)
[![GitHub](https://img.shields.io/badge/GitHub-Follow-24292e?style=for-the-badge&logo=github&logoColor=white)](https://github.com/araizahmad1)

*Intern @ DecodeLabs · Full-Stack Developer in Training*

</div>

<br/>

---

<div align="center">

**Backend built with precision. Database connected with confidence.**

*DecodeLabs Internship — Project 2 + 3 of 6*

⭐ **Star this repo if it helped you!** ⭐

`Node.js · Express · Prisma · Neon PostgreSQL · REST API · Full Stack`

</div>
