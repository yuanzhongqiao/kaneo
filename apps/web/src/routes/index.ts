import { indexRoute } from "@/pages";
import { signInRoute } from "@/pages/auth/sign-in";
import { signUpRoute } from "@/pages/auth/sign-up";
import { dashboardIndexRoute } from "@/pages/dashboard";
import queryClient from "@/query-client";
import type { QueryClient } from "@tanstack/react-query";
import {
  createRootRouteWithContext,
  createRouter,
} from "@tanstack/react-router";
import RootComponent from "./__root";

export const rootRoute = createRootRouteWithContext<{
  queryClient: QueryClient;
}>()({
  component: RootComponent,
});

const routeTree = rootRoute.addChildren([
  indexRoute.addChildren([signInRoute, signUpRoute, dashboardIndexRoute]),
]);

const router = createRouter({
  routeTree,
  defaultPreload: "intent",
  defaultPreloadStaleTime: 0,
  context: {
    queryClient,
  },
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default router;
