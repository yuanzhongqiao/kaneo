import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import { useState } from "react";
import { Logo } from "../logo";
import { MobileHeader } from "../mobile-header";
import { SidebarContent } from "./sidebar-content";
import { SidebarHeader } from "./sidebar-header";

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  // const { workspaces, currentWorkspace, setCurrentWorkspace } = useKaneoStore();
  const currentUser = {
    name: "John Doe",
    email: "john@example.com",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face",
  };

  return (
    <>
      <MobileHeader onMenuClick={() => setIsOpen(true)} />

      <div
        className={cn(
          "fixed inset-0 z-40 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-sm md:hidden",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none",
        )}
      >
        <div
          className={cn(
            "fixed inset-y-0 left-0 w-64 bg-white dark:bg-zinc-900 transform transition-transform duration-200 ease-in-out",
            isOpen ? "translate-x-0" : "-translate-x-full",
          )}
        >
          <div className="flex items-center justify-between p-4 border-b border-zinc-200 dark:border-zinc-800">
            <Logo />
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="p-2 text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <SidebarContent
            workspaces={[]}
            currentWorkspace={"Andrej's workspace"}
            setCurrentWorkspace={() => {}}
            currentUser={currentUser}
          />
        </div>
      </div>

      <div className="hidden md:flex w-64 bg-white dark:bg-zinc-900 border-r border-zinc-200 dark:border-zinc-800 h-screen flex-col">
        <SidebarHeader />
        <SidebarContent
          workspaces={[]}
          currentWorkspace={"Andrej's workspace"}
          setCurrentWorkspace={() => {}}
          currentUser={currentUser}
        />
      </div>
    </>
  );
}
