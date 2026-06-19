import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardBody } from '../components/Card';
import { GraduationCap, Award, Compass, Search, Calendar } from 'lucide-react';

const COMPANIES = [
  {
    id: "google",
    name: "Google",
    logoText: "G",
    color: "bg-blue-600",
    desc: "Global search and cloud technology leader. Known for deep algorithmic and system structure evaluations.",
    eligibility: "No active backlogs. Resume screening (GPA 8.0+ preferred, open to all branches).",
    process: "Online Assessment (90 mins, 2 hard coding questions) -> 3-4 Technical rounds (focusing on Graphs, Trees, DP) -> Googlyness behavioral fit round.",
    rounds: "1 OA, 3 Technical coding, 1 Googlyness",
    roadmap: "Trie, Segment Trees, Advanced Graph Algorithms (Dijkstra, Tarjan, DP on trees), System Design patterns."
  },
  {
    id: "microsoft",
    name: "Microsoft",
    logoText: "M",
    color: "bg-red-500",
    desc: "Multinational tech corporation. Focuses on code safety, correctness, and low-level design patterns.",
    eligibility: "7.0+ CGPA. CS/IT/ECE or quantitative fields.",
    process: "Codility Online Test (3 questions, 110 mins) -> 2 Technical rounds (data structures, system details) -> AA (Asynchronous Architect) system design.",
    rounds: "1 OA, 2 Technical, 1 AA/System Design",
    roadmap: "Linked List looping/reversals, Stack/Queue implementations, Object-Oriented design patterns, scaling caches."
  },
  {
    id: "amazon",
    name: "Amazon",
    logoText: "A",
    color: "bg-amber-600",
    desc: "E-commerce and AWS services pioneer. Evaluates coding along with 16 Leadership Principles.",
    eligibility: "6.5+ CGPA. CS, ECE, EEE and allied fields.",
    process: "Online Assessment (Coding + Leadership evaluation) -> 2 Technical interviews (DSA, trees) -> Bar Raiser (advanced coding + heavy LP deep-dive).",
    rounds: "1 OA, 2 Technical, 1 Bar Raiser",
    roadmap: "BST traversals, Heap K-way merges, Two-pointer/Sliding Window paradigms, scalability heuristics."
  },
  {
    id: "tcs",
    name: "TCS",
    logoText: "T",
    color: "bg-[#1B365D]",
    desc: "Global IT solutions consultant. Conducts the national qualifier assessment (NQT).",
    eligibility: "60% or 6.0 CGPA throughout 10th, 12th, and B.Tech. Max 1 active backlog.",
    process: "TCS NQT Online Exam (Cognitive skills, Technical MCQs, 2 hands-on coding challenges) -> Technical interview -> HR/Managerial round.",
    rounds: "1 NQT Exam, 1 Technical, 1 HR",
    roadmap: "Basic math/aptitude, SQL queries, basic sorting algorithms, string processing."
  },
  {
    id: "infosys",
    name: "Infosys",
    logoText: "I",
    color: "bg-blue-500",
    desc: "Information systems provider. Recruits SDEs via HackWithInfy and InfyTQ certifications.",
    eligibility: "60% throughout education. Open to all engineering streams.",
    process: "Online Assessment (HackWithInfy coding rounds or certification tests) -> Technical & behavioral HR combined interview.",
    rounds: "1 OA, 1 Unified Technical + HR",
    roadmap: "Recursion, Array manipulations, basic SQL Joins, OOPs core terms."
  },
  {
    id: "accenture",
    name: "Accenture",
    logoText: "Ac",
    color: "bg-purple-600",
    desc: "Professional services and IT consulting. Emphasizes general cognitive skills and programming foundations.",
    eligibility: "6.5+ CGPA or 65% aggregate. No active backlogs.",
    process: "Cognitive Assessment (60 mins) -> Technical Assessment (C/C++ pseudo-codes, SQL, CN) -> Communication assessment -> Technical/HR interview.",
    rounds: "1 Cognitive & Tech, 1 Communication, 1 Interview",
    roadmap: "Data structures basics, loops dry-run, networking layers, DBMS normalization."
  },
  {
    id: "deloitte",
    name: "Deloitte",
    logoText: "D",
    color: "bg-emerald-600",
    desc: "Leading audit, consulting, and advisory firm. Heavy focus on case studies and communication.",
    eligibility: "60% throughout. Open to all quantitative engineering streams.",
    process: "Aptitude Online Test -> Group Discussion / Case Study analysis -> Technical interview (projects + SQL) -> Partner HR round.",
    rounds: "1 OA, 1 GD/Case Study, 1 Tech, 1 Partner",
    roadmap: "Case study frameworks, statistics, logical reasoning, data warehousing."
  },
  {
    id: "oracle",
    name: "Oracle",
    logoText: "O",
    color: "bg-red-700",
    desc: "Enterprise database and cloud infrastructure leader. Heavy evaluation on DBMS, OS, and OOPs details.",
    eligibility: "7.0+ CGPA or 70% aggregate. CS/IT/ECE branches only.",
    process: "Online Test (120 mins, DBMS, OS, CN MCQs, and 2 Coding) -> 2 Technical rounds (SQL queries, system design, coding) -> HR round.",
    rounds: "1 OA, 2 Technical, 1 HR",
    roadmap: "Complex SQL Joins/Subqueries, Transaction concurrency, Operating Systems scheduling, memory maps."
  },
  {
  id: "adobe",
  name: "Adobe",
  logoText: "A",
  color: "bg-red-600",
  desc: "Global software giant known for products like Photoshop, Acrobat, and Creative Cloud. Strong emphasis on problem-solving and core CS fundamentals.",
  eligibility: "7.0+ CGPA preferred. Usually open for CSE, IT, ECE. No active backlogs. Strong DSA skills expected.",
  process: "Online Assessment (DSA + MCQs) -> 2 Technical Interviews (DSA, DBMS, OS, OOPs) -> Hiring Manager Round -> HR Discussion.",
  rounds: "1 OA, 2 Technical, 1 Hiring Manager, 1 HR",
  roadmap: "Arrays, Trees, Graphs, Dynamic Programming, DBMS normalization, OOP concepts, Operating Systems."
},
{
  id: "atlassian",
  name: "Atlassian",
  logoText: "At",
  color: "bg-blue-700",
  desc: "Australian software company known for Jira, Trello, and Confluence. Focuses heavily on coding and low-level design.",
  eligibility: "7.0+ CGPA. Primarily CS/IT students. No active backlogs. Strong coding profile preferred.",
  process: "Online Coding Assessment -> 2-3 Technical Interviews (DSA + LLD) -> Behavioral Round.",
  rounds: "1 OA, 3 Technical, 1 Behavioral",
  roadmap: "Graphs, Dynamic Programming, Hashing, Low-Level Design, OOP principles, concurrency basics."
},
{
  id: "walmart",
  name: "Walmart Global Tech",
  logoText: "W",
  color: "bg-sky-600",
  desc: "Technology arm of Walmart focusing on scalable retail systems and cloud infrastructure.",
  eligibility: "6.5+ CGPA. CSE, IT, ECE preferred. No active backlogs.",
  process: "Online Assessment -> 2 Technical Interviews (DSA + CS fundamentals) -> Managerial Round.",
  rounds: "1 OA, 2 Technical, 1 Managerial",
  roadmap: "Trees, Graphs, Sliding Window, Heaps, DBMS transactions, OS scheduling, System Design basics."
},
{
  id: "goldman",
  name: "Goldman Sachs",
  logoText: "GS",
  color: "bg-yellow-700",
  desc: "Leading global investment bank recruiting engineers for technology and quantitative roles.",
  eligibility: "7.0+ CGPA. Open to CS, IT, ECE, Mathematics and allied branches. No active backlogs.",
  process: "Hackerrank Assessment -> Technical Interview (DSA, CS Fundamentals) -> Behavioral + Hiring Manager Round.",
  rounds: "1 OA, 2 Technical, 1 Behavioral",
  roadmap: "Arrays, Strings, DP, Probability, SQL queries, Operating Systems, Networking fundamentals."
},
{
  id: "nvidia",
  name: "NVIDIA",
  logoText: "N",
  color: "bg-green-600",
  desc: "Leader in GPUs, AI hardware, and accelerated computing. Strong focus on C++, OS, and problem-solving.",
  eligibility: "7.5+ CGPA preferred. CSE, IT, ECE, Electrical branches. No active backlogs.",
  process: "Online Assessment -> 2-3 Technical Interviews (C++, OS, DSA) -> Managerial/HR Round.",
  rounds: "1 OA, 3 Technical, 1 HR",
  roadmap: "Advanced C++, Memory Management, OS internals, Multithreading, Trees, Graphs, Dynamic Programming."
},
{
  id: "paypal",
  name: "PayPal",
  logoText: "P",
  color: "bg-blue-800",
  desc: "Global online payments platform focusing on secure financial transactions and scalable systems.",
  eligibility: "7.0+ CGPA preferred. Open to CSE, IT, ECE. No active backlogs allowed.",
  process: "Online Assessment (Coding + MCQs) -> 2 Technical Interviews (DSA, OOPs, DBMS) -> Hiring Manager Round -> HR Discussion.",
  rounds: "1 OA, 2 Technical, 1 Hiring Manager, 1 HR",
  roadmap: "Arrays, Strings, Hashing, Trees, OOP principles, DBMS indexing, Operating Systems basics."
},
{
  id: "uber",
  name: "Uber",
  logoText: "U",
  color: "bg-black",
  desc: "Global ride-sharing and mobility technology company known for large-scale distributed systems.",
  eligibility: "7.0+ CGPA. Primarily CS/IT branches. No active backlogs. Strong DSA profile expected.",
  process: "Online Coding Test -> 2-3 Technical Interviews (DSA + System Design) -> Behavioral Round.",
  rounds: "1 OA, 3 Technical, 1 Behavioral",
  roadmap: "Graphs, Dynamic Programming, Trees, Low-Level Design, System Design fundamentals, scalability concepts."
},
{
  id: "cisco",
  name: "Cisco",
  logoText: "C",
  color: "bg-cyan-600",
  desc: "Networking and cybersecurity giant with strong focus on computer networks and software engineering.",
  eligibility: "6.5+ CGPA. Open to CSE, IT, ECE, EEE. No active backlogs.",
  process: "Online Assessment (Coding + Networking MCQs) -> 2 Technical Interviews -> HR Round.",
  rounds: "1 OA, 2 Technical, 1 HR",
  roadmap: "Computer Networks, OSI model, TCP/IP, DSA fundamentals, OOP concepts, DBMS basics."
},
{
  id: "sap",
  name: "SAP",
  logoText: "S",
  color: "bg-sky-500",
  desc: "Enterprise software leader specializing in ERP solutions, cloud computing, and business applications.",
  eligibility: "6.5+ CGPA. Open to CSE, IT, ECE. No active backlogs preferred.",
  process: "Online Test (Coding + MCQs) -> 2 Technical Interviews -> HR Discussion.",
  rounds: "1 OA, 2 Technical, 1 HR",
  roadmap: "Java/OOP concepts, SQL queries, DBMS transactions, Data Structures, Problem Solving."
},
{
  id: "qualcomm",
  name: "Qualcomm",
  logoText: "Q",
  color: "bg-indigo-700",
  desc: "Semiconductor and telecommunications company focusing on wireless technologies and embedded systems.",
  eligibility: "7.0+ CGPA preferred. Open to CSE, IT, ECE, Electrical branches. No active backlogs.",
  process: "Online Assessment -> 2-3 Technical Interviews (C++, OS, CN, DSA) -> HR Round.",
  rounds: "1 OA, 3 Technical, 1 HR",
  roadmap: "Advanced C++, Operating Systems, Computer Networks, Memory Management, Trees and Graph algorithms."
},
{
  id: "ibm",
  name: "IBM",
  logoText: "I",
  color: "bg-blue-700",
  desc: "Global technology company specializing in cloud computing, AI, and enterprise software solutions.",
  eligibility: "6.5+ CGPA. Open to CSE, IT, ECE, and allied branches. No active backlogs preferred.",
  process: "Online Assessment (Coding + Aptitude) -> Technical Interview -> HR Interview.",
  rounds: "1 OA, 1 Technical, 1 HR",
  roadmap: "Java, DBMS, OOPs, SQL, DSA basics, Aptitude preparation."
},
{
  id: "cognizant",
  name: "Cognizant",
  logoText: "Cg",
  color: "bg-cyan-700",
  desc: "Leading IT services and consulting company recruiting through campus drives and GenC programs.",
  eligibility: "60% throughout academics. Open to all engineering branches. No active backlogs.",
  process: "Online Assessment -> Technical Interview -> HR Interview.",
  rounds: "1 OA, 1 Technical, 1 HR",
  roadmap: "Aptitude, SQL, OOPs, DBMS, basic coding and communication skills."
},
{
  id: "capgemini",
  name: "Capgemini",
  logoText: "Cp",
  color: "bg-indigo-600",
  desc: "Multinational IT consulting and services company with strong campus recruitment programs.",
  eligibility: "60% throughout academics. No active backlogs. Open to most engineering streams.",
  process: "Technical Assessment -> Game-Based Assessment -> Technical Interview -> HR Interview.",
  rounds: "2 Assessments, 1 Technical, 1 HR",
  roadmap: "Pseudo code, Aptitude, SQL, DBMS, OOPs, communication skills."
},
{
  id: "wipro",
  name: "Wipro",
  logoText: "W",
  color: "bg-purple-700",
  desc: "Global information technology company recruiting through Elite NTH and other hiring programs.",
  eligibility: "60% throughout academics. Maximum 1 backlog allowed in some roles.",
  process: "Online Assessment -> Voice Assessment -> Technical Interview -> HR Interview.",
  rounds: "1 OA, 1 Voice, 1 Technical, 1 HR",
  roadmap: "Aptitude, Verbal Ability, Programming Fundamentals, DBMS, OOPs."
},
{
  id: "hcl",
  name: "HCLTech",
  logoText: "H",
  color: "bg-orange-600",
  desc: "Leading IT services company focusing on digital transformation and software engineering.",
  eligibility: "60% throughout academics. Open to CSE, IT, ECE and related branches.",
  process: "Online Test -> Technical Interview -> HR Round.",
  rounds: "1 OA, 1 Technical, 1 HR",
  roadmap: "Core Java, SQL, DBMS, Aptitude, Data Structures basics."
},
{
  id: "techmahindra",
  name: "Tech Mahindra",
  logoText: "TM",
  color: "bg-red-800",
  desc: "Indian multinational IT services company offering software development and consulting services.",
  eligibility: "60% throughout academics. Open to all engineering streams.",
  process: "Online Aptitude Test -> Technical Interview -> HR Interview.",
  rounds: "1 OA, 1 Technical, 1 HR",
  roadmap: "Aptitude, Communication Skills, Basic Programming, OOPs and DBMS."
},
{
  id: "servicenow",
  name: "ServiceNow",
  logoText: "SN",
  color: "bg-emerald-700",
  desc: "Cloud-based software company providing enterprise workflow automation solutions.",
  eligibility: "7.0+ CGPA. Primarily open to CSE and IT students. No active backlogs.",
  process: "Online Coding Assessment -> 2 Technical Interviews -> Hiring Manager Round.",
  rounds: "1 OA, 2 Technical, 1 Hiring Manager",
  roadmap: "DSA, OOPs, DBMS, Operating Systems, Low-Level Design, Problem Solving."
}
];

export default function Companies() {
  const [search, setSearch] = useState('');
  const [selectedComp, setSelectedComp] = useState(COMPANIES[0]);

  const filtered = COMPANIES.filter(c => c.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-8 animate-fade-in text-sm">
      <div>
        <h2 className="text-3xl font-extrabold text-white tracking-tight">Companies Hub</h2>
        <p className="text-slate-400 text-xs mt-1">Explore eligibility criteria, selection pipelines, rounds, and prep roadmaps for top tech recruiters.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Left Side Search & Select list */}
        <div className="lg:col-span-1 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
            <input 
              type="text" 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search companies..."
              className="w-full bg-[#0a0d17] border border-white/10 rounded-lg py-2 pl-9 pr-3 text-white text-xs focus:outline-none focus:border-indigo-500 glass-panel"
            />
          </div>

          <div className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-x-visible pb-2 lg:pb-0">
            {filtered.map(comp => (
              <button
                key={comp.id}
                onClick={() => setSelectedComp(comp)}
                className={`w-full text-left p-3.5 border rounded-lg flex items-center gap-3 transition-all text-xs font-bold ${selectedComp.id === comp.id ? 'bg-indigo-500/10 border-indigo-500/30 text-indigo-400' : 'bg-[#0b0f1a] border-white/5 text-slate-400 hover:text-white'}`}
              >
                <div className={`h-7 w-7 rounded-md ${comp.color} flex items-center justify-center text-white font-bold`}>{comp.logoText}</div>
                <span>{comp.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Details Roadmaps */}
        <div className="lg:col-span-3">
          <Card hoverEffect={false} className="p-6 space-y-6">
            <div className="flex items-center gap-4 border-b border-white/5 pb-4">
              <div className={`h-12 w-12 rounded-xl ${selectedComp.color} flex items-center justify-center text-white font-black text-2xl`}>
                {selectedComp.logoText}
              </div>
              <div>
                <h3 className="text-xl font-bold text-white tracking-tight">{selectedComp.name}</h3>
                <p className="text-slate-400 text-xs mt-0.5">{selectedComp.desc}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 leading-relaxed">
              <div className="space-y-4">
                <div className="space-y-1">
                  <div className="font-bold text-white text-xs uppercase tracking-wider flex items-center gap-1.5"><GraduationCap className="h-4 w-4 text-indigo-400" /> Academic Eligibility</div>
                  <p className="text-slate-400 text-xs">{selectedComp.eligibility}</p>
                </div>

                <div className="space-y-1">
                  <div className="font-bold text-white text-xs uppercase tracking-wider flex items-center gap-1.5"><Calendar className="h-4 w-4 text-indigo-400" /> Assessment Rounds</div>
                  <p className="text-slate-400 text-xs">{selectedComp.rounds}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-1">
                  <div className="font-bold text-white text-xs uppercase tracking-wider flex items-center gap-1.5"><Award className="h-4 w-4 text-indigo-400" /> Recruitment Pipeline</div>
                  <p className="text-slate-400 text-xs">{selectedComp.process}</p>
                </div>

                <div className="space-y-1">
                  <div className="font-bold text-white text-xs uppercase tracking-wider flex items-center gap-1.5"><Compass className="h-4 w-4 text-indigo-400" /> Targeted Roadmap</div>
                  <p className="text-slate-400 text-xs font-semibold text-indigo-300">{selectedComp.roadmap}</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
