# Ethiopian Digital TIN Management System - Deployment Guide

## Project Structure
```
Ethiopian Digital TIN Management System/
├── backend/          # Node.js/Express API
├── etin-frontend/    # React/Vite Frontend
└── DEPLOYMENT.md     # This file
```

## Prerequisites
- Node.js >= 18.0.0
- MongoDB Atlas account (or local MongoDB)
- Git (optional)

## Local Development

### 1. Backend Setup
```bash
cd backend
npm install
npm run dev
```
Server runs on http://localhost:5000

### 2. Frontend Setup
```bash
cd etin-frontend
npm install
npm run dev
```
Frontend runs on http://localhost:5173

## Production Deployment

### Option 1: Deploy to Render (Recommended)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Deploy ready"
   git push origin main
   ```

2. **Connect to Render**
   - Create new Web Service
   - Connect your GitHub repo
   - **Build Command:** `cd backend && npm install && cd ../etin-frontend && npm install && npm run build`
   - **Start Command:** `cd backend && npm start`
   - Add Environment Variables:
     - `MONGO_URI`: Your MongoDB connection string
     - `JWT_SECRET`: Your JWT secret key
     - `NODE_ENV`: production

3. **Frontend is served by backend** in production (static files from `etin-frontend/dist`)

### Option 2: Deploy Backend and Frontend Separately

**Backend (Vercel/Render/Railway):**
- Deploy backend folder as Node.js service
- Set environment variables
- API will be at `https://your-api-domain.com`

**Frontend (Vercel/Netlify):**
```bash
cd etin-frontend
npm run build
# Deploy dist/ folder to Vercel/Netlify
```
- Update `adminService.js` and `api.jsx` baseURL to your deployed API

### Option 3: VPS/Dedicated Server

1. **Clone and Install**
   ```bash
   git clone <your-repo>
   cd "Ethiopian Digital TIN Management System"
   cd backend && npm install --production
   cd ../etin-frontend && npm install && npm run build
   ```

2. **Set Environment Variables**
   ```bash
   export MONGO_URI="your-mongodb-uri"
   export JWT_SECRET="your-secret"
   export NODE_ENV="production"
   export PORT=5000
   ```

3. **Start with PM2**
   ```bash
   cd backend
   pm2 start src/server.js --name etin-backend
   ```

## Environment Variables

### Backend (.env)
```
PORT=5000
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/ethiotinDB
JWT_SECRET=your-super-secret-jwt-key
NODE_ENV=production
```

## Admin Access

1. **Create Admin Account**
   - Register at `/api/admin/register` (POST)
   - Or manually insert into MongoDB with `isAdmin: true`

2. **Access Admin Dashboard**
   - URL: `http://localhost:5173/admin/login` (dev)
   - URL: `https://your-domain.com/admin/login` (prod)

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Admin
- `POST /api/admin/register` - Admin registration
- `POST /api/admin/login` - Admin login
- `GET /api/admin/dashboard` - Dashboard stats
- `GET /api/admin/tin/pending` - Pending TINs
- `PUT /api/admin/tin/approve/:id` - Approve TIN
- `PUT /api/admin/tin/reject/:id` - Reject TIN

### TIN
- `POST /api/tin/apply` - Apply for TIN
- `GET /api/tin/my-tin` - Get user's TIN
- `GET /api/tin/verify/:tinNumber` - Verify TIN

## Troubleshooting

1. **CORS Issues**: Check CORS configuration in `backend/src/server.js`
2. **Build Errors**: Ensure Node.js >= 18
3. **MongoDB Connection**: Verify IP whitelist in MongoDB Atlas
4. **Static Files**: Ensure `etin-frontend/dist` exists after build

## Post-Deployment Checklist

- [ ] Backend API responding at `/api/health`
- [ ] Frontend loads without errors
- [ ] User registration/login works
- [ ] Admin login works
- [ ] TIN application works
- [ ] Admin approve/reject works
- [ ] Toast notifications appear
- [ ] Dark mode toggle works
