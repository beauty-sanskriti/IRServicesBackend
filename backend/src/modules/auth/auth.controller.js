// Auth Controller — request/response handlers
import * as authService from './auth.service.js';
import { sendSuccess, sendError } from '../../middleware/response.js';

export const login = async (req, res) => {
  try {
    const result = await authService.loginUser(req.body);
    return sendSuccess(res, result, 'Login successful.');
  } catch (err) {
    return sendError(res, err.message || 'Login failed.', err.status || 500);
  }
};

export const register = async (req, res) => {
  try {
    const user = await authService.registerUser(req.body);
    return sendSuccess(res, user, 'User registered successfully.', 201);
  } catch (err) {
    return sendError(res, err.message || 'Registration failed.', err.status || 500);
  }
};

export const getMe = async (req, res) => {
  try {
    const user = await authService.getMe(req.user.id);
    return sendSuccess(res, user, 'User profile fetched.');
  } catch (err) {
    return sendError(res, err.message || 'Failed to fetch profile.', err.status || 500);
  }
};
