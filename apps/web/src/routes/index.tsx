import type { User } from "@/types/user";
import { redirect } from "@tanstack/react-router";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  async beforeLoad({ context: { queryClient } }) {
    const { data: user } = await queryClient.ensureQueryData<{
      data: User;
    }>({
      queryKey: ["me"],
    });

    if (!user) {
      throw redirect({
        to: "/auth/sign-in",
      });
    }

    throw redirect({
      to: "/dashboard",
    });
  },
});
