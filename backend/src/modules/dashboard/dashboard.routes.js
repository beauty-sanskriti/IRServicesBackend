// Dashboard Routes
import { Router } from 'express';
import { getDashboardData, getUsers, getActivityLogs } from './dashboard.controller.js';
import { authenticate, authorize } from '../../middleware/auth.js';

const router = Router();

// GET /api/admin/dashboard — summary stats
router.get('/dashboard', authenticate, authorize('superadmin', 'admin', 'recruiter'), getDashboardData);

// GET /api/admin/users — superadmin only
router.get('/users', authenticate, authorize('superadmin'), getUsers);

// GET /api/admin/activity — activity logs
router.get('/activity', authenticate, authorize('superadmin', 'admin'), getActivityLogs);

export default router;
