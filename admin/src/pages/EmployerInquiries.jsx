import React, { useState, useEffect } from 'react';
import { api } from '../services/api.js';
import { Building2, Search, Download, Trash2 } from 'lucide-react';

export default function EmployerInquiries() {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  useEffect(() => {
    loadInquiries();
  }, [search, statusFilter]);

  const loadInquiries = async () => {
    try {
      setLoading(true);
      const data = await api.getInquiries({ search, status: statusFilter });
      const rawList = Array.isArray(data) ? data : data.inquiries || data.items || [];
      const normalized = rawList.map(inq => ({
        ...inq,
        hiringType: inq.hiringType || inq.hiring_type,
        companyName: inq.companyName || inq.company_name,
        contactName: inq.contactName || inq.contact_name,
        rolesNeeded: inq.rolesNeeded || inq.roles_needed,
        targetTimeline: inq.targetTimeline || inq.target_timeline,
        attachmentUrl: inq.attachmentUrl || inq.attachment_url,
        createdAt: inq.createdAt || inq.created_at
      }));
      setInquiries(normalized);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await api.updateInquiry(id, { status: newStatus });
      loadInquiries();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this employer inquiry?')) return;
    try {
      await api.deleteInquiry(id);
      loadInquiries();
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
            <Building2 className="w-6 h-6 text-amber-600" />
            Employer Hiring Leads & Inquiries
          </h1>
          <p className="text-sm text-slate-600 mt-1">Manage employer inquiries, staffing requests, and contact submissions.</p>
        </div>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="sm:col-span-2 relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search company, contact name, email, roles needed..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-900 text-sm focus:outline-none focus:border-brand-orange"
          />
        </div>

        <div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-900 text-sm focus:outline-none focus:border-brand-orange"
          >
            <option value="">All Lead Statuses</option>
            <option value="New">New Lead</option>
            <option value="In Discussion">In Discussion</option>
            <option value="Proposal Sent">Proposal Sent</option>
            <option value="Contract Signed">Contract Signed</option>
            <option value="Closed">Closed</option>
          </select>
        </div>
      </div>

      {/* Leads List */}
      {loading ? (
        <div className="text-center py-12 text-slate-600">Loading inquiries...</div>
      ) : inquiries.length === 0 ? (
        <div className="text-center py-12 bg-white border border-slate-200 rounded-2xl text-slate-600">
          No employer inquiries found.
        </div>
      ) : (
        <div className="space-y-4">
          {inquiries.map((inq) => (
            <div key={inq.id} className="p-6 rounded-2xl bg-white border border-slate-200 space-y-4 hover:border-slate-300 transition shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-4">
                <div>
                  <span className="text-[11px] font-bold text-amber-600 uppercase tracking-wider">{inq.hiringType}</span>
                  <h3 className="text-lg font-bold text-slate-900">{inq.companyName}</h3>
                  <p className="text-xs text-slate-600">Contact: <strong className="text-slate-900">{inq.contactName}</strong> ({inq.email} • {inq.phone || 'No phone'})</p>
                </div>

                <div className="flex items-center gap-2 self-start sm:self-auto">
                  <select
                    value={inq.status}
                    onChange={(e) => handleStatusChange(inq.id, e.target.value)}
                    className="px-3 py-1.5 rounded-xl bg-[#FBF9F5] border border-slate-200 text-xs font-semibold text-amber-700 focus:outline-none"
                  >
                    <option value="New">New Lead</option>
                    <option value="In Discussion">In Discussion</option>
                    <option value="Proposal Sent">Proposal Sent</option>
                    <option value="Contract Signed">Contract Signed</option>
                    <option value="Closed">Closed</option>
                  </select>
                  <button
                    onClick={() => handleDelete(inq.id)}
                    title="Delete inquiry"
                    className="p-1.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-600 hover:bg-rose-100 transition text-xs"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-600">
                <div className="p-3 rounded-xl bg-[#FBF9F5] border border-slate-200">
                  <span className="text-slate-400 font-medium block">Roles Needed:</span>
                  <span className="font-semibold text-slate-900">{inq.rolesNeeded || 'General hiring request'}</span>
                </div>
                <div className="p-3 rounded-xl bg-[#FBF9F5] border border-slate-200">
                  <span className="text-slate-400 font-medium block">Target Timeline:</span>
                  <span className="font-semibold text-slate-900">{inq.targetTimeline || 'Not specified'}</span>
                </div>
              </div>

              {inq.message && (
                <div className="p-3 rounded-xl bg-[#FBF9F5] border border-slate-200 text-xs text-slate-700">
                  <span className="text-slate-400 font-medium block mb-1">Inquiry Message:</span>
                  <p className="italic">"{inq.message}"</p>
                </div>
              )}

              {inq.attachmentUrl && (
                <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs">
                  <span className="text-slate-700 font-bold block mb-1">Attached Document / Spec:</span>
                  <a
                    href={`http://localhost:5000${inq.attachmentUrl}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 font-bold text-amber-700 hover:underline"
                  >
                    <Download className="w-4 h-4" /> Download / View Attached File →
                  </a>
                </div>
              )}

              <div className="text-[11px] text-slate-400 flex items-center justify-between pt-2">
                <span>Received: {new Date(inq.createdAt).toLocaleString()}</span>
                <span>ID: {inq.id}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
