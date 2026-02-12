# Project Directory Structure - MISA (Folders Only)

This document lists only folders, with concise descriptions for each.

## Root Directory

```text
MISA/
├── admin/                  # Admin panel (Vite + React)
├── backend/                # Node.js/Express API + MongoDB
└── frontend/               # Public site (Vite + React)
```

---

## Admin App (`/admin`)

```text
admin/
├── public/                 # Public assets served by Vite
├── src/                    # Admin source code
│   ├── assets/             # Static assets (images/icons)
│   ├── components/         # Reusable admin UI components
│   ├── context/            # Admin React context providers
│   ├── pages/              # Admin pages (routes)
│   ├── services/           # API clients and helpers
│   └── styles/             # Admin CSS stylesheets
├── node_modules/           # Installed dependencies
└── ...                     # Tooling/config folders
```

---

## Backend API (`/backend`)

```text
backend/
├── src/                    # Backend source code
│   ├── config/             # Configuration (db, env setup)
│   ├── controllers/        # Request handlers
│   ├── middleware/         # Express middleware
│   ├── models/             # Mongoose schemas
│   └── routes/             # API route definitions
├── uploads/                # Uploaded product images
├── node_modules/           # Installed dependencies
└── ...                     # Tooling/config folders
```

---

## Public Frontend (`/frontend`)

```text
frontend/
├── public/                 # Public assets served by Vite
├── src/                    # Frontend source code
│   ├── assets/             # Static images/icons
│   ├── components/         # Shared UI components
│   ├── context/            # React context providers
│   ├── data/               # Local data snapshots
│   ├── hooks/              # Custom React hooks
│   ├── pages/              # Page components (routes)
│   ├── services/           # API clients/helpers
│   └── styles/             # Global theme styles
├── node_modules/           # Installed dependencies
└── ...                     # Tooling/config folders
```
