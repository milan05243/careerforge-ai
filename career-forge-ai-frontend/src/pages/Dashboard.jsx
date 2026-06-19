import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardBody } from '../components/Card';
import { DashboardSkeleton } from '../components/Skeletons';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, PieChart, Pie } from 'recharts';
import { Briefcase, CheckCircle, Code, Cpu, Award } from 'lucide-react';

export default function Dashboard({ apiBase, authHeaders }) {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    dsaDone: 0,
    dsaTotal: 0,
    dsaPercent: 0,
    appliedJobs: 0,
    quizAccuracy: 0,
    quizTotal: 0,
    appStages: []
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const [dsaRes, appRes, quizRes] = await Promise.all([
          fetch(`${apiBase}/api/dsa`, { headers: { ...authHeaders } }),
          fetch(`${apiBase}/api/applications`, { headers: { ...authHeaders } }),
          fetch(`${apiBase}/api/quiz`, { headers: { ...authHeaders } })
        ]);

        const dsaData = await dsaRes.json();
        const appData = await appRes.json();
        const quizData = await quizRes.json();

        // Calculate DSA Stats
        const dsaTotal = dsaData.length;
        const dsaDone = dsaData.filter(p => p.completed).length;
        const dsaPercent = dsaTotal ? Math.round((dsaDone / dsaTotal) * 100) : 0;

        // Calculate Application Stages
        const stages = { Applied: 0, Shortlisted: 0, Interviewing: 0, Offer: 0 };
        appData.forEach(app => {
          if (stages[app.status] !== undefined) {
            stages[app.status]++;
          }
        });

        const appStages = Object.keys(stages).map(key => ({
          name: key,
          count: stages[key]
        }));

        // Calculate Quiz Accuracy
        let totalQuiz = 0;
        let correctQuiz = 0;
        quizData.forEach(q => {
          totalQuiz += q.total;
          correctQuiz += q.correct;
        });
        const quizAccuracy = totalQuiz ? Math.round((correctQuiz / totalQuiz) * 100) : 0;

        setStats({
          dsaDone,
          dsaTotal,
          dsaPercent,
          appliedJobs: appData.length,
          quizAccuracy,
          quizTotal: totalQuiz,
          appStages
        });
      } catch (err) {
        console.error("Failed to fetch dashboard stats", err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [apiBase]);

  if (loading) return <DashboardSkeleton />;

  const COLORS = ['#6366f1', '#0ea5e9', '#f59e0b', '#10b981'];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Top Welcome Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-extrabold text-white tracking-tight">Your PrepForge Workspace</h2>
          <p className="text-slate-400 text-sm mt-1">Real-time stats tracking, automated resume checks, and coding prep hub.</p>
        </div>
        <div className="flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/20 px-4 py-2 rounded-full text-indigo-300 font-semibold text-sm w-fit">
          <Award className="h-4 w-4" /> Ready to Forge
        </div>
      </div>

      {/* Highlights Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardBody className="flex items-center gap-5">
            <div className="p-4 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
              <Code className="h-7 w-7" />
            </div>
            <div>
              <div className="text-3xl font-black text-white">{stats.dsaDone} / {stats.dsaTotal}</div>
              <div className="text-xs text-slate-400 mt-1 uppercase tracking-wider font-semibold">DSA Sheets Solved</div>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="flex items-center gap-5">
            <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
              <Briefcase className="h-7 w-7" />
            </div>
            <div>
              <div className="text-3xl font-black text-white">{stats.appliedJobs}</div>
              <div className="text-xs text-slate-400 mt-1 uppercase tracking-wider font-semibold">Mock Jobs Applied</div>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="flex items-center gap-5">
            <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
              <Cpu className="h-7 w-7" />
            </div>
            <div>
              <div className="text-3xl font-black text-white">{stats.quizAccuracy}%</div>
              <div className="text-xs text-slate-400 mt-1 uppercase tracking-wider font-semibold">Quiz Accuracy ({stats.quizTotal} Total)</div>
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Analytics Visual Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Job Applications Chart */}
        <Card hoverEffect={false}>
          <CardHeader>
            <CardTitle>Job Applications Pipeline</CardTitle>
          </CardHeader>
          <CardBody className="h-80">
            {stats.appliedJobs === 0 ? (
              <div className="h-full flex items-center justify-center text-slate-500 text-sm">
                No active applications. Visit the Job Portal to apply.
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={stats.appStages} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} />
                  <YAxis stroke="#64748b" fontSize={12} tickLine={false} allowDecimals={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0d1326', borderColor: 'rgba(255,255,255,0.08)', borderRadius: 8 }}
                    labelStyle={{ color: '#fff', fontWeight: 600 }}
                  />
                  <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                    {stats.appStages.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            )}
          </CardBody>
        </Card>

        {/* DSA Progress Donut Chart */}
        <Card hoverEffect={false}>
          <CardHeader>
            <CardTitle>DSA Sheet Completion Status</CardTitle>
          </CardHeader>
          <CardBody className="h-80 flex flex-col md:flex-row items-center justify-center gap-8">
            <div className="h-56 w-56 relative flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={[
                      { name: 'Completed', value: stats.dsaDone },
                      { name: 'Remaining', value: stats.dsaTotal - stats.dsaDone }
                    ]}
                    cx="50%"
                    cy="50%"
                    innerRadius={65}
                    outerRadius={80}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    <Cell fill="#6366f1" />
                    <Cell fill="rgba(255,255,255,0.05)" />
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute text-center">
                <span className="text-4xl font-extrabold text-white tracking-tight">{stats.dsaPercent}%</span>
                <span className="block text-[10px] text-slate-400 font-semibold mt-0.5 uppercase tracking-wide">Solved</span>
              </div>
            </div>

            <div className="space-y-3 font-medium text-sm">
              <div className="flex items-center gap-2 text-white">
                <span className="h-3.5 w-3.5 rounded-full bg-indigo-500"></span>
                <span>Solved: {stats.dsaDone} Problems</span>
              </div>
              <div className="flex items-center gap-2 text-slate-400">
                <span className="h-3.5 w-3.5 rounded-full bg-white/5 border border-white/10"></span>
                <span>Remaining: {stats.dsaTotal - stats.dsaDone} Problems</span>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
