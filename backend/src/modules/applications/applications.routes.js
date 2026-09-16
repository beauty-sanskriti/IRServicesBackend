// Applications Routes
import { Router } from 'express';
import { submitApplication, getApplications, getApplicationById, updateApplication, deleteApplication } from './applications.controller.js';
import { authenticate, authorize } from '../../middleware/auth.js';
import { upload } from '../../middleware/upload.js';

const router = Router();

// POST /api/applications — public (candidate applies, supports optional resume upload)
router.post('/', upload.single('resume'), submitApplication);

// GET /api/applications — admin only
router.get('/', authenticate, authorize('superadmin', 'admin', 'recruiter'), getApplications);

// GET /api/applications/:id — admin only
router.get('/:id', authenticate, authorize('superadmin', 'admin', 'recruiter'), getApplicationById);

// PATCH /api/applications/:id — admin: update status/notes
router.patch('/:id', authenticate, authorize('superadmin', 'admin', 'recruiter'), updateApplication);

// DELETE /api/applications/:id — admin only
router.delete('/:id', authenticate, authorize('superadmin', 'admin', 'recruiter'), deleteApplication);

export default router;
