// Auth Repository — DB queries for users table
import db from '../../config/db.js';

export const findUserByEmail = async (email) => {
  const [rows] = await db.query(
    'SELECT * FROM users WHERE email = ? LIMIT 1',
    [email]
  );
  return rows[0] || null;
};

export const findUserById = async (id) => {
  const [rows] = await db.query(
    'SELECT id, name, email, role, created_at FROM users WHERE id = ? LIMIT 1',
    [id]
  );
  return rows[0] || null;
};

export const createUser = async ({ id, name, email, passwordHash, role = 'recruiter' }) => {
  await db.query(
    'INSERT INTO users (id, name, email, password_hash, role, created_at) VALUES (?, ?, ?, ?, ?, NOW())',
    [id, name, email, passwordHash, role]
  );
  return findUserById(id);
};

export const getAllUsers = async () => {
  const [rows] = await db.query(
    'SELECT id, name, email, role, created_at FROM users ORDER BY created_at DESC'
  );
  return rows;
};

export const updateUser = async (id, fields) => {
  const allowed = ['name', 'email', 'role'];
  const sets = [];
  const values = [];
  for (const key of allowed) {
    if (fields[key] !== undefined) {
      sets.push(`${key} = ?`);
      values.push(fields[key]);
    }
  }
  if (sets.length === 0) return findUserById(id);
  sets.push('updated_at = NOW()');
  values.push(id);
  await db.query(`UPDATE users SET ${sets.join(', ')} WHERE id = ?`, values);
  return findUserById(id);
};

export const deleteUser = async (id) => {
  await db.query('DELETE FROM users WHERE id = ?', [id]);
};
