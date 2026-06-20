import React, { useEffect, useState } from 'react';
import Editor from '@monaco-editor/react';
import { Card, CardHeader, CardTitle, CardBody } from '../components/Card';
import { Play, Send, LayoutGrid, Terminal, BookOpen, RotateCcw } from 'lucide-react';

const PROBLEM_DETAILS = {
  'two-sum': {
    title: 'Two Sum',
    difficulty: 'Easy',
    desc: 'Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`.\n\nYou may assume that each input would have exactly one solution, and you may not use the same element twice.\n\nYou can return the answer in any order.',
    examples: [
      { input: 'nums = [2,7,11,15], target = 9', output: '[0,1]', explanation: 'Because nums[0] + nums[1] == 9, we return [0, 1].' },
      { input: 'nums = [3,2,4], target = 6', output: '[1,2]' }
    ],
    constraints: ['2 <= nums.length <= 10^4', '-10^9 <= nums[i] <= 10^9', '-10^9 <= target <= 10^9'],
    templates: {
      python: 'def twoSum(nums, target):\n    # Write your python code here\n    pass',
      cpp: 'class Solution {\npublic:\n    vector<int> twoSum(vector<int>& nums, int target) {\n        \n    }\n};',
      java: 'class Solution {\n    public int[] twoSum(int[] nums, int target) {\n        \n    }\n}'
    },
    solutions: {
      python: 'def twoSum(nums, target):\n    seen = {}\n    for i, num in enumerate(nums):\n        complement = target - num\n        if complement in seen:\n            return [seen[complement], i]\n        seen[num] = i\n    return []',
      cpp: 'vector<int> twoSum(vector<int>& nums, int target) {\n    unordered_map<int, int> seen;\n    for(int i = 0; i < nums.size(); ++i) {\n        int complement = target - nums[i];\n        if(seen.count(complement)) return {seen[complement], i};\n        seen[nums[i]] = i;\n    }\n    return {};\n}',
      java: 'public int[] twoSum(int[] nums, int target) {\n    Map<Integer, Integer> seen = new HashMap<>();\n    for(int i = 0; i < nums.length; ++i) {\n        int complement = target - nums[i];\n        if(seen.containsKey(complement)) return new int[]{seen.get(complement), i};\n        seen.put(nums[i], i);\n    }\n    return new int[0];\n}'
    }
  },
  'max-subarray': {
    title: 'Maximum Subarray',
    difficulty: 'Medium',
    desc: 'Given an integer array `nums`, find the subarray with the largest sum, and return its sum.',
    examples: [
      { input: 'nums = [-2,1,-3,4,-1,2,1,-5,4]', output: '6', explanation: 'The subarray [4,-1,2,1] has the largest sum = 6.' }
    ],
    constraints: ['1 <= nums.length <= 10^5', '-10^4 <= nums[i] <= 10^4'],
    templates: {
      python: 'def maxSubArray(nums):\n    # Write your python code here\n    pass',
      cpp: 'class Solution {\npublic:\n    int maxSubArray(vector<int>& nums) {\n        \n    }\n};',
      java: 'class Solution {\n    public int maxSubArray(int[] nums) {\n        \n    }\n}'
    },
    solutions: {
      python: 'def maxSubArray(nums):\n    max_sum = nums[0]\n    curr_sum = nums[0]\n    for i in range(1, len(nums)):\n        curr_sum = max(nums[i], curr_sum + nums[i])\n        max_sum = max(max_sum, curr_sum)\n    return max_sum',
      cpp: 'int maxSubArray(vector<int>& nums) {\n    int maxSum = nums[0], currSum = nums[0];\n    for(size_t i = 1; i < nums.size(); ++i) {\n        currSum = max(nums[i], currSum + nums[i]);\n        maxSum = max(maxSum, currSum);\n    }\n    return maxSum;\n}',
      java: 'public int maxSubArray(int[] nums) {\n    int maxSum = nums[0], currSum = nums[0];\n    for(int i = 1; i < nums.length; ++i) {\n        currSum = Math.max(nums[i], currSum + nums[i]);\n        maxSum = Math.max(maxSum, currSum);\n    }\n    return maxSum;\n}'
    }
  },
  'valid-palindrome': {
    title: 'Valid Palindrome',
    difficulty: 'Easy',
    desc: 'A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward.\n\nGiven a string `s`, return `true` if it is a palindrome, or `false` otherwise.',
    examples: [
      { input: 's = "A man, a plan, a canal: Panama"', output: 'true', explanation: '"amanaplanacanalpanama" is a palindrome.' }
    ],
    constraints: ['1 <= s.length <= 2 * 10^5', 's consists only of printable ASCII characters.'],
    templates: {
      python: 'def isPalindrome(s):\n    # Write your python code here\n    pass',
      cpp: 'class Solution {\npublic:\n    bool isPalindrome(string s) {\n        \n    }\n};',
      java: 'class Solution {\n    public boolean isPalindrome(string s) {\n        \n    }\n}'
    },
    solutions: {
      python: 'def isPalindrome(s):\n    clean = [c.lower() for c in s if c.isalnum()]\n    return clean == clean[::-1]',
      cpp: 'bool isPalindrome(string s) {\n    int l = 0, r = s.length() - 1;\n    while(l < r) {\n        while(l < r && !isalnum(s[l])) l++;\n        while(l < r && !isalnum(s[r])) r--;\n        if(tolower(s[l++]) != tolower(s[r--])) return false;\n    }\n    return true;\n}',
      java: 'public boolean isPalindrome(string s) {\n    String clean = s.toLowerCase().replaceAll("[^a-z0-9]", "");\n    int l = 0, r = clean.length() - 1;\n    while(l < r) {\n        if(clean.charAt(l++) != clean.charAt(r--)) return false;\n    }\n    return true;\n}'
    }
  },
  'reverse-ll': {
    title: 'Reverse Linked List',
    difficulty: 'Easy',
    desc: 'Given the `head` of a singly linked list, reverse the list, and return the reversed list.',
    examples: [
      { input: 'head = [1,2,3,4,5]', output: '[5,4,3,2,1]' }
    ],
    constraints: ['The number of nodes in the list is the range [0, 5000].', '-5000 <= Node.val <= 5000'],
    templates: {
      python: 'def reverseList(head):\n    # Write your python code here\n    pass',
      cpp: 'class Solution {\npublic:\n    ListNode* reverseList(ListNode* head) {\n        \n    }\n};',
      java: 'class Solution {\n    public ListNode reverseList(ListNode head) {\n        \n    }\n}'
    },
    solutions: {
      python: 'def reverseList(head):\n    prev = None\n    curr = head\n    while curr:\n        nxt = curr.next\n        curr.next = prev\n        prev = curr\n        curr = nxt\n    return prev',
      cpp: 'ListNode* reverseList(ListNode* head) {\n    ListNode* prev = nullptr;\n    ListNode* curr = head;\n    while(curr) {\n        ListNode* nxt = curr->next;\n        curr->next = prev;\n        prev = curr;\n        curr = nxt;\n    }\n    return prev;\n}',
      java: 'public ListNode reverseList(ListNode head) {\n    ListNode prev = null;\n    ListNode curr = head;\n    while(curr != null) {\n        ListNode nxt = curr.next;\n        curr.next = prev;\n        prev = curr;\n        curr = nxt;\n    }\n    return prev;\n}'
    }
  },
  'climbing-stairs': {
    title: 'Climbing Stairs',
    difficulty: 'Easy',
    desc: 'You are climbing a staircase. It takes `n` steps to reach the top.\n\nEach time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?',
    examples: [
      { input: 'n = 2', output: '2', explanation: 'There are two ways: 1 step + 1 step, or 2 steps.' }
    ],
    constraints: ['1 <= n <= 45'],
    templates: {
      python: 'def climbStairs(n):\n    # Write your python code here\n    pass',
      cpp: 'class Solution {\npublic:\n    int climbStairs(int n) {\n        \n    }\n};',
      java: 'class Solution {\n    public int climbStairs(int n) {\n        \n    }\n}'
    },
    solutions: {
      python: 'def climbStairs(n):\n    if n <= 2: return n\n    prev, curr = 1, 2\n    for _ in range(3, n + 1):\n        prev, curr = curr, prev + curr\n    return curr',
      cpp: 'int climbStairs(int n) {\n    if(n <= 2) return n;\n    int prev = 1, curr = 2;\n    for(int i = 3; i <= n; ++i) {\n        int next = prev + curr;\n        prev = curr;\n        curr = next;\n    }\n    return curr;\n}',
      java: 'public int climbStairs(int n) {\n    if(n <= 2) return n;\n    int prev = 1, curr = 2;\n    for(int i = 3; i <= n; ++i) {\n        int next = prev + curr;\n        prev = curr;\n        curr = next;\n    }\n    return curr;\n}'
    }
  }
};

export default function CodingArena({ apiBase, authHeaders, problemId, triggerToast, navigateTo }) {
  const [lang, setLang] = useState('python');
  const [leftTab, setLeftTab] = useState('desc');
  const [code, setCode] = useState('');
  const [running, setRunning] = useState(false);
  const [output, setOutput] = useState('');
  const [error, setError] = useState(null);
  const [showConsole, setShowConsole] = useState(false);

  const problem = PROBLEM_DETAILS[problemId] || PROBLEM_DETAILS['two-sum'];

  useEffect(() => {
    // Load pre-populated template when problem or language changes
    const template = problem.templates[lang] || '';
    setCode(template);
    setOutput('Press "Run Code" to compile and run your solution...');
    setError(null);
    setShowConsole(false);
  }, [problemId, lang]);

  const handleRunCode = async (submit = false) => {
    setRunning(true);
    setShowConsole(true);
    setOutput('Compiling and executing code against sample test cases...');
    setError(null);

    try {
      const res = await fetch(`${apiBase}/api/arena/run`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          ...authHeaders
        },
        body: JSON.stringify({
          problem_id: problemId,
          language: lang,
          code: code
        })
      });

      if (!res.ok) throw new Error('Sandbox compile execution failed');

      const data = await res.json();
      
      if (data.success) {
        setOutput(data.output);
        if (submit) {
          // Send completion trigger to backend linked to user account
          await fetch(`${apiBase}/api/dsa/${problemId}`, {
            method: 'PUT',
            headers: { 
              'Content-Type': 'application/json',
              ...authHeaders
            },
            body: JSON.stringify({ completed: true })
          });
          triggerToast('Submission Passed! Problem solved successfully.', 'success');
        } else {
          triggerToast('Run Successful!', 'success');
        }
      } else {
        setOutput(data.output || '');
        setError(data.error || 'Test Cases Failed.');
        triggerToast('Code execution failed.', 'error');
      }
    } catch (err) {
      console.error(err);
      setError(err.message);
      triggerToast('Sandbox execution error.', 'error');
    } finally {
      setRunning(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 h-[calc(100vh-80px)] border-t border-white/5 animate-fade-in text-sm overflow-hidden bg-[#04060b]">
      {/* Left Column: Problem details / Solutions */}
      <div className="lg:col-span-5 border-r border-white/5 flex flex-col h-full overflow-y-auto">
        <div className="flex border-b border-white/5 bg-slate-950/20">
          <button 
            onClick={() => setLeftTab('desc')}
            className={`py-3 px-6 border-b-2 font-bold transition-all text-xs uppercase tracking-wider ${leftTab === 'desc' ? 'border-indigo-500 text-indigo-400' : 'border-transparent text-slate-400 hover:text-slate-200'}`}
          >
            Description
          </button>
          <button 
            onClick={() => setLeftTab('sol')}
            className={`py-3 px-6 border-b-2 font-bold transition-all text-xs uppercase tracking-wider ${leftTab === 'sol' ? 'border-transparent text-slate-400 hover:text-slate-200' : 'border-transparent text-slate-400'}`}
            style={leftTab === 'sol' ? { borderBottomColor: '#6366f1', color: '#818cf8' } : {}}
          >
            Solutions
          </button>
        </div>

        <div className="p-6 flex-1 space-y-6">
          {leftTab === 'desc' ? (
            <div className="space-y-6">
              <div className="flex items-center justify-between gap-4">
                <h3 className="text-xl font-bold text-white tracking-tight">{problem.title}</h3>
                <span className={`text-xs px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider ${problem.difficulty === 'Easy' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'}`}>
                  {problem.difficulty}
                </span>
              </div>

              <div className="text-slate-300 leading-relaxed text-xs whitespace-pre-line">{problem.desc}</div>

              {problem.examples.map((ex, idx) => (
                <div key={idx} className="space-y-2">
                  <div className="font-bold text-white text-xs uppercase tracking-wider">Example {idx + 1}</div>
                  <pre className="p-4 bg-[#090e1a]/80 border border-white/5 rounded-lg text-xs text-slate-400 font-mono space-y-1">
                    <div><strong>Input:</strong> {ex.input}</div>
                    <div><strong>Output:</strong> {ex.output}</div>
                    {ex.explanation && <div className="mt-2 text-slate-500"><strong>Explanation:</strong> {ex.explanation}</div>}
                  </pre>
                </div>
              ))}

              <div className="space-y-2">
                <div className="font-bold text-white text-xs uppercase tracking-wider">Constraints</div>
                <ul className="list-disc pl-5 space-y-1 text-slate-400 text-xs font-mono">
                  {problem.constraints.map((c, idx) => <li key={idx}>{c}</li>)}
                </ul>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <h4 className="text-md font-bold text-white">Recommended Solutions</h4>
              <div className="space-y-4">
                {Object.keys(problem.solutions).map(solLang => (
                  <div key={solLang} className="space-y-1.5">
                    <div className="text-xs font-bold text-indigo-400 uppercase tracking-wider">{solLang}</div>
                    <pre className="p-4 bg-slate-950 border border-white/5 rounded-lg text-xs text-indigo-200 overflow-x-auto font-mono">{problem.solutions[solLang]}</pre>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Right Column: Code Editor & Console */}
      <div className="lg:col-span-7 flex flex-col h-full relative">
        {/* Editor bar select */}
        <div className="p-3 bg-slate-950/40 border-b border-white/5 flex items-center justify-between">
          <select 
            value={lang} 
            onChange={(e) => setLang(e.target.value)}
            className="bg-[#0a0d17] border border-white/10 rounded-lg p-1.5 text-white text-xs focus:outline-none focus:border-indigo-500 font-bold uppercase tracking-wider"
          >
            <option value="python">Python</option>
            <option value="cpp">C++</option>
            <option value="java">Java</option>
          </select>

          <button 
            onClick={() => setCode(problem.templates[lang])}
            className="text-slate-400 hover:text-white flex items-center gap-1 text-xs font-semibold"
            title="Reset code template"
          >
            <RotateCcw className="h-3.5 w-3.5" /> Reset
          </button>
        </div>

        {/* Monaco Editor Container */}
        <div className="flex-1 relative bg-[#1e1e1e]">
          <Editor
            height="100%"
            language={lang === 'cpp' ? 'cpp' : lang === 'java' ? 'java' : 'python'}
            theme="vs-dark"
            value={code}
            onChange={(val) => setCode(val || '')}
            options={{
              minimap: { enabled: false },
              fontSize: 14,
              fontFamily: "'Courier New', Courier, monospace",
              tabSize: 4,
              automaticLayout: true
            }}
          />

          {/* Console Overlay Panel */}
          {showConsole && (
            <div className="absolute bottom-0 left-0 right-0 h-44 bg-[#0a0f1d] border-t border-white/10 z-40 flex flex-col">
              <div className="p-2.5 border-b border-white/5 flex items-center justify-between bg-slate-950/20 text-slate-400 text-xs font-bold uppercase tracking-wider">
                <span className="flex items-center gap-1"><Terminal className="h-4 w-4" /> Console Output</span>
                <button onClick={() => setShowConsole(false)} className="hover:text-white">&times; Close</button>
              </div>
              <div className="flex-1 p-4 font-mono text-xs overflow-y-auto whitespace-pre-wrap">
                {error ? (
                  <span className="text-rose-400 font-semibold">{error}</span>
                ) : (
                  <span className="text-emerald-400 font-semibold">{output}</span>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Editor Footer Action Bar */}
        <div className="p-4 bg-slate-950/60 border-t border-white/5 flex items-center justify-between">
          <button 
            onClick={() => setShowConsole(prev => !prev)}
            className="text-slate-400 hover:text-white flex items-center gap-1.5 text-xs font-semibold"
          >
            <Terminal className="h-4 w-4" /> Console
          </button>
          
          <div className="flex items-center gap-3">
            <button 
              onClick={() => handleRunCode(false)}
              disabled={running}
              className="btn btn-secondary text-xs rounded-lg py-2 px-4 flex items-center gap-1.5 disabled:opacity-50"
            >
              <Play className="h-3.5 w-3.5" /> Run Code
            </button>
            <button 
              onClick={() => handleRunCode(true)}
              disabled={running}
              className="btn btn-accent text-xs rounded-lg py-2 px-4 flex items-center gap-1.5 disabled:opacity-50"
            >
              <Send className="h-3.5 w-3.5" /> Submit Code
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
