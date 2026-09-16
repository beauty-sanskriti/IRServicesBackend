// Jobs Routes
import { Router } from 'express';
import { getJobs, getJobById, createJob, updateJob, deleteJob } from './jobs.controller.js';
import { authenticate, authorize } from '../../middleware/auth.js';

const router = Router();

// GET /api/jobs — public
router.get('/', getJobs);

// GET /api/jobs/:id — public
router.get('/:id', getJobById);

// POST /api/jobs — admin only
router.post('/', authenticate, authorize('superadmin', 'admin'), createJob);

// PATCH /api/jobs/:id — admin only
router.patch('/:id', authenticate, authorize('superadmin', 'admin'), updateJob);

// DELETE /api/jobs/:id — superadmin & admin
router.delete('/:id', authenticate, authorize('superadmin', 'admin'), deleteJob);

export default router;
