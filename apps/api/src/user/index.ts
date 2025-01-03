import { jwt } from "@elysiajs/jwt";
import { Elysia, t } from "elysia";
import { ACCESS_TOKEN_EXPIRY, REFRESH_TOKEN_EXPIRY } from "./constants";
import signIn from "./controllers/sign-in";
import signUp from "./controllers/sign-up";
import { signInUserSchema, signUpUserSchema } from "./db/queries";
import createToken from "./utils/create-token";

const user = new Elysia({ prefix: "/user" })
	.use(
		jwt({
			name: "accessJwt",
			secret: process.env.JWT_ACCESS ?? "",
		}),
	)
	.use(
		jwt({
			name: "refreshJwt",
			secret: process.env.JWT_REFRESH ?? "",
		}),
	)
	.post(
		"/sign-in",
		async ({ body, accessJwt, refreshJwt, set }) => {
			const user = await signIn(body);

			const accessToken = await createToken({
				expires: ACCESS_TOKEN_EXPIRY,
				jwt: accessJwt,
				payload: {
					id: user.id,
				},
			});

			const refreshToken = await createToken({
				expires: REFRESH_TOKEN_EXPIRY,
				jwt: refreshJwt,
				payload: {
					id: user.id,
				},
			});

			set.cookie = {
				accessToken,
				refreshToken,
			};

			return {
				user,
			};
		},
		{
			body: t.Omit(signInUserSchema, ["id", "name", "createdAt"]),
		},
	)
	.post(
		"/sign-up",
		async ({ body }) => {
			return signUp(body);
		},
		{
			body: signUpUserSchema,
		},
	);

export default user;
