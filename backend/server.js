import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// Route imports (Folder-wise modules)
import authRoutes        from './src/modules/auth/auth.routes.js';
import jobRoutes         from './src/modules/jobs/jobs.routes.js';
import applicationRoutes from './src/modules/applications/applications.routes.js';
import inquiryRoutes     from './src/modules/inquiries/inquiries.routes.js';
import insightRoutes     from './src/modules/insights/insights.routes.js';
import dashboardRoutes   from './src/modules/dashboard/dashboard.routes.js';

dotenv.config();

const app  = express();
const PORT = process.env.PORT || 5000;

// ── Middleware ────────────────────────────────────────────────────────────────
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded files
app.use('/uploads', express.static('uploads'));

// ── Health Check ──────────────────────────────────────────────────────────────
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    service: 'iR Recruiting REST API (MySQL)',
    timestamp: new Date().toISOString(),
  });
});

// ── API Routes ────────────────────────────────────────────────────────────────
app.use('/api/auth',         authRoutes);
app.use('/api/jobs',         jobRoutes);
app.use('/api/applications', applicationRoutes);
app.use('/api/inquiries',    inquiryRoutes);
app.use('/api/insights',     insightRoutes);
app.use('/api/admin',        dashboardRoutes);

// ── 404 Handler ───────────────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ success: false, message: `Route ${req.originalUrl} not found.` });
});

// ── Global Error Handler ──────────────────────────────────────────────────────
app.use((err, req, res, next) => {
  console.error('API Error:', err.stack);
  res.status(500).json({ success: false, error: 'Internal Server Error', message: err.message });
});

// ── Start Server ──────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n🚀 iR Recruiting Backend running on http://localhost:${PORT}`);
  console.log(`📦 Database: MySQL → ir_recruiting_db`);
  console.log(`🔑 Admin: admin@irrecruiting.com / admin123\n`);
});
