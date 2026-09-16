// Jobs Repository — DB queries for jobs table
import db from '../../config/db.js';

export const findAllJobs = async ({ status, department, category, search }) => {
  let sql = 'SELECT * FROM jobs WHERE 1=1';
  const params = [];

  if (status) {
    sql += ' AND status = ?';
    params.push(status);
  }
  const deptFilter = category || department;
  if (deptFilter && deptFilter !== 'All') {
    sql += ' AND (department LIKE ? OR department LIKE ?)';
    params.push(`%${deptFilter}%`, `%${deptFilter}%`);
  }
  if (search) {
    sql += ' AND (title LIKE ? OR description LIKE ? OR department LIKE ?)';
    params.push(`%${search}%`, `%${search}%`, `%${search}%`);
  }

  sql += ' ORDER BY created_at DESC';
  const [rows] = await db.query(sql, params);
  return rows;
};

export const findJobById = async (id) => {
  const [rows] = await db.query('SELECT * FROM jobs WHERE id = ? LIMIT 1', [id]);
  return rows[0] || null;
};

export const createJob = async ({
  id,
  title,
  department,
  location,
  type,
  experience,
  salary,
  status = 'Active',
  description,
  skills,
  responsibilities,
  requirements,
}) => {
  const skillsJson = JSON.stringify(Array.isArray(skills) ? skills : (skills ? String(skills).split(',').map(s => s.trim()) : []));
  const respJson = JSON.stringify(Array.isArray(responsibilities) ? responsibilities : (responsibilities ? String(responsibilities).split('\n').map(r => r.trim()).filter(Boolean) : []));
  const reqJson = JSON.stringify(Array.isArray(requirements) ? requirements : (requirements ? String(requirements).split(',').map(r => r.trim()) : []));

  await db.query(
    `INSERT INTO jobs (id, title, department, location, type, experience, salary, status, description, skills, responsibilities, requirements, created_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())`,
    [id, title, department, location, type, experience, salary || null, status, description || null, skillsJson, respJson, reqJson]
  );
  return findJobById(id);
};

export const updateJob = async (id, fields) => {
  const allowed = [
    'title',
    'department',
    'location',
    'type',
    'experience',
    'salary',
    'status',
    'description',
    'skills',
    'responsibilities',
    'requirements',
  ];
  const sets = [];
  const values = [];
  for (const key of allowed) {
    if (fields[key] !== undefined) {
      sets.push(`${key} = ?`);
      let val = fields[key];
      if (['skills', 'responsibilities', 'requirements'].includes(key)) {
        if (typeof val === 'string') {
          if (key === 'responsibilities') {
            val = val.split('\n').map((s) => s.trim()).filter(Boolean);
          } else {
            val = val.split(',').map((s) => s.trim()).filter(Boolean);
          }
        }
        val = JSON.stringify(Array.isArray(val) ? val : []);
      }
      values.push(val);
    }
  }
  if (!sets.length) return findJobById(id);
  sets.push('updated_at = NOW()');
  values.push(id);
  await db.query(`UPDATE jobs SET ${sets.join(', ')} WHERE id = ?`, values);
  return findJobById(id);
};

export const deleteJob = async (id) => {
  await db.query('DELETE FROM jobs WHERE id = ?', [id]);
};
