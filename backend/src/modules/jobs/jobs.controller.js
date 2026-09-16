// Jobs Controller — request/response handlers
import * as jobsService from './jobs.service.js';
import { sendSuccess, sendError } from '../../middleware/response.js';

export const getJobs = async (req, res) => {
  try {
    const jobs = await jobsService.getAllJobs(req.query);
    return sendSuccess(res, jobs, 'Jobs fetched successfully.');
  } catch (err) {
    return sendError(res, err.message || 'Failed to fetch jobs.', err.status || 500);
  }
};

export const getJobById = async (req, res) => {
  try {
    const job = await jobsService.getJobById(req.params.id);
    return sendSuccess(res, job);
  } catch (err) {
    return sendError(res, err.message || 'Failed to fetch job.', err.status || 500);
  }
};

export const createJob = async (req, res) => {
  try {
    const { title, department, location, type, experience } = req.body;
    if (!title || !department || !location || !type || !experience) {
      return sendError(res, 'title, department, location, type, experience are required.', 400);
    }
    const job = await jobsService.createJob(req.body);
    return sendSuccess(res, job, 'Job created successfully.', 201);
  } catch (err) {
    return sendError(res, err.message || 'Failed to create job.', err.status || 500);
  }
};

export const updateJob = async (req, res) => {
  try {
    const job = await jobsService.updateJob(req.params.id, req.body);
    return sendSuccess(res, job, 'Job updated.');
  } catch (err) {
    return sendError(res, err.message || 'Failed to update job.', err.status || 500);
  }
};

export const deleteJob = async (req, res) => {
  try {
    await jobsService.deleteJob(req.params.id);
    return sendSuccess(res, {}, 'Job deleted.');
  } catch (err) {
    return sendError(res, err.message || 'Failed to delete job.', err.status || 500);
  }
};
