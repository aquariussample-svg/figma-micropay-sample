import {
  Sliders, Database, Key, Shield, HardDrive, Cpu, Percent, Plus,
  Trash2, Pencil, Building2, MailCheck, CreditCard, BookOpen, Briefcase,
  ChevronDown, X, Check,
} from "lucide-react";
import { useState } from "react";
import { useParams, useNavigate } from "react-router";

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

// ─── Render Settings Content ──────────────────────────────────────────────────
function renderSettingsContent(section: string) {
  switch (section) {
    case 'rules':
      return (
        <div className="space-y-6 max-w-3xl">
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
      );

    case 'earnings':
      return (
        <div className="space-y-4">
          <p className="text-sm text-slate-500">Define earnings types, GL mappings, and statutory flags used in payroll calculations.</p>
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
      );

    case 'deductions':
      return (
        <div className="space-y-4">
          <p className="text-sm text-slate-500">Set up deduction codes, tax flags, and GL account mappings.</p>
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
      );

    case 'params':
      return (
        <div className="space-y-6 max-w-4xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold text-slate-900">Company Information</h4>
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Company Name</label>
                  <input type="text" defaultValue="ABC COMPANY LIMITED" className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-slate-50 focus:bg-white focus:border-[#741B47] outline-none" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Payroll Short Name</label>
                  <input type="text" defaultValue="ABC COMPANY – Fortnightly" className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-slate-50 focus:bg-white focus:border-[#741B47] outline-none" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Address Line 1</label>
                  <input type="text" defaultValue="15 SYSTEMS DRIVE" className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-slate-50 focus:bg-white focus:border-[#741B47] outline-none" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Address Line 2</label>
                  <input type="text" defaultValue="ST. MICHAEL" className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-slate-50 focus:bg-white focus:border-[#741B47] outline-none" />
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-semibold text-slate-900">Payroll Settings</h4>
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Pay Frequency</label>
                  <select className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-slate-50 focus:bg-white focus:border-[#741B47] outline-none">
                    <option>Fortnightly</option>
                    <option>Monthly</option>
                    <option>Weekly</option>
                    <option>Bi-Monthly</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Current Period</label>
                  <input type="text" defaultValue="21" className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-slate-50 focus:bg-white focus:border-[#741B47] outline-none" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Financial Year Start</label>
                  <input type="date" defaultValue="2026-01-01" className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-slate-50 focus:bg-white focus:border-[#741B47] outline-none" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Next Cheque Number</label>
                  <input type="text" defaultValue="1048" className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-slate-50 focus:bg-white focus:border-[#741B47] outline-none" />
                </div>
              </div>
            </div>
          </div>
        </div>
      );

    case 'banks':
      return (
        <div className="space-y-4">
          <p className="text-sm text-slate-500">Manage bank codes and financial institution references used for payroll processing.</p>
          <div className="overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-4 py-3 font-semibold text-slate-500 uppercase tracking-wider">Code</th>
                  <th className="px-4 py-3 font-semibold text-slate-500 uppercase tracking-wider">Bank Name</th>
                  <th className="px-4 py-3 font-semibold text-slate-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {BANK_CODES.map((bank, i) => (
                  <tr key={i} className="hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-3 font-mono text-slate-700 font-medium">{bank.code}</td>
                    <td className="px-4 py-3 font-medium text-slate-900">{bank.name}</td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <button className="p-1.5 rounded hover:bg-slate-200 text-slate-400 hover:text-slate-700 transition-colors"><Pencil size={14} /></button>
                        <button className="p-1.5 rounded hover:bg-red-50 text-slate-400 hover:text-red-500 transition-colors"><Trash2 size={14} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );

    case 'gl':
      return (
        <div className="space-y-4">
          <p className="text-sm text-slate-500">Define general ledger account codes and descriptions for payroll expense tracking.</p>
          <div className="overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-4 py-3 font-semibold text-slate-500 uppercase tracking-wider">GL Code</th>
                  <th className="px-4 py-3 font-semibold text-slate-500 uppercase tracking-wider">Description</th>
                  <th className="px-4 py-3 font-semibold text-slate-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {GL_CODES.map((gl, i) => (
                  <tr key={i} className="hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-3 font-mono text-slate-700 font-medium">{gl.code}</td>
                    <td className="px-4 py-3 font-medium text-slate-900">{gl.desc}</td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <button className="p-1.5 rounded hover:bg-slate-200 text-slate-400 hover:text-slate-700 transition-colors"><Pencil size={14} /></button>
                        <button className="p-1.5 rounded hover:bg-red-50 text-slate-400 hover:text-red-500 transition-colors"><Trash2 size={14} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );

    case 'occupations':
      return (
        <div className="space-y-4">
          <p className="text-sm text-slate-500">Set up occupation codes, salary grades, and overtime eligibility for employee classifications.</p>
          <div className="overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-4 py-3 font-semibold text-slate-500 uppercase tracking-wider">Code</th>
                  <th className="px-4 py-3 font-semibold text-slate-500 uppercase tracking-wider">Description</th>
                  <th className="px-4 py-3 font-semibold text-slate-500 uppercase tracking-wider">Grade</th>
                  <th className="px-4 py-3 font-semibold text-slate-500 uppercase tracking-wider">Overtime Eligible</th>
                  <th className="px-4 py-3 font-semibold text-slate-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {OCCUPATION_CODES.map((occ, i) => (
                  <tr key={i} className="hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-3 font-mono text-slate-700 font-medium">{occ.code}</td>
                    <td className="px-4 py-3 font-medium text-slate-900">{occ.desc}</td>
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                        {occ.grade}
                      </span>
                    </td>
                    <td className="px-4 py-3"><Flag on={occ.overtime} /></td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <button className="p-1.5 rounded hover:bg-slate-200 text-slate-400 hover:text-slate-700 transition-colors"><Pencil size={14} /></button>
                        <button className="p-1.5 rounded hover:bg-red-50 text-slate-400 hover:text-red-500 transition-colors"><Trash2 size={14} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );

    case 'security':
      return (
        <div className="space-y-4">
          <p className="text-sm text-slate-500">Configure user accounts, permissions, and access levels.</p>
          <div className="overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  {["User ID", "Full Name", "Access Level", "Pay Codes", ""].map(h => (
                    <th key={h} className="px-3 py-3 font-semibold text-slate-500 uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {USERS_DATA.map((user, i) => (
                  <tr key={i} className="hover:bg-slate-50 transition-colors">
                    <td className="px-3 py-3 font-mono text-slate-700 font-medium">{user.id}</td>
                    <td className="px-3 py-3 font-medium text-slate-900">{user.name}</td>
                    <td className="px-3 py-3">
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-slate-100 text-slate-800">
                        Level {user.level}
                      </span>
                    </td>
                    <td className="px-3 py-3">
                      <div className="flex gap-1">
                        {user.payCodes.map(code => (
                          <span key={code} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                            {code}
                          </span>
                        ))}
                      </div>
                    </td>
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
      );

    case 'data':
      return (
        <div className="space-y-4">
          <p className="text-sm text-slate-500">Manage data imports, exports, backups, and system utilities.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
              <h4 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
                <Database className="text-[#741B47]" size={18} /> Data Import/Export
              </h4>
              <div className="space-y-2">
                <button className="w-full flex items-center gap-2 px-3 py-2 text-sm bg-white rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors">
                  <span>Import Employee Data</span>
                </button>
                <button className="w-full flex items-center gap-2 px-3 py-2 text-sm bg-white rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors">
                  <span>Export Payroll Reports</span>
                </button>
                <button className="w-full flex items-center gap-2 px-3 py-2 text-sm bg-white rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors">
                  <span>Backup Database</span>
                </button>
              </div>
            </div>
            <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
              <h4 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
                <HardDrive className="text-[#741B47]" size={18} /> System Maintenance
              </h4>
              <div className="space-y-2">
                <button className="w-full flex items-center gap-2 px-3 py-2 text-sm bg-white rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors">
                  <span>Clear Cache</span>
                </button>
                <button className="w-full flex items-center gap-2 px-3 py-2 text-sm bg-white rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors">
                  <span>System Diagnostics</span>
                </button>
                <button className="w-full flex items-center gap-2 px-3 py-2 text-sm bg-white rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors">
                  <span>Audit Logs</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      );

    case 'license':
      return (
        <div className="space-y-4">
          <p className="text-sm text-slate-500">View license information and manage system activation.</p>
          <div className="bg-gradient-to-br from-pink-500 to-rose-600 rounded-xl p-6 text-white">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                  <Key className="text-white" size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold">SCL Micropay Pro</h3>
                  <p className="text-pink-100 text-sm">Enterprise License</p>
                </div>
              </div>
              <span className="px-3 py-1 bg-white/20 rounded-full text-xs font-medium">Active</span>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-pink-200 text-sm">Licensed Users</p>
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex-1 bg-white/20 rounded-full h-2">
                    <div className="bg-pink-300 h-2 rounded-full" style={{ width: "60%" }} />
                  </div>
                  <span className="text-sm font-semibold">12/20</span>
                </div>
              </div>
              <div>
                <p className="text-pink-200 text-sm">Storage Used</p>
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex-1 bg-white/20 rounded-full h-2">
                    <div className="bg-pink-300 h-2 rounded-full" style={{ width: "25%" }} />
                  </div>
                  <span className="text-sm font-semibold">2.5/10 GB</span>
                </div>
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
              </div>
            </div>
          </div>
        </div>
      );

    default:
      return <div>Select a configuration section from the navigation menu.</div>;
  }
}

// ─── Main Component ───────────────────────────────────────────────────────────
export function Settings() {
  const { section } = useParams();
  const navigate = useNavigate();
  
  // If we're on a specific settings section, show that content directly
  if (section) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            {section === 'rules' && 'Rule Engine & Tax Bands'}
            {section === 'earnings' && 'Earnings Setup'}
            {section === 'deductions' && 'Deductions Setup'}
            {section === 'params' && 'Payroll Parameters'}
            {section === 'banks' && 'Bank Codes'}
            {section === 'gl' && 'GL Codes'}
            {section === 'occupations' && 'Occupation Codes'}
            {section === 'data' && 'Data Management'}
            {section === 'security' && 'User Management'}
            {section === 'license' && 'Licensing'}
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            {section === 'rules' && 'Configure tax brackets, calculation rules, and payroll engine settings.'}
            {section === 'earnings' && 'Define earnings types, GL mappings, and statutory flags used in payroll calculations.'}
            {section === 'deductions' && 'Set up deduction codes, tax flags, and GL account mappings.'}
            {section === 'params' && 'Configure company settings, pay periods, and system parameters.'}
            {section === 'banks' && 'Manage bank codes and financial institution references.'}
            {section === 'gl' && 'Define general ledger account codes and descriptions.'}
            {section === 'occupations' && 'Set up occupation codes, grades, and overtime eligibility.'}
            {section === 'data' && 'Manage data imports, exports, backups, and system utilities.'}
            {section === 'security' && 'Configure user accounts, permissions, and access levels.'}
            {section === 'license' && 'View license information and manage system activation.'}
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-4 sm:p-6 md:p-8">
            {renderSettingsContent(section)}
          </div>
        </div>
      </div>
    );
  }

  // Main settings overview page
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Configuration & Utilities</h1>
        <p className="text-sm text-slate-500 mt-1">Select a configuration section from the navigation menu to get started.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { title: "Rule Engine", desc: "Configure tax brackets and calculation rules", icon: Cpu, path: "/settings/rules" },
          { title: "Earnings Setup", desc: "Define earnings types and GL mappings", icon: Percent, path: "/settings/earnings" },
          { title: "Deductions Setup", desc: "Set up deduction codes and tax flags", icon: Sliders, path: "/settings/deductions" },
          { title: "Payroll Parameters", desc: "Configure company settings and pay periods", icon: Building2, path: "/settings/params" },
          { title: "Bank Codes", desc: "Manage bank codes and financial institutions", icon: CreditCard, path: "/settings/banks" },
          { title: "GL Codes", desc: "Define general ledger account codes", icon: BookOpen, path: "/settings/gl" },
          { title: "Occupation Codes", desc: "Set up occupation codes and grades", icon: Briefcase, path: "/settings/occupations" },
          { title: "Data Management", desc: "Manage imports, exports, and backups", icon: Database, path: "/settings/data" },
          { title: "User Management", desc: "Configure user accounts and permissions", icon: Shield, path: "/settings/security" },
          { title: "Licensing", desc: "View license information and activation", icon: Key, path: "/settings/license" },
        ].map((card) => (
          <button
            key={card.title}
            onClick={() => navigate(card.path)}
            className="bg-white rounded-xl border border-slate-200 p-5 sm:p-6 text-left hover:border-[#741B47]/20 hover:shadow-md transition-all"
          >
            <card.icon className="text-[#741B47] mb-3" size={24} />
            <h3 className="font-semibold text-slate-900 mb-2">{card.title}</h3>
            <p className="text-sm text-slate-500">{card.desc}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
