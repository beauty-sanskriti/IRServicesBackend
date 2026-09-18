import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { Shield, Lock, Mail, ArrowRight, CheckCircle } from 'lucide-react';
import logo from '../assets/IrServicesLogo.png';

export default function LoginPage() {
  const [email, setEmail] = useState('admin@irrecruiting.com');
  const [password, setPassword] = useState('admin123');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      setError(err.message || 'Invalid credentials');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FBF9F5] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-brand-orange/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-brand-gold/8 rounded-full blur-[100px] pointer-events-none" />

      <div className="w-full max-w-md bg-white border border-slate-200 rounded-2xl p-8 shadow-2xl backdrop-blur-xl z-10">
        {/* Header */}
        <div className="text-center space-y-2 mb-8 flex flex-col items-center">
          <img src={logo} alt="iR Recruiting Services" className="h-12 w-auto object-contain mb-1" />
          <h1 className="text-2xl font-bold text-slate-900">Admin Portal Login</h1>
          <p className="text-sm text-slate-600">Manage iR Recruiting candidates, jobs & employer leads</p>
        </div>

        {error && (
          <div className="mb-6 p-3 rounded-xl bg-brand-rose/10 border border-brand-rose/30 text-brand-rose text-xs font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2">
              Admin Email
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#FBF9F5] border border-slate-200 text-slate-900 text-sm focus:outline-none focus:border-brand-orange transition"
                placeholder="admin@irrecruiting.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#FBF9F5] border border-slate-200 text-slate-900 text-sm focus:outline-none focus:border-brand-orange transition"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full mt-2 py-3 px-4 rounded-xl bg-brand-orange hover:bg-brand-orangeHover active:bg-brand-orangeHover text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-lg shadow-brand-orange/25 transition disabled:opacity-50"
          >
            {submitting ? 'Authenticating...' : 'Sign In to Dashboard'}
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>


      </div>
    </div>
  );
}
