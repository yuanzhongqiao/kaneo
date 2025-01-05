import type { api } from "@kaneo/libs";
import type ApiResponse from "./api-response";

export type User = ApiResponse<typeof api.me.get>;
