# MISA Project Details (High-Level)

This document provides a concise overview of the project, its apps, and how to run them.

---

## Project Overview

MISA is a multi-app system for a jewellery storefront and internal management.

- Public site: luxury storefront experience for customers.
- Admin panel: catalog and business management.
- Backend API: product, category, auth, and upload services.

---

## Tech Stack

- Frontend: React + Vite, CSS Modules, React Router
- Admin: React + Vite, CSS
- Backend: Node.js + Express
- Database: MongoDB (Mongoose)
- Media: Local upload storage served by the API

---

## Applications

### 1. Public Frontend (`/frontend`)

- Purpose: customer-facing storefront, collections, product details, and static pages.
- Key flows: category browsing, product detail view, WhatsApp inquiry.

### 2. Admin Panel (`/admin`)

- Purpose: manage products, categories, and basic business data.
- Key flows: login, product CRUD, category management, dashboards.

### 3. Backend API (`/backend`)

- Purpose: serve product/category data, auth, and image uploads.
- Clients: public frontend and admin panel.

---

## Run Instructions (Local)

### Backend

1. Create `.env` with your MongoDB URI and secrets.
2. Install and start the server:

```bash
cd backend
npm install
npm run dev
```

### Public Frontend

```bash
cd frontend
npm install
npm run dev
```

### Admin Panel

```bash
cd admin
npm install
npm run dev
```

---

## Environment Notes

- Backend default: `http://localhost:5001`
- Frontend dev server: `http://localhost:5000` (or Vite default)
- API base is set in `VITE_API_URL` (frontend/admin) with fallback to `http://localhost:5001/api`
