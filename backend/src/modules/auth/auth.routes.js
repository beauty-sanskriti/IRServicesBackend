// Auth Routes
import { Router } from 'express';
import { login, register, getMe } from './auth.controller.js';
import { validateLogin, validateRegister } from './auth.validation.js';
import { authenticate, authorize } from '../../middleware/auth.js';

const router = Router();

// POST /api/auth/login
router.post('/login', validateLogin, login);

// POST /api/auth/register  (superadmin only)
router.post('/register', authenticate, authorize('superadmin'), validateRegister, register);

// GET /api/auth/me
router.get('/me', authenticate, getMe);

export default router;
