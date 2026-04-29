import {
  Play, Calendar, CheckCircle, AlertCircle, RefreshCw, FileText,
  Banknote, Lock, Unlock, Plus, Pencil, Trash2, ChevronDown,
} from "lucide-react";
import { useState } from "react";

const LOANS = [
  { id: "LN-001", empId: "EMP-006", empName: "James Wilson", type: "Company Loan", amount: "$5,000.00", balance: "$3,200.00", monthly: "$200.00", startDate: "2026-01-01", status: "Active" },
  { id: "LN-002", empId: "EMP-003", empName: "Amanda Ross", type: "Salary Advance", amount: "$1,500.00", balance: "$750.00", monthly: "$150.00", startDate: "2026-04-01", status: "Active" },
  { id: "LN-003", empId: "EMP-001", empName: "Sarah Jenkins", type: "Company Loan", amount: "$3,000.00", balance: "$0.00", monthly: "$250.00", startDate: "2025-06-01", status: "Settled" },
];

export function Payroll() {
  const [activeTab, setActiveTab] = useState("processing");
  const [isLocked, setIsLocked] = useState(false);
  const [showLockConfirm, setShowLockConfirm] = useState(false);

  const tabs = [
    { key: "processing", label: "Active Cycles" },
    { key: "special",    label: "Special Runs" },
    { key: "statutory",  label: "Statutory Calcs" },
    { key: "loans",      label: "Loan Management" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Payroll Engine</h1>
          <p className="text-sm text-slate-500 mt-1">Calculate net pay, handle statutory deductions, and manage cycles.</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <button className="flex items-center justify-center gap-2 px-4 py-2 bg-white text-slate-700 font-medium rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors w-full sm:w-auto">
            <RefreshCw size={18} /> Sync T&A Data
          </button>
          <button
            onClick={() => setShowLockConfirm(true)}
            className={`flex items-center justify-center gap-2 px-4 py-2 font-medium rounded-lg border transition-colors w-full sm:w-auto ${
              isLocked
                ? "bg-amber-50 text-amber-700 border-amber-300 hover:bg-amber-100"
                : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
            }`}
          >
            {isLocked ? <><Lock size={18} /> Locked</> : <><Unlock size={18} /> Lock Payroll</>}
          </button>
          <button
            disabled={isLocked}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 transition-colors shadow-sm hover:shadow disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto"
          >
            <Play size={18} /> Start Process
          </button>
        </div>
      </div>

      {/* Lock confirmation banner */}
      {isLocked && (
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 bg-amber-50 border border-amber-200 rounded-xl px-4 sm:px-5 py-3 text-sm text-amber-800">
          <Lock size={16} className="text-amber-600 shrink-0" />
          <span>This payroll is <strong>locked</strong>. No changes can be made until it is unlocked by an administrator.</span>
          <button
            onClick={() => setIsLocked(false)}
            className="sm:ml-auto text-left sm:text-right text-amber-700 font-semibold underline hover:text-amber-900"
          >
            Unlock Payroll
          </button>
        </div>
      )}

      {/* Lock/Unlock modal */}
      {showLockConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setShowLockConfirm(false)} />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-sm mx-4 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${isLocked ? "bg-emerald-100 text-emerald-600" : "bg-amber-100 text-amber-600"}`}>
                {isLocked ? <Unlock size={20} /> : <Lock size={20} />}
              </div>
              <h3 className="text-lg font-bold text-slate-900">{isLocked ? "Unlock Payroll?" : "Lock Payroll?"}</h3>
            </div>
            <p className="text-sm text-slate-600 mb-6">
              {isLocked
                ? "Unlocking the payroll will allow data entry and processing to resume. Only do this if you are certain changes are required."
                : "Locking the payroll will prevent any further data entry or changes until it is unlocked. This is typically done before final processing."}
            </p>
            <div className="flex gap-3 justify-end">
              <button onClick={() => setShowLockConfirm(false)} className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
                Cancel
              </button>
              <button
                onClick={() => { setIsLocked(!isLocked); setShowLockConfirm(false); }}
                className={`px-4 py-2 text-sm font-medium text-white rounded-lg transition-colors ${isLocked ? "bg-emerald-600 hover:bg-emerald-700" : "bg-amber-500 hover:bg-amber-600"}`}
              >
                {isLocked ? "Unlock" : "Lock"} Payroll
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="flex border-b border-slate-200 overflow-x-auto">
        {tabs.map(t => (
          <button
            key={t.key}
            onClick={() => setActiveTab(t.key)}
            className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
              activeTab === t.key
                ? "border-[#741B47] text-[#741B47]"
                : "border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* ── Active Cycles ── */}
      {activeTab === "processing" && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-full bg-blue-50/50 flex items-center justify-center -skew-x-12 translate-x-10 pointer-events-none">
              <Calendar size={120} className="text-blue-100 opacity-50 -skew-x-0" />
            </div>

            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 relative z-10">
              <div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mb-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
                  Processing Active
                </span>
                <h2 className="text-2xl font-bold text-slate-900">October 2026 – Monthly</h2>
                <p className="text-slate-500 mt-1">Pay Period: Oct 1 – Oct 31 · Payment Date: Oct 31, 2026</p>
                <div className="flex items-center gap-3 mt-3">
                  <span className="text-xs text-slate-500">Period No. <strong className="text-slate-700">21</strong></span>
                  <span className="text-xs text-slate-500">Run Type: <strong className="text-slate-700">Normal</strong></span>
                  <span className="text-xs text-slate-500">Active Employees: <strong className="text-slate-700">1,245</strong></span>
                </div>
              </div>
              <div className="text-right shrink-0">
                <p className="text-sm font-medium text-slate-500 mb-1">Estimated Total</p>
                <p className="text-3xl font-bold text-slate-900">$452,180.00</p>
                <div className="relative mt-2">
                  <select className="appearance-none text-xs text-slate-500 bg-transparent border-none cursor-pointer pr-4 outline-none">
                    <option>Change Run Type</option>
                    <option>Normal</option>
                    <option>Bonus</option>
                    <option>Manual</option>
                  </select>
                  <ChevronDown size={11} className="absolute right-0 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Stepper */}
            <div className="mt-8 pt-8 border-t border-slate-200">
              <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-6">Processing Steps</h3>
              <div className="overflow-x-auto pb-2">
                <div className="flex justify-between relative min-w-[34rem]">
                <div className="absolute top-4 left-0 w-full h-1 bg-slate-100 -z-10 rounded-full">
                  <div className="h-full bg-[#741B47] rounded-full" style={{ width: "35%" }} />
                </div>
                {[
                  { label: "Data Import", done: true, active: false },
                  { label: "Calculations", done: false, active: true },
                  { label: "Review", done: false, active: false },
                  { label: "Approval", done: false, active: false },
                  { label: "Finalize", done: false, active: false },
                ].map((step, i) => (
                  <div key={i} className={`flex flex-col items-center gap-2 w-24 ${!step.done && !step.active ? "opacity-60 cursor-not-allowed" : "cursor-pointer"}`}>
                    <div className={`w-9 h-9 rounded-full flex items-center justify-center shadow-md ${
                      step.done ? "bg-[#741B47] text-white" :
                      step.active ? "bg-[#741B47] text-white ring-4 ring-[#741B47]/20" :
                      "bg-white border-2 border-slate-200 text-slate-400"
                    }`}>
                      {step.done ? <CheckCircle size={20} /> : step.active ? <RefreshCw size={20} className="animate-spin" /> : i + 1}
                    </div>
                    <span className={`text-xs font-medium text-center ${step.done || step.active ? "text-[#741B47] font-semibold" : "text-slate-500"}`}>
                      {step.label}
                    </span>
                  </div>
                ))}
                </div>
              </div>
            </div>
          </div>

          {/* Exceptions & Cycle Reports */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl border border-rose-200 shadow-sm overflow-hidden">
              <div className="p-4 bg-rose-50 border-b border-rose-100 flex items-center gap-3">
                <AlertCircle className="text-rose-600" size={20} />
                <h3 className="font-semibold text-rose-900">Calculation Exceptions (3)</h3>
              </div>
              <ul className="divide-y divide-slate-100">
                {[
                  { title: "Missing Tax Code", detail: "Employee: Sarah Jenkins (EMP-001)", action: "Resolve Issue" },
                  { title: "Negative Net Pay Detected", detail: "Employee: James Wilson (EMP-006) due to loan deduction", action: "Resolve Issue" },
                  { title: "Unapproved Overtime", detail: "2 records imported from T&A system require approval", action: "View Records" },
                ].map((ex, i) => (
                  <li key={i} className="p-4 hover:bg-slate-50">
                    <p className="text-sm font-medium text-slate-900">{ex.title}</p>
                    <p className="text-xs text-slate-500 mt-1">{ex.detail}</p>
                    <button className="text-xs text-[#741B47] font-medium mt-2 hover:underline">{ex.action}</button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
              <div className="p-4 border-b border-slate-100 flex items-center justify-between">
                <h3 className="font-semibold text-slate-900 flex items-center gap-2">
                  <FileText className="text-slate-500" size={18} /> Cycle Reports
                </h3>
                <button className="text-sm text-[#741B47] hover:underline">View All</button>
              </div>
              <div className="p-4 flex-1 flex flex-col justify-center items-center text-center">
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center text-slate-400 mb-4">
                  <FileText size={32} />
                </div>
                <h4 className="text-slate-900 font-medium mb-1">Reports Generate After Review</h4>
                <p className="text-sm text-slate-500 max-w-xs">
                  Complete the calculation phase to preview the Payroll Register, Gross-to-Net, and variance reports.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Special Runs ── */}
      {activeTab === "special" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { icon: Play, color: "indigo", title: "Bonus Run", desc: "Process performance bonuses separately from regular pay cycle.", tag: "Out-of-cycle" },
              { icon: RefreshCw, color: "amber", title: "Retroactive Pay", desc: "Calculate and disburse back-dated salary adjustments for prior periods.", tag: "Adjustment" },
              { icon: Banknote, color: "emerald", title: "Salary Advance", desc: "Process off-cycle advance payments deducted from next pay period.", tag: "Advance" },
            ].map((card, i) => (
              <button key={i} className="p-6 bg-white border border-slate-200 rounded-xl hover:border-[#741B47]/40 hover:shadow-md transition-all group flex flex-col items-center text-left">
                <div className={`w-12 h-12 bg-${card.color}-100 text-${card.color}-600 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <card.icon size={22} />
                </div>
                <span className={`text-xs font-medium text-${card.color}-600 bg-${card.color}-50 px-2 py-0.5 rounded-full mb-2`}>{card.tag}</span>
                <h3 className="font-semibold text-slate-900 text-center">{card.title}</h3>
                <p className="text-xs text-slate-500 mt-2 text-center">{card.desc}</p>
                <span className="mt-4 text-sm font-medium text-[#741B47] group-hover:underline">Configure & Run →</span>
              </button>
            ))}
          </div>

          {/* Retroactive Pay form */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
            <h3 className="text-lg font-bold text-slate-900 mb-1">Generate Retroactive Pay</h3>
            <p className="text-sm text-slate-500 mb-5">Select employees and the period for which the retroactive adjustment applies.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-5">
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">From Period</label>
                <input type="date" defaultValue="2026-09-01" className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-[#741B47]/20 focus:border-[#741B47] outline-none bg-slate-50" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">To Period</label>
                <input type="date" defaultValue="2026-09-30" className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-[#741B47]/20 focus:border-[#741B47] outline-none bg-slate-50" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Adjustment Reason</label>
                <select className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-[#741B47]/20 focus:border-[#741B47] outline-none bg-slate-50">
                  <option>Salary Review</option>
                  <option>Reclassification</option>
                  <option>Correction</option>
                  <option>Promotion</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Apply To</label>
                <select className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-[#741B47]/20 focus:border-[#741B47] outline-none bg-slate-50">
                  <option>All Employees</option>
                  <option>Selected Employees</option>
                  <option>Department</option>
                </select>
              </div>
            </div>
            <button className="flex items-center gap-2 px-5 py-2.5 bg-[#741B47] text-white text-sm font-medium rounded-lg hover:bg-[#5a1537] transition-colors shadow-sm">
              <RefreshCw size={16} /> Generate Retroactive Pay
            </button>
          </div>
        </div>
      )}

      {/* ── Statutory Calcs ── */}
      {activeTab === "statutory" && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-5">
          <div>
            <h3 className="text-lg font-bold text-slate-900">Statutory Calculations</h3>
            <p className="text-sm text-slate-500 mt-1">Configure NIS, income tax, health surcharge, and pension contribution settings for the current period.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { label: "NIS Employee Rate", value: "11.10%", desc: "Employer contribution rate" },
              { label: "NIS Employer Rate", value: "12.75%", desc: "Employee contribution rate" },
              { label: "Health Surcharge (≤$469/wk)", value: "$3.75/wk", desc: "Lower income band" },
              { label: "Health Surcharge (>$469/wk)", value: "$8.25/wk", desc: "Higher income band" },
              { label: "Personal Allowance", value: "$25,000", desc: "Annual non-taxable income" },
              { label: "NIS Ceiling (Annual)", value: "$75,360", desc: "Maximum NIS insurable earnings" },
            ].map((stat, i) => (
              <div key={i} className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-900">{stat.label}</p>
                  <p className="text-xs text-slate-500 mt-0.5">{stat.desc}</p>
                </div>
                <div className="text-right">
                  <span className="text-lg font-bold text-[#741B47]">{stat.value}</span>
                  <div className="text-xs text-[#741B47] hover:underline cursor-pointer mt-0.5">Edit</div>
                </div>
              </div>
            ))}
          </div>
          <div className="pt-2">
            <button className="px-5 py-2.5 bg-[#741B47] text-white text-sm font-medium rounded-lg hover:bg-[#5a1537] transition-colors shadow-sm">
              Save Statutory Rates
            </button>
          </div>
        </div>
      )}

      {/* ── Loan Management ── */}
      {activeTab === "loans" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-slate-900">Loan Management</h3>
              <p className="text-sm text-slate-500 mt-0.5">Track employee loans and salary advances. Repayments are automatically deducted each pay period.</p>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-[#741B47] text-white text-sm font-medium rounded-lg hover:bg-[#5a1537] transition-colors shadow-sm">
              <Plus size={16} /> New Loan
            </button>
          </div>

          {/* Summary cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { label: "Total Outstanding", value: "$3,950.00", sub: "2 active loans" },
              { label: "Monthly Deductions", value: "$350.00", sub: "This period" },
              { label: "Settled This Year", value: "$3,000.00", sub: "1 loan settled" },
            ].map((card, i) => (
              <div key={i} className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
                <p className="text-xs text-slate-500 uppercase font-semibold tracking-wider">{card.label}</p>
                <p className="text-2xl font-bold text-slate-900 mt-1">{card.value}</p>
                <p className="text-xs text-slate-400 mt-0.5">{card.sub}</p>
              </div>
            ))}
          </div>

          {/* Loans table */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    {["Loan ID", "Employee", "Type", "Loan Amount", "Balance", "Monthly Ded.", "Start Date", "Status", ""].map(h => (
                      <th key={h} className="px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider whitespace-nowrap">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {LOANS.map((loan, i) => (
                    <tr key={i} className="hover:bg-slate-50 transition-colors">
                      <td className="px-5 py-4 font-mono text-xs text-slate-600">{loan.id}</td>
                      <td className="px-5 py-4">
                        <div className="font-medium text-slate-900">{loan.empName}</div>
                        <div className="text-xs text-slate-500">{loan.empId}</div>
                      </td>
                      <td className="px-5 py-4 text-slate-600">{loan.type}</td>
                      <td className="px-5 py-4 font-medium text-slate-900">{loan.amount}</td>
                      <td className="px-5 py-4 font-medium text-slate-900">{loan.balance}</td>
                      <td className="px-5 py-4 text-slate-700">{loan.monthly}</td>
                      <td className="px-5 py-4 text-slate-500">{loan.startDate}</td>
                      <td className="px-5 py-4">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
                          loan.status === "Active" ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-500"
                        }`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${loan.status === "Active" ? "bg-emerald-500" : "bg-slate-400"}`} />
                          {loan.status}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex gap-1 justify-end">
                          <button className="p-1 rounded hover:bg-slate-200 text-slate-400 hover:text-slate-700 transition-colors"><Pencil size={13} /></button>
                          <button className="p-1 rounded hover:bg-red-50 text-slate-400 hover:text-red-500 transition-colors"><Trash2 size={13} /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
