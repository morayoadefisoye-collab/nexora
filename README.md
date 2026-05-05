# 🚀 NEXORA - Airtime, Data & Services MVP

Modern web platform for airtime/data purchases, subscriptions, social marketing, with wallet & admin panel.

## 🛠 Tech Stack
- **Frontend**: React + Vite + Tailwind CSS + React Router
- **Backend**: Node.js + Express + MongoDB (Mongoose)
- **Auth**: JWT
- **State**: Context API

## 📁 Structure
```
NEXORA/
├── backend/     # Complete REST API
├── frontend/    # React app (next)
├── database/    # Schema docs
├── TODO.md      # Progress tracker
└── README.md
```

## 🚀 Quick Setup & Run

### 1. Prerequisites
```
Node.js 20+
MongoDB (local or Atlas free tier)
```

### 2. Backend
```bash
cd backend
# Copy env
copy .env.example .env
# Edit .env: MONGODB_URI, JWT_SECRET

# Install
npm install

# Seed DB (creates admin)
node utils/seed.js

# Dev server
npm run dev
```
**API runs on http://localhost:5000**

### 3. Frontend (Next steps after backend)
```bash
cd frontend
npm install
npm run dev
```
**App runs on http://localhost:5173**

### 4. Test Flow
1. Register user: POST /api/auth/register
2. Login → Get JWT
3. Fund wallet: POST /api/wallet/fund {amount: 1000, reference: 'test'}
4. Buy airtime: POST /api/orders {serviceType: 'airtime', phoneNumber: '...', network: 'MTN', amount: 200}
5. Check balance/history
6. Admin: admin@nexora.com / admin123

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
