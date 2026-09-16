// Inquiries Routes
import { Router } from 'express';
import { submitInquiry, getInquiries, getInquiryById, updateInquiry, deleteInquiry } from './inquiries.controller.js';
import { authenticate, authorize } from '../../middleware/auth.js';
import { upload } from '../../middleware/upload.js';

const router = Router();

// POST /api/inquiries — public (employers/contact forms, supports optional file upload)
router.post('/', upload.single('file'), submitInquiry);

// GET /api/inquiries — admin only
router.get('/', authenticate, authorize('superadmin', 'admin', 'recruiter'), getInquiries);

// GET /api/inquiries/:id — admin only
router.get('/:id', authenticate, authorize('superadmin', 'admin', 'recruiter'), getInquiryById);

// PATCH /api/inquiries/:id — admin: update status/assigned
router.patch('/:id', authenticate, authorize('superadmin', 'admin', 'recruiter'), updateInquiry);

// DELETE /api/inquiries/:id — admin only
router.delete('/:id', authenticate, authorize('superadmin', 'admin', 'recruiter'), deleteInquiry);

export default router;
