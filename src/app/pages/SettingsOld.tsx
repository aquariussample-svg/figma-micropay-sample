import {
  Sliders, Database, Key, Shield, HardDrive, Cpu, Percent, Plus,
  Trash2, Pencil, Building2, MailCheck, CreditCard, BookOpen, Briefcase,
  ChevronDown, X, Check,
} from "lucide-react";
import { useState } from "react";
import { useParams, useLocation } from "react-router";

// ─── Earnings data ────────────────────────────────────────────────────────────
const EARNINGS_CODES = [
  { code: "1001", longDesc: "WAGES", shortDesc: "WAGES", gl: "12341234", tax: true, nis: true, nrp: true, plan: false, med: false, health: false, govt: false, multiplier: "1.000" },
  { code: "1002", longDesc: "OVERTIME", shortDesc: "OVERTIME", gl: "123456", tax: true, nis: true, nrp: true, plan: false, med: false, health: false, govt: false, multiplier: "1.500" },
  { code: "1004", longDesc: "DOUBLE TIME", shortDesc: "DOUBLE TIME", gl: "123456", tax: true, nis: true, nrp: true, plan: false, med: false, health: false, govt: false, multiplier: "2.000" },
  { code: "1007", longDesc: "BONUS", shortDesc: "BONUS", gl: "9999", tax: true, nis: false, nrp: false, plan: false, med: false, health: false, govt: false, multiplier: "1.000" },
  { code: "1010", longDesc: "HOLIDAY", shortDesc: "HOLIDAY", gl: "9999", tax: true, nis: true, nrp: true, plan: false, med: false, health: false, govt: false, multiplier: "1.000" },
  { code: "1013", longDesc: "VACATION", shortDesc: "VACATION", gl: "9999", tax: true, nis: true, nrp: true, plan: false, med: false, health: false, govt: false, multiplier: "1.000" },
  { code: "1014", longDesc: "ADVANCEMENT", shortDesc: "ADV", gl: "9999", tax: false, nis: false, nrp: false, plan: false, med: false, health: false, govt: false, multiplier: "1.000" },
  { code: "4015", longDesc: "BACK PAY", shortDesc: "BACK PAY", gl: "9999", tax: true, nis: true, nrp: false, plan: false, med: false, health: false, govt: false, multiplier: "1.000" },
  { code: "4030", longDesc: "UNIFORM ALLOWANCE", shortDesc: "UNIFORM ALLOWANCE", gl: "9999", tax: false, nis: false, nrp: false, plan: false, med: false, health: false, govt: true, multiplier: "1.000" },
];

// ─── Deductions data ──────────────────────────────────────────────────────────
const DEDUCTIONS_CODES = [
  { code: "2001", longDesc: "INCOME TAX (PAYE)", shortDesc: "PAYE", gl: "495555", taxDed: true, nis: false, nrp: false, empRef: true, chargePayroll: false, employee: true },
  { code: "2002", longDesc: "NIS EMPLOYEE", shortDesc: "NIS EE", gl: "434066", taxDed: false, nis: true, nrp: false, empRef: false, chargePayroll: false, employee: true },
  { code: "2003", longDesc: "NIS EMPLOYER", shortDesc: "NIS ER", gl: "434066", taxDed: false, nis: true, nrp: false, empRef: false, chargePayroll: true, employee: false },
  { code: "2010", longDesc: "HEALTH SURCHARGE", shortDesc: "HEALTH SUR", gl: "434066", taxDed: false, nis: false, nrp: false, empRef: false, chargePayroll: false, employee: true },
  { code: "3001", longDesc: "PENSION CONTRIBUTION", shortDesc: "PENSION", gl: "123456", taxDed: true, nis: false, nrp: true, empRef: false, chargePayroll: false, employee: true },
  { code: "3005", longDesc: "COMPANY LOAN", shortDesc: "LOAN", gl: "232323203", taxDed: false, nis: false, nrp: false, empRef: false, chargePayroll: false, employee: true },
  { code: "3010", longDesc: "ADVANCEMENT DEDUCT", shortDesc: "ADVANC DEDUCT", gl: "232323203", taxDed: false, nis: false, nrp: false, empRef: false, chargePayroll: false, employee: true },
  { code: "4022", longDesc: "NET PAY", shortDesc: "NET PAY", gl: "NETPAY", taxDed: false, nis: false, nrp: false, empRef: false, chargePayroll: false, employee: true },
];

// ─── Users data ───────────────────────────────────────────────────────────────
const USERS_DATA = [
  { id: "ALICIA", name: "ALICIA CAMPBELL", level: 2, payCodes: ["01", "02"] },
  { id: "JSMITH", name: "JANE SMITH", level: 1, payCodes: ["01"] },
  { id: "ADMIN", name: "SYSTEM ADMINISTRATOR", level: 4, payCodes: ["01", "02", "03"] },
  { id: "MWILL", name: "MICHAEL WILLIAMS", level: 1, payCodes: ["02"] },
  { id: "KJONES", name: "KAREN JONES", level: 3, payCodes: ["01", "02", "03"] },
];

const ACCESS_LEVELS = [
  { value: 1, label: "Level 1 – View Only", desc: "Read-only access to reports and employee data" },
  { value: 2, label: "Level 2 – Data Entry", desc: "Can enter and edit employee data" },
  { value: 3, label: "Level 3 – Processing", desc: "Can run payrolls and generate reports" },
  { value: 4, label: "Level 4 – Admin", desc: "Full system access including configuration" },
];

// ─── Bank Codes ───────────────────────────────────────────────────────────────
const BANK_CODES = [
  { code: "001", name: "BANK OF NOVA SCOTIA" },
  { code: "002", name: "ROYAL BANK OF CANADA" },
  { code: "003", name: "RBTT BANK B'DOS LIMITED" },
  { code: "004", name: "REPUBLIC BANK BARBADOS LIMITED" },
  { code: "005", name: "FIRST CITIZENS" },
  { code: "009", name: "FIRST CARIBBEAN INTERNATIONAL" },
  { code: "010", name: "CITY OF BRIDGETOWN" },
  { code: "9999", name: "UNDEFINED" },
];

// ─── GL Codes ─────────────────────────────────────────────────────────────────
const GL_CODES = [
  { code: "12341234", desc: "SALARIES PAYABLE" },
  { code: "123456", desc: "WAGES EXPENSES" },
  { code: "1234567890123456", desc: "OVERTIME EXPENSE" },
  { code: "232323203", desc: "OTHER PAYABLES" },
  { code: "434066", desc: "NIS PAYABLE" },
  { code: "495555", desc: "PAYE PAYABLE" },
  { code: "9999", desc: "UNDEFINED" },
];

// ─── Occupation Codes ─────────────────────────────────────────────────────────
const OCCUPATION_CODES = [
  { code: "001", desc: "ACCOUNTANT", grade: "G3", overtime: true },
  { code: "002", desc: "SECRETARY", grade: "G2", overtime: false },
  { code: "003", desc: "MANAGER", grade: "G5", overtime: false },
  { code: "004", desc: "SUPERVISOR", grade: "G4", overtime: true },
  { code: "005", desc: "CLERK", grade: "G1", overtime: true },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────
function Flag({ on }: { on: boolean }) {
  return on
    ? <span className="inline-flex items-center justify-center w-5 h-5 rounded bg-emerald-100 text-emerald-700"><Check size={12} /></span>
    : <span className="inline-flex items-center justify-center w-5 h-5 rounded bg-slate-100 text-slate-400"><X size={12} /></span>;
}

function SectionHeader({ title, onAdd }: { title: string; onAdd?: () => void }) {
  return (
    <div className="flex items-center justify-between border-b border-slate-200 pb-4 mb-6">
      <h3 className="text-xl font-bold text-slate-900">{title}</h3>
      {onAdd && (
        <button className="flex items-center gap-2 px-3 py-1.5 bg-[#741B47] text-white text-sm font-medium rounded-lg hover:bg-[#5a1537] transition-colors">
          <Plus size={15} /> Add New
        </button>
      )}
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export function Settings() {
  const { section } = useParams();
  const location = useLocation();
  
  // Determine active tab from URL or default to rules for main settings page
  const getActiveTab = () => {
    if (section) return section;
    if (location.pathname === '/settings') return 'overview';
    return 'rules';
  };
  
  const activeTab = getActiveTab();

  // If we're on a specific settings section, show that content directly
  if (section) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            {section === 'rules' && 'Rule Engine & Tax Bands'}
            {section === 'earnings' && 'Earnings Setup'}
            {section === 'deductions' && 'Deductions Setup'}
            {section === 'data' && 'Data Management'}
            {section === 'security' && 'User Management'}
            {section === 'license' && 'Licensing'}
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            {section === 'rules' && 'Configure tax brackets, calculation rules, and payroll engine settings.'}
            {section === 'earnings' && 'Define earnings types, GL mappings, and statutory flags used in payroll calculations.'}
            {section === 'deductions' && 'Set up deduction codes, tax flags, and GL account mappings.'}
            {section === 'data' && 'Manage data imports, exports, backups, and system utilities.'}
            {section === 'security' && 'Configure user accounts, permissions, and access levels.'}
            {section === 'license' && 'View license information and manage system activation.'}
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-6 md:p-8">
            {renderSettingsContent(section)}
          </div>
        </div>
      </div>
    );
  }

  const navItems = [
    { section: "CONFIGURATION", items: [
      { key: "rules",      label: "Rule Engine",         icon: Cpu },
      { key: "earnings",   label: "Earnings Setup",      icon: Percent },
      { key: "deductions", label: "Deductions Setup",    icon: Sliders },
      { key: "params",     label: "Payroll Parameters",  icon: Building2 },
    ]},
    { section: "REFERENCE TABLES", items: [
      { key: "banks",       label: "Bank Codes",         icon: CreditCard },
      { key: "gl",          label: "GL Codes",           icon: BookOpen },
      { key: "occupations", label: "Occupation Codes",   icon: Briefcase },
    ]},
    { section: "SYSTEM UTILITIES", items: [
      { key: "data",     label: "Data Management",  icon: Database },
      { key: "security", label: "User Management",  icon: Shield },
      { key: "license",  label: "Licensing",        icon: Key },
    ]},
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Configuration & Utilities</h1>
        <p className="text-sm text-slate-500 mt-1">Manage system rules, reference tables, payroll parameters, and utilities.</p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col md:flex-row min-h-[600px]">
        {/* Sidebar */}
        <div className="w-full md:w-64 border-b md:border-b-0 md:border-r border-slate-200 bg-slate-50 flex-shrink-0">
          <div className="p-4 space-y-5">
            {navItems.map(group => (
              <div key={group.section}>
                <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">{group.section}</h2>
                <nav className="space-y-0.5">
                  {group.items.map(item => (
                    <button
                      key={item.key}
                      onClick={() => setActiveTab(item.key)}
                      className={`w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                        activeTab === item.key
                          ? "bg-[#741B47]/10 text-[#741B47]"
                          : "text-slate-600 hover:bg-slate-200"
                      }`}
                    >
                      <item.icon size={16} />
                      {item.label}
                    </button>
                  ))}
                </nav>
              </div>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-6 md:p-8 overflow-y-auto">

          {/* ── Rule Engine ── */}
          {activeTab === "rules" && (
            <div className="space-y-6 max-w-3xl">
              <SectionHeader title="Rule Engine & Tax Bands" onAdd={() => {}} />
              <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
                <h4 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
                  <Cpu className="text-[#741B47]" size={18} /> Active Tax Brackets (2026/2027)
                </h4>
                <div className="space-y-3">
                  {[
                    { limit: "$0 - $18,200", rate: "0%", desc: "Tax-free threshold" },
                    { limit: "$18,201 - $45,000", rate: "19%", desc: "Standard rate 1" },
                    { limit: "$45,001 - $120,000", rate: "32.5%", desc: "Standard rate 2" },
                    { limit: "$120,001+", rate: "37%", desc: "Top marginal rate" },
                  ].map((band, idx) => (
                    <div key={idx} className="flex items-center justify-between bg-white p-3 rounded-lg border border-slate-200 shadow-sm">
                      <div>
                        <p className="font-medium text-slate-900">{band.limit}</p>
                        <p className="text-xs text-slate-500">{band.desc}</p>
                      </div>
                      <div className="text-right">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#741B47]/10 text-[#741B47]">{band.rate}</span>
                        <div className="text-xs text-[#741B47] hover:underline mt-1 cursor-pointer">Edit</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
                <h4 className="font-semibold text-slate-900 mb-4">Calculation Overrides</h4>
                {[
                  { label: "Pro-rata salary for mid-month joins", desc: "Calculate based on working days vs calendar days", on: true },
                  { label: "Grade-based payroll", desc: "Apply salary grades when calculating base pay", on: false },
                  { label: "Hotel payroll rules", desc: "Use hospitality-specific overtime and tip calculations", on: false },
                  { label: "Extended costing", desc: "Track payroll expenses across multiple cost dimensions", on: false },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-white rounded-lg border border-slate-200 mb-2 last:mb-0">
                    <div>
                      <p className="font-medium text-slate-900 text-sm">{item.label}</p>
                      <p className="text-xs text-slate-500">{item.desc}</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer ml-4 shrink-0">
                      <input type="checkbox" className="sr-only peer" defaultChecked={item.on} />
                      <div className="w-11 h-6 bg-slate-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#741B47]" />
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── Earnings Setup ── */}
          {activeTab === "earnings" && (
            <div className="space-y-4">
              <SectionHeader title="Earnings Setup" onAdd={() => {}} />
              <p className="text-sm text-slate-500 -mt-2">Define earnings types, GL mappings, and statutory flags used in payroll calculations.</p>
              <div className="overflow-x-auto rounded-xl border border-slate-200">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 border-b border-slate-200">
                    <tr>
                      {["Code", "Long Description", "Short", "GL Number", "Tax", "NIS", "NRP", "Plan", "Med", "Health", "Govt", "Multiplier", ""].map(h => (
                        <th key={h} className="px-3 py-3 font-semibold text-slate-500 uppercase tracking-wider whitespace-nowrap">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {EARNINGS_CODES.map((row, i) => (
                      <tr key={i} className="hover:bg-slate-50 transition-colors">
                        <td className="px-3 py-3 font-mono text-slate-700 font-medium">{row.code}</td>
                        <td className="px-3 py-3 font-medium text-slate-900 whitespace-nowrap">{row.longDesc}</td>
                        <td className="px-3 py-3 text-slate-600 whitespace-nowrap">{row.shortDesc}</td>
                        <td className="px-3 py-3 font-mono text-slate-500">{row.gl}</td>
                        <td className="px-3 py-3"><Flag on={row.tax} /></td>
                        <td className="px-3 py-3"><Flag on={row.nis} /></td>
                        <td className="px-3 py-3"><Flag on={row.nrp} /></td>
                        <td className="px-3 py-3"><Flag on={row.plan} /></td>
                        <td className="px-3 py-3"><Flag on={row.med} /></td>
                        <td className="px-3 py-3"><Flag on={row.health} /></td>
                        <td className="px-3 py-3"><Flag on={row.govt} /></td>
                        <td className="px-3 py-3 font-mono text-slate-700">{row.multiplier}</td>
                        <td className="px-3 py-3">
                          <div className="flex gap-1">
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
          )}

          {/* ── Deductions Setup ── */}
          {activeTab === "deductions" && (
            <div className="space-y-4">
              <SectionHeader title="Deductions Setup" onAdd={() => {}} />
              <p className="text-sm text-slate-500 -mt-2">Define deduction types, GL mappings, and statutory contribution flags.</p>
              <div className="overflow-x-auto rounded-xl border border-slate-200">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 border-b border-slate-200">
                    <tr>
                      {["Code", "Long Description", "Short", "GL Number", "Tax Ded", "NIS", "NRP", "Emp Ref", "Charge Payroll", "Employee", ""].map(h => (
                        <th key={h} className="px-3 py-3 font-semibold text-slate-500 uppercase tracking-wider whitespace-nowrap">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {DEDUCTIONS_CODES.map((row, i) => (
                      <tr key={i} className="hover:bg-slate-50 transition-colors">
                        <td className="px-3 py-3 font-mono text-slate-700 font-medium">{row.code}</td>
                        <td className="px-3 py-3 font-medium text-slate-900 whitespace-nowrap">{row.longDesc}</td>
                        <td className="px-3 py-3 text-slate-600 whitespace-nowrap">{row.shortDesc}</td>
                        <td className="px-3 py-3 font-mono text-slate-500">{row.gl}</td>
                        <td className="px-3 py-3"><Flag on={row.taxDed} /></td>
                        <td className="px-3 py-3"><Flag on={row.nis} /></td>
                        <td className="px-3 py-3"><Flag on={row.nrp} /></td>
                        <td className="px-3 py-3"><Flag on={row.empRef} /></td>
                        <td className="px-3 py-3"><Flag on={row.chargePayroll} /></td>
                        <td className="px-3 py-3"><Flag on={row.employee} /></td>
                        <td className="px-3 py-3">
                          <div className="flex gap-1">
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
          )}

          {/* ── Payroll Parameters ── */}
          {activeTab === "params" && <PayrollParameters />}

          {/* ── Bank Codes ── */}
          {activeTab === "banks" && (
            <div className="space-y-4 max-w-2xl">
              <SectionHeader title="Bank Codes" onAdd={() => {}} />
              <p className="text-sm text-slate-500 -mt-2">Registered banks used for direct deposit and banking file exports.</p>
              <div className="rounded-xl border border-slate-200 overflow-hidden">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-50 border-b border-slate-200">
                    <tr>
                      <th className="px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider w-24">Code</th>
                      <th className="px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Bank Name</th>
                      <th className="px-5 py-3 w-20"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {BANK_CODES.map((row, i) => (
                      <tr key={i} className="hover:bg-slate-50 transition-colors">
                        <td className="px-5 py-3 font-mono font-medium text-slate-700">{row.code}</td>
                        <td className="px-5 py-3 font-medium text-slate-900">{row.name}</td>
                        <td className="px-5 py-3">
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
          )}

          {/* ── GL Codes ── */}
          {activeTab === "gl" && (
            <div className="space-y-4 max-w-2xl">
              <SectionHeader title="General Ledger Codes" onAdd={() => {}} />
              <p className="text-sm text-slate-500 -mt-2">GL account codes mapped to earnings and deductions for accounting exports.</p>
              <div className="rounded-xl border border-slate-200 overflow-hidden">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-50 border-b border-slate-200">
                    <tr>
                      <th className="px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider w-48">GL Code</th>
                      <th className="px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Description</th>
                      <th className="px-5 py-3 w-20"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {GL_CODES.map((row, i) => (
                      <tr key={i} className="hover:bg-slate-50 transition-colors">
                        <td className="px-5 py-3 font-mono font-medium text-slate-700 text-xs">{row.code}</td>
                        <td className="px-5 py-3 font-medium text-slate-900">{row.desc}</td>
                        <td className="px-5 py-3">
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
          )}

          {/* ── Occupation Codes ── */}
          {activeTab === "occupations" && (
            <div className="space-y-4 max-w-2xl">
              <SectionHeader title="Occupation Codes" onAdd={() => {}} />
              <p className="text-sm text-slate-500 -mt-2">Job occupations with grade assignments and overtime eligibility.</p>
              <div className="rounded-xl border border-slate-200 overflow-hidden">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-50 border-b border-slate-200">
                    <tr>
                      <th className="px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider w-24">Code</th>
                      <th className="px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Description</th>
                      <th className="px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider w-24">Grade</th>
                      <th className="px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider w-28">Overtime</th>
                      <th className="px-5 py-3 w-20"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {OCCUPATION_CODES.map((row, i) => (
                      <tr key={i} className="hover:bg-slate-50 transition-colors">
                        <td className="px-5 py-3 font-mono font-medium text-slate-700">{row.code}</td>
                        <td className="px-5 py-3 font-medium text-slate-900">{row.desc}</td>
                        <td className="px-5 py-3 text-slate-600">{row.grade}</td>
                        <td className="px-5 py-3"><Flag on={row.overtime} /></td>
                        <td className="px-5 py-3">
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
          )}

          {/* ── Data Management ── */}
          {activeTab === "data" && (
            <div className="space-y-6 max-w-3xl">
              <SectionHeader title="Data Management" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { icon: HardDrive, color: "blue", title: "Protected Backup to Hard Drive", desc: "Generate an encrypted snapshot of all payroll and employee data.", action: "Backup Now" },
                  { icon: HardDrive, color: "slate", title: "Backup Security Files", desc: "Backup user accounts, access levels, and audit configuration.", action: "Backup Security" },
                  { icon: Database, color: "amber", title: "Restore from Hard Drive", desc: "Restore payroll data from a previously created encrypted backup.", action: "Select Backup File" },
                  { icon: Database, color: "emerald", title: "Archive Old Data", desc: "Move records older than 7 years to cold storage to improve performance.", action: "Run Archiver" },
                ].map((card, i) => (
                  <div key={i} className="border border-slate-200 rounded-xl p-5 hover:border-[#741B47]/40 hover:shadow-md transition-all">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-4 bg-${card.color}-100 text-${card.color}-600`}>
                      <card.icon size={20} />
                    </div>
                    <h4 className="font-semibold text-slate-900 text-sm">{card.title}</h4>
                    <p className="text-xs text-slate-500 mb-4 mt-1">{card.desc}</p>
                    <button className="text-sm font-medium text-[#741B47] hover:underline">{card.action}</button>
                  </div>
                ))}
              </div>
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-800">
                <strong>NIS / RPF Adjustments:</strong> Use the Adjustments utility to correct NIS and Retirement Pension Fund contributions for prior periods without re-running payroll.
                <button className="ml-3 text-amber-900 font-semibold underline">Open Adjustments</button>
              </div>
            </div>
          )}

          {/* ── User Management ── */}
          {activeTab === "security" && (
            <div className="space-y-6 max-w-3xl">
              <SectionHeader title="User Management" onAdd={() => {}} />

              {/* Access level legend */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {ACCESS_LEVELS.map(lv => (
                  <div key={lv.value} className="bg-slate-50 border border-slate-200 rounded-xl p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="w-6 h-6 rounded-full bg-[#741B47] text-white text-xs font-bold flex items-center justify-center">{lv.value}</span>
                      <span className="text-xs font-semibold text-slate-700">{lv.label.split("–")[1].trim()}</span>
                    </div>
                    <p className="text-xs text-slate-500">{lv.desc}</p>
                  </div>
                ))}
              </div>

              {/* Users table */}
              <div className="rounded-xl border border-slate-200 overflow-hidden">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-50 border-b border-slate-200">
                    <tr>
                      <th className="px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">User ID</th>
                      <th className="px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Full Name</th>
                      <th className="px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Access Level</th>
                      <th className="px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Pay Codes</th>
                      <th className="px-5 py-3 w-24"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {USERS_DATA.map((user, i) => (
                      <tr key={i} className="hover:bg-slate-50 transition-colors">
                        <td className="px-5 py-3 font-mono font-medium text-slate-700">{user.id}</td>
                        <td className="px-5 py-3 font-medium text-slate-900">{user.name}</td>
                        <td className="px-5 py-3">
                          <div className="flex items-center gap-2">
                            <span className="w-6 h-6 rounded-full bg-[#741B47] text-white text-xs font-bold flex items-center justify-center">{user.level}</span>
                            <span className="text-xs text-slate-600">{ACCESS_LEVELS.find(l => l.value === user.level)?.label.split("–")[1].trim()}</span>
                          </div>
                        </td>
                        <td className="px-5 py-3">
                          <div className="flex gap-1">
                            {user.payCodes.map(pc => (
                              <span key={pc} className="px-2 py-0.5 bg-slate-100 text-slate-700 rounded text-xs font-mono">{pc}</span>
                            ))}
                          </div>
                        </td>
                        <td className="px-5 py-3">
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
          )}

          {/* ── Licensing ── */}
          {activeTab === "license" && (
            <div className="space-y-6 max-w-3xl">
              <SectionHeader title="Licensing & Usage" />
              <div className="bg-gradient-to-br from-[#2a0d1e] to-[#741B47] rounded-2xl p-6 text-white shadow-lg relative overflow-hidden">
                <Key className="absolute right-[-20px] bottom-[-20px] w-48 h-48 text-white/10" />
                <div className="relative z-10">
                  <h4 className="text-pink-200 text-sm font-medium uppercase tracking-wider mb-1">Current Plan</h4>
                  <h2 className="text-3xl font-bold mb-6">Enterprise Plus</h2>
                  <div className="grid grid-cols-2 gap-6 mb-6">
                    <div>
                      <p className="text-pink-200 text-sm">Employee Limit</p>
                      <p className="text-xl font-semibold">1,245 / 5,000</p>
                      <div className="w-full bg-white/10 rounded-full h-2 mt-2">
                        <div className="bg-pink-300 h-2 rounded-full" style={{ width: "25%" }} />
                      </div>
                    </div>
                    <div>
                      <p className="text-pink-200 text-sm">Modules Included</p>
                      <p className="text-xl font-semibold">All Modules Active</p>
                    </div>
                  </div>
                  <div className="pt-4 border-t border-white/20 flex justify-between items-center">
                    <div>
                      <p className="text-sm text-pink-200">License expires: December 31, 2027</p>
                      <p className="text-xs text-pink-300 mt-1">Key: SCL-MP-XXXX-XXXX-8921</p>
                    </div>
                    <div className="flex gap-2">
                      <button className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors text-sm font-medium border border-white/20">
                        Renewal Key
                      </button>
                      <button className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors text-sm font-medium border border-white/20">
                        Limit Key
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Payroll Parameters sub-component ────────────────────────────────────────
function PayrollParameters() {
  const [paramTab, setParamTab] = useState("general");

  const tabs = [
    { key: "general", label: "General" },
    { key: "period",  label: "Period" },
    { key: "smtp",    label: "SMTP / Email" },
  ];

  return (
    <div className="space-y-4 max-w-3xl">
      <div className="flex items-center justify-between border-b border-slate-200 pb-4">
        <div>
          <h3 className="text-xl font-bold text-slate-900">Payroll Parameters</h3>
          <p className="text-sm text-slate-500">Configure company settings, pay periods, and email delivery.</p>
        </div>
        <button className="px-4 py-2 text-sm font-medium text-white bg-[#741B47] rounded-lg hover:bg-[#5a1537] transition-colors shadow-sm">
          Save Changes
        </button>
      </div>

      {/* Sub-tabs */}
      <div className="flex border-b border-slate-200">
        {tabs.map(t => (
          <button
            key={t.key}
            onClick={() => setParamTab(t.key)}
            className={`px-5 py-2.5 text-sm font-medium border-b-2 transition-colors ${
              paramTab === t.key
                ? "border-[#741B47] text-[#741B47]"
                : "border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* ── General ── */}
      {paramTab === "general" && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <ParamField label="Company Name" defaultValue="ABC COMPANY – Fortnightly" />
            <ParamField label="Contract Number" defaultValue="C-0042" />
            <ParamField label="Maximum Employee Size" defaultValue="0" />
          </div>
          <div className="border-t border-slate-100 pt-4">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Feature Flags</p>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "Grade Payroll?", on: true },
                { label: "Hotel Payroll?", on: false },
                { label: "Construction?", on: false },
                { label: "Audit Features", on: true },
                { label: "On-line History?", on: true },
                { label: "Regular Costing?", on: true },
                { label: "Extended Costing?", on: false },
                { label: "Type of Audit", on: true },
                { label: "System Upgrade?", on: false },
              ].map((flag, i) => (
                <div key={i} className="flex items-center justify-between bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5">
                  <span className="text-sm text-slate-700">{flag.label}</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked={flag.on} />
                    <div className="w-9 h-5 bg-slate-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#741B47]" />
                  </label>
                </div>
              ))}
            </div>
          </div>
          <div className="border-t border-slate-100 pt-4">
            <ParamField label="Max. Tax-Free Shares (Value)" defaultValue="0.00" />
          </div>
        </div>
      )}

      {/* ── Period ── */}
      {paramTab === "period" && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <ParamField label="Payroll Short Name" defaultValue="ABC COMPANY – Fortnightly" />
            <ParamField label="Number" defaultValue="01" />
            <ParamField label="Full Payroll Name" defaultValue="ABC FORTNIGHTLY – 01 Fortnightly" />
            <div className="relative">
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Frequency</label>
              <select className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm text-slate-800 bg-slate-50 focus:bg-white focus:border-[#741B47] focus:ring-2 focus:ring-[#741B47]/20 outline-none appearance-none">
                <option>Fortnightly</option>
                <option>Monthly</option>
                <option>Weekly</option>
                <option>Bi-Monthly</option>
              </select>
              <ChevronDown size={14} className="absolute right-3 bottom-3 text-slate-400 pointer-events-none" />
            </div>
            <ParamField label="Address Line 1" defaultValue="15 SYSTEMS DRIVE" />
            <ParamField label="Address Line 2" defaultValue="ST. MICHAEL" />
            <ParamField label="Country" defaultValue="BAR – BARBADOS" />
            <ParamField label="Company ID" defaultValue="SCL-001" />
          </div>
          <div className="border-t border-slate-100 pt-4">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Year Configuration</p>
            <div className="grid grid-cols-2 gap-4">
              <ParamField label="Current Year" defaultValue="2026" />
              <ParamField label="Previous Year" defaultValue="2025" />
              <ParamField label="Current Period" defaultValue="21" />
              <ParamField label="Financial Year Start" defaultValue="2026-01-01" />
              <ParamField label="Next Cheque #" defaultValue="1048" />
              <ParamField label="Output Date" defaultValue="2026-10-31" />
            </div>
          </div>
          <div className="border-t border-slate-100 pt-4">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Pay Codes</p>
            <div className="grid grid-cols-2 gap-4">
              <ParamField label="Salary Code" defaultValue="BASE" />
              <ParamField label="Activity Code" defaultValue="ACT01" />
              <ParamField label="Grade Code" defaultValue="GRD" />
              <ParamField label="Loan Code" defaultValue="LOAN" />
              <ParamField label="Bonus Code" defaultValue="BONUS" />
              <ParamField label="Insurance Code" defaultValue="INS" />
            </div>
          </div>
        </div>
      )}

      {/* ── SMTP ── */}
      {paramTab === "smtp" && (
        <div className="space-y-5">
          <div className="flex items-center gap-3 bg-blue-50 border border-blue-200 rounded-xl p-4 text-sm text-blue-800">
            <MailCheck size={18} className="text-blue-600 shrink-0" />
            Used to email electronic payslips to employees. Ensure the SMTP server allows relay from this host.
          </div>
          <div className="grid grid-cols-2 gap-4">
            <ParamField label="User Name" defaultValue="server4TIM" />
            <ParamField label="Password" defaultValue="••••••••••••••••" />
            <ParamField label="Sender's Email" defaultValue="support@systemsconsulting-ltd.com" />
            <ParamField label="SMTP Server" defaultValue="smtp.pocketable.com" />
            <ParamField label="Server Port" defaultValue="587" />
            <ParamField label="Subject" defaultValue="Electronic Payslip" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Email Body</label>
            <textarea
              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm text-slate-800 bg-slate-50 focus:bg-white focus:border-[#741B47] focus:ring-2 focus:ring-[#741B47]/20 outline-none transition-all resize-none"
              rows={3}
              defaultValue="Please find payslip attached"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Authentication Method</label>
              <div className="flex gap-4">
                {["Anonymous", "Authenticated"].map(m => (
                  <label key={m} className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer">
                    <input type="radio" name="auth" defaultChecked={m === "Authenticated"} className="accent-[#741B47]" />
                    {m}
                  </label>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Mailing Application</label>
              <div className="relative">
                <select className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm text-slate-800 bg-slate-50 focus:bg-white focus:border-[#741B47] focus:ring-2 focus:ring-[#741B47]/20 outline-none appearance-none">
                  <option>CDO</option>
                  <option>ChiMail</option>
                  <option selected>Gmail</option>
                  <option>O365</option>
                </select>
                <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5">
            <div>
              <p className="text-sm font-medium text-slate-700">SSL Enabled</p>
              <p className="text-xs text-slate-500">Use secure TLS/SSL connection to SMTP server</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-slate-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#741B47]" />
            </label>
          </div>
          <div className="border-t border-slate-100 pt-4">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">OAuth2 Settings (if applicable)</p>
            <div className="grid grid-cols-2 gap-4">
              <ParamField label="Client ID" defaultValue="" />
              <ParamField label="Client Secret" defaultValue="" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Logo File Path</label>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="No file selected"
                className="flex-1 px-3 py-2 border border-slate-200 rounded-lg text-sm text-slate-800 bg-slate-50 focus:bg-white focus:border-[#741B47] focus:ring-2 focus:ring-[#741B47]/20 outline-none transition-all"
              />
              <button className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
                Select
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function ParamField({ label, defaultValue }: { label: string; defaultValue: string }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">{label}</label>
      <input
        type="text"
        defaultValue={defaultValue}
        className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm text-slate-800 bg-slate-50 focus:bg-white focus:border-[#741B47] focus:ring-2 focus:ring-[#741B47]/20 outline-none transition-all"
      />
    </div>
  );
}
