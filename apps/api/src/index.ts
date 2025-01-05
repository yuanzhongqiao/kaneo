import { cors } from "@elysiajs/cors";
import { Elysia } from "elysia";
import user from "./user";
import { validateSessionToken } from "./user/controllers/validate-session-token";

const app = new Elysia()
  .use(cors())
  .use(user)
  .guard({
    async beforeHandle({ set, cookie: { session } }) {
      if (!session?.value) {
        set.status = "Unauthorized";

        return set.status;
      }

      const { user, session: validatedSession } = await validateSessionToken(
        session.value,
      );

      if (!user || !validatedSession) {
        set.status = "Unauthorized";

        return set.status;
      }
    },
  })
  .get("/me", async ({ cookie: { session } }) => {
    const { user } = await validateSessionToken(session.value ?? "");

    return user;
  })
  .onError(({ code, error }) => {
    switch (code) {
      case "VALIDATION":
        return error.all;
      default:
        if (error instanceof Error) {
          return {
            name: error.name,
            message: error.message,
          };
        }
    }
  })
  .listen(1337);

export type App = typeof app;

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);
