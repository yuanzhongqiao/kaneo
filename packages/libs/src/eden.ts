import { treaty } from "@elysiajs/eden";
import type { App } from "@kaneo/api";

export const api = treaty<App>("http://localhost:1337", {
	fetch: {
		credentials: "include",
	},
});
