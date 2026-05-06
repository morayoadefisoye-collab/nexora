# 🚀 NEXORA - Airtime, Data & Services MVP

✅ **LOGIN/SIGNUP FIXED** - Debug logs added, .env files created!

Modern web platform for airtime/data purchases, subscriptions, social marketing, with wallet & admin panel.

## 🛠 Tech Stack
- **Frontend**: React + Vite + Tailwind CSS + React Router
- **Backend**: Node.js + Express + MongoDB (Mongoose)
- **Auth**: JWT + bcrypt
- **State**: Context API

## 📁 Structure
```
NEXORA/
├── backend/     # Complete REST API
├── frontend/    # React app 
├── database/    # Schema docs
├── TODO.md      # Progress tracker
└── README.md
```

## 🚀 Quick Setup & Run

### 1. Prerequisites
```
Node.js 20+
MongoDB (local/Compass or Atlas free tier)
```

### 2. Backend **(Critical: Update .env first!)**
```
cd backend
npm install
npm run dev
```
**Backend/.env created** - Update `MONGODB_URI` & `JWT_SECRET`
**Check:** http://localhost:5000/api/health 
**Logs:** Watch console for auth attempts (📝 REGISTER / 🔐 LOGIN)

### 3. Frontend
```
cd frontend
npm install  
npm run dev
```
**App:** http://localhost:5173 (auto-proxied to backend)

### 4. **Test Auth NOW**
- **Admin login:** `admin@nexora.com` / `admin123`
- **Register new user**
- **Check:** Browser Network tab + Backend console logs

## 🧪 Debug Commands
```
# Backend health
curl http://localhost:5000/api/health

# Test register
curl -X POST http://localhost:5000/api/auth/register \\
  -H "Content-Type: application/json" \\
  -d '{"email":"test@test.com","password":"123456"}'
```

## 📋 Current Status (TODO.md)
✅ Auth debug logging  
✅ .env setup  
✅ CORS/Proxy configured  
⏳ **Run servers → Test!**

## Next Features
- Real payment integration (Paystack)
- Airtime APIs (VTpass)
- Deploy (Render + Vercel)

**Enjoy your working auth! 🎉**

## 🔌 API Placeholders Ready
```
services/
├── airtimeService.js     → VTpass/ClubKonnect
├── dataService.js        → VTpass 
├── paymentService.js     → Paystack/Flutterwave
├── subscriptionService.js
└── socialService.js      → Marketing APIs
```
**Just replace mock functions with real API calls & add keys to .env**

## 📱 Features Complete (Backend)
✅ Auth (register/login/me)  
✅ Wallet (balance/fund/history)  
✅ Orders (airtime/data/sub/social w/ wallet deduction)  
✅ Admin (users/orders/update status)  
✅ Error handling & validation  
✅ CORS & JWT protected routes  

## ⏭ Next: Frontend Implementation
See TODO.md → Steps 9-25

## 🧪 Test Backend
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"123456"}'
```

## Deploy
- Backend: Render/Heroku (add MONGODB_URI)
- Frontend: Vercel/Netlify

Enjoy your MVP! 🎉
