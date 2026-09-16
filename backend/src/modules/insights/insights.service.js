// Insights Service — business logic
import * as insightsRepo from './insights.repository.js';

const formatInsight = (ins) => {
  if (!ins) return null;
  return {
    ...ins,
    coverImageUrl: ins.cover_image_url,
    readTime: ins.read_time || '5 min read',
    publishedAt: ins.published_at,
    createdAt: ins.created_at,
    date: ins.published_at ? new Date(ins.published_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Recently',
  };
};

export const getAllInsights = async (query) => {
  const rows = await insightsRepo.findAllInsights(query);
  return rows.map(formatInsight);
};

export const getInsightById = async (id) => {
  const insight = await insightsRepo.findInsightById(id);
  if (!insight) throw { status: 404, message: 'Insight not found.' };
  return formatInsight(insight);
};

export const createInsight = async (data) => {
  if (!data.title) throw { status: 400, message: 'title is required.' };
  const id = `ins_${Date.now()}`;
  const created = await insightsRepo.createInsight({ id, ...data });
  return formatInsight(created);
};

export const updateInsight = async (id, data) => {
  const existing = await insightsRepo.findInsightById(id);
  if (!existing) throw { status: 404, message: 'Insight not found.' };
  const updated = await insightsRepo.updateInsight(id, data);
  return formatInsight(updated);
};

export const deleteInsight = async (id) => {
  await insightsRepo.deleteInsight(id);
};
