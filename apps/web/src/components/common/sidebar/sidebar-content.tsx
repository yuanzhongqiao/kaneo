import { Folder, LogOut, Plus, Settings, Users } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";

interface SidebarContentProps {
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	workspaces: any[];
	currentWorkspace: string | null;
	setCurrentWorkspace: (id: string) => void;
	currentUser: {
		name: string;
		email: string;
		avatar: string;
	};
}

export function SidebarContent({
	workspaces,
	currentWorkspace,
	setCurrentWorkspace,
	currentUser,
}: SidebarContentProps) {
	return (
		<>
			<nav className="flex-1 overflow-y-auto p-3">
				<div className="space-y-4">
					<div>
						<h2 className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-2 px-3">
							Workspaces
						</h2>
						<div className="space-y-1">
							{workspaces.map((workspace) => (
								<button
									type="button"
									key={workspace.id}
									onClick={() => setCurrentWorkspace(workspace.id)}
									className={`w-full text-left px-3 py-2 rounded-lg flex items-center transition-colors ${
										currentWorkspace === workspace.id
											? "bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400"
											: "text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800"
									}`}
								>
									<Folder
										className={`w-4 h-4 mr-2 ${
											currentWorkspace === workspace.id
												? "text-indigo-600 dark:text-indigo-400"
												: "text-zinc-500 dark:text-zinc-400"
										}`}
									/>
									{workspace.name}
								</button>
							))}

							<button
								type="button"
								className="w-full text-left px-3 py-2 text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800 rounded-lg flex items-center transition-colors"
							>
								<Plus className="w-4 h-4 mr-2 text-zinc-500 dark:text-zinc-400" />
								Add Workspace
							</button>
						</div>
					</div>

					<div>
						<h2 className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-2 px-3">
							Team
						</h2>
						<button
							type="button"
							className="w-full text-left px-3 py-2 text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800 rounded-lg flex items-center transition-colors"
						>
							<Users className="w-4 h-4 mr-2 text-zinc-500 dark:text-zinc-400" />
							Manage Team
						</button>
					</div>
				</div>
			</nav>

			<div className="p-4 border-t border-zinc-200 dark:border-zinc-800">
				<div className="flex items-center gap-3 mb-3">
					<Avatar>
						<AvatarImage src={currentUser.avatar} alt={currentUser.name} />
						<AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
					</Avatar>
					<div className="flex-1 min-w-0">
						<p className="text-sm font-medium text-zinc-900 dark:text-zinc-100 truncate">
							{currentUser.name}
						</p>
						<p className="text-xs text-zinc-500 dark:text-zinc-400 truncate">
							{currentUser.email}
						</p>
					</div>
				</div>
				<div className="flex gap-1">
					<button
						type="button"
						className="flex-1 px-2 py-1.5 text-xs text-zinc-600 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800 rounded-lg flex items-center justify-center transition-colors"
					>
						<Settings className="w-3 h-3 mr-1" />
						Settings
					</button>
					<button
						type="button"
						className="flex-1 px-2 py-1.5 text-xs text-zinc-600 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800 rounded-lg flex items-center justify-center transition-colors"
					>
						<LogOut className="w-3 h-3 mr-1" />
						Sign out
					</button>
				</div>
			</div>
		</>
	);
}
