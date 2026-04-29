import { Server, Clock, Database, FileSpreadsheet, Download, Upload, CreditCard, Link as LinkIcon, AlertTriangle } from "lucide-react";

export function Integrations() {
  const integrations = [
    {
      id: "time-attendance",
      name: "Time & Attendance",
      description: "Import working hours, overtime, and leave balances",
      icon: Clock,
      color: "text-blue-600",
      bg: "bg-blue-100",
      status: "Connected",
      lastSync: "Today, 08:30 AM",
    },
    {
      id: "hris",
      name: "HR Systems (HRIS)",
      description: "Sync employee data, new hires, updates, and terminations",
      icon: Database,
      color: "text-emerald-600",
      bg: "bg-emerald-100",
      status: "Connected",
      lastSync: "Today, 09:15 AM",
    },
    {
      id: "banking",
      name: "Banking & ACH",
      description: "Export payroll data to standardized bank file formats",
      icon: CreditCard,
      color: "text-purple-600",
      bg: "bg-purple-100",
      status: "Disconnected",
      lastSync: "Never",
    },
    {
      id: "erp",
      name: "Accounting / ERP",
      description: "Post journal entries and general ledger data",
      icon: Server,
      color: "text-amber-600",
      bg: "bg-amber-100",
      status: "Needs Attention",
      lastSync: "Yesterday, 18:00 PM",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Integrations & Data</h1>
          <p className="text-sm text-slate-500 mt-1">Manage external system connections and file processing.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white text-slate-700 font-medium rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors">
            <Download size={18} /> Manual Export
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-sm hover:shadow">
            <Upload size={18} /> File Import
          </button>
        </div>
      </div>

      {/* System Connections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {integrations.map((integration) => (
          <div key={integration.id} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${integration.bg} ${integration.color}`}>
                  <integration.icon size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">{integration.name}</h3>
                  <p className="text-sm text-slate-500">{integration.description}</p>
                </div>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between pt-4 border-t border-slate-100">
              <div className="flex items-center gap-2">
                {integration.status === "Connected" ? (
                  <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Connected
                  </span>
                ) : integration.status === "Disconnected" ? (
                  <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span> Disconnected
                  </span>
                ) : (
                  <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-700">
                    <AlertTriangle size={12} /> Needs Attention
                  </span>
                )}
                <span className="text-xs text-slate-400">Last sync: {integration.lastSync}</span>
              </div>
              
              <button className="text-sm font-medium text-blue-600 hover:text-blue-700 hover:underline">
                Configure
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* File Processing Section */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
        <h3 className="text-lg font-bold text-slate-900 mb-4">File Processing</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="border border-slate-200 border-dashed rounded-xl p-6 text-center hover:bg-slate-50 hover:border-blue-400 transition-colors cursor-pointer group">
            <div className="w-12 h-12 bg-slate-100 text-slate-500 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-blue-100 group-hover:text-blue-600 transition-colors">
              <FileSpreadsheet size={24} />
            </div>
            <h4 className="font-semibold text-slate-900 mb-1">Batch Import Employees</h4>
            <p className="text-xs text-slate-500 mb-4">Upload CSV or Excel files to bulk update records</p>
            <span className="text-sm font-medium text-blue-600 group-hover:underline">Choose File</span>
          </div>

          <div className="border border-slate-200 border-dashed rounded-xl p-6 text-center hover:bg-slate-50 hover:border-blue-400 transition-colors cursor-pointer group">
            <div className="w-12 h-12 bg-slate-100 text-slate-500 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-blue-100 group-hover:text-blue-600 transition-colors">
              <CreditCard size={24} />
            </div>
            <h4 className="font-semibold text-slate-900 mb-1">Generate Bank File</h4>
            <p className="text-xs text-slate-500 mb-4">Create ACH or specialized bank routing formats</p>
            <span className="text-sm font-medium text-blue-600 group-hover:underline">Select Format</span>
          </div>

          <div className="border border-slate-200 border-dashed rounded-xl p-6 text-center hover:bg-slate-50 hover:border-blue-400 transition-colors cursor-pointer group">
            <div className="w-12 h-12 bg-slate-100 text-slate-500 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-blue-100 group-hover:text-blue-600 transition-colors">
              <Database size={24} />
            </div>
            <h4 className="font-semibold text-slate-900 mb-1">Backup & Restore</h4>
            <p className="text-xs text-slate-500 mb-4">Securely backup payroll data or restore from archive</p>
            <span className="text-sm font-medium text-blue-600 group-hover:underline">Manage Backups</span>
          </div>
        </div>
      </div>
    </div>
  );
}
