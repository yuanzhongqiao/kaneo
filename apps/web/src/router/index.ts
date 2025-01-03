import { createRouter } from "@tanstack/react-router";
import { indexRoute } from "../pages";
import { rootRoute } from "../pages/__root";
import { authIndexRoute } from "../pages/auth";
import { signInRoute } from "../pages/auth/sign-in";
import { signUpRoute } from "../pages/auth/sign-up";
import queryClient from "../query-client";

const routeTree = rootRoute.addChildren([
	indexRoute.addChildren([
		authIndexRoute.addChildren([signInRoute, signUpRoute]),
	]),
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
