import { LayoutGrid } from "lucide-react";

interface LogoProps {
  className?: string;
}

export function Logo({ className = "" }: LogoProps) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="p-1.5 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg shadow-sm">
        <LayoutGrid className="w-5 h-5 text-white" />
      </div>
      <span className="text-lg font-semibold bg-gradient-to-br from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
        Kaneo
      </span>
    </div>
  );
}
