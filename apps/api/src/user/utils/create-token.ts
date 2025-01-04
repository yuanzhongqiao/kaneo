import type { jwt as jwtInstance } from "@elysiajs/jwt";
import type { Static } from "elysia";
import type { signInUserSchema } from "../db/queries";

const createToken = async ({
  jwt,
  payload,
  expires,
}: {
  expires: Date;
  jwt: ReturnType<typeof jwtInstance>;
  payload: Pick<Static<typeof signInUserSchema>, "id">;
}) => {
  return {
    value: await jwt.sign(payload),
    httpOnly: true,
    path: "/",
    expires,
  };
};

export default createToken;
