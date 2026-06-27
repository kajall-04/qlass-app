"use client";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { Lecture } from "@/types";

export function LectureAnalytics({ lectures }: { lectures: Lecture[] }) {
  // Aggregate mock data based on lectures
  const total = lectures.length || 1;
  const completed = lectures.filter(l => l.watchStatus === 'Watched').length;
  const pending = total - completed;
  
  const pieData = [
    { name: 'Completed', value: completed, color: '#10b981' }, // emerald-500
    { name: 'Pending', value: pending, color: '#e2e8f0' } // slate-200
  ];

  // Subject-wise mock data
  const subjectMap = new Map<string, { total: number, watched: number }>();
  lectures.forEach(l => {
    const s = subjectMap.get(l.subject) || { total: 0, watched: 0 };
    s.total++;
    if (l.watchStatus === 'Watched') s.watched++;
    subjectMap.set(l.subject, s);
  });
  
  const barData = Array.from(subjectMap.entries()).map(([subject, counts]) => ({
    subject: subject.length > 10 ? subject.substring(0, 10) + '...' : subject,
    watchPercent: Math.round((counts.watched / counts.total) * 100)
  }));

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5">
        <h4 className="text-sm font-semibold text-slate-900 dark:text-white mb-4">Overall Completion</h4>
        <div className="h-48 relative">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
                stroke="none"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                itemStyle={{ color: '#1e293b' }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-3xl font-bold text-slate-900 dark:text-white">{Math.round((completed/total)*100)}%</span>
            <span className="text-xs text-slate-500">Watched</span>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5">
        <h4 className="text-sm font-semibold text-slate-900 dark:text-white mb-4">Subject-wise Watch %</h4>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={barData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis dataKey="subject" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
              <Tooltip 
                cursor={{ fill: '#f1f5f9' }}
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              />
              <Bar dataKey="watchPercent" fill="#10b981" radius={[4, 4, 0, 0]} maxBarSize={40} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
