// Insights Routes
import { Router } from 'express';
import { getInsights, getInsightById, createInsight, updateInsight, deleteInsight } from './insights.controller.js';
import { authenticate, authorize } from '../../middleware/auth.js';

const router = Router();

// GET /api/insights — public
router.get('/', getInsights);

// GET /api/insights/:id — public
router.get('/:id', getInsightById);

// POST /api/insights — admin only
router.post('/', authenticate, authorize('superadmin', 'admin'), createInsight);

// PATCH /api/insights/:id
router.patch('/:id', authenticate, authorize('superadmin', 'admin'), updateInsight);

// DELETE /api/insights/:id — superadmin & admin
router.delete('/:id', authenticate, authorize('superadmin', 'admin'), deleteInsight);

export default router;
