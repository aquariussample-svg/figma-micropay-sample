import { createBrowserRouter, isRouteErrorResponse, useRouteError } from "react-router";
import { Layout } from "./components/Layout";
import { Login } from "./pages/Login";
import { Dashboard } from "./pages/Dashboard";
import { Employees } from "./pages/Employees";
import { Payroll } from "./pages/Payroll";
import { Integrations } from "./pages/Integrations";
import { Reports } from "./pages/Reports";
import { Settings } from "./pages/Settings";

function RouteErrorPage() {
  const error = useRouteError();
  let title = "Something went wrong";
  let description = "An unexpected error occurred while loading this page.";

  if (isRouteErrorResponse(error)) {
    title = `${error.status} ${error.statusText}`;
    description = typeof error.data === "string" ? error.data : description;
  } else if (error instanceof Error) {
    description = error.message;
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="w-full max-w-xl rounded-2xl bg-white border border-slate-200 shadow-sm p-8 text-center">
        <h1 className="text-2xl font-semibold text-slate-900">{title}</h1>
        <p className="mt-3 text-slate-600">{description}</p>
        <a
          href={import.meta.env.BASE_URL}
          className="inline-flex mt-6 items-center rounded-lg bg-[#741B47] px-4 py-2 text-sm font-medium text-white hover:opacity-90"
        >
          Go to Dashboard
        </a>
      </div>
    </div>
  );
}

export const router = createBrowserRouter([
  { path: "/login", Component: Login, errorElement: <RouteErrorPage /> },
  {
    path: "/",
    Component: Layout,
    errorElement: <RouteErrorPage />,
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
], {
  basename: import.meta.env.BASE_URL,
});
