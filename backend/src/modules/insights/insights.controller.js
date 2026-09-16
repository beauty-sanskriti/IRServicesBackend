// Insights Controller — request/response handlers
import * as insightsService from './insights.service.js';
import { sendSuccess, sendError } from '../../middleware/response.js';

export const getInsights = async (req, res) => {
  try {
    const insights = await insightsService.getAllInsights(req.query);
    return sendSuccess(res, insights, 'Insights fetched.');
  } catch (err) {
    return sendError(res, err.message || 'Failed to fetch insights.', err.status || 500);
  }
};

export const getInsightById = async (req, res) => {
  try {
    const insight = await insightsService.getInsightById(req.params.id);
    return sendSuccess(res, insight);
  } catch (err) {
    return sendError(res, err.message || 'Failed to fetch insight.', err.status || 500);
  }
};

export const createInsight = async (req, res) => {
  try {
    const insight = await insightsService.createInsight(req.body);
    return sendSuccess(res, insight, 'Insight created.', 201);
  } catch (err) {
    return sendError(res, err.message || 'Failed to create insight.', err.status || 500);
  }
};

export const updateInsight = async (req, res) => {
  try {
    const insight = await insightsService.updateInsight(req.params.id, req.body);
    return sendSuccess(res, insight, 'Insight updated.');
  } catch (err) {
    return sendError(res, err.message || 'Failed to update insight.', err.status || 500);
  }
};

export const deleteInsight = async (req, res) => {
  try {
    await insightsService.deleteInsight(req.params.id);
    return sendSuccess(res, {}, 'Insight deleted.');
  } catch (err) {
    return sendError(res, err.message || 'Failed to delete insight.', err.status || 500);
  }
};
