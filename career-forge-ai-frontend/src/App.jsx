import React, { useState } from 'react';
import Dashboard from './pages/Dashboard';
import ResumeAnalyzer from './pages/ResumeAnalyzer';
import Jobs from './pages/Jobs';
import InterviewPrep from './pages/InterviewPrep';
import InterviewSimulator from './pages/InterviewSimulator';
import Companies from './pages/Companies';
import DsaTracker from './pages/DsaTracker';
import CodingArena from './pages/CodingArena';
import { Toast } from './components/Toast';
import { LayoutGrid, FileText, Briefcase, GraduationCap, Cpu, Building2, Code, Terminal, Menu, X } from 'lucide-react';

const API_BASE = 'https://career-forge-ai-backend-n393.onrender.com';

export default function App() {
  const [page, setPage] = useState('dashboard');
  const [arenaProblemId, setArenaProblemId] = useState(null);
  const [toast, setToast] = useState(null); // { message, type }
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const triggerToast = (message, type = 'info') => {
    setToast({ message, type });
  };

  const setProblemForArena = (problemId) => {
    setArenaProblemId(problemId);
    setPage('arena');
  };

  // Nav configuration
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutGrid className="h-4.5 w-4.5" /> },
    { id: 'resume', label: 'AI Resume', icon: <FileText className="h-4.5 w-4.5" /> },
    { id: 'jobs', label: 'Job Portal', icon: <Briefcase className="h-4.5 w-4.5" /> },
    { id: 'prep', label: 'Prep Hub', icon: <GraduationCap className="h-4.5 w-4.5" /> },
    { id: 'interview', label: 'AI Mock', icon: <Cpu className="h-4.5 w-4.5" /> },
    { id: 'companies', label: 'Companies', icon: <Building2 className="h-4.5 w-4.5" /> },
    { id: 'dsa', label: 'DSA Sheet', icon: <Code className="h-4.5 w-4.5" /> }
  ];

  // Render main sub-pages
  const renderPage = () => {
    switch (page) {
      case 'dashboard':
        return <Dashboard apiBase={API_BASE} />;
      case 'resume':
        return <ResumeAnalyzer apiBase={API_BASE} triggerToast={triggerToast} />;
      case 'jobs':
        return <Jobs apiBase={API_BASE} triggerToast={triggerToast} />;
      case 'prep':
        return <InterviewPrep apiBase={API_BASE} triggerToast={triggerToast} />;
      case 'interview':
        return <InterviewSimulator apiBase={API_BASE} triggerToast={triggerToast} />;
      case 'companies':
        return <Companies />;
      case 'dsa':
        return <DsaTracker apiBase={API_BASE} triggerToast={triggerToast} setProblemForArena={setProblemForArena} />;
      case 'arena':
        return (
          <CodingArena 
            apiBase={API_BASE} 
            problemId={arenaProblemId || 'two-sum'} 
            triggerToast={triggerToast} 
            navigateTo={(target) => setPage(target)}
          />
        );
      default:
        return <Dashboard apiBase={API_BASE} />;
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
            <div className="h-9 w-9 rounded-lg bg-gradient-to-tr from-indigo-600 to-indigo-400 flex items-center justify-center text-white font-black text-lg shadow-lg shadow-indigo-600/30">
              C
            </div>
            <span>CareerForge <span className="text-indigo-400 font-extrabold text-sm uppercase px-1.5 py-0.5 rounded bg-indigo-500/10 border border-indigo-500/20 ml-1">AI</span></span>
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
        <div className="lg:hidden fixed top-20 left-0 right-0 z-40 bg-[#070a13]/95 border-b border-white/10 p-6 space-y-3 shadow-2xl backdrop-blur-lg animate-slide-in">
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
            <p>
  © 2026 CareerForge AI | Developed by Milan Choudhary |
  B.Tech CSE (AI), Medi-Caps University
</p>
            <div className="flex gap-4">
              <a
  href="https://careerforge-ai-rosy.vercel.app"
  target="_blank"
  rel="noopener noreferrer"
  className="hover:text-indigo-400"
>
  Live Demo
</a>
              <a
  href="https://github.com/milan05243/careerforge-ai"
  target="_blank"
  rel="noopener noreferrer"
  className="hover:text-indigo-400"
>
  GitHub Repository
</a>
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
