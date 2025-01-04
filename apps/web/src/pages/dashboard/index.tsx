import { Sidebar } from "@/components/common/sidebar";
import { createRoute } from "@tanstack/react-router";
import { indexRoute } from "..";

export const dashboardIndexRoute = createRoute({
  getParentRoute: () => indexRoute,
  path: "/dashboard",
  component: DashboardIndexRouteComponent,
});

function DashboardIndexRouteComponent() {
  return (
    <>
      <Sidebar />
      <main className="flex-1 overflow-hidden p-6">Welcome to Kaneo!</main>
    </>
  );
}
