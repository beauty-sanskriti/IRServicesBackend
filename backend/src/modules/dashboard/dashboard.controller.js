// Dashboard Controller — request/response handlers
import * as dashRepo from './dashboard.repository.js';
import { sendSuccess, sendError } from '../../middleware/response.js';

export const getDashboardData = async (req, res) => {
  try {
    const data = await dashRepo.getDashboardMetrics();
    return sendSuccess(res, data, 'Dashboard data fetched.');
  } catch (err) {
    console.error(err);
    return sendError(res, 'Failed to fetch dashboard data.', 500);
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await dashRepo.getAllUsers();
    return sendSuccess(res, users, 'Users fetched.');
  } catch (err) {
    return sendError(res, 'Failed to fetch users.', 500);
  }
};

export const getActivityLogs = async (req, res) => {
  try {
    const logs = await dashRepo.getActivityLogs();
    return sendSuccess(res, logs, 'Activity logs fetched.');
  } catch (err) {
    return sendError(res, 'Failed to fetch activity logs.', 500);
  }
};
