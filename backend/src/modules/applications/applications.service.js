// Applications Service — business logic
import * as appRepo from './applications.repository.js';
import db from '../../config/db.js';

const formatApp = (app) => {
  if (!app) return null;
  return {
    ...app,
    jobId: app.job_id,
    jobTitle: app.job_title,
    candidateName: app.candidate_name,
    experienceYears: app.experience_years,
    currentCompany: app.current_company,
    portfolioUrl: app.portfolio_url,
    resumeText: app.resume_text,
    resumeFilePath: app.resume_file_path,
    appliedAt: app.applied_at,
  };
};

export const getAllApplications = async (query) => {
  const rows = await appRepo.findAllApplications(query);
  return rows.map(formatApp);
};

export const getApplicationById = async (id) => {
  const app = await appRepo.findApplicationById(id);
  if (!app) throw { status: 404, message: 'Application not found.' };
  return formatApp(app);
};

export const submitApplication = async (data, file) => {
  const { jobId, candidateName, email, jobTitle } = data;
  if (!candidateName || !email) {
    throw { status: 400, message: 'candidateName and email are required.' };
  }

  let finalJobTitle = jobTitle || 'General Application';
  let finalJobId = jobId || 'general';

  if (finalJobId && finalJobId !== 'general') {
    const [jobs] = await db.query('SELECT id, title FROM jobs WHERE id = ? LIMIT 1', [finalJobId]);
    if (jobs[0]) {
      finalJobTitle = jobs[0].title;
    }
  }

  const resumeFilePath = file ? `/uploads/${file.filename}` : (data.resumeFilePath || null);

  const id = `app_${Date.now()}`;
  const app = await appRepo.createApplication({
    id,
    jobId: finalJobId,
    jobTitle: finalJobTitle,
    candidateName,
    email,
    phone: data.phone,
    experienceYears: data.experienceYears ? Number(data.experienceYears) : 0,
    currentCompany: data.currentCompany,
    portfolioUrl: data.portfolioUrl,
    resumeText: data.resumeText,
    resumeFilePath,
  });

  return formatApp(app);
};

export const updateApplicationStatus = async (id, data) => {
  const existing = await appRepo.findApplicationById(id);
  if (!existing) throw { status: 404, message: 'Application not found.' };
  const updated = await appRepo.updateApplication(id, data);
  return formatApp(updated);
};

export const deleteApplication = async (id) => {
  await appRepo.deleteApplication(id);
};
