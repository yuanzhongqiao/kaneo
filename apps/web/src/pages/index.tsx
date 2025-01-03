import { api } from "@kaneo/libs";
import { useQuery } from "@tanstack/react-query";
import { createRoute } from "@tanstack/react-router";
import { Sidebar } from "../components/common/sidebar";
import { rootRoute } from "./__root";

export const indexRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: "/",
	component: IndexRouteComponent,
});

function IndexRouteComponent() {
	const { data } = useQuery({
		queryKey: ["me"],
		queryFn: () => api.me.get(),
	});

	return (
		<div className="flex h-screen flex-col md:flex-row bg-zinc-50 dark:bg-zinc-950">
			<Sidebar />
			<main className="flex-1 overflow-hidden p-6">{JSON.stringify(data)}</main>
		</div>
	);
}
