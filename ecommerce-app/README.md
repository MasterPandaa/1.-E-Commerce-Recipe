# E-Commerce App (Node.js + Express + MySQL)

This is a production-ready e-commerce backend following a layered architecture: routes → controllers → services → models. Security and reliability are implemented via Helmet, rate limiting, validation, and JWT auth.

## Quick Start

1. Copy `.env.example` to `.env` and configure values.
2. Install dependencies: `npm install` (and dev deps `npm i -D nodemon`).
3. Create the database using `database/schema.sql`.
4. Run in dev: `npm run dev`.

## Project Structure

See `src/` for code layout. Uploads are stored under `uploads/products/`.
