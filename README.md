# 🛡️ EPLQ Secure – Privacy-Preserving Location Network

![Project Status](https://img.shields.io/badge/Status-Operational-green?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)
![Privacy](https://img.shields.io/badge/Privacy-Zero%20Knowledge-purple?style=for-the-badge)

**Find Locations. Without Being Found.**

EPLQ Secure is a full-stack web application designed to help users locate critical infrastructure—such as hospitals, ATMs, police stations, and safe zones—while prioritizing user privacy. Unlike traditional map services, EPLQ Secure avoids persistent real-time location tracking and follows a privacy-preserving architecture.

---

## 📑 Table of Contents
- Screenshots
- Key Features
- Tech Stack
- Getting Started
- Project Structure
- API Documentation
- Environment Variables
- Contributing
- License

---

## 📸 Screenshots

| User Dashboard | Admin Control Panel |
|:--:|:--:|
| User Search Interface | Admin Management |
| Secure browsing | Secure database management |

---

## ✨ Key Features

### 🔒 User Features
- Zero-tracking search
- Encrypted requests
- One-click navigation (Google Maps redirect)
- Rich location data (images, address, safety info)

### 🛡️ Admin Features
- Secure admin dashboard
- Add / Edit / Delete locations
- Interactive Leaflet map picker
- Image uploads via Cloudinary

---

## 🛠️ Tech Stack

### Frontend
- Next.js (App Router)
- Tailwind CSS
- Framer Motion
- Leaflet.js

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication
- Cloudinary

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- MongoDB (Local or Atlas)
- Cloudinary account

---

### Installation

```bash
git clone https://github.com/mahwish786/EPLQ-Project.git
cd eplq-secure
```

---

### Backend Setup

```bash
cd backend
npm install
npm run server
```

Backend runs on: `http://localhost:5000`

---

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on: `http://localhost:3000`

---

## 🔐 Environment Variables

### Backend (.env)

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### Frontend (.env.local)

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

---

## 📂 Project Structure

```bash
eplq-secure/
├── backend/
│   ├── config/          # DB & Cloudinary config
│   ├── controllers/     # Auth, Places, Admin logic
│   ├── models/          # Mongoose schemas
│   ├── routes/          # API routes
│   └── server.js        # Entry point
│
└── frontend/
    ├── src/app/         # Pages & routing
    ├── src/components/  # UI components
    └── src/services/    # Axios API config
```

---

## 🔗 API Documentation

| Method | Endpoint | Description | Access |
|------|--------|------------|--------|
| GET | /api/places | Get all locations | Public |
| POST | /api/places | Add new location | Admin |
| PUT | /api/places/:id | Update location | Admin |
| DELETE | /api/places/:id | Delete location | Admin |
| POST | /api/auth/register | Register user | Public |
| POST | /api/admin/login | Admin login | Public |

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to GitHub
5. Open a Pull Request

---

## 📜 License

Distributed under the **MIT License**.

---

<p align="center">Built by <strong>Mahwish Ahmed</strong></p>
