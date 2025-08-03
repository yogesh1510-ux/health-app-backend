# 🚦 Rate Limiting Strategy – Healthcare Android App Backend

This document outlines the strategy used to prevent API abuse and ensure system stability under high load.

---

## 1. Purpose

Rate limiting is used to:

- Prevent abuse of public endpoints
- Ensure fair usage between different users (e.g., Admin vs Nurse)
- Protect backend resources (e.g., MySQL, Redis)
- Handle high availability loads like **2,000 requests/sec**

---

## 2. Rate Limiting Implementation

### Technology Used:

- [`express-rate-limit`](https://www.npmjs.com/package/express-rate-limit)
- [`rate-limit-redis`](https://www.npmjs.com/package/rate-limit-redis)
- Redis as the shared store

### Redis Advantage:

- Supports distributed rate limiting across **multiple Node.js instances**
- In-memory performance
- Centralized token tracking

---

## 3. Algorithm Used

- **Token Bucket** approach via `express-rate-limit`
- Each user gets a limited number of tokens per time window
- Tokens regenerate over time

---

## 4. Rate Limit Rules

| User Role | Endpoint Type        | Limit             | Notes                       |
| --------- | -------------------- | ----------------- | --------------------------- |
| Nurse     | `/patients`, `/sync` | 100 requests/min  | Prevent abuse, sync control |
| Admin     | `/admin/*`           | 1000 requests/min | Higher access, stats usage  |

You can easily apply different limits by checking `req.user.role` and applying custom limiter instances.

---

## 5. Response Headers

Each rate-limited response includes:

- `X-RateLimit-Limit`: Max requests allowed
- `X-RateLimit-Remaining`: Remaining in current window
- `Retry-After`: When to retry if blocked

---

## 6. Emergency Bypass Strategy Implemented

A special emergency flag is supported:

- **Header:** `X-Bypass-RateLimit: true`
- Only effective for users with `Admin` role (validated via `checkRole`)
- Ignored or blocked for non-admin users

---

## 7. Distributed Scaling Support

The Redis store enables rate limiting to function **consistently across containers or multiple Node.js servers** behind a load balancer (e.g., NGINX or AWS ALB).

---

## Summary

| Area             | Implementation                |
| ---------------- | ----------------------------- |
| Library          | `express-rate-limit` + Redis  |
| Algorithm        | Token Bucket                  |
| User-specific    | Role-based limits via JWT     |
| Distributed?     | ✅ Yes (Redis)                |
| Emergency Bypass | ✅ Implemented for Admin only |
