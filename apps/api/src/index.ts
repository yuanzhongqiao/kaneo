import { cors } from "@elysiajs/cors";
import { Elysia } from "elysia";
import user from "./user";
import { REFRESH_TOKEN_EXPIRY } from "./user/constants";
import createToken from "./user/utils/create-token";

const app = new Elysia()
	.use(cors())
	.use(user)
	.guard({
		async beforeHandle({
			set,
			accessJwt,
			refreshJwt,
			cookie: { accessToken, refreshToken },
		}) {
			const decodedAccessToken = await accessJwt.verify(accessToken.value);
			const decodedRefreshToken = await refreshJwt.verify(refreshToken.value);

			if (!decodedAccessToken) {
				set.status = "Unauthorized";

				return set.status;
			}

			if (!decodedRefreshToken) {
				const refreshToken = await createToken({
					jwt: refreshJwt,
					expires: REFRESH_TOKEN_EXPIRY,
					payload: {
						id: String(decodedAccessToken.id),
					},
				});

				if (set.cookie) set.cookie.refreshToken = refreshToken;
			}
		},
	})
	.get("/me", async ({ refreshJwt, cookie: { refreshToken } }) => {
		const profile = await refreshJwt.verify(refreshToken.value);

		return profile;
	})
	.listen(1337);

export type App = typeof app;

console.log(
	`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);
