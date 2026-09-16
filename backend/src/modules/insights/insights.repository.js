// Insights Repository — DB queries for insights table
import db from '../../config/db.js';

export const findAllInsights = async ({ category, search, all }) => {
  const showAll = all === 'true';
  let sql = showAll ? 'SELECT * FROM insights WHERE 1=1' : "SELECT * FROM insights WHERE status = 'Published'";
  const params = [];
  if (category && category !== 'All') { sql += ' AND category = ?'; params.push(category); }
  if (search)   { sql += ' AND (title LIKE ? OR excerpt LIKE ? OR content LIKE ?)'; params.push(`%${search}%`, `%${search}%`, `%${search}%`); }
  sql += ' ORDER BY created_at DESC';
  const [rows] = await db.query(sql, params);
  return rows;
};

export const findInsightById = async (id) => {
  const [rows] = await db.query('SELECT * FROM insights WHERE id = ? LIMIT 1', [id]);
  return rows[0] || null;
};

export const createInsight = async (data) => {
  const { id, title, category, author, excerpt, content, coverImageUrl, readTime, status = 'Published' } = data;
  const publishedAt = status === 'Published' ? new Date() : null;
  await db.query(
    'INSERT INTO insights (id, title, category, author, excerpt, content, cover_image_url, read_time, status, published_at, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())',
    [id, title, category || null, author || 'iR Editorial', excerpt || null, content || null,
     coverImageUrl || null, readTime || '5 min read', status, publishedAt]
  );
  return findInsightById(id);
};

export const updateInsight = async (id, fields) => {
  const allowed = ['title', 'category', 'author', 'excerpt', 'content', 'cover_image_url', 'read_time', 'status'];
  const sets = []; const values = [];
  for (const key of allowed) {
    let bodyKey = key;
    if (key === 'cover_image_url') bodyKey = 'coverImageUrl';
    if (key === 'read_time') bodyKey = 'readTime';
    if (fields[bodyKey] !== undefined) { sets.push(`${key} = ?`); values.push(fields[bodyKey]); }
  }
  if (fields.status === 'Published') { sets.push('published_at = NOW()'); }
  sets.push('updated_at = NOW()');
  values.push(id);
  await db.query(`UPDATE insights SET ${sets.join(', ')} WHERE id = ?`, values);
  return findInsightById(id);
};

export const deleteInsight = async (id) => {
  await db.query('DELETE FROM insights WHERE id = ?', [id]);
};
