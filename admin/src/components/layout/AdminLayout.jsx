import React, { useState, useEffect } from 'react';
import { NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import {
  LayoutDashboard,
  Briefcase,
  Users,
  Building2,
  Newspaper,
  LogOut,
  ShieldCheck,
  ExternalLink,
  Menu,
  X
} from 'lucide-react';

import logo from '../../assets/IrServicesLogo.png';

export default function AdminLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Close mobile drawer when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { label: 'Dashboard Overview', path: '/', icon: LayoutDashboard },
    { label: 'Job Postings', path: '/jobs', icon: Briefcase },
    { label: 'Candidate Submissions', path: '/applications', icon: Users },
    { label: 'Employer Leads', path: '/inquiries', icon: Building2 },
    { label: 'Insights & Blogs', path: '/insights', icon: Newspaper },
  ];

  const SidebarContent = () => (
    <div className="flex flex-col justify-between h-full">
      <div>
        {/* Logo Area */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={logo} alt="iR Recruiting Services" className="h-9 w-auto object-contain" />
            <div>
              <h1 className="font-bold text-slate-900 text-sm tracking-wide leading-tight">iR Recruiting</h1>
              <p className="text-[10px] text-brand-orange font-bold uppercase tracking-wider">ADMIN PORTAL</p>
            </div>
          </div>
          {/* Close button for mobile drawer */}
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-900 md:hidden"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="p-4 space-y-1.5">
          <div className="px-3 py-2 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            Management
          </div>
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === '/'}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${isActive
                    ? 'bg-brand-orange/10 text-brand-orange border border-brand-orange/30 font-semibold shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
                  }`
                }
              >
                <Icon className="w-4 h-4" />
                {item.label}
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* User Info & Footer */}
      <div className="p-4 border-t border-slate-200 space-y-3">
        <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-200">
          <div className="flex items-center gap-2.5 overflow-hidden">
            <div className="w-8 h-8 rounded-full bg-brand-orange/10 border border-brand-orange/30 flex items-center justify-center text-xs font-bold text-brand-orange shrink-0">
              {user?.name?.charAt(0) || 'A'}
            </div>
            <div className="truncate">
              <p className="text-xs font-semibold text-slate-900 truncate">{user?.name || 'Admin'}</p>
              <p className="text-[10px] text-slate-500 truncate">{user?.email || 'admin@irrecruiting.com'}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            title="Logout"
            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition shrink-0"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-[#FAF8F5] text-slate-800 overflow-hidden">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-64 bg-white border-r border-slate-200 flex-col justify-between z-20 shadow-sm shrink-0">
        <SidebarContent />
      </aside>

      {/* Mobile Drawer Backdrop */}
      {mobileMenuOpen && (
        <div
          onClick={() => setMobileMenuOpen(false)}
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-40 md:hidden transition-opacity"
        />
      )}

      {/* Mobile Slide-over Drawer */}
      <aside
        className={`fixed inset-y-0 left-0 w-72 max-w-[85vw] bg-white z-50 flex flex-col justify-between shadow-2xl md:hidden transition-transform duration-300 ease-in-out ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
      >
        <SidebarContent />
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden bg-[#FAF8F5]">
        {/* Top Header */}
        <header className="h-16 bg-white/90 border-b border-slate-200 px-4 sm:px-6 flex items-center justify-between z-10 backdrop-blur-md shadow-xs">
          <div className="flex items-center gap-3">
            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="p-2 rounded-xl border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-100 md:hidden flex items-center justify-center gap-2 transition"
              aria-label="Open Navigation Menu"
            >
              <Menu className="w-5 h-5 text-slate-700" />
              <span className="text-xs font-bold text-slate-700">Menu</span>
            </button>

            {/* Mobile Header Branding */}
            <div className="flex md:hidden items-center gap-2">
              <img src={logo} alt="iR Recruiting Services" className="h-7 w-auto object-contain" />
              <span className="font-bold text-slate-900 text-xs tracking-wide">iR Admin</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-700 text-[11px] sm:text-xs font-semibold">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span className="hidden sm:inline">Authenticated Session</span>
              <span className="sm:hidden">Admin</span>
            </div>
          </div>
        </header>

        {/* Main View Container */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8 space-y-6 bg-[#FAF8F5]">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
