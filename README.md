# EPLQ Secure – Privacy‑Preserving Location Network

EPLQ Secure is a full‑stack web application built during an internship to explore how location‑based services can work **without continuously tracking users**. The system allows people to search for nearby essential places such as hospitals, ATMs, and safety zones, while keeping user privacy as the primary design goal.

This project focuses on *how* data flows through the system rather than collecting more data than necessary.

---

## Table of Contents
- Overview
- Features
- Tech Stack
- How the System Works
- Local Setup
- Environment Variables
- Project Structure
- API Overview
- Usage & Access
- License & Ownership

---

## Overview

Most location services rely on constant access to real‑time user coordinates. EPLQ Secure takes a different approach. Searches are performed without persistent location storage, and navigation is only handed off to third‑party map providers when the user explicitly chooses to do so.

The project was created as part of an internship and is **not intended to be a public, open‑source platform**.

---

## Features

### User Side
- Search for hospitals, ATMs, police stations, and safe zones
- No continuous background location tracking
- Clean, animated UI built with Next.js and Tailwind
- Optional navigation using external map services

### Admin Side
- Secure admin authentication
- Add, edit, or remove locations
- Upload images using Cloudinary
- Select coordinates using an interactive map

---

## Tech Stack

### Frontend
- Next.js (App Router)
- React 19
- Tailwind CSS
- Framer Motion
- Leaflet & React‑Leaflet
- Axios

### Backend
- Node.js
- Express
- MongoDB with Mongoose
- JWT authentication
- Cloudinary (media storage)
- Multer (file handling)

---

## How the System Works

1. Users access the frontend and perform a location search.
2. Requests are sent to the backend API without storing continuous location data.
3. The backend fetches relevant places from the database.
4. If navigation is required, users are redirected to an external map provider.
5. Admins manage all location data through a protected dashboard.

---

## Local Setup

### Prerequisites
- Node.js v18+
- MongoDB (local or Atlas)
- Cloudinary account

### Clone the Repository
```bash
git clone https://github.com/mahwish786/EPLQ-Project.git
cd EPLQ-Project
```

---

## Backend Setup

```bash
cd backend
npm install
npm run server
```

Backend runs on:
```
http://localhost:5000
```

---

## Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on:
```
http://localhost:3000
```

---

## Environment Variables

### Backend (`.env`)
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### Frontend (`.env.local`)
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

---

## Project Structure

```
eplq-secure/
├── backend/
│   ├── config/          # Database & Cloudinary config
│   ├── controllers/     # Business logic
│   ├── models/          # Database schemas
│   ├── routes/          # API routes
│   └── server.js        # Server entry point
│
└── frontend/
    ├── src/app/         # Pages and routing
    ├── src/components/  # UI components
    └── src/services/    # API helpers
```

---

## API Overview

| Method | Endpoint | Description |
|------|---------|------------|
| GET | /api/places | Fetch all locations |
| POST | /api/places | Add new location (admin) |
| PUT | /api/places/:id | Update location (admin) |
| DELETE | /api/places/:id | Delete location (admin) |
| POST | /api/auth/register | User registration |
| POST | /api/admin/login | Admin authentication |

---

## Usage & Access

This repository was created as part of an internship project. Access to modify or deploy the system is restricted to authorized individuals approved by the owning organization.

The code is shared for evaluation and demonstration purposes only.

---

## License & Ownership

This project is **proprietary**.

All rights are reserved by the owning organization.  
Unauthorized copying, modification, or redistribution of this code is not permitted.

---

Built by **Mahwish Ahmed** during internship work.
