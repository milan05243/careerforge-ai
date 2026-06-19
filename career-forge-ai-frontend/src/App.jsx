import React, { useState, useEffect } from 'react';
import Dashboard from './pages/Dashboard';
import ResumeAnalyzer from './pages/ResumeAnalyzer';
import InterviewPrep from './pages/InterviewPrep';
import InterviewSimulator from './pages/InterviewSimulator';
import Companies from './pages/Companies';
import DsaTracker from './pages/DsaTracker';
import CodingArena from './pages/CodingArena';
import Login from './pages/Login';
import { Toast } from './components/Toast';
import { LayoutGrid, FileText, GraduationCap, Cpu, Building2, Code, Menu, X, LogOut, User as UserIcon, Hammer } from 'lucide-react';
const API_BASE = import.meta.env.VITE_API_BASE || (
  window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
    ? 'http://localhost:8000'
    : 'https://career-forge-ai-backend-n393.onrender.com'
);

export default function App() {
  const [user, setUser] = useState(null);
  const [page, setPage] = useState('dashboard');
  const [arenaProblemId, setArenaProblemId] = useState(null);
  const [toast, setToast] = useState(null); // { message, type }
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);

  // Check localStorage for active session on load
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (err) {
        console.error("Failed to parse stored user session:", err);
        localStorage.removeItem('user');
      }
    }
    setCheckingAuth(false);
  }, []);

  const triggerToast = (message, type = 'info') => {
    setToast({ message, type });
  };

  const handleLoginSuccess = (userData) => {
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
    setPage('dashboard');
  };

  const handleLogout = async () => {
    try {
      await fetch(`${API_BASE}/api/auth/logout`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${user?.id}` }
      });
    } catch (err) {
      console.error("Server logout request failed:", err);
    } finally {
      localStorage.removeItem('user');
      setUser(null);
      setPage('dashboard');
      triggerToast('Logged out successfully', 'success');
    }
  };

  const setProblemForArena = (problemId) => {
    setArenaProblemId(problemId);
    setPage('arena');
  };

  // Construct Auth Headers
  const authHeaders = user ? { 'Authorization': `Bearer ${user.id}` } : {};

  // Navigation items config
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutGrid className="h-4.5 w-4.5" /> },
    { id: 'resume', label: 'AI Resume', icon: <FileText className="h-4.5 w-4.5" /> },
    { id: 'prep', label: 'Prep Hub', icon: <GraduationCap className="h-4.5 w-4.5" /> },
    { id: 'interview', label: 'AI Mock', icon: <Cpu className="h-4.5 w-4.5" /> },
    { id: 'companies', label: 'Companies', icon: <Building2 className="h-4.5 w-4.5" /> },
    { id: 'dsa', label: 'DSA Sheet', icon: <Code className="h-4.5 w-4.5" /> }
  ];

  // Protect all screens: if user is not logged in, render Login page
  if (checkingAuth) {
    return (
      <div className="min-h-screen bg-[#03060c] flex items-center justify-center">
        <div className="h-8 w-8 rounded-full border-2 border-indigo-500/20 border-t-indigo-500 animate-spin" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col">
        <Login 
          apiBase={API_BASE} 
          onLoginSuccess={handleLoginSuccess} 
          triggerToast={triggerToast} 
        />
        {toast && (
          <Toast 
            message={toast.message} 
            type={toast.type} 
            onClose={() => setToast(null)} 
          />
        )}
      </div>
    );
  }

  // Render main sub-pages
  const renderPage = () => {
    switch (page) {
      case 'dashboard':
        return <Dashboard apiBase={API_BASE} authHeaders={authHeaders} />;
      case 'resume':
        return <ResumeAnalyzer apiBase={API_BASE} authHeaders={authHeaders} triggerToast={triggerToast} />;
      case 'jobs':
        return <Jobs apiBase={API_BASE} user={user} authHeaders={authHeaders} triggerToast={triggerToast} />;
      case 'prep':
        return <InterviewPrep apiBase={API_BASE} authHeaders={authHeaders} triggerToast={triggerToast} />;
      case 'interview':
        return <InterviewSimulator apiBase={API_BASE} authHeaders={authHeaders} triggerToast={triggerToast} />;
      case 'companies':
        return <Companies />;
      case 'dsa':
        return <DsaTracker apiBase={API_BASE} authHeaders={authHeaders} triggerToast={triggerToast} setProblemForArena={setProblemForArena} />;
      case 'arena':
        return (
          <CodingArena 
            apiBase={API_BASE} 
            authHeaders={authHeaders}
            problemId={arenaProblemId || 'two-sum'} 
            triggerToast={triggerToast} 
            navigateTo={(target) => setPage(target)}
          />
        );
      default:
        return <Dashboard apiBase={API_BASE} authHeaders={authHeaders} />;
    }
  };

  const isArenaMode = page === 'arena';

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top Navbar */}
      <header className="sticky top-0 z-50 h-20 border-b border-white/5 bg-[#070a13]/80 backdrop-blur-md flex items-center">
        <div className="w-full max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div 
            onClick={() => setPage('dashboard')} 
            className="flex items-center gap-2.5 cursor-pointer font-black text-xl tracking-tight text-white select-none"
          >
            <div className="h-10 w-10 rounded-lg bg-gradient-to-tr from-orange-500 via-amber-500 to-yellow-400 flex items-center justify-center shadow-lg shadow-orange-500/40">
  <Hammer className="h-7 w-7 text-white" />
</div>
            <span>PrepForge <span className="text-indigo-400 font-extrabold text-sm uppercase px-1.5 py-0.5 rounded bg-indigo-500/10 border border-indigo-500/20 ml-1">AI</span></span>
          </div>

          {/* Desktop Nav menu */}
          <nav className="hidden lg:flex items-center gap-6">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => setPage(item.id)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg font-bold text-xs uppercase tracking-wider transition-all ${page === item.id ? 'bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 shadow-sm shadow-indigo-500/5' : 'text-slate-400 hover:text-slate-200 border border-transparent'}`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            ))}
          </nav>

          {/* User Profile & Logout Block */}
          <div className="hidden lg:flex items-center gap-4 border-l border-white/5 pl-6">
            <div className="flex items-center gap-3">
              {user.profile_picture ? (
                <img 
                  src={user.profile_picture} 
                  alt={user.name} 
                  className="h-8.5 w-8.5 rounded-full border border-white/10 object-cover"
                  onError={(e) => { e.target.src = ''; }} // fallback on error
                />
              ) : (
                <div className="h-8.5 w-8.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                  <UserIcon className="h-4.5 w-4.5" />
                </div>
              )}
              <div className="flex flex-col">
                <span className="text-xs font-bold text-white tracking-tight">{user.name}</span>
                <span className="text-[9px] text-slate-500 font-bold tracking-wide">{user.email}</span>
              </div>
            </div>

            <button 
              onClick={handleLogout}
              className="p-2 rounded-lg bg-white/5 hover:bg-rose-500/10 text-slate-400 hover:text-rose-400 border border-white/5 hover:border-rose-500/20 transition-all cursor-pointer"
              title="Logout session"
            >
              <LogOut className="h-4.5 w-4.5" />
            </button>
          </div>

          {/* Mobile menu toggle */}
          <button 
            onClick={() => setMobileMenuOpen(prev => !prev)}
            className="lg:hidden text-slate-400 hover:text-white p-2 rounded-lg"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </header>

      {/* Mobile nav drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed top-20 left-0 right-0 z-40 bg-[#070a13]/95 border-b border-white/10 p-6 space-y-4 shadow-2xl backdrop-blur-lg animate-slide-in flex flex-col">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => { setPage(item.id); setMobileMenuOpen(false); }}
              className={`w-full flex items-center gap-3 p-3.5 rounded-lg text-xs font-bold uppercase tracking-wider text-left transition-all ${page === item.id ? 'bg-indigo-500/10 border border-indigo-500/20 text-indigo-400' : 'text-slate-400'}`}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
          
          {/* Mobile Profile & Logout */}
          <div className="border-t border-white/5 pt-4 mt-2 flex items-center justify-between">
            <div className="flex items-center gap-3">
              {user.profile_picture ? (
                <img 
                  src={user.profile_picture} 
                  alt={user.name} 
                  className="h-8 w-8 rounded-full border border-white/10 object-cover"
                />
              ) : (
                <div className="h-8 w-8 rounded-full bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                  <UserIcon className="h-4 w-4" />
                </div>
              )}
              <div className="flex flex-col">
                <span className="text-xs font-bold text-white leading-none">{user.name}</span>
                <span className="text-[9px] text-slate-500 font-bold leading-none mt-1">{user.email}</span>
              </div>
            </div>
            
            <button
              onClick={() => { handleLogout(); setMobileMenuOpen(false); }}
              className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/25 text-rose-400 text-xs font-bold uppercase tracking-wider transition-all"
            >
              <LogOut className="h-3.5 w-3.5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      )}

      {/* Main content body panel */}
      <main className={`flex-1 ${isArenaMode ? 'p-0' : 'w-full max-w-7xl mx-auto px-6 py-10'}`}>
        {renderPage()}
      </main>

      {/* Footer (hidden in coding arena for full-screen layout) */}
      {!isArenaMode && (
        <footer className="border-t border-white/5 bg-[#03060c] py-6 text-center text-xs text-slate-500 font-medium">
          <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p>&copy; 2026 PrepForge AI. Open-source placement preparation portal.</p>
            <div className="flex gap-4">
              <span className="hover:text-indigo-400 cursor-pointer">LinkedIn Project</span>
              <span className="hover:text-indigo-400 cursor-pointer">GitHub Repository</span>
            </div>
          </div>
        </footer>
      )}

      {/* Floating Notifications */}
      {toast && (
        <Toast 
          message={toast.message} 
          type={toast.type} 
          onClose={() => setToast(null)} 
        />
      )}
    </div>
  );
}
