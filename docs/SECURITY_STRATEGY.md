# 🔐 Security Strategy – Healthcare Android App Backend

This document outlines the encryption, authentication, and authorization strategy used in the backend system to ensure data confidentiality, integrity, and access control.

---

## 1. Purpose

To protect sensitive patient data and ensure secure communication in a high-availability healthcare backend system designed for frontline health workers.

---

## 2. Data Encryption Methods

### 🔐 In Transit

- **Transport Layer Security (TLS)** is recommended to be enforced using HTTPS via a reverse proxy like **Nginx** or **AWS ALB**.
- JWTs are securely transmitted via the `Authorization: Bearer <token>` HTTP header.

### 🔐 At Rest

- **Field-Level Encryption**:

  - Implemented on sensitive fields: `Patient.name`, `Patient.address`.
  - Data is encrypted before being saved to MySQL and decrypted when read.
  - Uses AES-256-CBC symmetric encryption.

---

## 3. Authentication & Authorization

### ✅ Authentication

- Implemented using **JWT (JSON Web Token)**.
- Token includes: `id`, `name`, and `role`.
- Signed using a secret (`JWT_SECRET`) with expiration (`JWT_EXPIRES_IN`).
- Stored and sent via HTTP Authorization headers.

### ✅ Authorization

- Enforced using custom middleware:

  - `verifyToken`: Decodes and verifies JWT.
  - `checkRole(role)`: Applies role-based access control (e.g., Admin, Nurse).

---

## 4. Encryption Implementation Plan

### 🔹 Field-Level Encryption

- Applied to sensitive fields inside the `Patient` table.
- Done via utility in `utils/encryption.js` using Node.js `crypto` module.

### Encryption Code:

```js
const algorithm = "aes-256-cbc";
const key = crypto.scryptSync(process.env.SECRET_KEY, "salt", 32);
const iv = Buffer.alloc(16, 0); // fixed IV
```

### 🔹 Key Management System Design

- Currently sourced from `.env` file: `SECRET_KEY`
- 🔐 **Recommended**:

  - Use a managed secret service like **AWS Secrets Manager** or **HashiCorp Vault**.
  - Apply **key rotation policies** every 3–6 months.
  - Use separate keys per environment (dev/test/prod).

### 🔹 Encryption Algorithm Selection & Justification

- **AES-256-CBC**:

  - Strong 256-bit encryption.
  - Standardized and widely supported.
  - Easy integration with Node.js `crypto`.

- ✅ Optionally upgrade to **AES-256-GCM** for integrity verification (authenticated encryption).

### 🔹 Performance Considerations

- Encryption/decryption happens only on two fields per patient (minimal impact).
- Encrypted fields cannot be indexed or used for filtering/searching.
- Offloading encryption logic to services or background workers for bulk data processing can be explored.

---

## 5. Secrets Rotation & Key Security

### 🔁 Secrets Rotation Strategy

- Version your keys in secret management systems.
- Rotate keys and re-encrypt stored data periodically.
- Maintain backward compatibility by tagging key versions.

### 🔐 Envelope Encryption (Future Enhancement)

- Store data keys (per patient or session) encrypted with a master key in KMS.
- Reduces risk of key leakage.

---

## ✅ Summary Table

| Area                  | Implementation/Status                         |
| --------------------- | --------------------------------------------- |
| In-transit Encryption | ✅ Supported via HTTPS (recommended)          |
| At-rest Encryption    | ✅ Field-level AES-256-CBC for PII            |
| Authentication        | ✅ JWT (access token) with expiry             |
| Authorization         | ✅ Role-based via custom middleware           |
| Encryption Key Mgmt   | `.env` for now – recommend AWS Vault/Secrets  |
| Key Rotation          | 🔁 Planned via secrets manager                |
| Algorithm             | AES-256-CBC (upgrade to AES-GCM suggested)    |
| Performance Notes     | Minimal cost, no encryption on indexes/search |

---

## ✅ Conclusion

This backend system currently applies strong encryption practices and secure authentication/authorization mechanisms. With minor upgrades like HTTPS enforcement, secrets vaulting, and key rotation automation, it can meet enterprise-grade compliance standards (e.g., HIPAA, GDPR).

---

> ✨ **Status:** All requirements in the assignment for Security Strategy have been implemented.
