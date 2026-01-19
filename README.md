# 🏥 MediBook - Doctor Appointment Booking System

<div align="center">
  <img src="https://img.shields.io/badge/React-18.x-61DAFB?style=for-the-badge&logo=react" alt="React" />
  <img src="https://img.shields.io/badge/Node.js-18.x-339933?style=for-the-badge&logo=node.js" alt="Node.js" />
  <img src="https://img.shields.io/badge/MongoDB-6.x-47A248?style=for-the-badge&logo=mongodb" alt="MongoDB" />
  <img src="https://img.shields.io/badge/TailwindCSS-3.x-06B6D4?style=for-the-badge&logo=tailwindcss" alt="Tailwind" />
</div>

<br />

<div align="center">
  <strong>A modern, full-stack healthcare platform for seamless doctor appointments</strong>
  <br /><br />
  Developed by <strong>Harsh</strong>
</div>

---

## ✨ Overview

**MediBook** is a comprehensive doctor appointment booking system built with the MERN stack. It provides a seamless experience for patients to find and book appointments with qualified healthcare professionals, while giving doctors and administrators powerful tools to manage their practice.

### 🎯 Key Features

- **🔐 Secure Authentication** - JWT-based authentication with role-based access control
- **📅 Smart Booking** - Real-time availability checking and instant appointment confirmation
- **👨‍⚕️ Doctor Profiles** - Comprehensive profiles with specialties, experience, and ratings
- **💳 Payment Integration** - Razorpay and Stripe payment gateways
- **📱 Responsive Design** - Beautiful UI that works on all devices
- **🔔 Notifications** - Email notifications for appointment confirmations
- **📊 Admin Dashboard** - Complete control over doctors, patients, and appointments

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|------------|---------|
| React 18 | UI Framework |
| Vite | Build Tool |
| Tailwind CSS | Styling |
| React Router | Navigation |
| Axios | HTTP Client |

### Backend
| Technology | Purpose |
|------------|---------|
| Node.js | Runtime |
| Express.js | Web Framework |
| MongoDB | Database |
| Mongoose | ODM |
| JWT | Authentication |
| Bcrypt | Password Hashing |
| Cloudinary | Image Storage |

---

## 📁 Project Structure

```
MediBook/
├── frontend/              # Patient-facing React application
│   ├── src/
│   │   ├── components/   # Reusable UI components
│   │   ├── pages/        # Application pages
│   │   ├── context/      # React Context providers
│   │   └── assets/       # Static assets
├── admin/                 # Admin/Doctor dashboard
│   ├── src/
│   │   ├── components/   # Admin UI components
│   │   ├── pages/        # Dashboard pages
│   │   └── context/      # State management
├── backend/               # Express.js API server
│   ├── config/           # Database & cloud config
│   ├── controllers/      # Request handlers
│   ├── models/           # Mongoose schemas
│   ├── routes/           # API routes
│   ├── middleware/       # Auth & validation
│   └── utils/            # Helper functions
└── README.md
```

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- MongoDB (local or Atlas)
- Cloudinary Account (for image uploads)

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd Doctor_Appointment_System
   ```

2. **Install dependencies**
   ```bash
   # Backend
   cd backend && npm install
   
   # Frontend
   cd ../frontend && npm install
   
   # Admin
   cd ../admin && npm install
   ```

3. **Start MongoDB**
   ```bash
   mongod
   ```

4. **Run the application**
   ```bash
   # Terminal 1 - Backend
   cd backend && npm start
   
   # Terminal 2 - Frontend
   cd frontend && npm run dev
   
   # Terminal 3 - Admin
   cd admin && npm run dev
   ```

5. **Access the application**
   - Frontend: http://localhost:5173
   - Admin Panel: http://localhost:5174
   - API: http://localhost:4000

---

## 📡 API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/user/register` | Register new patient |
| POST | `/api/user/login` | Patient login |
| POST | `/api/admin/login` | Admin login |
| POST | `/api/doctor/login` | Doctor login |

### Users
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/user/get-profile` | Get user profile |
| POST | `/api/user/update-profile` | Update profile |
| POST | `/api/user/book-appointment` | Book appointment |
| GET | `/api/user/appointments` | Get appointments |
| POST | `/api/user/cancel-appointment` | Cancel appointment |

### Doctors
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/doctor/list` | Get all doctors |
| GET | `/api/doctor/appointments` | Doctor's appointments |

### Admin
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/admin/add-doctor` | Add new doctor |
| GET | `/api/admin/all-doctors` | Get all doctors |
| GET | `/api/admin/dashboard` | Dashboard stats |

---

## 🔧 Environment Variables

### Backend (.env)
```env
PORT=4000
MONGODB_URI=mongodb://localhost:27017
JWT_SECRET=your_super_secret_jwt_key
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_SECRET_KEY=your_api_secret
```

### Frontend & Admin (.env)
```env
VITE_BACKEND_URL=http://localhost:4000
```

---

## 🔒 Security Features

- **Password Hashing** - Bcrypt with salt rounds
- **JWT Authentication** - Secure token-based auth
- **Role-Based Access** - Separate permissions for users, doctors, admins
- **Input Validation** - Server-side validation

---

## 📈 Future Roadmap

- [ ] Video Consultation Integration
- [ ] AI-Powered Doctor Recommendations
- [ ] Mobile App (React Native)
- [ ] Health Records Management
- [ ] Review & Rating System

---

## 👨‍💻 Author

<div align="center">
  <strong>Harsh</strong>
  <br />
  Full Stack Developer
</div>

---

<div align="center">
  <strong>⭐ Star this repo if you found it helpful!</strong>
  <br /><br />
  Made with ❤️ by Harsh
</div>



