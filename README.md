# SIMS PPOB API

REST API for SIMS PPOB (Payment Point Online Bank) built with Express.js + TypeScript.

## Tech Stack

- **Runtime**: Node.js + TypeScript
- **Framework**: Express.js
- **Database**: PostgreSQL (Neon)
- **Auth**: JWT (JSON Web Token)
- **Validation**: Zod
- **File Upload**: Multer

## Features

- User registration & login with JWT authentication
- Profile management with image upload
- Banner & service listing
- Balance check
- Top up balance
- Payment transaction
- Transaction history with pagination

## Project Structure

```
src/
├── config/
│   └── database.ts
├── middleware/
│   ├── auth.middleware.ts
│   ├── upload.middleware.ts
│   └── validate.middleware.ts
├── modules/
│   ├── membership/
│   ├── information/
│   └── transaction/
├── shared/
│   ├── response.helper.ts
│   └── invoice.helper.ts
├── types/
│   └── express.d.ts
├── app.ts
└── server.ts
db/
├── migrations/
│   └── 001_init.sql
└── seeds/
    └── 001_seed.sql
```

## Getting Started

### Prerequisites

- Node.js >= 18
- PostgreSQL database

### Installation

```bash
# Clone the repo
git clone https://github.com/nas11ai/sims-ppob.git
cd sims-ppob

# Install dependencies
npm install

# Copy env file
cp .env.example .env
```

### Environment Variables

```env
PORT=3000
DATABASE_URL=postgresql://user:password@host/dbname?sslmode=require
JWT_SECRET=your_super_secret_key
JWT_EXPIRES_IN=12h
BASE_URL=http://localhost:3000
NODE_ENV=development
```

### Database Setup

```bash
# Run migration
psql $DATABASE_URL -f db/migrations/001_init.sql

# Run seed
psql $DATABASE_URL -f db/seeds/001_seed.sql
```

### Running the App

```bash
# Development
npm run dev

# Build
npm run build

# Production
npm start
```

## API Endpoints

### Module Membership

| Method | Endpoint          | Auth | Description           |
| ------ | ----------------- | ---- | --------------------- |
| POST   | `/registration`   | No   | Register new user     |
| POST   | `/login`          | No   | Login & get JWT token |
| GET    | `/profile`        | Yes  | Get user profile      |
| PUT    | `/profile/update` | Yes  | Update user profile   |
| PUT    | `/profile/image`  | Yes  | Upload profile image  |

### Module Information

| Method | Endpoint    | Auth | Description      |
| ------ | ----------- | ---- | ---------------- |
| GET    | `/banner`   | No   | Get banner list  |
| GET    | `/services` | Yes  | Get service list |

### Module Transaction

| Method | Endpoint               | Auth | Description                |
| ------ | ---------------------- | ---- | -------------------------- |
| GET    | `/balance`             | Yes  | Get current balance        |
| POST   | `/topup`               | Yes  | Top up balance             |
| POST   | `/transaction`         | Yes  | Create payment transaction |
| GET    | `/transaction/history` | Yes  | Get transaction history    |

## Response Format

All responses follow this format:

```json
{
  "status": 0,
  "message": "Sukses",
  "data": {}
}
```

| Status Code | Description                    |
| ----------- | ------------------------------ |
| `0`         | Success                        |
| `102`       | Bad Request / Validation Error |
| `103`       | Invalid credentials            |
| `108`       | Unauthorized / Token invalid   |

## Authentication

All private endpoints require Bearer token in the Authorization header:

```
Authorization: Bearer <token>
```

Token is obtained from the `/login` endpoint and expires in 12 hours.

## Database Design

```mermaid
erDiagram
    users {
        UUID id PK
        VARCHAR email UK
        VARCHAR first_name
        VARCHAR last_name
        TEXT profile_image
        VARCHAR password
        NUMERIC balance
        TIMESTAMPTZ created_at
        TIMESTAMPTZ updated_at
    }

    banners {
        UUID id PK
        VARCHAR banner_name
        TEXT banner_image
        TEXT description
        TIMESTAMPTZ created_at
    }

    services {
        UUID id PK
        VARCHAR service_code UK
        VARCHAR service_name
        TEXT service_icon
        NUMERIC service_tariff
        TIMESTAMPTZ created_at
    }

    transactions {
        UUID id PK
        VARCHAR invoice_number UK
        UUID user_id FK
        UUID service_id FK
        VARCHAR transaction_type
        TEXT description
        NUMERIC total_amount
        TIMESTAMPTZ created_on
    }

    users ||--o{ transactions : "has"
    services ||--o{ transactions : "used in"
```

> Full DDL can be found in `db/migrations/001_init.sql`

## Deployment

Live URL: `https://sims-ppob.onrender.com`

Deployed on [Render](https://render.com) with [Neon](https://neon.tech) PostgreSQL.
