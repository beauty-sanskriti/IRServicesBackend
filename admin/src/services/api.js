const API_BASE = 'http://localhost:5000/api';

const getHeaders = () => {
  const token = localStorage.getItem('ir_admin_token');
  const headers = { 'Content-Type': 'application/json' };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
};

// Helper: extract error message from backend response
const getError = (data, fallback) => data.message || data.error || fallback;

export const api = {
  // ── Auth ────────────────────────────────────────────────────────────────────
  login: async (email, password) => {
    const res  = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(getError(data, 'Login failed'));
    // Backend returns: { success, message, data: { token, user } }
    return data.data;
  },

  getMe: async () => {
    const res  = await fetch(`${API_BASE}/auth/me`, { headers: getHeaders() });
    const data = await res.json();
    if (!res.ok) throw new Error(getError(data, 'Failed to authenticate'));
    // Backend returns: { success, message, data: { id, name, email, role } }
    return data.data;
  },

  // ── Dashboard Stats ─────────────────────────────────────────────────────────
  getDashboardStats: async () => {
    const res  = await fetch(`${API_BASE}/admin/dashboard`, { headers: getHeaders() });
    const data = await res.json();
    if (!res.ok) throw new Error(getError(data, 'Failed to fetch dashboard stats'));
    return data.data;
  },

  // ── Jobs ────────────────────────────────────────────────────────────────────
  getJobs: async (query = {}) => {
    const params = new URLSearchParams(query).toString();
    const res  = await fetch(`${API_BASE}/jobs?${params}`, { headers: getHeaders() });
    const data = await res.json();
    if (!res.ok) throw new Error(getError(data, 'Failed to fetch jobs'));
    return data.data;
  },

  createJob: async (jobData) => {
    const res  = await fetch(`${API_BASE}/jobs`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(jobData),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(getError(data, 'Failed to create job'));
    return data.data;
  },

  updateJob: async (id, jobData) => {
    const res  = await fetch(`${API_BASE}/jobs/${id}`, {
      method: 'PATCH',           // backend uses PATCH not PUT
      headers: getHeaders(),
      body: JSON.stringify(jobData),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(getError(data, 'Failed to update job'));
    return data.data;
  },

  deleteJob: async (id) => {
    const res  = await fetch(`${API_BASE}/jobs/${id}`, {
      method: 'DELETE',
      headers: getHeaders(),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(getError(data, 'Failed to delete job'));
    return data.data;
  },

  // ── Applications ────────────────────────────────────────────────────────────
  getApplications: async (query = {}) => {
    const params = new URLSearchParams(query).toString();
    const res  = await fetch(`${API_BASE}/applications?${params}`, { headers: getHeaders() });
    const data = await res.json();
    if (!res.ok) throw new Error(getError(data, 'Failed to fetch applications'));
    return data.data;
  },

  updateApplicationStatus: async (id, status, notes) => {
    // Backend route: PATCH /api/applications/:id  (no /status suffix)
    const res  = await fetch(`${API_BASE}/applications/${id}`, {
      method: 'PATCH',
      headers: getHeaders(),
      body: JSON.stringify({ status, notes }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(getError(data, 'Failed to update application'));
    return data.data;
  },

  deleteApplication: async (id) => {
    const res  = await fetch(`${API_BASE}/applications/${id}`, {
      method: 'DELETE',
      headers: getHeaders(),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(getError(data, 'Failed to delete application'));
    return data.data;
  },

  // ── Inquiries ───────────────────────────────────────────────────────────────
  getInquiries: async (query = {}) => {
    const params = new URLSearchParams(query).toString();
    const res  = await fetch(`${API_BASE}/inquiries?${params}`, { headers: getHeaders() });
    const data = await res.json();
    if (!res.ok) throw new Error(getError(data, 'Failed to fetch inquiries'));
    return data.data;
  },

  updateInquiry: async (id, inquiryData) => {
    const res  = await fetch(`${API_BASE}/inquiries/${id}`, {
      method: 'PATCH',
      headers: getHeaders(),
      body: JSON.stringify(inquiryData),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(getError(data, 'Failed to update inquiry'));
    return data.data;
  },

  deleteInquiry: async (id) => {
    const res  = await fetch(`${API_BASE}/inquiries/${id}`, {
      method: 'DELETE',
      headers: getHeaders(),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(getError(data, 'Failed to delete inquiry'));
    return data.data;
  },

  // ── Insights ────────────────────────────────────────────────────────────────
  getInsights: async (query = {}) => {
    const params = new URLSearchParams({ all: 'true', ...query }).toString();
    const res  = await fetch(`${API_BASE}/insights?${params}`, { headers: getHeaders() });
    const data = await res.json();
    if (!res.ok) throw new Error(getError(data, 'Failed to fetch insights'));
    return data.data;
  },

  createInsight: async (insightData) => {
    const res  = await fetch(`${API_BASE}/insights`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(insightData),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(getError(data, 'Failed to create insight'));
    return data.data;
  },

  updateInsight: async (id, insightData) => {
    const res  = await fetch(`${API_BASE}/insights/${id}`, {
      method: 'PATCH',
      headers: getHeaders(),
      body: JSON.stringify(insightData),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(getError(data, 'Failed to update insight'));
    return data.data;
  },

  deleteInsight: async (id) => {
    const res  = await fetch(`${API_BASE}/insights/${id}`, {
      method: 'DELETE',
      headers: getHeaders(),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(getError(data, 'Failed to delete insight'));
    return data.data;
  },
};
