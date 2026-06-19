import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardBody } from '../components/Card';
import { DashboardSkeleton } from '../components/Skeletons';
import { ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import {
  Code,
  Cpu,
  Award,
  Flame,
  Trophy,
  Mic,
  FileText
} from 'lucide-react';

export default function Dashboard({ apiBase, authHeaders }) {
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const [stats, setStats] = useState({
    dsaDone: 0,
    dsaTotal: 0,
    dsaPercent: 0,
    quizAccuracy: 0,
    quizTotal: 0,
    interviews: 0,
    resumes: 0,
    streak: 0
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const [dsaRes, quizRes, interviewRes, resumeRes] =
          await Promise.all([
            fetch(`${apiBase}/api/dsa`, {
              headers: { ...authHeaders }
            }),
            fetch(`${apiBase}/api/quiz`, {
              headers: { ...authHeaders }
            }),
            fetch(`${apiBase}/api/ai/interview/history`, {
              headers: { ...authHeaders }
            }),
            fetch(`${apiBase}/api/ai/resume-analyzer/history`, {
              headers: { ...authHeaders }
            })
          ]);

        const dsaRaw = await dsaRes.json();
        const quizRaw = await quizRes.json();
        const interviewRaw = await interviewRes.json();
        const resumeRaw = await resumeRes.json();

        const dsaData = Array.isArray(dsaRaw) ? dsaRaw : [];
        const quizData = Array.isArray(quizRaw) ? quizRaw : [];
        const interviewData = Array.isArray(interviewRaw)
          ? interviewRaw
          : [];
        const resumeData = Array.isArray(resumeRaw)
          ? resumeRaw
          : [];

        const dsaTotal = dsaData.length;
        const dsaDone = dsaData.filter((p) => p.completed).length;
        const dsaPercent = dsaTotal
          ? Math.round((dsaDone / dsaTotal) * 100)
          : 0;

        let totalQuiz = 0;
        let correctQuiz = 0;

        quizData.forEach((q) => {
          totalQuiz += q.total || 0;
          correctQuiz += q.correct || 0;
        });

        const quizAccuracy = totalQuiz
          ? Math.round((correctQuiz / totalQuiz) * 100)
          : 0;

        setStats({
          dsaDone,
          dsaTotal,
          dsaPercent,
          quizAccuracy,
          quizTotal: totalQuiz,
          interviews: interviewData.length,
          resumes: resumeData.length,
          streak: Math.min(
            dsaDone + interviewData.length + totalQuiz,
            30
          )
        });
      } catch (err) {
        console.error('Failed to fetch dashboard stats', err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [apiBase, authHeaders]);

  if (loading) return <DashboardSkeleton />;

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-extrabold text-white tracking-tight">
            Your PrepForge Workspace
          </h2>

          <p className="text-slate-400 text-sm mt-1">
            Real-time stats tracking, automated resume checks,
            and coding prep hub.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/20 px-4 py-2 rounded-full text-indigo-300 font-semibold text-sm w-fit">
          <Award className="h-4 w-4" />
          Ready to Forge
        </div>
      </div>

      <Card hoverEffect={false}>
  <CardBody>
    <h3 className="text-xl font-bold text-white">
      Welcome back, {user.name?.split(" ")[0] || "Learner"} 👋
    </h3>

    <p className="text-slate-400 mt-2">
      Stay consistent, practice daily, and keep forging your placement journey.
      Every quiz, mock interview, and DSA problem brings you one step closer
      to your dream offer.
    </p>
  </CardBody>
</Card>


      {/* Top Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        <Card>
          <CardBody className="flex items-center gap-5">
            <div className="p-4 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
              <Code className="h-7 w-7" />
            </div>

            <div>
              <div className="text-3xl font-black text-white">
                {stats.dsaDone} / {stats.dsaTotal}
              </div>

              <div className="text-xs text-slate-400 mt-1 uppercase tracking-wider font-semibold">
                DSA Solved
              </div>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="flex items-center gap-5">
            <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
              <Mic className="h-7 w-7" />
            </div>

            <div>
              <div className="text-3xl font-black text-white">
                {stats.interviews}
              </div>

              <div className="text-xs text-slate-400 mt-1 uppercase tracking-wider font-semibold">
                Mock Interviews
              </div>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="flex items-center gap-5">
            <div className="p-4 rounded-xl bg-sky-500/10 border border-sky-500/20 text-sky-400">
              <FileText className="h-7 w-7" />
            </div>

            <div>
              <div className="text-3xl font-black text-white">
                {stats.resumes}
              </div>

              <div className="text-xs text-slate-400 mt-1 uppercase tracking-wider font-semibold">
                Resume Analyses
              </div>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="flex items-center gap-5">
            <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
              <Cpu className="h-7 w-7" />
            </div>

            <div>
              <div className="text-3xl font-black text-white">
                {stats.quizAccuracy}%
              </div>

              <div className="text-xs text-slate-400 mt-1 uppercase tracking-wider font-semibold">
                Quiz Accuracy
              </div>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="flex items-center gap-5">
            <div className="p-4 rounded-xl bg-orange-500/10 border border-orange-500/20 text-orange-400">
              <Flame className="h-7 w-7" />
            </div>

            <div>
              <div className="text-3xl font-black text-white">
                {stats.streak}
              </div>

              <div className="text-xs text-slate-400 mt-1 uppercase tracking-wider font-semibold">
                Daily Streak
              </div>
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Charts + Achievements */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card hoverEffect={false}>
          <CardHeader>
            <CardTitle>Achievements & Milestones</CardTitle>
          </CardHeader>

          <CardBody className="space-y-4 text-sm">

  {stats.quizTotal > 0 && (
    <div className="flex items-center gap-3 text-amber-300">
      <Trophy className="h-5 w-5" />
      <span>🏆 First Quiz Completed</span>
    </div>
  )}

  {stats.quizTotal >= 50 && (
    <div className="flex items-center gap-3 text-yellow-300">
      <Award className="h-5 w-5" />
      <span>🎯 Attempted 50 Quiz Questions</span>
    </div>
  )}

  {stats.interviews > 0 && (
    <div className="flex items-center gap-3 text-emerald-300">
      <Flame className="h-5 w-5" />
      <span>🔥 Started Mock Interview Practice</span>
    </div>
  )}

  {stats.interviews >= 5 && (
    <div className="flex items-center gap-3 text-purple-300">
      <Mic className="h-5 w-5" />
      <span>🎤 Completed 5 Mock Interviews</span>
    </div>
  )}

  {stats.interviews >= 10 && (
    <div className="flex items-center gap-3 text-pink-300">
      <Mic className="h-5 w-5" />
      <span>🚀 Interview Master - 10 Sessions</span>
    </div>
  )}

  {stats.dsaDone > 0 && (
    <div className="flex items-center gap-3 text-indigo-300">
      <Code className="h-5 w-5" />
      <span>💻 DSA Journey Started</span>
    </div>
  )}

  {stats.dsaDone >= 10 && (
    <div className="flex items-center gap-3 text-cyan-300">
      <Code className="h-5 w-5" />
      <span>📚 Solved 10 DSA Problems</span>
    </div>
  )}

  {stats.dsaDone >= 50 && (
    <div className="flex items-center gap-3 text-blue-300">
      <Code className="h-5 w-5" />
      <span>🏅 DSA Explorer - 50 Problems Solved</span>
    </div>
  )}

  {stats.resumes > 0 && (
    <div className="flex items-center gap-3 text-orange-300">
      <FileText className="h-5 w-5" />
      <span>📄 First Resume Analyzed</span>
    </div>
  )}

  {stats.resumes >= 5 && (
    <div className="flex items-center gap-3 text-green-300">
      <FileText className="h-5 w-5" />
      <span>⭐ Resume Optimizer - 5 Analyses</span>
    </div>
  )}

  {(stats.quizTotal +
    stats.interviews +
    stats.dsaDone) === 0 && (
    <div className="text-slate-400 text-center py-6">
      Start practicing to unlock achievements 🚀
    </div>
  )}

</CardBody>
</Card>

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
                      {
                        name: 'Completed',
                        value: stats.dsaDone
                      },
                      {
                        name: 'Remaining',
                        value: stats.dsaTotal - stats.dsaDone
                      }
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
                <span className="text-4xl font-extrabold text-white">
                  {stats.dsaPercent}%
                </span>

                <span className="block text-[10px] text-slate-400 font-semibold mt-1 uppercase">
                  Solved
                </span>
              </div>
            </div>

            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-2 text-white">
                <span className="h-3.5 w-3.5 rounded-full bg-indigo-500"></span>
                Solved: {stats.dsaDone} Problems
              </div>

              <div className="flex items-center gap-2 text-slate-400">
                <span className="h-3.5 w-3.5 rounded-full bg-white/10"></span>
                Remaining: {stats.dsaTotal - stats.dsaDone} Problems
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
      {/* Quick Actions + Weekly Goals */}
<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

  <Card hoverEffect={false}>
    <CardHeader>
      <CardTitle>Quick Actions</CardTitle>
    </CardHeader>

    <CardBody className="grid grid-cols-2 gap-4">

      <button className="p-4 rounded-xl bg-indigo-500/10 border border-indigo-500/20 hover:bg-indigo-500/20 transition">
        <div className="text-2xl">📚</div>
        <div className="mt-2 text-sm font-semibold text-white">
          Practice Quiz
        </div>
      </button>

      <button className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 hover:bg-emerald-500/20 transition">
        <div className="text-2xl">🎤</div>
        <div className="mt-2 text-sm font-semibold text-white">
          Start Interview
        </div>
      </button>

      <button className="p-4 rounded-xl bg-sky-500/10 border border-sky-500/20 hover:bg-sky-500/20 transition">
        <div className="text-2xl">📄</div>
        <div className="mt-2 text-sm font-semibold text-white">
          Analyze Resume
        </div>
      </button>

      <button className="p-4 rounded-xl bg-orange-500/10 border border-orange-500/20 hover:bg-orange-500/20 transition">
        <div className="text-2xl">💻</div>
        <div className="mt-2 text-sm font-semibold text-white">
          Solve DSA
        </div>
      </button>

    </CardBody>
  </Card>

  <Card hoverEffect={false}>
    <CardHeader>
      <CardTitle>Weekly Goal Tracker</CardTitle>
    </CardHeader>

    <CardBody className="space-y-6">

      <div>
        <div className="flex justify-between text-sm text-slate-300 mb-2">
          <span>DSA Goal</span>
          <span>{stats.dsaDone}/10</span>
        </div>

        <div className="h-2 rounded-full bg-white/5">
          <div
            className="h-2 rounded-full bg-indigo-500"
            style={{ width: `${Math.min(stats.dsaDone * 10, 100)}%` }}
          />
        </div>
      </div>

      <div>
        <div className="flex justify-between text-sm text-slate-300 mb-2">
          <span>Mock Interviews</span>
          <span>{stats.interviews}/5</span>
        </div>

        <div className="h-2 rounded-full bg-white/5">
          <div
            className="h-2 rounded-full bg-emerald-500"
            style={{ width: `${Math.min(stats.interviews * 20, 100)}%` }}
          />
        </div>
      </div>

      <div>
        <div className="flex justify-between text-sm text-slate-300 mb-2">
          <span>Resume Analyses</span>
          <span>{stats.resumes}/3</span>
        </div>

        <div className="h-2 rounded-full bg-white/5">
          <div
            className="h-2 rounded-full bg-sky-500"
            style={{ width: `${Math.min(stats.resumes * 33, 100)}%` }}
          />
        </div>
      </div>

    </CardBody>
  </Card>

</div>
    </div>
  );
}

