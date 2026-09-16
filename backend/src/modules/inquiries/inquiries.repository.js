// Inquiries Repository — DB queries for inquiries table
import db from '../../config/db.js';

export const findAllInquiries = async ({ status, search }) => {
  let sql = 'SELECT * FROM inquiries WHERE 1=1';
  const params = [];
  if (status) { sql += ' AND status = ?'; params.push(status); }
  if (search) { sql += ' AND (company_name LIKE ? OR contact_name LIKE ? OR email LIKE ?)'; params.push(`%${search}%`, `%${search}%`, `%${search}%`); }
  sql += ' ORDER BY created_at DESC';
  const [rows] = await db.query(sql, params);
  return rows;
};

export const findInquiryById = async (id) => {
  const [rows] = await db.query('SELECT * FROM inquiries WHERE id = ? LIMIT 1', [id]);
  return rows[0] || null;
};

export const createInquiry = async (data) => {
  const {
    id,
    companyName,
    contactName,
    email,
    phone,
    hiringType,
    rolesNeeded,
    targetTimeline,
    message,
    attachmentUrl,
  } = data;

  await db.query(
    `INSERT INTO inquiries (id, company_name, contact_name, email, phone, hiring_type, roles_needed, target_timeline, message, attachment_url, status, assigned_to, created_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'New', 'Unassigned', NOW())`,
    [
      id,
      companyName || 'N/A',
      contactName || 'Valued Lead',
      email,
      phone || null,
      hiringType || 'General Inquiry',
      rolesNeeded || null,
      targetTimeline || null,
      message || null,
      attachmentUrl || null,
    ]
  );
  return findInquiryById(id);
};

export const updateInquiry = async (id, fields) => {
  const allowed = ['status', 'assigned_to', 'assignedTo', 'notes', 'message'];
  const sets = [];
  const values = [];
  for (const key of allowed) {
    if (fields[key] !== undefined) {
      const dbKey = key === 'assignedTo' ? 'assigned_to' : key;
      sets.push(`${dbKey} = ?`);
      values.push(fields[key]);
    }
  }
  if (!sets.length) return findInquiryById(id);
  sets.push('updated_at = NOW()');
  values.push(id);
  await db.query(`UPDATE inquiries SET ${sets.join(', ')} WHERE id = ?`, values);
  return findInquiryById(id);
};

export const deleteInquiry = async (id) => {
  await db.query('DELETE FROM inquiries WHERE id = ?', [id]);
};
