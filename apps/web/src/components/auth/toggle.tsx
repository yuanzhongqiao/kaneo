import { Link } from "@tanstack/react-router";

interface AuthToggleProps {
	message: string;
	linkText: string;
	linkTo: string;
}

export function AuthToggle({ message, linkText, linkTo }: AuthToggleProps) {
	return (
		<div className="mt-6 text-center">
			<p className="text-sm text-zinc-400">
				{message}{" "}
				<Link
					href={linkTo}
					className="text-zinc-300 hover:text-zinc-100 font-medium"
				>
					{linkText}
				</Link>
			</p>
		</div>
	);
}
