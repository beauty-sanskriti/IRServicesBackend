// Inquiries Controller — request/response handlers
import * as inqService from './inquiries.service.js';
import { sendSuccess, sendError } from '../../middleware/response.js';

export const submitInquiry = async (req, res) => {
  try {
    const inq = await inqService.submitInquiry(req.body, req.file);
    return sendSuccess(res, inq, 'Inquiry submitted successfully.', 201);
  } catch (err) {
    return sendError(res, err.message || 'Failed to submit inquiry.', err.status || 500);
  }
};

export const getInquiries = async (req, res) => {
  try {
    const inqs = await inqService.getAllInquiries(req.query);
    return sendSuccess(res, inqs, 'Inquiries fetched.');
  } catch (err) {
    return sendError(res, err.message || 'Failed to fetch inquiries.', err.status || 500);
  }
};

export const getInquiryById = async (req, res) => {
  try {
    const inq = await inqService.getInquiryById(req.params.id);
    return sendSuccess(res, inq);
  } catch (err) {
    return sendError(res, err.message || 'Failed to fetch inquiry.', err.status || 500);
  }
};

export const updateInquiry = async (req, res) => {
  try {
    const inq = await inqService.updateInquiry(req.params.id, req.body);
    return sendSuccess(res, inq, 'Inquiry updated.');
  } catch (err) {
    return sendError(res, err.message || 'Failed to update inquiry.', err.status || 500);
  }
};

export const deleteInquiry = async (req, res) => {
  try {
    await inqService.deleteInquiry(req.params.id);
    return sendSuccess(res, {}, 'Inquiry deleted.');
  } catch (err) {
    return sendError(res, err.message || 'Failed to delete inquiry.', err.status || 500);
  }
};
