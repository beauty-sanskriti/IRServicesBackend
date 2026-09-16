// Applications Repository — DB queries for applications table
import db from '../../config/db.js';

export const findAllApplications = async ({ status, jobId, search }) => {
  let sql = 'SELECT * FROM applications WHERE 1=1';
  const params = [];
  if (status) { sql += ' AND status = ?'; params.push(status); }
  if (jobId)  { sql += ' AND job_id = ?'; params.push(jobId); }
  if (search) { sql += ' AND (candidate_name LIKE ? OR email LIKE ? OR job_title LIKE ?)'; params.push(`%${search}%`, `%${search}%`, `%${search}%`); }
  sql += ' ORDER BY applied_at DESC';
  const [rows] = await db.query(sql, params);
  return rows;
};

export const findApplicationById = async (id) => {
  const [rows] = await db.query('SELECT * FROM applications WHERE id = ? LIMIT 1', [id]);
  return rows[0] || null;
};

export const createApplication = async (data) => {
  const {
    id,
    jobId,
    jobTitle,
    candidateName,
    email,
    phone,
    experienceYears,
    currentCompany,
    portfolioUrl,
    resumeText,
    resumeFilePath,
  } = data;

  await db.query(
    `INSERT INTO applications (id, job_id, job_title, candidate_name, email, phone, experience_years, current_company, portfolio_url, resume_text, resume_file_path, status, applied_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'Applied', NOW())`,
    [
      id,
      jobId || 'general',
      jobTitle || 'General Application',
      candidateName,
      email,
      phone || null,
      experienceYears || 0,
      currentCompany || null,
      portfolioUrl || null,
      resumeText || null,
      resumeFilePath || null,
    ]
  );
  return findApplicationById(id);
};

export const updateApplication = async (id, { status, notes }) => {
  const sets = [];
  const values = [];
  if (status) { sets.push('status = ?'); values.push(status); }
  if (notes !== undefined) { sets.push('notes = ?'); values.push(notes); }
  if (!sets.length) return findApplicationById(id);
  sets.push('updated_at = NOW()');
  values.push(id);
  await db.query(`UPDATE applications SET ${sets.join(', ')} WHERE id = ?`, values);
  return findApplicationById(id);
};

export const deleteApplication = async (id) => {
  await db.query('DELETE FROM applications WHERE id = ?', [id]);
};
