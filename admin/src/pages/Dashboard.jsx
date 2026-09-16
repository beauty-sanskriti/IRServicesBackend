import React, { useEffect, useState } from 'react';
import { api } from '../services/api.js';
import {
  Users,
  Briefcase,
  Building2,
  Newspaper,
  CheckCircle2,
  Clock,
  ArrowUpRight,
  TrendingUp,
  Activity,
  Trash2
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const data = await api.getDashboardStats();
      setStats(data);
    } catch (err) {
      setError(err.message || 'Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteApp = async (id) => {
    if (!confirm('Are you sure you want to delete this application?')) return;
    try {
      await api.deleteApplication(id);
      fetchStats();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleDeleteInq = async (id) => {
    if (!confirm('Are you sure you want to delete this inquiry?')) return;
    try {
      await api.deleteInquiry(id);
      fetchStats();
    } catch (err) {
      alert(err.message);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64 text-ink-muted gap-3">
        <div className="w-5 h-5 border-2 border-brand-orange border-t-transparent rounded-full animate-spin" />
        Loading Live Dashboard Analytics...
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 rounded-xl bg-brand-rose/10 border border-brand-rose/30 text-brand-rose text-sm">
        {error}
      </div>
    );
  }

  const { metrics, recentApplications, recentInquiries, recentLogs } = stats;

  const statCards = [
    {
      title: 'Total Applications',
      value: metrics.totalApplications,
      subtitle: `${metrics.shortlistedCandidates} shortlisted/interviewing`,
      icon: Users,
      color: 'bg-white border-slate-200 text-brand-orange shadow-sm hover:border-brand-orange/40',
      iconBg: 'bg-brand-orange/10 text-brand-orange',
      link: '/applications'
    },
    {
      title: 'Active Jobs',
      value: metrics.activeJobs,
      subtitle: 'Open recruitment listings',
      icon: Briefcase,
      color: 'bg-white border-slate-200 text-emerald-600 shadow-sm hover:border-emerald-300',
      iconBg: 'bg-emerald-50 text-emerald-600',
      link: '/jobs'
    },
    {
      title: 'Employer Inquiries',
      value: metrics.openInquiries,
      subtitle: 'Pending hiring partner leads',
      icon: Building2,
      color: 'bg-white border-slate-200 text-amber-600 shadow-sm hover:border-amber-300',
      iconBg: 'bg-amber-50 text-amber-600',
      link: '/inquiries'
    },
    {
      title: 'Published Insights',
      value: metrics.publishedInsights,
      subtitle: 'Live articles & blogs',
      icon: Newspaper,
      color: 'bg-white border-slate-200 text-slate-700 shadow-sm hover:border-slate-300',
      iconBg: 'bg-slate-100 text-slate-700',
      link: '/insights'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Page Title */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Recruitment Dashboard</h1>
          <p className="text-sm text-slate-500 mt-1">Real-time overview of job applications, employer inquiries, and site stats.</p>
        </div>
        <button
          onClick={fetchStats}
          className="px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-50 shadow-xs transition"
        >
          Refresh Data
        </button>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {statCards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <Link
              key={idx}
              to={card.link}
              className={`p-5 rounded-2xl border ${card.color} glass-panel-hover flex flex-col justify-between group transition-all`}
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">{card.title}</span>
                <div className={`p-2.5 rounded-xl ${card.iconBg} border border-slate-100 group-hover:scale-110 transition`}>
                  <Icon className="w-5 h-5" />
                </div>
              </div>
              <div>
                <div className="text-3xl font-extrabold text-slate-900 tracking-tight mb-1">{card.value}</div>
                <div className="text-xs text-slate-500 flex items-center justify-between">
                  <span>{card.subtitle}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition" />
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Recent Applications & Inquiries Split */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Candidate Submissions */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4 shadow-sm">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200">
            <h2 className="font-bold text-slate-900 text-base flex items-center gap-2">
              <Users className="w-4 h-4 text-brand-orange" />
              Recent Candidate Applications
            </h2>
            <Link to="/applications" className="text-xs font-semibold text-brand-orange hover:underline">View All</Link>
          </div>

          <div className="space-y-3">
            {recentApplications?.map((app) => (
              <div key={app.id} className="p-3.5 rounded-xl bg-[#FBF9F5] border border-slate-200/80 flex items-center justify-between gap-3 hover:bg-slate-50 transition">
                <div className="min-w-0">
                  <h4 className="font-semibold text-slate-900 text-sm truncate">{app.candidateName}</h4>
                  <p className="text-xs text-slate-600 truncate">{app.jobTitle}</p>
                  <p className="text-[11px] text-slate-400">{app.email} • {app.experienceYears} yrs exp</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`px-2.5 py-1 rounded-full text-[11px] font-semibold whitespace-nowrap ${app.status === 'Shortlisted' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                    app.status === 'Interviewing' ? 'bg-slate-100 text-slate-700 border border-slate-200' :
                      'bg-orange-50 text-brand-orange border border-orange-200'
                    }`}>
                    {app.status}
                  </span>
                  <button
                    onClick={() => handleDeleteApp(app.id)}
                    title="Delete Application"
                    className="p-1 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Employer Inquiries */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4 shadow-sm">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200">
            <h2 className="font-bold text-slate-900 text-base flex items-center gap-2">
              <Building2 className="w-4 h-4 text-amber-600" />
              Recent Employer Leads
            </h2>
            <Link to="/inquiries" className="text-xs font-semibold text-amber-600 hover:underline">View All</Link>
          </div>

          <div className="space-y-3">
            {recentInquiries?.map((inq) => (
              <div key={inq.id} className="p-3.5 rounded-xl bg-[#FBF9F5] border border-slate-200/80 flex items-center justify-between gap-3 hover:bg-slate-50 transition">
                <div className="min-w-0">
                  <h4 className="font-semibold text-slate-900 text-sm truncate">{inq.companyName}</h4>
                  <p className="text-xs text-slate-600 truncate">{inq.contactName} ({inq.hiringType})</p>
                  <p className="text-[11px] text-slate-400 truncate">Roles: {inq.rolesNeeded}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`px-2.5 py-1 rounded-full text-[11px] font-semibold whitespace-nowrap ${inq.status === 'In Discussion' ? 'bg-amber-50 text-amber-700 border border-amber-200' :
                    inq.status === 'Contract Signed' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                      'bg-slate-100 text-slate-600 border border-slate-200'
                    }`}>
                    {inq.status}
                  </span>
                  <button
                    onClick={() => handleDeleteInq(inq.id)}
                    title="Delete Inquiry"
                    className="p-1 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>


    </div>
  );
}
