import { Logo } from "@/components/common/logo";
import { rootRoute } from "@/pages/__root";
import { Outlet, createRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";

export const authIndexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/auth",
  component: AuthIndexRouteComponent,
});

function AuthIndexRouteComponent() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-900 to-zinc-950 flex flex-col items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="mb-8 text-center">
          <Logo className="mx-auto mb-6" />
          <h1 className="text-3xl font-bold text-zinc-100 mb-2">
            Welcome back
          </h1>
          <p className="text-zinc-400">
            Enter your credentials to access your workspace
          </p>
        </div>

        <div className="bg-zinc-900/50 backdrop-blur-xl rounded-xl border border-zinc-800/50 p-6">
          <Outlet />
        </div>
      </motion.div>
    </div>
  );
}
