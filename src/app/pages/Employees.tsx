import { Search, Filter, Plus, MoreHorizontal, FileDown, X, ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";

type Employee = {
  id: string; name: string; role: string; dept: string;
  type: string; salary: string; status: string;
  // Personal
  tin: string; dob: string; maritalStatus: string; address1: string; address2: string; address3: string; phone: string;
  // Employment
  employedFrom: string; employedTo: string; terminateDate: string; division: string; union: string;
  costCenter: string; grade: string; occupation: string; annualSalary: string; annualHours: string;
  increment: string; email: string; hourlyRate: string; servicePin: string;
  // Flags
  homePayroll: string; pdfPassword: string;
};

const SAMPLE_EMPLOYEES: Employee[] = [
  {
    id: "EMP-001", name: "Sarah Jenkins", role: "Software Engineer", dept: "Engineering",
    type: "Full-Time", salary: "$120,000", status: "Active",
    tin: "123-456-789", dob: "1990-03-15", maritalStatus: "Single",
    address1: "14 Broad Street", address2: "Bridgetown", address3: "St. Michael", phone: "246-555-0101",
    employedFrom: "2019-06-01", employedTo: "", terminateDate: "",
    division: "Technology", union: "", costCenter: "CC-ENG-01", grade: "G3", occupation: "001",
    annualSalary: "120000", annualHours: "2080", increment: "2027-06-01",
    email: "s.jenkins@company.com", hourlyRate: "57.69", servicePin: "1234", homePayroll: "01", pdfPassword: "",
  },
  {
    id: "EMP-002", name: "Michael Chang", role: "Product Manager", dept: "Product",
    type: "Full-Time", salary: "$135,000", status: "Active",
    tin: "234-567-890", dob: "1985-11-22", maritalStatus: "Married",
    address1: "7 Spring Garden", address2: "St. James", address3: "Barbados", phone: "246-555-0202",
    employedFrom: "2018-01-15", employedTo: "", terminateDate: "",
    division: "Product", union: "", costCenter: "CC-PRD-01", grade: "G4", occupation: "003",
    annualSalary: "135000", annualHours: "2080", increment: "2027-01-15",
    email: "m.chang@company.com", hourlyRate: "64.90", servicePin: "5678", homePayroll: "01", pdfPassword: "",
  },
  {
    id: "EMP-003", name: "Amanda Ross", role: "HR Specialist", dept: "Human Resources",
    type: "Part-Time", salary: "$65,000", status: "On Leave",
    tin: "345-678-901", dob: "1993-07-08", maritalStatus: "Single",
    address1: "22 Roebuck Street", address2: "Bridgetown", address3: "", phone: "246-555-0303",
    employedFrom: "2021-03-01", employedTo: "", terminateDate: "",
    division: "HR", union: "", costCenter: "CC-HR-01", grade: "G2", occupation: "002",
    annualSalary: "65000", annualHours: "1040", increment: "",
    email: "a.ross@company.com", hourlyRate: "31.25", servicePin: "9012", homePayroll: "01", pdfPassword: "",
  },
  {
    id: "EMP-004", name: "David Kim", role: "QA Tester", dept: "Engineering",
    type: "Contract", salary: "$85,000", status: "Active",
    tin: "456-789-012", dob: "1988-09-30", maritalStatus: "Married",
    address1: "5 River Road", address2: "St. Philip", address3: "", phone: "246-555-0404",
    employedFrom: "2022-07-01", employedTo: "2027-06-30", terminateDate: "",
    division: "Technology", union: "", costCenter: "CC-ENG-01", grade: "G2", occupation: "001",
    annualSalary: "85000", annualHours: "2080", increment: "",
    email: "d.kim@company.com", hourlyRate: "40.87", servicePin: "3456", homePayroll: "01", pdfPassword: "",
  },
  {
    id: "EMP-005", name: "Elena Rodriguez", role: "UX Designer", dept: "Design",
    type: "Full-Time", salary: "$110,000", status: "Active",
    tin: "567-890-123", dob: "1991-01-19", maritalStatus: "Single",
    address1: "31 Hastings Main Road", address2: "Christ Church", address3: "", phone: "246-555-0505",
    employedFrom: "2020-09-15", employedTo: "", terminateDate: "",
    division: "Creative", union: "", costCenter: "CC-DES-01", grade: "G3", occupation: "002",
    annualSalary: "110000", annualHours: "2080", increment: "2026-09-15",
    email: "e.rodriguez@company.com", hourlyRate: "52.88", servicePin: "7890", homePayroll: "01", pdfPassword: "",
  },
  {
    id: "EMP-006", name: "James Wilson", role: "Marketing Dir", dept: "Marketing",
    type: "Full-Time", salary: "$150,000", status: "Active",
    tin: "678-901-234", dob: "1980-05-12", maritalStatus: "Married",
    address1: "88 Maxwell Main Road", address2: "Christ Church", address3: "", phone: "246-555-0606",
    employedFrom: "2015-04-01", employedTo: "", terminateDate: "",
    division: "Marketing", union: "", costCenter: "CC-MKT-01", grade: "G5", occupation: "003",
    annualSalary: "150000", annualHours: "2080", increment: "2027-04-01",
    email: "j.wilson@company.com", hourlyRate: "72.12", servicePin: "1122", homePayroll: "01", pdfPassword: "",
  },
];

const EARNINGS_DATA = [
  { code: "1001", desc: "WAGES (PAID)", period: "F", percent: "0.00", ba: "123456789012345", cost: "", sv: "N", it: "Y" },
  { code: "1002", desc: "OVERTIME", period: "", percent: "0.00", ba: "XXXX", cost: "", sv: "N", it: "N" },
  { code: "1004", desc: "DOUBLE TIME", period: "", percent: "0.00", ba: "XXXX", cost: "", sv: "N", it: "N" },
  { code: "1010", desc: "HOLIDAY", period: "", percent: "0.00", ba: "XXXX", cost: "", sv: "N", it: "N" },
  { code: "1013", desc: "VACATION", period: "", percent: "0.00", ba: "XXXX", cost: "", sv: "N", it: "N" },
  { code: "4030", desc: "MEAL ALLOWANCE", period: "", percent: "0.00", ba: "XXXX", cost: "", sv: "N", it: "N" },
];

const DEDUCTIONS_DATA = [
  { code: "2001", desc: "INCOME TAX (PAYE)", period: "F", percent: "0.00", ba: "", cost: "", ref: "" },
  { code: "2002", desc: "NIS EMPLOYEE", period: "F", percent: "0.00", ba: "", cost: "", ref: "" },
  { code: "2003", desc: "HEALTH SURCHARGE", period: "F", percent: "0.00", ba: "", cost: "", ref: "" },
  { code: "3001", desc: "PENSION FUND", period: "F", percent: "0.00", ba: "", cost: "", ref: "" },
  { code: "3005", desc: "COMPANY LOAN", period: "F", percent: "0.00", ba: "", cost: "", ref: "LOAN-001" },
];

const LEAVE_DATA = [
  { type: "Vacation", entitlement: "21 days", taken: "5 days", balance: "16 days", expires: "2026-12-31" },
  { type: "Sick Leave", entitlement: "14 days", taken: "2 days", balance: "12 days", expires: "2026-12-31" },
  { type: "Casual Leave", entitlement: "7 days", taken: "0 days", balance: "7 days", expires: "2026-12-31" },
  { type: "Maternity Leave", entitlement: "90 days", taken: "0 days", balance: "90 days", expires: "—" },
];

const TAB_LABELS = ["Personal", "Employment", "Earnings", "Deductions", "Leave & Time"];

function FieldRow({ label, value, half }: { label: string; value: string; half?: boolean }) {
  return (
    <div className={half ? "col-span-1" : "col-span-2 sm:col-span-1"}>
      <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">{label}</label>
      <input
        type="text"
        defaultValue={value}
        className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm text-slate-800 bg-slate-50 focus:bg-white focus:border-[#741B47] focus:ring-2 focus:ring-[#741B47]/20 outline-none transition-all"
      />
    </div>
  );
}

function EmployeeModal({ emp, onClose }: { emp: Employee; onClose: () => void }) {
  const [tab, setTab] = useState(0);
  const initials = emp.name.split(" ").map(n => n[0]).join("");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col mx-4">

        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between px-4 sm:px-6 py-4 border-b border-slate-200 bg-slate-50 rounded-t-2xl">
          <div className="flex items-center gap-4 min-w-0">
            <div className="w-12 h-12 rounded-full bg-[#741B47]/10 text-[#741B47] flex items-center justify-center font-bold text-lg">
              {initials}
            </div>
            <div className="min-w-0">
              <h2 className="text-lg font-bold text-slate-900">{emp.name}</h2>
              <p className="text-sm text-slate-500 break-words">{emp.id} · {emp.role} · {emp.dept}</p>
            </div>
          </div>
          <div className="flex items-center justify-between sm:justify-end gap-3">
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${
              emp.status === "Active" ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"
            }`}>
              <span className={`w-1.5 h-1.5 rounded-full ${emp.status === "Active" ? "bg-emerald-500" : "bg-amber-500"}`} />
              {emp.status}
            </span>
            <button onClick={onClose} className="p-2 rounded-lg hover:bg-slate-200 text-slate-500 transition-colors">
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-slate-200 px-6 bg-white overflow-x-auto">
          {TAB_LABELS.map((label, i) => (
            <button
              key={label}
              onClick={() => setTab(i)}
              className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                tab === i
                  ? "border-[#741B47] text-[#741B47]"
                  : "border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">

          {/* ── Personal ── */}
          {tab === 0 && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <FieldRow label="Employee ID" value={emp.id} />
                <FieldRow label="Full Name" value={emp.name} />
                <FieldRow label="TIN / Tax ID" value={emp.tin} />
                <FieldRow label="Date of Birth" value={emp.dob} />
                <FieldRow label="Marital Status" value={emp.maritalStatus} />
                <FieldRow label="Phone" value={emp.phone} />
                <FieldRow label="Hourly Rate" value={emp.hourlyRate} />
                <FieldRow label="Service Pin #" value={emp.servicePin} />
              </div>
              <div className="border-t border-slate-100 pt-4">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Address</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <FieldRow label="Address Line 1" value={emp.address1} />
                  <FieldRow label="Address Line 2" value={emp.address2} />
                  <FieldRow label="Address Line 3" value={emp.address3} />
                </div>
              </div>
              <div className="border-t border-slate-100 pt-4">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">System Settings</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <FieldRow label="Email Address" value={emp.email} />
                  <FieldRow label="Home Payroll" value={emp.homePayroll} />
                  <FieldRow label="PDF Password" value={emp.pdfPassword} />
                </div>
              </div>
            </div>
          )}

          {/* ── Employment ── */}
          {tab === 1 && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <FieldRow label="Division" value={emp.division} />
                <FieldRow label="Department" value={emp.dept} />
                <FieldRow label="Cost Centre" value={emp.costCenter} />
                <FieldRow label="Union" value={emp.union || "—"} />
                <FieldRow label="Grade" value={emp.grade} />
                <FieldRow label="Occupation Code" value={emp.occupation} />
                <FieldRow label="Employment Type" value={emp.type} />
                <FieldRow label="Role / Title" value={emp.role} />
              </div>
              <div className="border-t border-slate-100 pt-4">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Dates & Salary</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <FieldRow label="Employed From" value={emp.employedFrom} />
                  <FieldRow label="Employed To" value={emp.employedTo || "—"} />
                  <FieldRow label="Terminate Date" value={emp.terminateDate || "—"} />
                  <FieldRow label="Next Increment" value={emp.increment || "—"} />
                  <FieldRow label="Annual Salary" value={emp.annualSalary} />
                  <FieldRow label="Annual Hours" value={emp.annualHours} />
                </div>
              </div>
            </div>
          )}

          {/* ── Earnings ── */}
          {tab === 2 && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <p className="text-sm text-slate-500">Earnings assigned to this employee for the current payroll.</p>
                <button className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-[#741B47] border border-[#741B47]/30 rounded-lg hover:bg-[#741B47]/5 transition-colors">
                  <Plus size={15} /> Add Earning
                </button>
              </div>
              <div className="overflow-x-auto rounded-xl border border-slate-200">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-50 border-b border-slate-200">
                    <tr>
                      {["Code", "Description", "Period", "% / Amount", "Bank Acc #", "Cost", "S/V", "I/T", ""].map(h => (
                        <th key={h} className="px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider whitespace-nowrap">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {EARNINGS_DATA.map((row, i) => (
                      <tr key={i} className="hover:bg-slate-50 transition-colors">
                        <td className="px-4 py-3 font-mono text-xs text-slate-700">{row.code}</td>
                        <td className="px-4 py-3 font-medium text-slate-900 whitespace-nowrap">{row.desc}</td>
                        <td className="px-4 py-3 text-slate-600">{row.period}</td>
                        <td className="px-4 py-3 text-slate-600">{row.percent}</td>
                        <td className="px-4 py-3 font-mono text-xs text-slate-500">{row.ba}</td>
                        <td className="px-4 py-3 text-slate-600">{row.cost}</td>
                        <td className="px-4 py-3">
                          <span className={`px-1.5 py-0.5 rounded text-xs font-medium ${row.sv === "Y" ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-500"}`}>{row.sv}</span>
                        </td>
                        <td className="px-4 py-3">
                          <span className={`px-1.5 py-0.5 rounded text-xs font-medium ${row.it === "Y" ? "bg-blue-100 text-blue-700" : "bg-slate-100 text-slate-500"}`}>{row.it}</span>
                        </td>
                        <td className="px-4 py-3 text-right">
                          <button className="text-slate-400 hover:text-slate-600 p-1 rounded hover:bg-slate-100 transition-colors">
                            <MoreHorizontal size={15} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ── Deductions ── */}
          {tab === 3 && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <p className="text-sm text-slate-500">Deductions applied to this employee each pay period.</p>
                <button className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-[#741B47] border border-[#741B47]/30 rounded-lg hover:bg-[#741B47]/5 transition-colors">
                  <Plus size={15} /> Add Deduction
                </button>
              </div>
              <div className="overflow-x-auto rounded-xl border border-slate-200">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-50 border-b border-slate-200">
                    <tr>
                      {["Code", "Description", "Period", "% / Amount", "Bank Acc #", "Cost", "Reference", ""].map(h => (
                        <th key={h} className="px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider whitespace-nowrap">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {DEDUCTIONS_DATA.map((row, i) => (
                      <tr key={i} className="hover:bg-slate-50 transition-colors">
                        <td className="px-4 py-3 font-mono text-xs text-slate-700">{row.code}</td>
                        <td className="px-4 py-3 font-medium text-slate-900 whitespace-nowrap">{row.desc}</td>
                        <td className="px-4 py-3 text-slate-600">{row.period}</td>
                        <td className="px-4 py-3 text-slate-600">{row.percent}</td>
                        <td className="px-4 py-3 font-mono text-xs text-slate-500">{row.ba || "—"}</td>
                        <td className="px-4 py-3 text-slate-600">{row.cost || "—"}</td>
                        <td className="px-4 py-3 text-xs text-slate-500">{row.ref || "—"}</td>
                        <td className="px-4 py-3 text-right">
                          <button className="text-slate-400 hover:text-slate-600 p-1 rounded hover:bg-slate-100 transition-colors">
                            <MoreHorizontal size={15} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ── Leave & Time ── */}
          {tab === 4 && (
            <div className="space-y-4">
              <p className="text-sm text-slate-500">Current leave entitlements and balances for this employee.</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {LEAVE_DATA.map((lv, i) => (
                  <div key={i} className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold text-slate-900 text-sm">{lv.type}</h4>
                      <span className="text-xs text-slate-500">Expires: {lv.expires}</span>
                    </div>
                    <div className="grid grid-cols-3 gap-3 text-center">
                      <div>
                        <p className="text-lg font-bold text-slate-900">{lv.entitlement.split(" ")[0]}</p>
                        <p className="text-xs text-slate-500">Entitlement</p>
                      </div>
                      <div>
                        <p className="text-lg font-bold text-amber-600">{lv.taken.split(" ")[0]}</p>
                        <p className="text-xs text-slate-500">Taken</p>
                      </div>
                      <div>
                        <p className="text-lg font-bold text-emerald-600">{lv.balance.split(" ")[0]}</p>
                        <p className="text-xs text-slate-500">Balance</p>
                      </div>
                    </div>
                    <div className="mt-3 h-2 bg-slate-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#741B47] rounded-full"
                        style={{ width: `${(parseInt(lv.taken) / parseInt(lv.entitlement)) * 100 || 0}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-4 sm:px-6 py-4 border-t border-slate-200 bg-slate-50 rounded-b-2xl flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-slate-400">Last updated: Oct 25, 2026 · 09:14 AM</p>
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <button onClick={onClose} className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors w-full sm:w-auto">
              Cancel
            </button>
            <button className="px-4 py-2 text-sm font-medium text-white bg-[#741B47] rounded-lg hover:bg-[#5a1537] transition-colors shadow-sm w-full sm:w-auto">
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Employees() {
  const [employees] = useState<Employee[]>(SAMPLE_EMPLOYEES);
  const [selected, setSelected] = useState<Employee | null>(null);
  const [search, setSearch] = useState("");
  const [deptFilter, setDeptFilter] = useState("All Departments");
  const [statusFilter, setStatusFilter] = useState("Status: All");
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const employeeId = searchParams.get("employee");
    if (!employeeId) {
      setSelected(null);
      return;
    }

    const employee = employees.find((item) => item.id === employeeId) ?? null;
    setSelected(employee);
  }, [employees, searchParams]);

  const filtered = employees.filter(e => {
    const matchSearch = search === "" || e.name.toLowerCase().includes(search.toLowerCase()) || e.id.toLowerCase().includes(search.toLowerCase()) || e.role.toLowerCase().includes(search.toLowerCase());
    const matchDept = deptFilter === "All Departments" || e.dept === deptFilter;
    const matchStatus = statusFilter === "Status: All" || e.status === statusFilter;
    return matchSearch && matchDept && matchStatus;
  });

  return (
    <>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Employee Management</h1>
            <p className="text-sm text-slate-500 mt-1">Manage personal, employment, tax details and leaves.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <button className="flex items-center justify-center gap-2 px-4 py-2 bg-white text-slate-700 font-medium rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors w-full sm:w-auto">
              <FileDown size={18} /> Export
            </button>
            <button className="flex items-center justify-center gap-2 px-4 py-2 bg-[#741B47] text-white font-medium rounded-lg hover:bg-[#5a1537] transition-colors shadow-sm hover:shadow w-full sm:w-auto">
              <Plus size={18} /> Add Employee
            </button>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          {/* Toolbar */}
          <div className="p-4 border-b border-slate-200 flex flex-col gap-4 bg-slate-50/50">
            <div className="flex flex-col sm:flex-row gap-4 w-full">
              <div className="relative w-full sm:w-80">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                  type="text"
                  placeholder="Search employees by name, ID or role..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-[#741B47]/20 focus:border-[#741B47] outline-none transition-all"
                />
              </div>
              <button className="flex items-center gap-2 px-3 py-2 border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors">
                <Filter size={18} />
                <span className="hidden sm:inline">Filters</span>
              </button>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 sm:items-center w-full">
              <span className="text-sm text-slate-500 sm:mr-2">Showing {filtered.length} of 1,245</span>
              <div className="relative">
                <select
                  value={deptFilter}
                  onChange={e => setDeptFilter(e.target.value)}
                  className="appearance-none border border-slate-200 rounded-lg text-sm text-slate-600 px-3 py-2 pr-8 focus:ring-2 focus:ring-[#741B47]/20 focus:border-[#741B47] outline-none bg-white"
                >
                  <option>All Departments</option>
                  <option>Engineering</option>
                  <option>Product</option>
                  <option>Human Resources</option>
                  <option>Design</option>
                  <option>Marketing</option>
                </select>
                <ChevronDown size={14} className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              </div>
              <div className="relative">
                <select
                  value={statusFilter}
                  onChange={e => setStatusFilter(e.target.value)}
                  className="appearance-none border border-slate-200 rounded-lg text-sm text-slate-600 px-3 py-2 pr-8 focus:ring-2 focus:ring-[#741B47]/20 focus:border-[#741B47] outline-none bg-white"
                >
                  <option>Status: All</option>
                  <option>Active</option>
                  <option>On Leave</option>
                </select>
                <ChevronDown size={14} className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Employee</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Role & Dept</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Type</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Base Salary</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {filtered.map((emp) => (
                  <tr
                    key={emp.id}
                    className="hover:bg-slate-50 transition-colors cursor-pointer"
                    onClick={() => setSelected(emp)}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-[#741B47]/10 text-[#741B47] flex items-center justify-center font-bold text-sm">
                          {emp.name.split(" ").map(n => n[0]).join("")}
                        </div>
                        <div>
                          <div className="font-medium text-slate-900">{emp.name}</div>
                          <div className="text-xs text-slate-500">{emp.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-slate-900">{emp.role}</div>
                      <div className="text-xs text-slate-500">{emp.dept}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-800">
                        {emp.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-slate-900">{emp.salary}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
                        emp.status === "Active" ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${emp.status === "Active" ? "bg-emerald-500" : "bg-amber-500"}`} />
                        {emp.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right" onClick={e => e.stopPropagation()}>
                      <button className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-100 transition-colors">
                        <MoreHorizontal size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="p-4 border-t border-slate-200 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between bg-slate-50/50 text-sm">
            <div className="text-slate-500">
              Showing <span className="font-medium text-slate-900">1</span> to <span className="font-medium text-slate-900">{filtered.length}</span> of <span className="font-medium text-slate-900">1,245</span> results
            </div>
            <div className="flex flex-wrap gap-2">
              <button className="px-3 py-1 border border-slate-200 rounded text-slate-600 bg-white hover:bg-slate-50 disabled:opacity-50">Previous</button>
              <button className="px-3 py-1 bg-[#741B47] text-white rounded">1</button>
              <button className="px-3 py-1 border border-slate-200 rounded text-slate-600 bg-white hover:bg-slate-50">2</button>
              <button className="px-3 py-1 border border-slate-200 rounded text-slate-600 bg-white hover:bg-slate-50">3</button>
              <span className="px-2 py-1 text-slate-400">...</span>
              <button className="px-3 py-1 border border-slate-200 rounded text-slate-600 bg-white hover:bg-slate-50">Next</button>
            </div>
          </div>
        </div>
      </div>

      {selected && <EmployeeModal emp={selected} onClose={() => setSelected(null)} />}
    </>
  );
}
