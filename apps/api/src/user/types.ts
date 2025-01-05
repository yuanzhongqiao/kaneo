import type { Session, User } from "../database/schema";

export type SessionValidationResult =
  | { session: Session; user: User }
  | { session: null; user: null };
