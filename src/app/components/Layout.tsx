import { Outlet, NavLink, useLocation, useNavigate } from "react-router";
import payrollLogo from "@/assets/payroll-logo.jpg";
import {
  LayoutDashboard,
  Users,
  Banknote,
  Network,
  FileBarChart,
  Settings,
  Bell,
  Search,
  Menu,
  ChevronDown,
  ChevronRight,
  UserCircle,
  KeyRound,
  HelpCircle,
  LogOut,
  Building2,
  Cpu,
  Percent,
  Sliders,
  Database,
  Shield,
  Key,
  ChevronLeft,
  CreditCard,
  BookOpen,
  Briefcase,
} from "lucide-react";
import { useState, useRef, useEffect } from "react";

export function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [configMenuOpen, setConfigMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    function handleResize() {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      setSidebarOpen(mobile ? true : window.innerWidth >= 1280);
      if (!mobile) {
        setMobileNavOpen(false);
      }
    }

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const navItems = [
    { name: "Dashboard", path: "/", icon: LayoutDashboard },
    { name: "Employee Management", path: "/employees", icon: Users },
    { name: "Payroll Engine", path: "/payroll", icon: Banknote },
    { name: "Integrations", path: "/integrations", icon: Network },
    { name: "Reporting", path: "/reports", icon: FileBarChart },
    {
      name: "Configuration",
      path: "/settings",
      icon: Settings,
      hasSubMenu: true,
      subItems: [
        { name: "Rule Engine", path: "/settings/rules", icon: Cpu },
        { name: "Earnings Setup", path: "/settings/earnings", icon: Percent },
        { name: "Deductions Setup", path: "/settings/deductions", icon: Sliders },
        { name: "Payroll Parameters", path: "/settings/params", icon: Building2 },
        { name: "Bank Codes", path: "/settings/banks", icon: CreditCard },
        { name: "GL Codes", path: "/settings/gl", icon: BookOpen },
        { name: "Occupation Codes", path: "/settings/occupations", icon: Briefcase },
        { name: "Data Management", path: "/settings/data", icon: Database },
        { name: "User Management", path: "/settings/security", icon: Shield },
        { name: "Licensing", path: "/settings/license", icon: Key },
      ]
    },
  ];

  // Function to generate breadcrumbs
  const generateBreadcrumbs = () => {
    const pathSegments = location.pathname.split('/').filter(Boolean);
    const breadcrumbs = [{ name: "Dashboard", path: "/" }];

    if (pathSegments.length === 0) return breadcrumbs;

    // Handle settings routes
    if (pathSegments[0] === 'settings') {
      breadcrumbs.push({ name: "Configuration", path: "/settings" });
      
      if (pathSegments[1]) {
        const configItem = navItems.find(item => item.name === "Configuration");
        const subItem = configItem?.subItems?.find(sub => sub.path === location.pathname);
        if (subItem) {
          breadcrumbs.push({ name: subItem.name, path: subItem.path });
        }
      }
    } else {
      // Handle other main navigation items
      const navItem = navItems.find(item => item.path === `/${pathSegments[0]}`);
      if (navItem) {
        breadcrumbs.push({ name: navItem.name, path: navItem.path });
      }
    }

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  // Auto-expand config menu if on settings page
  useEffect(() => {
    if (location.pathname.startsWith('/settings')) {
      setConfigMenuOpen(true);
    }
    setMobileNavOpen(false);
    setProfileOpen(false);
  }, [location.pathname]);

  const isSidebarVisible = isMobile ? mobileNavOpen : true;
  const sidebarClassName = isMobile
    ? `${mobileNavOpen ? "translate-x-0" : "-translate-x-full"} w-72 shadow-2xl`
    : `${sidebarOpen ? "w-64" : "w-20"} translate-x-0`;

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {isMobile && mobileNavOpen && (
        <button
          type="button"
          aria-label="Close navigation menu"
          className="fixed inset-0 z-40 bg-slate-950/45 backdrop-blur-[1px]"
          onClick={() => setMobileNavOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`${sidebarClassName} bg-[#2a0d1e] text-slate-300 transition-all duration-300 flex flex-col fixed inset-y-0 left-0 z-50`}
      >
        <div className="h-16 flex items-center justify-between px-4 bg-[#1e091a] border-b border-slate-700/50">
          <div className="flex items-center gap-3 overflow-hidden">
            <img src={payrollLogo} alt="SCL Micropay" className="h-8 w-8 rounded object-cover shrink-0" />
            {(isMobile || sidebarOpen) && (
              <span className="text-white font-bold text-base tracking-wide">
                SCL <span className="font-light text-[#f5c0d5]">Micropay</span>
              </span>
            )}
          </div>
          <button
            onClick={() => {
              if (isMobile) {
                setMobileNavOpen(false);
                return;
              }
              setSidebarOpen(!sidebarOpen);
            }}
            className="text-slate-400 hover:text-white"
            aria-label={isMobile ? "Close navigation" : "Toggle sidebar"}
          >
            {isMobile ? <ChevronLeft size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <div className="flex-1 py-6 overflow-y-auto">
          <div className="px-3 mb-4">
            <p className={`text-xs font-semibold text-slate-500 uppercase tracking-wider ${!isMobile && !sidebarOpen ? "text-center" : ""}`}>
              {isMobile || sidebarOpen ? "Modules" : "..."}
            </p>
          </div>
          <nav className="space-y-1 px-3">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path || (item.path !== "/" && location.pathname.startsWith(item.path));
              const isConfigMenu = item.hasSubMenu;
              
              return (
                <div key={item.name}>
                  {isConfigMenu ? (
                    <>
                      <button
                        onClick={() => {
                          setConfigMenuOpen(!configMenuOpen);
                        }}
                        className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition-colors ${
                          isActive
                            ? "bg-[#741B47] text-white"
                            : "hover:bg-slate-800 hover:text-white"
                        }`}
                        title={!isMobile && !sidebarOpen ? item.name : ""}
                      >
                        <div className="flex items-center gap-3">
                          <item.icon size={20} className={isActive ? "text-white" : "text-slate-400"} />
                          {(isMobile || sidebarOpen) && <span className="font-medium text-sm">{item.name}</span>}
                        </div>
                        {(isMobile || sidebarOpen) && (
                          <ChevronRight 
                            size={16} 
                            className={`transition-transform ${configMenuOpen ? 'rotate-90' : ''} ${isActive ? "text-white" : "text-slate-400"}`}
                          />
                        )}
                      </button>
                      
                      {/* Sub Menu */}
                      {configMenuOpen && isSidebarVisible && item.subItems && (
                        <div className="mt-1 ml-6 space-y-0.5 border-l border-slate-700 pl-4">
                          {item.subItems.map((subItem) => {
                            const isSubActive = location.pathname === subItem.path;
                            return (
                              <NavLink
                                key={subItem.name}
                                to={subItem.path}
                                onClick={() => setMobileNavOpen(false)}
                                className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors text-sm ${
                                  isSubActive
                                    ? "bg-[#5a1537] text-white"
                                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                                }`}
                              >
                                <subItem.icon size={16} className={isSubActive ? "text-white" : "text-slate-400"} />
                                <span className="font-medium">{subItem.name}</span>
                              </NavLink>
                            );
                          })}
                        </div>
                      )}
                    </>
                  ) : (
                    <NavLink
                      to={item.path}
                      onClick={() => setMobileNavOpen(false)}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                        isActive
                          ? "bg-[#741B47] text-white"
                          : "hover:bg-slate-800 hover:text-white"
                      }`}
                      title={!isMobile && !sidebarOpen ? item.name : ""}
                    >
                      <item.icon size={20} className={isActive ? "text-white" : "text-slate-400"} />
                      {(isMobile || sidebarOpen) && <span className="font-medium text-sm">{item.name}</span>}
                    </NavLink>
                  )}
                </div>
              );
            })}
          </nav>
        </div>

        <div className="p-4 border-t border-slate-800">
          <div className={`flex items-center gap-3 ${!isMobile && !sidebarOpen ? "justify-center" : ""}`}>
            <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center shrink-0 text-sm font-medium text-white">
              JD
            </div>
            {(isMobile || sidebarOpen) && (
              <div className="overflow-hidden">
                <p className="text-sm font-medium text-white truncate">John Doe</p>
                <p className="text-xs text-slate-500 truncate">Payroll Admin</p>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ${isMobile ? "ml-0" : sidebarOpen ? "ml-64" : "ml-20"}`}>
        {/* Header */}
        <header className="min-h-16 bg-white border-b border-slate-200 flex flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8 sticky top-0 z-40">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            {isMobile && (
              <button
                type="button"
                onClick={() => setMobileNavOpen(true)}
                className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50"
                aria-label="Open navigation menu"
              >
                <Menu size={18} />
              </button>
            )}
            <div className="relative hidden sm:block max-w-md w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input
                type="text"
                placeholder="Search employees, payroll runs..."
                className="w-full pl-10 pr-4 py-2 bg-slate-100 border-transparent focus:bg-white focus:border-[#741B47] focus:ring-2 focus:ring-[#741B47]/20 rounded-lg text-sm transition-all outline-none"
              />
            </div>
          </div>
          <div className="flex items-center gap-3 sm:gap-5">
            <button className="relative text-slate-500 hover:text-slate-700 transition-colors">
              <Bell size={20} />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white">
                3
              </span>
            </button>
            <div className="hidden sm:block h-6 w-px bg-slate-200"></div>
            {/* Profile dropdown */}
            <div className="relative" ref={profileRef}>
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-2 cursor-pointer group"
              >
                <div className="w-8 h-8 rounded-full bg-[#741B47] flex items-center justify-center text-white text-xs font-bold shrink-0">
                  JD
                </div>
                <div className="hidden sm:block text-left">
                  <p className="text-sm font-medium text-slate-700 group-hover:text-[#741B47] leading-none">John Doe</p>
                  <p className="text-xs text-slate-400 leading-none mt-0.5">Systems Consulting Ltd</p>
                </div>
                <ChevronDown
                  size={14}
                  className={`text-slate-400 group-hover:text-[#741B47] transition-transform ${profileOpen ? "rotate-180" : ""}`}
                />
              </button>

              {profileOpen && (
                <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-xl shadow-lg border border-slate-100 z-50 overflow-hidden">
                  {/* User info */}
                  <div className="px-4 py-3 border-b border-slate-100 bg-slate-50">
                    <p className="text-sm font-semibold text-slate-800">John Doe</p>
                    <p className="text-xs text-slate-500">john.doe@systemsconsulting-ltd.com</p>
                    <span className="inline-block mt-1 text-[10px] font-medium bg-[#741B47]/10 text-[#741B47] px-2 py-0.5 rounded-full">
                      Payroll Admin
                    </span>
                  </div>

                  {/* Menu items */}
                  <div className="py-1">
                    <button
                      onClick={() => { setProfileOpen(false); navigate("/settings"); }}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 hover:text-[#741B47] transition-colors"
                    >
                      <UserCircle size={16} className="text-slate-400" />
                      My Profile
                    </button>
                    <button
                      onClick={() => { setProfileOpen(false); navigate("/settings"); }}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 hover:text-[#741B47] transition-colors"
                    >
                      <KeyRound size={16} className="text-slate-400" />
                      Change Password
                    </button>
                    <button
                      onClick={() => { setProfileOpen(false); navigate("/settings"); }}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 hover:text-[#741B47] transition-colors"
                    >
                      <Building2 size={16} className="text-slate-400" />
                      Company Settings
                    </button>
                    <button
                      onClick={() => setProfileOpen(false)}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 hover:text-[#741B47] transition-colors"
                    >
                      <HelpCircle size={16} className="text-slate-400" />
                      Help & Support
                    </button>
                  </div>

                  {/* Sign out */}
                  <div className="border-t border-slate-100 py-1">
                    <button
                      onClick={() => { setProfileOpen(false); navigate("/login"); }}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <LogOut size={16} />
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Breadcrumbs */}
        {breadcrumbs.length > 1 && (
          <div className="px-4 py-3 sm:px-6 lg:px-8 bg-slate-50 border-b border-slate-200">
            <nav className="flex items-center overflow-x-auto whitespace-nowrap text-sm">
              {breadcrumbs.map((crumb, index) => (
                <div key={crumb.path} className="flex items-center">
                  {index > 0 && (
                    <ChevronRight size={14} className="text-slate-400 mx-2" />
                  )}
                  <button
                    onClick={() => navigate(crumb.path)}
                    className={`transition-colors ${
                      index === breadcrumbs.length - 1
                        ? "text-[#741B47] font-medium cursor-default"
                        : "text-slate-600 hover:text-[#741B47] hover:underline"
                    }`}
                  >
                    {crumb.name}
                  </button>
                </div>
              ))}
            </nav>
          </div>
        )}

        {/* Page Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-auto">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
