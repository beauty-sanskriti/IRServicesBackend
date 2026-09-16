// Jobs Service — business logic
import * as jobsRepo from './jobs.repository.js';

const parseJsonField = (val) => {
  if (!val) return [];
  if (Array.isArray(val)) return val;
  try {
    return JSON.parse(val);
  } catch {
    return [];
  }
};

const formatJob = (job) => {
  if (!job) return null;
  return {
    ...job,
    category: job.department,
    skills: parseJsonField(job.skills),
    responsibilities: parseJsonField(job.responsibilities),
    requirements: parseJsonField(job.requirements),
  };
};

export const getAllJobs = async (query) => {
  const rows = await jobsRepo.findAllJobs(query);
  return rows.map(formatJob);
};

export const getJobById = async (id) => {
  const job = await jobsRepo.findJobById(id);
  if (!job) throw { status: 404, message: 'Job not found.' };
  return formatJob(job);
};

export const createJob = async (jobData) => {
  const id = `job_${Date.now()}`;
  const job = await jobsRepo.createJob({ id, ...jobData });
  return formatJob(job);
};

export const updateJob = async (id, jobData) => {
  const existing = await jobsRepo.findJobById(id);
  if (!existing) throw { status: 404, message: 'Job not found.' };
  const updated = await jobsRepo.updateJob(id, jobData);
  return formatJob(updated);
};

export const deleteJob = async (id) => {
  await jobsRepo.deleteJob(id);
};
