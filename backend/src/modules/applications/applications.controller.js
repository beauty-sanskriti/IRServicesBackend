// Applications Controller — request/response handlers
import * as appService from './applications.service.js';
import { sendSuccess, sendError } from '../../middleware/response.js';

export const submitApplication = async (req, res) => {
  try {
    const app = await appService.submitApplication(req.body, req.file);
    return sendSuccess(res, app, 'Application submitted successfully.', 201);
  } catch (err) {
    return sendError(res, err.message || 'Failed to submit application.', err.status || 500);
  }
};

export const getApplications = async (req, res) => {
  try {
    const apps = await appService.getAllApplications(req.query);
    return sendSuccess(res, apps, 'Applications fetched.');
  } catch (err) {
    return sendError(res, err.message || 'Failed to fetch applications.', err.status || 500);
  }
};

export const getApplicationById = async (req, res) => {
  try {
    const app = await appService.getApplicationById(req.params.id);
    return sendSuccess(res, app);
  } catch (err) {
    return sendError(res, err.message || 'Failed to fetch application.', err.status || 500);
  }
};

export const updateApplication = async (req, res) => {
  try {
    const app = await appService.updateApplicationStatus(req.params.id, req.body);
    return sendSuccess(res, app, 'Application updated.');
  } catch (err) {
    return sendError(res, err.message || 'Failed to update application.', err.status || 500);
  }
};

export const deleteApplication = async (req, res) => {
  try {
    await appService.deleteApplication(req.params.id);
    return sendSuccess(res, {}, 'Application deleted.');
  } catch (err) {
    return sendError(res, err.message || 'Failed to delete application.', err.status || 500);
  }
};
