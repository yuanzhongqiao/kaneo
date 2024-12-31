import { edenTreaty } from "@elysiajs/eden";
import type { App } from "@kaneo/api";

export const api = edenTreaty<App>("http://0.0.0.0:1337");
