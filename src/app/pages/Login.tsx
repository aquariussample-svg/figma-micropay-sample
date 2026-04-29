import { useState } from "react";
import { useNavigate } from "react-router";
import payrollLogo from "@/assets/payroll-logo.jpg";
import sclLogo from "@/assets/scl-logo.png";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    navigate("/");
  }

  return (
    <div className="min-h-screen flex">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#741B47] flex-col items-center justify-center p-12 relative overflow-hidden">
        {/* Background texture circles */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full translate-x-1/3 -translate-y-1/3" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full -translate-x-1/3 translate-y-1/3" />

        <div className="relative z-10 flex flex-col items-center text-center max-w-sm">
          <img
            src={payrollLogo}
            alt="SCL Micropay"
            className="w-48 h-48 rounded-2xl object-cover shadow-2xl mb-8"
          />
          <img
            src={sclLogo}
            alt="Systems Consulting Ltd"
            className="h-10 w-auto mb-6 brightness-0 invert"
          />
          <h2 className="text-white text-2xl font-bold mb-3">
            Payroll Management System
          </h2>
          <p className="text-white/70 text-sm leading-relaxed">
            People Centered · Customer Focused · Quality Managed
          </p>
        </div>
      </div>

      {/* Right panel — login form */}
      <div className="flex-1 flex flex-col items-center justify-center bg-white px-8 py-12">
        {/* Mobile logo */}
        <div className="flex lg:hidden flex-col items-center mb-8">
          <img src={payrollLogo} alt="SCL Micropay" className="w-16 h-16 rounded-xl object-cover mb-3" />
          <img src={sclLogo} alt="Systems Consulting Ltd" className="h-7 w-auto" />
        </div>

        <div className="w-full max-w-sm">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-slate-800">Welcome back</h1>
            <p className="text-slate-500 text-sm mt-1">Sign in to your account to continue</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Email address
              </label>
              <div className="relative">
                <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  required
                  className="w-full pl-9 pr-4 py-2.5 border border-slate-200 rounded-lg text-sm bg-slate-50 focus:bg-white focus:border-[#741B47] focus:ring-2 focus:ring-[#741B47]/20 outline-none transition-all"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-sm font-medium text-slate-700">Password</label>
                <button type="button" className="text-xs text-[#741B47] hover:underline font-medium">
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full pl-9 pr-10 py-2.5 border border-slate-200 rounded-lg text-sm bg-slate-50 focus:bg-white focus:border-[#741B47] focus:ring-2 focus:ring-[#741B47]/20 outline-none transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-[#741B47] hover:bg-[#5e1539] text-white font-semibold rounded-lg text-sm transition-colors mt-2"
            >
              Sign In
            </button>
          </form>

          <p className="text-center text-xs text-slate-400 mt-8">
            © {new Date().getFullYear()} Systems Consulting Ltd. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
