import React, { useState, useEffect } from 'react';
import { api } from '../services/api.js';
import { Search, Users, ExternalLink, Download, Trash2 } from 'lucide-react';

const statusColors = {
  Applied: 'bg-amber-500/10 text-amber-500 border-amber-500/30',
  Shortlisted: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/30',
  Interviewing: 'bg-blue-500/10 text-blue-500 border-blue-500/30',
  Offered: 'bg-purple-500/10 text-purple-500 border-purple-500/30',
  Rejected: 'bg-rose-500/10 text-rose-500 border-rose-500/30',
};

export default function ApplicationsManager() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [selectedApp, setSelectedApp] = useState(null);

  useEffect(() => {
    loadApplications();
  }, [search, statusFilter]);

  const loadApplications = async () => {
    try {
      setLoading(true);
      const data = await api.getApplications({ search, status: statusFilter });
      const rawList = Array.isArray(data) ? data : data.applications || data.items || [];
      const normalized = rawList.map(app => ({
        ...app,
        candidateName: app.candidateName || app.candidate_name,
        jobTitle: app.jobTitle || app.job_title,
        jobId: app.jobId || app.job_id,
        experienceYears: app.experienceYears || app.experience_years,
        currentCompany: app.currentCompany || app.current_company,
        portfolioUrl: app.portfolioUrl || app.portfolio_url,
        resumeText: app.resumeText || app.resume_text,
        resumeFilePath: app.resumeFilePath || app.resume_file_path,
        appliedAt: app.appliedAt || app.applied_at
      }));
      setApplications(normalized);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await api.updateApplicationStatus(id, newStatus);
      loadApplications();
      if (selectedApp && selectedApp.id === id) {
        setSelectedApp(prev => ({ ...prev, status: newStatus }));
      }
    } catch (err) {
      alert(err.message);
    }
  };

  const handleDelete = async (id, e) => {
    if (e) e.stopPropagation();
    if (!confirm('Are you sure you want to delete this candidate application?')) return;
    try {
      await api.deleteApplication(id);
      if (selectedApp && selectedApp.id === id) {
        setSelectedApp(null);
      }
      loadApplications();
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <Users className="w-6 h-6 text-brand-orange" />
            Candidate Applications
          </h1>
          <p className="text-sm text-slate-600 mt-1">Review candidate submissions, resume attachments, and pipeline statuses.</p>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="sm:col-span-2 relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search candidate name, email, role, phone..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-900 text-sm focus:outline-none focus:border-brand-orange"
          />
        </div>

        <div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-900 text-sm focus:outline-none focus:border-brand-orange"
          >
            <option value="">All Statuses ({applications.length})</option>
            <option value="Applied">Applied</option>
            <option value="Shortlisted">Shortlisted</option>
            <option value="Interviewing">Interviewing</option>
            <option value="Offered">Offered</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>
      </div>

      {/* Table Container */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
        {loading ? (
          <div className="text-center py-12 text-slate-600">Loading candidate submissions...</div>
        ) : applications.length === 0 ? (
          <div className="text-center py-12 text-slate-600">No applications found matching criteria.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-600 min-w-[700px]">
              <thead className="bg-[#FBF9F5] text-xs font-semibold text-slate-600 uppercase border-b border-slate-200">
                <tr>
                  <th className="px-5 py-4">Candidate Name</th>
                  <th className="px-5 py-4">Position Applied</th>
                  <th className="px-5 py-4">Exp & Company</th>
                  <th className="px-5 py-4">Submitted Date</th>
                  <th className="px-5 py-4">Status</th>
                  <th className="px-5 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {applications.map((app) => (
                  <tr key={app.id} className="hover:bg-slate-50 transition">
                    <td className="px-5 py-4 font-medium text-slate-900">
                      <div>{app.candidateName}</div>
                      <div className="text-xs text-slate-500 font-normal">{app.email}</div>
                      <div className="text-[11px] text-slate-400 font-mono">{app.phone}</div>
                    </td>

                    <td className="px-5 py-4">
                      <div className="font-medium text-slate-900">{app.jobTitle}</div>
                      <div className="text-xs text-slate-400">ID: {app.jobId}</div>
                    </td>

                    <td className="px-5 py-4 text-xs">
                      <div>{app.experienceYears} Years Exp</div>
                      <div className="text-slate-500">{app.currentCompany || 'N/A'}</div>
                    </td>

                    <td className="px-5 py-4 text-xs text-slate-500">
                      {new Date(app.appliedAt).toLocaleDateString()}
                    </td>

                    <td className="px-5 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${statusColors[app.status] || 'bg-slate-100 text-slate-600'}`}>
                        {app.status}
                      </span>
                    </td>

                    <td className="px-5 py-4 text-right space-x-2">
                      <button
                        onClick={() => setSelectedApp(app)}
                        className="px-3 py-1.5 rounded-lg bg-brand-orange/10 text-brand-orange border border-brand-orange/30 hover:bg-brand-orange/20 text-xs font-medium"
                      >
                        Inspect Application
                      </button>
                      <button
                        onClick={(e) => handleDelete(app.id, e)}
                        title="Delete application"
                        className="px-2.5 py-1.5 rounded-lg bg-rose-50 border border-rose-200 text-rose-600 hover:bg-rose-100 text-xs transition inline-flex items-center gap-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Candidate Resume & Details Drawer Modal */}
      {selectedApp && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-2xl bg-white border border-slate-200 rounded-2xl p-6 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between pb-4 border-b border-slate-200">
              <div>
                <h2 className="text-xl font-bold text-slate-900">{selectedApp.candidateName}</h2>
                <p className="text-xs text-brand-orange font-medium">Applied for: {selectedApp.jobTitle}</p>
              </div>
              <button onClick={() => setSelectedApp(null)} className="text-slate-400 hover:text-slate-900 text-lg font-bold">✕</button>
            </div>

            {/* Quick Details */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs">
              <div className="p-3 rounded-xl bg-[#FBF9F5] border border-slate-200">
                <span className="text-slate-400 block">Email</span>
                <span className="text-slate-900 font-semibold">{selectedApp.email}</span>
              </div>
              <div className="p-3 rounded-xl bg-[#FBF9F5] border border-slate-200">
                <span className="text-slate-400 block">Phone</span>
                <span className="text-slate-900 font-semibold">{selectedApp.phone}</span>
              </div>
              <div className="p-3 rounded-xl bg-[#FBF9F5] border border-slate-200">
                <span className="text-slate-400 block">Experience</span>
                <span className="text-slate-900 font-semibold">{selectedApp.experienceYears} Years</span>
              </div>
            </div>

            {/* Portfolio / Link */}
            {selectedApp.portfolioUrl && (
              <div className="text-xs">
                <span className="text-slate-500 block mb-1">Portfolio / LinkedIn:</span>
                <a href={selectedApp.portfolioUrl} target="_blank" rel="noreferrer" className="text-brand-orange hover:underline flex items-center gap-1 font-medium">
                  {selectedApp.portfolioUrl} <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            )}

            {/* Resume File Upload Attachment */}
            {selectedApp.resumeFilePath && (
              <div className="p-4 rounded-xl bg-orange-50 border border-orange-200 text-xs">
                <span className="text-slate-700 block mb-1 font-bold">Attached Resume File:</span>
                <a
                  href={`http://localhost:5000${selectedApp.resumeFilePath}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 font-bold text-brand-orange hover:underline"
                >
                  <Download className="w-4 h-4" /> Download / Open Candidate Resume PDF/DOC →
                </a>
              </div>
            )}

            {/* Resume Text / Notes */}
            <div className="space-y-2">
              <h4 className="text-xs font-semibold text-slate-600 uppercase tracking-wider">Candidate Notes / Summary</h4>
              <div className="p-4 rounded-xl bg-[#FBF9F5] border border-slate-200 text-xs text-slate-700 font-mono whitespace-pre-wrap leading-relaxed">
                {selectedApp.resumeText || 'No additional cover note.'}
              </div>
            </div>

            {/* Status Update Pipeline */}
            <div className="space-y-2 pt-2">
              <h4 className="text-xs font-semibold text-slate-600 uppercase tracking-wider">Update Pipeline Status</h4>
              <div className="flex flex-wrap gap-2">
                {['Applied', 'Shortlisted', 'Interviewing', 'Offered', 'Rejected'].map((st) => (
                  <button
                    key={st}
                    onClick={() => handleStatusChange(selectedApp.id, st)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
                      selectedApp.status === st
                        ? 'bg-brand-orange text-white shadow-md'
                        : 'bg-[#FBF9F5] border border-slate-200 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex justify-between items-center pt-4 border-t border-slate-200">
              <button
                onClick={(e) => handleDelete(selectedApp.id, e)}
                className="px-3.5 py-2 rounded-xl bg-rose-50 border border-rose-200 text-rose-600 hover:bg-rose-100 text-xs font-semibold flex items-center gap-1.5 transition"
              >
                <Trash2 className="w-3.5 h-3.5" /> Delete Application
              </button>

              <button
                onClick={() => setSelectedApp(null)}
                className="px-4 py-2 rounded-xl bg-slate-100 text-slate-900 text-sm font-semibold hover:bg-slate-200/50"
              >
                Close Inspector
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
