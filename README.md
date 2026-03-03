# Ethiopian Digital TIN Management System

<p align="center">
  <img src="https://img.shields.io/badge/React-19-61DAFB?logo=react" alt="React 19">
  <img src="https://img.shields.io/badge/Node.js-18+-339933?logo=nodedotjs" alt="Node.js">
  <img src="https://img.shields.io/badge/MongoDB-Atlas-47A248?logo=mongodb" alt="MongoDB">
  <img src="https://img.shields.io/badge/Tailwind-CSS-06B6D4?logo=tailwindcss" alt="Tailwind CSS">
  <img src="https://img.shields.io/badge/License-MIT-yellow.svg" alt="License: MIT">
</p>

<p align="center">
  <b>A modern, full-stack MERN application for managing Tax Identification Numbers in Ethiopia</b>
</p>

<p align="center">
  <a href="#features">Features</a> •
  <a href="#demo">Demo</a> •
  <a href="#tech-stack">Tech Stack</a> •
  <a href="#installation">Installation</a> •
  <a href="#deployment">Deployment</a>
</p>

---

## Features

### For Citizens (Users)
- **User Registration & Login** - Secure JWT-based authentication
- **Apply for TIN** - Online application with Ethiopian regional data
- **View TIN Status** - Real-time tracking (Pending/Approved/Rejected)
- **Verify TIN** - Public verification tool for any TIN number
- **Digital TIN Card** - Professional, downloadable format

### For Government Officials (Admins)
- **Secure Admin Dashboard** - Separate authentication system
- **Real-time Analytics** - Visual charts and statistics
- **One-click Approval** - Efficient TIN approval/rejection workflow
- **Status Management** - Filter and manage all applications
- **Multilingual Support** - English and Amharic (አማርኛ)

### Global Features
- 🌐 **Bilingual** - English & Amharic language toggle
- 📱 **Mobile Responsive** - Works on all devices
- 🌙 **Dark Mode** - Professional dark/light theme
- 📊 **Analytics Charts** - Pie and bar charts with Recharts
- 🔔 **Toast Notifications** - Real-time feedback
- ✨ **Smooth Animations** - Framer Motion transitions

---

## Demo

**Live URL:** [https://ethiopian-etin.onrender.com](https://ethiopian-etin.onrender.com)

### Screenshots

| User Dashboard | Admin Dashboard | Dark Mode |
|---------------|-----------------|-----------|
| ![User Dashboard](screenshots/user-dashboard.png) | ![Admin Dashboard](screenshots/admin-dashboard.png) | ![Dark Mode](screenshots/dark-mode.png) |

---

## Tech Stack

### Frontend
- **React 19** - Modern React with hooks
- **Vite** - Fast build tool and dev server
- **React Router v7** - Client-side routing
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Smooth animations
- **Recharts** - Data visualization
- **react-i18next** - Internationalization
- **Sonner** - Toast notifications
- **Lucide React** - Icon library

### Backend
- **Node.js 18+** - Runtime environment
- **Express.js 5** - Web framework
- **MongoDB + Mongoose** - Database & ODM
- **JWT** - Authentication tokens
- **BcryptJS** - Password hashing
- **CORS** - Cross-origin requests

### DevOps
- **Render** - Cloud deployment
- **MongoDB Atlas** - Cloud database
- **Git** - Version control

---

## Installation

### Prerequisites
- Node.js >= 18.0.0
- MongoDB Atlas account (or local MongoDB)
- Git

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/ethiopian-etin-system.git
cd ethiopian-etin-system
```

### 2. Backend Setup
```bash
cd backend
npm install
```

Create a `.env` file in the `backend` folder:
```env
PORT=5000
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/ethiotinDB
JWT_SECRET=your-super-secret-jwt-key
NODE_ENV=development
```

Start the backend:
```bash
npm run dev
```

### 3. Frontend Setup
```bash
cd ../etin-frontend
npm install
npm run dev
```

### 4. Access the Application
- **User App:** http://localhost:5173
- **Admin Login:** http://localhost:5173/admin/login
- **API:** http://localhost:5000

---

## Project Structure

```
ethiopian-etin-system/
├── backend/
│   ├── src/
│   │   ├── config/          # Database configuration
│   │   ├── controllers/     # Route handlers
│   │   ├── middleware/      # Auth & validation
│   │   ├── models/          # Mongoose schemas
│   │   ├── routes/          # API routes
│   │   ├── utils/           # Helpers (JWT, TIN gen)
│   │   └── server.js        # Entry point
│   ├── .env                 # Environment variables
│   └── package.json
│
├── etin-frontend/
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── contexts/        # Theme & Toast contexts
│   │   ├── pages/           # Route pages
│   │   │   ├── auth/        # Login, Register
│   │   │   └── dashboard/   # User & Admin dashboards
│   │   ├── routes/          # Protected routes
│   │   ├── services/        # API calls
│   │   ├── i18n.js          # Translations
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── dist/                # Production build
│   └── package.json
│
├── DEPLOYMENT.md            # Deployment guide
└── README.md                # This file
```

---

## API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | User registration |
| POST | `/api/auth/login` | User login |

### TIN Management
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/tin/apply` | Apply for new TIN |
| GET | `/api/tin/my-tin` | Get user's TIN |
| GET | `/api/tin/verify/:tinNumber` | Verify TIN |

### Admin (Protected)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/admin/login` | Admin authentication |
| GET | `/api/admin/dashboard` | Dashboard statistics |
| GET | `/api/admin/tin/pending` | List pending TINs |
| PUT | `/api/admin/tin/approve/:id` | Approve TIN |
| PUT | `/api/admin/tin/reject/:id` | Reject TIN |

---

## Deployment

### Deploy to Render (Recommended)

1. **Push to GitHub**
```bash
git add .
git commit -m "Deploy ready"
git push origin main
```

2. **Create Web Service on Render**
- Build Command: `cd backend && npm install && cd ../etin-frontend && npm install && npm run build`
- Start Command: `cd backend && npm start`

3. **Add Environment Variables**
- `MONGO_URI` - Your MongoDB connection string
- `JWT_SECRET` - Your JWT secret
- `NODE_ENV` - production

4. **Deploy!** 🚀

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed instructions.

---

## Environment Variables

### Backend (.env)
```env
PORT=5000
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/ethiotinDB
JWT_SECRET=your-super-secret-jwt-key
NODE_ENV=production
```

---

## Admin Access

### Create Admin Account
Option 1: Via API
```bash
curl -X POST http://localhost:5000/api/admin/register \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","password":"yourpassword"}'
```

Option 2: Directly in MongoDB
```javascript
db.admins.insertOne({
  email: "admin@example.com",
  password: "$2a$10$...", // bcrypt hashed
  isAdmin: true
})
```

### Login
- URL: `/admin/login`
- Use admin credentials to access dashboard

---

## Features in Detail

### Multilingual Support
The app supports English and Amharic:
- Toggle button in header
- Persistent language preference
- Full translation coverage

### Dark Mode
- System preference detection
- Manual toggle in header
- Smooth transitions
- Persistent preference

### Analytics Dashboard
- **Pie Chart** - Status distribution
- **Bar Chart** - Activity comparison
- **Stats Cards** - Key metrics
- **Approval Rate** - Performance indicator

### Animations
- Page transitions
- Card hover effects
- Loading spinners
- Toast notifications
- Smooth status updates

---

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## Acknowledgments

- Ethiopian Revenue and Customs Authority for TIN format reference
- UI Avatars for profile pictures
- Lucide for beautiful icons
- Tailwind CSS for styling utilities

---

## Contact

**Developer:** [Your Name]

**Email:** your.email@example.com

**LinkedIn:** [Your LinkedIn](https://linkedin.com/in/yourprofile)

**GitHub:** [Your GitHub](https://github.com/yourusername)

---

<p align="center">
  Made with ❤️ for Ethiopia
</p>
