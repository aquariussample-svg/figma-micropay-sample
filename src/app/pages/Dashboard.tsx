import { Users, Banknote, Clock, ArrowRight, DollarSign, Activity, FileText } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { name: "Jan", payroll: 4000 },
  { name: "Feb", payroll: 3000 },
  { name: "Mar", payroll: 2000 },
  { name: "Apr", payroll: 2780 },
  { name: "May", payroll: 1890 },
  { name: "Jun", payroll: 2390 },
  { name: "Jul", payroll: 3490 },
];

export function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Dashboard Overview</h1>
          <p className="text-sm text-slate-500 mt-1">Welcome back, here's what's happening with your payroll today.</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <button className="px-4 py-2 bg-white text-slate-700 font-medium rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors w-full sm:w-auto">
            Generate Report
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-sm hover:shadow w-full sm:w-auto">
            New Payroll Run
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-slate-500">Active Employees</p>
              <h3 className="text-3xl font-bold text-slate-900 mt-2">1,245</h3>
              <p className="text-sm text-emerald-600 font-medium mt-2 flex items-center gap-1">
                <span className="bg-emerald-100 text-emerald-700 p-0.5 rounded text-xs">+12</span> this month
              </p>
            </div>
            <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
              <Users size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-slate-500">Total Payroll (YTD)</p>
              <h3 className="text-3xl font-bold text-slate-900 mt-2">$2.4M</h3>
              <p className="text-sm text-slate-500 font-medium mt-2">
                Across 8 pay periods
              </p>
            </div>
            <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl">
              <DollarSign size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-slate-500">Next Pay Date</p>
              <h3 className="text-3xl font-bold text-slate-900 mt-2">Oct 31</h3>
              <p className="text-sm text-amber-600 font-medium mt-2 flex items-center gap-1">
                <Clock size={14} /> 5 days remaining
              </p>
            </div>
            <div className="p-3 bg-amber-50 text-amber-600 rounded-xl">
              <Banknote size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-slate-500">Pending Approvals</p>
              <h3 className="text-3xl font-bold text-slate-900 mt-2">14</h3>
              <p className="text-sm text-slate-500 font-medium mt-2">
                Leave requests & overtime
              </p>
            </div>
            <div className="p-3 bg-rose-50 text-rose-600 rounded-xl">
              <Activity size={24} />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart Section */}
        <div className="lg:col-span-2 bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-between sm:items-center mb-6">
            <h3 className="text-lg font-bold text-slate-900">Payroll Trend</h3>
            <select className="text-sm border-slate-200 rounded-lg text-slate-600 bg-slate-50 focus:ring-blue-500 focus:border-blue-500 w-full sm:w-auto">
              <option>Last 6 Months</option>
              <option>This Year</option>
            </select>
          </div>
          <div className="h-64 sm:h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorPayroll" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dx={-10} tickFormatter={(value) => `$${value}`} />
                <Tooltip
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  itemStyle={{ color: '#0f172a', fontWeight: 600 }}
                />
                <Area type="monotone" dataKey="payroll" stroke="#2563eb" strokeWidth={3} fillOpacity={1} fill="url(#colorPayroll)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Quick Actions & Recent Activity */}
        <div className="space-y-6">
          <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full flex items-start sm:items-center justify-between gap-3 p-3 rounded-xl border border-slate-200 hover:border-blue-300 hover:bg-blue-50 transition-all group text-left">
                <div className="flex items-start sm:items-center gap-3 min-w-0">
                  <div className="p-2 bg-blue-100 text-blue-600 rounded-lg group-hover:bg-blue-200 transition-colors">
                    <Banknote size={18} />
                  </div>
                  <span className="font-medium text-slate-700 group-hover:text-blue-700">Run Regular Payroll</span>
                </div>
                <ArrowRight size={16} className="text-slate-400 group-hover:text-blue-600" />
              </button>
              <button className="w-full flex items-start sm:items-center justify-between gap-3 p-3 rounded-xl border border-slate-200 hover:border-blue-300 hover:bg-blue-50 transition-all group text-left">
                <div className="flex items-start sm:items-center gap-3 min-w-0">
                  <div className="p-2 bg-emerald-100 text-emerald-600 rounded-lg group-hover:bg-emerald-200 transition-colors">
                    <Users size={18} />
                  </div>
                  <span className="font-medium text-slate-700 group-hover:text-blue-700">Add New Employee</span>
                </div>
                <ArrowRight size={16} className="text-slate-400 group-hover:text-blue-600" />
              </button>
              <button className="w-full flex items-start sm:items-center justify-between gap-3 p-3 rounded-xl border border-slate-200 hover:border-blue-300 hover:bg-blue-50 transition-all group text-left">
                <div className="flex items-start sm:items-center gap-3 min-w-0">
                  <div className="p-2 bg-purple-100 text-purple-600 rounded-lg group-hover:bg-purple-200 transition-colors">
                    <FileText size={18} />
                  </div>
                  <span className="font-medium text-slate-700 group-hover:text-blue-700">Generate Statutory Report</span>
                </div>
                <ArrowRight size={16} className="text-slate-400 group-hover:text-blue-600" />
              </button>
            </div>
          </div>

          <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 mb-4">Recent Activity</h3>
            <div className="space-y-4">
              {[
                { title: "October Payroll Processed", time: "2 hours ago", status: "success" },
                { title: "Tax Rates Updated", time: "Yesterday", status: "info" },
                { title: "3 New Employees Onboarded", time: "Oct 24, 2026", status: "success" },
              ].map((activity, i) => (
                <div key={i} className="flex gap-4">
                  <div className="relative mt-1">
                    <div className={`w-2 h-2 rounded-full ${activity.status === 'success' ? 'bg-emerald-500' : 'bg-blue-500'}`}></div>
                    {i !== 2 && <div className="absolute top-3 left-1 w-px h-8 bg-slate-200"></div>}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-800">{activity.title}</p>
                    <p className="text-xs text-slate-500">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
