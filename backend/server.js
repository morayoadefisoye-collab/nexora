import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const app = express();

// 🔥 CONNECT DATABASE (YOU WERE MISSING THIS)
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

app.use(cors({
  origin: "http://localhost:5174",
}));

app.use(express.json());

import routes from './routes/index.js';

app.use('/api/auth', routes.auth);
app.use('/api/wallet', routes.wallet);
app.use('/api/orders', routes.orders);
app.use('/api/admin', routes.admin);

app.get('/api/health', (req, res) => res.json({ ok: true }));

const PORT = process.env.PORT || 5174;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});