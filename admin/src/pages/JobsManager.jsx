import React, { useState, useEffect } from 'react';
import { api } from '../services/api.js';
import { Briefcase, Plus, Search, Trash2, Edit3, CheckCircle, XCircle, MapPin, DollarSign, Clock } from 'lucide-react';

export default function JobsManager() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingJob, setEditingJob] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    department: 'Engineering',
    location: '',
    type: 'Full-time',
    experience: '',
    salary: '',
    description: '',
    requirements: '',
    status: 'Active'
  });

  useEffect(() => {
    loadJobs();
  }, [search]);

  const loadJobs = async () => {
    try {
      setLoading(true);
      const data = await api.getJobs({ search });
      setJobs(Array.isArray(data) ? data : data.jobs || data.items || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenCreate = () => {
    setEditingJob(null);
    setFormData({
      title: '',
      department: 'Engineering',
      location: 'Noida, UP (Hybrid)',
      type: 'Full-time',
      experience: '3-6 yrs',
      salary: '₹15 - ₹25 LPA',
      description: '',
      requirements: '',
      status: 'Active'
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (job) => {
    setEditingJob(job);
    setFormData({
      title: job.title,
      department: job.department,
      location: job.location,
      type: job.type,
      experience: job.experience,
      salary: job.salary,
      description: job.description,
      requirements: Array.isArray(job.requirements) ? job.requirements.join(', ') : job.requirements,
      status: job.status
    });
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingJob) {
        await api.updateJob(editingJob.id, formData);
      } else {
        await api.createJob(formData);
      }
      setModalOpen(false);
      loadJobs();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this job posting?')) return;
    try {
      await api.deleteJob(id);
      loadJobs();
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
            <Briefcase className="w-6 h-6 text-brand-orange" />
            Job Postings Manager
          </h1>
          <p className="text-sm text-slate-600 mt-1">Manage active job openings, requirements, and salaries for candidate view.</p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="px-4 py-2.5 rounded-xl bg-brand-orange hover:bg-brand-orangeHover text-white text-sm font-semibold flex items-center gap-2 shadow-lg shadow-brand-orange/25 transition self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          Create New Job Opening
        </button>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search job title, location, description..."
          className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-900 text-sm focus:outline-none focus:border-brand-orange"
        />
      </div>

      {/* Jobs List */}
      {loading ? (
        <div className="text-center py-12 text-slate-600">Loading jobs...</div>
      ) : jobs.length === 0 ? (
        <div className="text-center py-12 bg-white/80 border border-slate-200 rounded-2xl text-slate-600">
          No job postings found matching your search.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {jobs.map((job) => (
            <div key={job.id} className="p-6 rounded-2xl bg-white border border-slate-200 flex flex-col justify-between hover:border-slate-300 transition">
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="text-[11px] font-bold text-brand-orange uppercase tracking-wider">{job.department}</span>
                    <h3 className="text-base font-bold text-slate-900 mt-0.5">{job.title}</h3>
                  </div>
                  <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                    job.status === 'Active' ? 'bg-brand-green/10 text-brand-green border border-brand-green/30' : 'bg-slate-100 text-slate-600'
                  }`}>
                    {job.status}
                  </span>
                </div>

                <div className="flex flex-wrap gap-y-1.5 gap-x-4 text-xs text-slate-600">
                  <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-slate-400" /> {job.location}</span>
                  <span className="flex items-center gap-1.5"><DollarSign className="w-3.5 h-3.5 text-slate-400" /> {job.salary}</span>
                  <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-slate-400" /> {job.experience}</span>
                </div>

                <p className="text-xs text-slate-600 line-clamp-2">{job.description}</p>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-200 flex items-center justify-between">
                <span className="text-[11px] text-slate-400">ID: {job.id}</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleOpenEdit(job)}
                    className="p-2 rounded-lg bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200/50 transition text-xs flex items-center gap-1 font-medium"
                  >
                    <Edit3 className="w-3.5 h-3.5" /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(job.id)}
                    className="p-2 rounded-lg bg-brand-rose/10 border border-brand-rose/20 text-brand-rose hover:bg-brand-rose/20 transition text-xs"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create / Edit Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-[#FBF9F5] backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-xl bg-white border border-slate-200 rounded-2xl p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <h2 className="text-lg font-bold text-slate-900">
              {editingJob ? 'Edit Job Opening' : 'Post New Job Opening'}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Job Title</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-[#FBF9F5] border border-slate-200 text-slate-900 text-sm focus:outline-none focus:border-brand-orange"
                  placeholder="e.g. Senior Backend Engineer"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">Department</label>
                  <select
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-[#FBF9F5] border border-slate-200 text-slate-900 text-sm focus:outline-none focus:border-brand-orange"
                  >
                    <option value="Engineering">Engineering</option>
                    <option value="Recruitment">Recruitment</option>
                    <option value="Executive Search">Executive Search</option>
                    <option value="Infrastructure">Infrastructure</option>
                    <option value="Product & Design">Product & Design</option>
                    <option value="Operations">Operations</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">Location</label>
                  <input
                    type="text"
                    required
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-[#FBF9F5] border border-slate-200 text-slate-900 text-sm focus:outline-none focus:border-brand-orange"
                    placeholder="e.g. Noida / Hybrid"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">Experience</label>
                  <input
                    type="text"
                    value={formData.experience}
                    onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-[#FBF9F5] border border-slate-200 text-slate-900 text-sm focus:outline-none focus:border-brand-orange"
                    placeholder="e.g. 4-7 yrs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">Salary Range</label>
                  <input
                    type="text"
                    value={formData.salary}
                    onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-[#FBF9F5] border border-slate-200 text-slate-900 text-sm focus:outline-none focus:border-brand-orange"
                    placeholder="e.g. ₹18 - ₹26 LPA"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Job Description</label>
                <textarea
                  rows="3"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-[#FBF9F5] border border-slate-200 text-slate-900 text-sm focus:outline-none focus:border-brand-orange"
                  placeholder="Describe key responsibilities and expectations..."
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Requirements (comma-separated)</label>
                <input
                  type="text"
                  value={formData.requirements}
                  onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-[#FBF9F5] border border-slate-200 text-slate-900 text-sm focus:outline-none focus:border-brand-orange"
                  placeholder="React, TypeScript, REST APIs"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 text-slate-600 text-sm font-semibold hover:bg-slate-200/50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-brand-orange text-white text-sm font-semibold hover:bg-brand-orangeHover shadow-lg shadow-brand-orange/25"
                >
                  {editingJob ? 'Save Changes' : 'Publish Job'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
