import React, { useEffect, useState } from 'react';
import { LayoutGrid, FileText, Cpu, Code, ShieldAlert, CheckCircle2 } from 'lucide-react';

export default function Login({ apiBase, onLoginSuccess, triggerToast }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Initialize Google Identity Services
  useEffect(() => {
    const initGoogleGSI = () => {
  

if (window.google) { 
    // Read client ID from env or fallback to placeholder
    const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID || "YOUR_GOOGLE_CLIENT_ID";

    

    try {
      window.google.accounts.id.initialize({
            client_id: clientId,
            callback: handleCredentialResponse,
            auto_select: false
          });

          

window.google.accounts.id.renderButton(
  document.getElementById("google-signin-btn"),
  {
    theme: "filled_dark",
    size: "large",
    width: 320,
    text: "continue_with",
    shape: "pill",
    logo_alignment: "left"
  }
);
        } catch (err) {
          console.warn("Google OAuth init warning: Check VITE_GOOGLE_CLIENT_ID config.", err);
        }
      }
    };

    // Retry a couple of times if the script load is delayed
    const timer = setTimeout(initGoogleGSI, 500);
    return () => clearTimeout(timer);
  }, []);

  const handleCredentialResponse = async (response) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${apiBase}/api/auth/google-login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ credential: response.credential })
      });
      
      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.detail || "Authentication failed.");
      }

      const userData = await res.json();
      triggerToast("Welcome back to CareerForge AI!", "success");
      onLoginSuccess(userData);
    } catch (err) {
      setError(err.message || "Failed to log in with Google. Please try again.");
      triggerToast("Google authentication failed", "error");
    } finally {
      setLoading(false);
    }
  };

  // Developer Mock Login for quick out-of-the-box local testing
  const handleMockLogin = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${apiBase}/api/auth/google-login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ credential: "mock_google_token" })
      });
      
      if (!res.ok) {
        throw new Error("Mock login request failed on the backend.");
      }

      const userData = await res.json();
      triggerToast("Logged in with Developer Mock Profile", "info");
      onLoginSuccess(userData);
    } catch (err) {
      setError(err.message);
      triggerToast("Mock login failed. Make sure your Flask backend is running on port 8000.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#03060c] flex items-center justify-center p-6 relative overflow-hidden select-none">
      {/* Background neon glows */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Login Card Panel */}
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-12 rounded-3xl bg-white/[0.02] border border-white/5 shadow-2xl backdrop-blur-2xl overflow-hidden relative z-10">
        
        {/* Left column: branding & features showcase */}
        <div className="md:col-span-7 p-10 lg:p-14 bg-gradient-to-br from-indigo-950/20 to-slate-950/50 flex flex-col justify-between border-b md:border-b-0 md:border-r border-white/5">
          <div className="space-y-6">
            {/* Logo */}
            <div className="flex items-center gap-3 font-black text-2xl tracking-tight text-white">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-indigo-400 flex items-center justify-center text-white font-black shadow-lg shadow-indigo-600/30">
                C
              </div>
              <span>CareerForge <span className="text-indigo-400 font-extrabold text-sm uppercase px-1.5 py-0.5 rounded bg-indigo-500/10 border border-indigo-500/20 ml-1">AI</span></span>
            </div>

            <h1 className="text-3xl lg:text-4xl font-extrabold text-white leading-tight">
              Forge Your Path to <br />
              <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-300 bg-clip-text text-transparent">Placement Success</span>
            </h1>
            <p className="text-slate-400 text-sm leading-relaxed max-w-md">
              CareerForge AI is an advanced preparation suite designed to accelerate your technical placement potential. Analyze your resume, practice coding in a Monaco environment, and run mock interviews locally.
            </p>
          </div>

          {/* Features check items */}
          <div className="my-10 space-y-4">
            <div className="flex gap-4">
              <div className="h-10 w-10 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-400 flex-shrink-0 border border-indigo-500/15">
                <FileText className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-white font-bold text-sm">ATS Resume Analyzer</h4>
                <p className="text-slate-400 text-xs mt-0.5">Instant scoring, missing skill detection, and keyword audit.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="h-10 w-10 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-400 flex-shrink-0 border border-purple-500/15">
                <Cpu className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-white font-bold text-sm">AI Interview Simulator</h4>
                <p className="text-slate-400 text-xs mt-0.5">STAR heuristic evaluations across OS, DBMS, Networks, and HR.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="h-10 w-10 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400 flex-shrink-0 border border-emerald-500/15">
                <Code className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-white font-bold text-sm">Monaco Code Arena</h4>
                <p className="text-slate-400 text-xs mt-0.5">Solve key DSA challenges in real-time with local Python validation.</p>
              </div>
            </div>
          </div>

          <div className="text-slate-500 text-xs font-semibold">
            &copy; 2026 CareerForge AI. Enterprise Placement Accelerator.
          </div>
        </div>

        {/* Right column: login action panel */}
        <div className="md:col-span-5 p-10 lg:p-14 flex flex-col justify-center items-center bg-slate-950/40 relative">
          
          <div className="w-full max-w-xs space-y-8 text-center">
            <div className="space-y-2">
              <h2 className="text-2xl font-black text-white">Sign In</h2>
              <p className="text-slate-400 text-xs">Access your personal workspace and track your prep records</p>
            </div>

            {/* Error alerts */}
            {error && (
              <div className="flex items-center gap-3 p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-left text-xs animate-shake">
                <ShieldAlert className="h-5 w-5 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Google authentication button container */}
            <div className="flex flex-col items-center gap-4 py-4 min-h-[120px]">
              {loading ? (
  <div className="flex flex-col items-center gap-3 py-4">
    <div className="h-6 w-6 rounded-full border-2 border-indigo-500/20 border-t-indigo-500 animate-spin" />
    <span className="text-slate-400 text-xs font-medium">
      Validating Google identity...
    </span>
  </div>
              ) : (
                <div className="space-y-4">
                  {/* Google OAuth GSI Button Container */}
<div id="google-signin-btn" className="flex justify-center" />
                  
                  {/* Developer Quick-Login Bypass */}
                  <div className="relative flex py-2 items-center">
                    <div className="flex-grow border-t border-white/5"></div>
                    <span className="flex-shrink mx-3 text-slate-500 text-[10px] font-bold uppercase tracking-wider">Or Dev Sandbox</span>
                    <div className="flex-grow border-t border-white/5"></div>
                  </div>

                  <button
                    onClick={handleMockLogin}
                    className="w-full py-3 px-4 rounded-full bg-indigo-600/10 hover:bg-indigo-600/20 border border-indigo-500/20 hover:border-indigo-500/35 text-indigo-400 font-bold text-xs uppercase tracking-wider transition-all"
                  >
                    Use Developer Profile
                  </button>
                </div>
              )}
            </div>

            <p className="text-slate-500 text-[10px] leading-relaxed">
              By continuing, you agree to connect your Google profile info (email, name, picture) to save and track your session progress.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
