# 🩺 Healthcare Android App Backend – Node.js + MySQL

A secure, scalable backend system designed to support a healthcare Android app used by frontline health workers. It enables patient registration, checkups, medicines/disease tracking, offline sync, role-based access control, and more.

---

## 📚 Table of Contents

- [Project Overview](#project-overview)
- [System Features](#system-features)
- [Tech Stack](#tech-stack)
- [Folder Structure](#folder-structure)
- [API Documentation](#api-documentation)
- [Security Measures](#security-measures)
- [Rate Limiting Strategy](#rate-limiting-strategy)
- [Offline Sync Logic](#offline-sync-logic)
- [Database Schema](#database-schema)
- [System Design Diagrams](#system-design-diagrams)
- [Setup Instructions](#setup-instructions)
- [Deliverables](#deliverables)
- [Contributors](#contributors)

---

## 🧩 Project Overview

This backend supports a health application used by field nurses to:

- Register pregnant women, children, and other patients
- Record medical checkups, diseases, and prescribed medicines
- Sync data offline ↔ online
- Provide secure, scalable, and fast interactions (up to 2,000 req/sec)

---

## 🚀 System Features

- ✅ JWT-based authentication
- ✅ Role-based authorization (Admin, Nurse)
- ✅ AES-256 field-level encryption (name, address)
- ✅ Rate limiting with Redis (by role)
- ✅ Redis-based distributed API protection
- ✅ Offline-first sync support for patients/checkups
- ✅ Centralized error handling and response structure

---

## 🛠 Tech Stack

| Layer            | Technology                       |
| ---------------- | -------------------------------- |
| Backend Runtime  | Node.js + Express                |
| Database         | MySQL                            |
| Auth             | JWT                              |
| Encryption       | AES-256-CBC using Node.js crypto |
| Rate Limiting    | express-rate-limit + Redis       |
| Deployment-ready | CORS, Environment Config, etc.   |

---

## 📂 Folder Structure

```bash
├── app.js
├── config/
│   ├── db.js
│   └── redis.js
├── controllers/
│   ├── adminController.js
│   ├── authController.js
│   ├── checkupController.js
│   ├── patientController.js
│   └── syncController.js
├── middlewares/
│   ├── authMiddleware.js
│   ├── catchAsyncErrors.js
│   ├── checkRole.js
│   ├── error.js
│   └── rateLimiter.js
├── models/
│   ├── adminModel.js
│   ├── checkupModel.js
│   ├── diseaseModel.js
│   ├── medicineModel.js
│   ├── patientModel.js
│   └── userModel.js
├── routes/
│   ├── adminRoutes.js
│   ├── authRoutes.js
│   ├── checkupRoutes.js
│   ├── patientRoutes.js
│   └── syncRoutes.js
├── utils/
│   ├── encryption.js
│   └── errorHandler.js
├── docs/
│   ├── SECURITY_STRATEGY.md
│   ├── RATE_LIMITING_STRATEGY.md
│   ├── DATABASE_SCHEMA.png
│   ├── SYSTEM_ARCHITECTURE.png
│
└── .env.example

```

---

## 📡 API Documentation

### 🔐 Auth

```http
POST /auth/login
```

**Payload:** `{ username: "admin" }` → returns JWT

### 👤 Patients

```http
POST /patients       // Register or update patient
GET  /patients       // List all patients (Nurse-only)
```

### 🩺 Checkups

```http
POST /checkups       // Record new checkup (Nurse-only)
GET  /checkups       // View all checkups
```

### 🔁 Sync

```http
POST /sync           // Sync patients from offline device
```

### 🧑‍⚕️ Admin

```http
GET /admin/nurses    // List all nurses (Admin-only)
```

---

## 🔐 Security Measures

- AES-256-CBC used to encrypt `name` and `address` fields before storage.
- JWT tokens validate role and identity.
- Rate limits enforced using Redis to prevent abuse.
- Sensitive operations (e.g., patient updates) are protected by middleware.

➡️ See [docs/SECURITY_STRATEGY.md](./docs/SECURITY_STRATEGY.md) for full details.

---

## 🚦 Rate Limiting Strategy

- Redis-backed distributed limiter
- Role-based:
  - Admin: 1000 req/min
  - Nurse: 100 req/min
- Emergency bypass supported via `X-Bypass-RateLimit: true` header for Admins

➡️ See [docs/RATE_LIMITING_STRATEGY.md](./docs/RATE_LIMITING_STRATEGY.md)

---

## 🔁 Offline Sync Logic

- Mobile device stores patient data offline
- Syncs via `POST /sync` endpoint
- If patient exists → update
- Else → insert
- AES encryption applied before storage

---

## 🧮 Database Schema

- `Patient` table (encrypted PII + diseases + medicines)
- `StaffNurse` (admin or nurse)
- `Checkups`, `Diseases`, `Medicines` (related via FK)

➡️ See [docs/DATABASE_SCHEMA.png](./docs/Database_Schema.png).

---

## 🧭 System Design Diagrams

- **System Architecture:**  
  Android App → Node.js API → MySQL  
  ↳ Redis is used exclusively for distributed rate limiting across API instances.

- **ER Diagram:**  
  Captures relationships such as:

  - One StaffNurse → many Patients
  - One Patient → many Checkups
  - One Checkup → multiple Diseases & Medicines

  ➡️ See [docs/System_Architecture_Diagram.png](./docs/System_Architecture_Diagram.png).

---

## ⚙️ Setup Instructions

```bash
# Clone the repository
$ git clone https://github.com/your-username/healthcare-backend.git
$ cd healthcare-backend

# Install dependencies
$ npm install

# Create .env file
$ cp .env.example .env

# Update your database and Redis credentials in .env

# Run the server
$ npm run dev
```

> Ensure MySQL and Redis are both running locally or remotely

---

## 📦 Deliverables

| Document                     | Path                             |
| ---------------------------- | -------------------------------- |
| Security Strategy            | `docs/SECURITY_STRATEGY.md`      |
| Rate Limiting Strategy       | `docs/RATE_LIMITING_STRATEGY.md` |
| System Architecture Diagram  | `docs/SYSTEM_ARCHITECTURE.png`   |
| Database Schema + ER Diagram | `docs/DATABASE_SCHEMA.png`,      |

---

## 👨‍💻 Contributors

- Yogesh Naikwadi – Full Stack Developer @ HCL

---

> 📌 **Note:** This project satisfies all backend deliverables for the Healthcare Android App assignment, including security, sync, rate limiting, and database design.
