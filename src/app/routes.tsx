import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { Login } from "./pages/Login";
import { Dashboard } from "./pages/Dashboard";
import { Employees } from "./pages/Employees";
import { Payroll } from "./pages/Payroll";
import { Integrations } from "./pages/Integrations";
import { Reports } from "./pages/Reports";
import { Settings } from "./pages/Settings";

export const router = createBrowserRouter([
  { path: "/login", Component: Login },
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Dashboard },
      { path: "employees", Component: Employees },
      { path: "payroll", Component: Payroll },
      { path: "integrations", Component: Integrations },
      { path: "reports", Component: Reports },
      { path: "settings", Component: Settings },
      { path: "settings/:section", Component: Settings },
    ],
  },
]);
