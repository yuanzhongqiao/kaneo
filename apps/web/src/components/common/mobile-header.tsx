import { Menu } from "lucide-react";
import { Logo } from "./logo";

interface MobileHeaderProps {
  onMenuClick: () => void;
}

export function MobileHeader({ onMenuClick }: MobileHeaderProps) {
  return (
    <div className="flex items-center justify-between p-4 border-b border-zinc-800 md:hidden">
      <Logo />
      <button
        type="button"
        onClick={onMenuClick}
        className="p-2 text-zinc-400 hover:text-zinc-300 hover:bg-zinc-800 rounded-lg transition-colors"
      >
        <Menu className="h-6 w-6" />
      </button>
    </div>
  );
}
