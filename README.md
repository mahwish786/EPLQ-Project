# 🛡️ EPLQ Secure - Privacy-Preserving Location Network

![Project Status](https://img.shields.io/badge/Status-Operational-green?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)
![Privacy](https://img.shields.io/badge/Privacy-Zero%20Knowledge-purple?style=for-the-badge)

**Find Locations. Without Being Found.**

EPLQ Secure is a full-stack web application designed to help users locate critical infrastructure—such as hospitals, ATMs, police stations, and safe zones—while prioritizing user privacy. Unlike traditional map services that track your every move, EPLQ uses a secure architectural pattern to deliver location data without compromising your realtime coordinates.

---

## 📸 Screenshots

| **User Dashboard** | **Admin Control Panel** |
|:---:|:---:|
| ![User Dashboard](https://via.placeholder.com/600x300?text=User+Search+Interface) | ![Admin Dashboard](https://via.placeholder.com/600x300?text=Admin+Management) |
| *Securely browse & navigate to locations* | *Manage the secure location database* |

---

## ✨ Key Features

### 🔒 For Users (Privacy First)
* **Zero-Tracking Search:** Search for amenities by name, city, or category without persistent location logging.
* **Encrypted Data Transfer:** Location queries are obfuscated before transmission.
* **One-Click Navigation:** Seamless integration with Google Maps for routing when you actually need it.
* **Rich Details:** View high-quality images, full addresses, and safety descriptions.

### 🛡️ For Admins (Control Panel)
* **Secure Dashboard:** Real-time overview of the network status and database metrics.
* **Location Management:** Add, Edit, and Delete secure points in the network.
* **Interactive Map Picker:** Precisely set coordinates using an integrated Leaflet map.
* **Media Management:** Seamless image uploads powered by Cloudinary.

---

## 🛠️ Tech Stack

### **Frontend (Next.js)**
* ![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat&logo=nextdotjs&logoColor=white) **App Router** architecture for SEO and performance.
* ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat&logo=tailwind-css&logoColor=white) Modern, responsive styling.
* ![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=flat&logo=framer&logoColor=white) Smooth animations and transitions.
* ![Leaflet](https://img.shields.io/badge/Leaflet-199900?style=flat&logo=leaflet&logoColor=white) Interactive maps.

### **Backend (Node.js)**
* ![Express.js](https://img.shields.io/badge/Express.js-000000?style=flat&logo=express&logoColor=white) RESTful API architecture.
* ![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=flat&logo=mongodb&logoColor=white) NoSQL database for flexible data storage.
* ![Cloudinary](https://img.shields.io/badge/Cloudinary-3448C5?style=flat&logo=cloudinary&logoColor=white) Cloud storage for location images.
* ![JWT](https://img.shields.io/badge/JWT-000000?style=flat&logo=jsonwebtokens&logoColor=white) Secure, stateless authentication.

---

## 🚀 Getting Started

Follow these instructions to set up the project locally.

### Prerequisites
* Node.js (v18 or higher)
* MongoDB (Local or Atlas)
* Cloudinary Account (for images)

### 1. Clone the Repository
```bash
git clone [https://github.com/your-username/eplq-secure.git](https://github.com/your-username/eplq-secure.git)
cd eplq-secure

2. Backend SetupNavigate to the backend folder and install dependencies:Bashcd backend
npm install
Create a .env file in the backend directory:Code snippetPORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_key
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
Start the server:Bashnpm run server
# Server will run on http://localhost:5000

3. Frontend SetupOpen a new terminal, navigate to the frontend folder, and install dependencies:Bashcd frontend
npm install
Create a .env.local file in the frontend directory:Code snippetNEXT_PUBLIC_API_URL=http://localhost:5000/api
Start the Next.js app:Bashnpm run dev
# App will run on http://localhost:3000
📂 Project StructureThis project follows a Monorepo style structure:eplq-secure/
├── backend/                 # Node.js & Express Server
│   ├── config/              # DB & Cloudinary Config
│   ├── controllers/         # Logic for Auth, Places, Admin
│   ├── models/              # Mongoose Schemas
│   ├── routes/              # API Endpoints
│   └── server.js            # Entry Point
│
└── frontend/                # Next.js Application
    ├── src/app/             # Pages & Routes (Login, Dashboard, etc.)
    ├── src/components/      # Reusable UI (Navbar, Maps, Modals)
    └── src/services/        # Axios API Configuration

🔗 API DocumentationMethodEndpointDescriptionAccessGET/api/placesGet all secure locationsPublicPOST/api/placesAdd a new locationAdminPUT/api/places/:idUpdate location detailsAdminDELETE/api/places/:idRemove a locationAdminPOST/api/auth/registerRegister new userPublicPOST/api/admin/loginAdmin Dashboard AccessPublic🤝 ContributingContributions are welcome! Please feel free to submit a Pull Request.Fork the projectCreate your Feature Branch (git checkout -b feature/AmazingFeature)Commit your Changes (git commit -m 'Add some AmazingFeature')Push to the Branch (git push origin feature/AmazingFeature)Open a Pull Request📜 LicenseDistributed under the MIT License. See LICENSE for more information.<p align="center">Built by Mahwish Ahmed</p>