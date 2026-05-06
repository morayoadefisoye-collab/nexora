# NEXORA Database Schema (MongoDB/Mongoose)

## Models

### User
```javascript
{
  _id: ObjectId,
  email: String (unique),
  password: String (hashed),
  role: 'user' | 'admin',
  walletId: ObjectId (ref: Wallet),
  isActive: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### Wallet
```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: User, unique),
  balance: Number (default: 0),
  currency: 'NGN' (default),
  createdAt: Date,
  updatedAt: Date
}
```

### Transaction
```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: User),
  walletId: ObjectId (ref: Wallet),
  type: 'fund' | 'airtime' | 'data' | ...,
  amount: Number,
  status: 'pending' | 'success' | 'failed',
  reference: String (unique),
  description: String,
  createdAt: Date
}
```

### Order
```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: User),
  serviceType: 'airtime' | 'data' | ...,
  categoryId: ObjectId (ref: ServiceCategory),
  amount: Number,
  phoneNumber: String,
  network: String,
  dataPlan: String,
  socialPlatform: String,
  quantity: Number,
  status: 'pending' | 'completed' | ...,
  reference: String (unique),
  walletTransactionId: ObjectId,
  createdAt: Date
}
```

### ServiceCategory
```javascript
{
  _id: ObjectId,
  type: 'airtime' | 'data' | ...,
  name: String,
  networks: [String],
  plans: [{ name, price, data }],
  isActive: Boolean
}
```

## Indexes (Auto-created)
- User.email (unique)
- Wallet.userId (unique)
- Transaction.reference (unique)
- Order.reference (unique)

## Seed Admin
```
node backend/utils/seed.js
Email: admin@nexora.com
Password: admin123
```

## API Endpoints Ready
- POST /api/auth/register
- POST /api/auth/login  
- GET /api/auth/me
- GET /api/wallet/balance
- POST /api/wallet/fund
- GET /api/wallet/history
- POST /api/orders
- GET /api/orders
- GET /api/admin/users
- GET /api/admin/orders
- PATCH /api/admin/orders/:id/status

## To Connect Real APIs
1. Replace services/*.js with real providers (VTpass for airtime/data, Paystack for payments)
2. Add API keys to .env
3. Update service functions to call external APIs
