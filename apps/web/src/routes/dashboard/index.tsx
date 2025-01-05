import { Sidebar } from "@/components/common/sidebar";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/")({
  component: DashboardIndexRouteComponent,
  loader: ({ context: { queryClient } }) =>
    queryClient.ensureQueryData({
      queryKey: ["me"],
    }),
});

function DashboardIndexRouteComponent() {
  return (
    <>
      <Sidebar />
      <main className="flex-1 overflow-hidden p-6" />
    </>
  );
}
