import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

// 👇 THIS IS WHERE IT GOES
app.use(cors({
  origin: "http://localhost:5174", // Adjust this to your frontend URL and port
}));

app.use(express.json());

// Mount API routes
import routes from './routes/index.js';

app.use('/api/auth', routes.auth);
app.use('/api/wallet', routes.wallet);
app.use('/api/orders', routes.orders);
app.use('/api/admin', routes.admin);

// Health check
app.get('/api/health', (req, res) => res.json({ ok: true }));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server running on port ${PORT}`);
});

