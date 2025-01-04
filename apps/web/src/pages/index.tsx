import queryClient from "@/query-client";
import { api } from "@kaneo/libs";
import { Outlet, createRoute, redirect } from "@tanstack/react-router";
import { rootRoute } from "./__root";

export const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: IndexRouteComponent,
  beforeLoad: async () => {
    const { data: isAuthenticated } = await queryClient.ensureQueryData({
      queryKey: ["me"],
      queryFn: () => api.me.get(),
      staleTime: 15 * 60 * 1000, // 15 mins
      revalidateIfStale: true,
    });

    if (!isAuthenticated) {
      throw redirect({
        to: "/auth/sign-in",
      });
    }
  },
});

function IndexRouteComponent() {
  return (
    <div className="flex h-screen flex-col md:flex-row bg-zinc-50 dark:bg-zinc-950">
      <Outlet />
    </div>
  );
}
