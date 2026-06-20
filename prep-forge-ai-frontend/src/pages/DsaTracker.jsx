import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardBody } from '../components/Card';
import { ListSkeleton } from '../components/Skeletons';
import { CheckSquare, Square, ExternalLink, ChevronDown, ChevronUp, Save, BarChart } from 'lucide-react';

export default function DsaTracker({ apiBase, authHeaders, triggerToast, setProblemForArena }) {
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedTopic, setExpandedTopic] = useState('Arrays');
  const [notes, setNotes] = useState({}); // { problemId: noteText }
  const [savingNotes, setSavingNotes] = useState({}); // { problemId: bool }

  async function fetchProblems() {
    try {
      const res = await fetch(`${apiBase}/api/dsa`, {
        headers: { ...authHeaders }
      });
      const data = await res.json();
      setProblems(data);
      
      // Seed initial notes state
      const initialNotes = {};
      data.forEach(p => {
        initialNotes[p.id] = p.notes || '';
      });
      setNotes(initialNotes);
    } catch (err) {
      console.error(err);
      triggerToast('Failed to load DSA problems.', 'error');
    }
  }

  useEffect(() => {
    async function init() {
      setLoading(true);
      await fetchProblems();
      setLoading(false);
    }
    init();
  }, [apiBase]);

  const handleToggleSolved = async (problem) => {
    try {
      const res = await fetch(`${apiBase}/api/dsa/${problem.id}`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          ...authHeaders
        },
        body: JSON.stringify({
          completed: !problem.completed,
          notes: notes[problem.id] || ''
        })
      });

      if (!res.ok) throw new Error('Failed to update status');

      triggerToast(problem.completed ? 'Problem unmarked.' : 'Problem solved!', 'success');
      fetchProblems();
    } catch (err) {
      triggerToast('Failed to update status.', 'error');
    }
  };

  const handleSaveNotes = async (problemId) => {
    setSavingNotes(prev => ({ ...prev, [problemId]: true }));
    try {
      const prob = problems.find(p => p.id === problemId);
      const res = await fetch(`${apiBase}/api/dsa/${problemId}`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          ...authHeaders
        },
        body: JSON.stringify({
          completed: prob ? prob.completed : false,
          notes: notes[problemId] || ''
        })
      });

      if (!res.ok) throw new Error('Failed to save notes');
      triggerToast('Notes saved successfully!', 'success');
    } catch (err) {
      triggerToast('Failed to save notes.', 'error');
    } finally {
      setSavingNotes(prev => ({ ...prev, [problemId]: false }));
    }
  };

  const handleNoteChange = (problemId, val) => {
    setNotes(prev => ({ ...prev, [problemId]: val }));
  };

  if (loading) return <ListSkeleton />;

  // Group problems by topic
  const topics = {};
  problems.forEach(p => {
    if (!topics[p.topic]) {
      topics[p.topic] = [];
    }
    topics[p.topic].push(p);
  });

  const totalProblems = problems.length;
  const completedProblems = problems.filter(p => p.completed).length;
  const globalPercent = totalProblems ? Math.round((completedProblems / totalProblems) * 100) : 0;

  return (
    <div className="space-y-8 animate-fade-in text-sm">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-extrabold text-white tracking-tight">Dedicated DSA Preparation</h2>
          <p className="text-slate-400 text-xs mt-1">Track your problem solving across core modules, take notes, and compare solutions.</p>
        </div>
        <div className="flex items-center gap-3 bg-indigo-500/10 border border-indigo-500/20 px-4 py-2.5 rounded-xl text-indigo-300 font-semibold text-xs w-fit">
          <BarChart className="h-4 w-4" /> Global Progress: {completedProblems} / {totalProblems} ({globalPercent}%)
        </div>
      </div>

      <div className="space-y-4">
        {Object.keys(topics).map(topicName => {
          const topicProblems = topics[topicName];
          const solvedInTopic = topicProblems.filter(p => p.completed).length;
          const topicPercent = Math.round((solvedInTopic / topicProblems.length) * 100);
          const isExpanded = expandedTopic === topicName;

          return (
            <div key={topicName} className="glass-panel rounded-xl overflow-hidden border border-white/5">
              {/* Accordion Header */}
              <div 
                onClick={() => setExpandedTopic(isExpanded ? '' : topicName)}
                className="p-5 flex items-center justify-between cursor-pointer hover:bg-white/[0.01] transition-all select-none"
              >
                <div className="flex items-center gap-4">
                  <span className="text-lg font-bold text-white tracking-tight">{topicName}</span>
                  <span className="text-xs bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 px-2.5 py-0.5 rounded-full font-bold">
                    {solvedInTopic} / {topicProblems.length} Solved ({topicPercent}%)
                  </span>
                </div>
                {isExpanded ? <ChevronUp className="h-5 w-5 text-slate-400" /> : <ChevronDown className="h-5 w-5 text-slate-400" />}
              </div>

              {/* Accordion Body */}
              {isExpanded && (
                <div className="border-t border-white/5 bg-[#0a0d17]/40 p-5 space-y-4">
                  {topicProblems.map(prob => (
                    <div key={prob.id} className="p-4 border border-white/5 rounded-lg bg-[#0d1222] flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-indigo-500/20 transition-all">
                      <div className="flex items-center gap-4">
                        <button onClick={() => handleToggleSolved(prob)} className="text-indigo-400 hover:text-indigo-300">
                          {prob.completed ? <CheckSquare className="h-5 w-5 fill-indigo-500/10" /> : <Square className="h-5 w-5" />}
                        </button>
                        <div>
                          <div className="font-bold text-white text-xs flex items-center gap-2">
                            {prob.title}
                            <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${prob.difficulty === 'Easy' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'}`}>
                              {prob.difficulty}
                            </span>
                          </div>
                          <a
  href={prob.leetcode_link}
  target="_blank"
  rel="noreferrer"
  className="text-[10px] text-slate-500 hover:text-indigo-400 flex items-center gap-1 mt-1 font-semibold"
>
  🔗 LeetCode Practice
  <ExternalLink className="h-2.5 w-2.5" />
</a>
                        </div>
                      </div>

                      {/* Notes Box and Solve triggers */}
                      <div className="flex items-center gap-4 w-full md:w-auto">
                        <div className="flex-1 md:flex-initial flex items-center gap-2">
                          <input 
                            type="text" 
                            value={notes[prob.id] || ''}
                            onChange={(e) => handleNoteChange(prob.id, e.target.value)}
                            placeholder="Add study notes..."
                            className="bg-[#07090f] border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 w-full md:w-48"
                          />
                          <button 
                            onClick={() => handleSaveNotes(prob.id)}
                            disabled={savingNotes[prob.id]}
                            className="p-2 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 rounded-lg hover:bg-indigo-500/20"
                            title="Save notes"
                          >
                            <Save className="h-4 w-4" />
                          </button>
                        </div>

                        <button 
  onClick={() => setProblemForArena(prob.id)}
  className="btn btn-primary text-xs px-4 py-2 rounded-lg flex items-center gap-2"
>
  🚀 PrepForge IDE
</button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
