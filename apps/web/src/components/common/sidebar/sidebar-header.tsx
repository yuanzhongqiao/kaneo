import { Logo } from "../logo";

export function SidebarHeader() {
  return (
    <div className="p-4 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
      <Logo />
    </div>
  );
}
