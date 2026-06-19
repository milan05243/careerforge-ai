import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardBody } from '../components/Card';
import { Play, Send, Award, History, RotateCcw, AlertCircle } from 'lucide-react';

export default function InterviewSimulator({ apiBase, authHeaders, triggerToast }) {
  const [topic, setTopic] = useState('DBMS');
  const [session, setSession] = useState(null); // { session_id, topic, question }
  const [answer, setAnswer] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState(null); // { score, feedback, ideal }
  const [history, setHistory] = useState([]);
  const [loadingHistory, setLoadingHistory] = useState(false);

  async function fetchHistory() {
    setLoadingHistory(true);
    try {
      const res = await fetch(`${apiBase}/api/ai/interview/history`, {
        headers: { ...authHeaders }
      });
      const data = await res.json();

setHistory(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingHistory(false);
    }
  }

  useEffect(() => {
    fetchHistory();
  }, [apiBase]);

  const handleStartSession = async () => {
    try {
      const res = await fetch(`${apiBase}/api/ai/interview/start`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          ...authHeaders
        },
        body: JSON.stringify({ topic })
      });
      const data = await res.json();
      setSession(data);
      setAnswer('');
      setFeedback(null);
      triggerToast('Mock session started!', 'success');
    } catch (err) {
      console.error(err);
      triggerToast('Failed to start interview session.', 'error');
    }
  };

  const handleSubmitAnswer = async (e) => {
    e.preventDefault();
    if (!answer.trim()) {
      triggerToast('Please type your response.', 'error');
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch(`${apiBase}/api/ai/interview/submit`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          ...authHeaders
        },
        body: JSON.stringify({
          session_id: session.session_id,
          answer: answer
        })
      });
      const data = await res.json();
      setFeedback(data);
      triggerToast('Response submitted and analyzed!', 'success');
      fetchHistory(); // Refresh logs
    } catch (err) {
      console.error(err);
      triggerToast('Failed to analyze answer.', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const getScoreBg = (score) => {
    if (score >= 70) return 'text-emerald-400 border-emerald-500/20 bg-emerald-500/5';
    if (score >= 50) return 'text-amber-400 border-amber-500/20 bg-amber-500/5';
    return 'text-rose-400 border-rose-500/20 bg-rose-500/5';
  };

  return (
    <div className="space-y-8 animate-fade-in text-sm">
      <div>
        <h2 className="text-3xl font-extrabold text-white tracking-tight">AI Interview Simulator</h2>
        <p className="text-slate-400 text-xs mt-1">Practice mock interviews. Get instant evaluation feedback, scores, and ideal code templates.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Simulator Core panel */}
        <div className="lg:col-span-2 space-y-6">
          {!session ? (
            <Card hoverEffect={false} className="p-8 text-center flex flex-col items-center justify-center space-y-6">
              <div className="p-4 bg-indigo-500/10 border border-indigo-500/20 rounded-full text-indigo-400 animate-pulse-slow">
                <Play className="h-10 w-10 fill-indigo-400" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Ready to test your interview skills?</h3>
                <p className="text-slate-400 max-w-sm mx-auto text-xs leading-relaxed">
                  Select a topic area and start a mock session. The simulator will ask a question, analyze your structure, and score you.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-4 w-full max-w-xs">
                <select 
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  className="w-full bg-[#0a0d17] border border-white/10 rounded-lg p-2.5 text-white text-xs focus:outline-none focus:border-indigo-500"
                >
                  <option value="DBMS">DBMS Focus</option>
                  <option value="OS">Operating Systems</option>
                  <option value="CN">Computer Networks</option>
                  <option value="OOPS">OOPs Principles</option>
                  <option value="HR">HR & Behavioral</option>
                </select>
                
                <button 
                  onClick={handleStartSession}
                  className="w-full btn btn-primary py-2.5 rounded-lg text-xs"
                >
                  Start Simulation
                </button>
              </div>
            </Card>
          ) : (
            <Card hoverEffect={false} className="p-6 space-y-6">
              <div className="flex items-center justify-between border-b border-white/5 pb-3">
                <span className="text-indigo-400 font-bold uppercase tracking-wider text-xs">Topic: {session.topic}</span>
                <button 
                  onClick={() => setSession(null)}
                  className="text-xs text-slate-400 font-semibold hover:text-white flex items-center gap-1"
                >
                  <RotateCcw className="h-3.5 w-3.5" /> Reset
                </button>
              </div>

              <div className="space-y-4">
                <div className="text-base font-semibold text-white leading-relaxed">{session.question}</div>
                
                {!feedback ? (
                  <form onSubmit={handleSubmitAnswer} className="space-y-4">
                    <textarea
                      value={answer}
                      onChange={(e) => setAnswer(e.target.value)}
                      required
                      placeholder="Type your detailed response here..."
                      className="w-full h-40 bg-[#0a0d17] border border-white/10 rounded-xl p-4 text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 text-xs resize-vertical"
                    ></textarea>
                    
                    <div className="flex justify-between items-center text-xs text-slate-500">
                      <span>Word count: {answer.split(/\s+/).filter(Boolean).length}</span>
                      <button 
                        type="submit" 
                        disabled={submitting || !answer.trim()}
                        className="btn btn-accent flex items-center gap-2 px-4 py-2 rounded-lg text-xs disabled:opacity-50"
                      >
                        {submitting ? 'Analyzing...' : <><Send className="h-3.5 w-3.5" /> Submit Response</>}
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="space-y-6 border-t border-white/5 pt-6 animate-fade-in">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {/* Score display */}
                      <div className={`rounded-xl border p-4 flex flex-col items-center justify-center text-center ${getScoreBg(feedback.score)}`}>
                        <span className="text-xs text-slate-400 font-bold uppercase tracking-wide mb-2">Sim Score</span>
                        <span className="text-4xl font-black">{feedback.score}</span>
                      </div>
                      
                      {/* Critique items */}
                      <div className="md:col-span-2 space-y-2">
                        <div className="font-bold text-white text-xs">AI Evaluation Feedback</div>
                        <pre className="text-xs text-slate-400 whitespace-pre-wrap leading-relaxed font-sans">{feedback.feedback}</pre>
                      </div>
                    </div>

                    <div className="space-y-2 border-t border-white/5 pt-4">
                      <div className="font-bold text-white text-xs">Model Reference Structure</div>
                      <p className="text-xs text-indigo-300 bg-indigo-500/5 p-4 border border-indigo-500/10 rounded-lg leading-relaxed">{feedback.ideal}</p>
                    </div>

                    <button 
                      onClick={handleStartSession}
                      className="btn btn-primary py-2 px-4 rounded-lg text-xs"
                    >
                      Next Question
                    </button>
                  </div>
                )}
              </div>
            </Card>
          )}
        </div>

        {/* Previous interview logs history */}
        <div className="lg:col-span-1">
          <Card hoverEffect={false} className="p-5 h-full max-h-[500px] flex flex-col">
            <CardHeader className="mb-3">
              <CardTitle className="text-sm font-bold text-slate-400 uppercase tracking-wide flex items-center gap-2"><History className="h-4 w-4" /> Practice Logs</CardTitle>
            </CardHeader>
            <div className="flex-1 overflow-y-auto space-y-3 pr-1">
              {loadingHistory ? (
                <div className="text-center text-slate-500 text-xs py-4 animate-pulse">Loading history...</div>
              ) : history.length === 0 ? (
                <div className="text-center text-slate-600 text-xs py-8">No mock records available.</div>
              ) : (
                (Array.isArray(history) ? history : []).map(session => (
                  <div key={session.session_id} className="p-3 border border-white/5 rounded-lg bg-white/[0.01]">
                    <div className="flex justify-between text-[10px] uppercase font-bold tracking-wider mb-1">
                      <span className="text-indigo-400">{session.topic}</span>
                      <span className={session.score >= 70 ? 'text-emerald-400' : 'text-amber-400'}>Score: {session.score}%</span>
                    </div>
                    <div className="text-slate-300 font-bold truncate tracking-tight text-xs">{session.question}</div>
                    <div className="text-[10px] text-slate-500 mt-2">{new Date(session.date).toLocaleDateString()}</div>
                  </div>
                ))
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
