import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "@kaneo/libs";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { type ZodType, z } from "zod";
import { Button } from "../ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

type FormValues = {
	email: string;
	password: string;
};

const signInSchema: ZodType<FormValues> = z.object({
	email: z.string().email(),
	password: z
		.string()
		.min(8, { message: "Password is too short" })
		.max(20, { message: "Password is too long" }),
});

export function SignInForm() {
	const [showPassword, setShowPassword] = useState(false);
	const { history } = useRouter();
	const form = useForm<FormValues>({
		resolver: zodResolver(signInSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});
	const { mutateAsync } = useMutation({
		mutationFn: () =>
			api.user["sign-in"].post({
				email: form.getValues().email,
				password: form.getValues().password,
			}),
	});

	const onSubmit = async () => {
		await mutateAsync();
		history.push("/");
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
				<div className="space-y-4">
					<div>
						<FormField
							control={form.control}
							name="email"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="text-sm font-medium text-zinc-300 mb-1.5 block">
										Email
									</FormLabel>
									<FormControl>
										<Input
											className="bg-zinc-800/50 border-zinc-700/50 text-zinc-100"
											placeholder="you@example.com"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>

					<div>
						<FormField
							control={form.control}
							name="password"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="text-sm font-medium text-zinc-300 mb-1.5 block">
										Password
									</FormLabel>
									<FormControl>
										<div className="relative">
											<Input
												className="bg-zinc-800/50 border-zinc-700/50 text-zinc-100 pr-10"
												placeholder="••••••••"
												type={showPassword ? "text" : "password"}
												{...field}
											/>
											<button
												type="button"
												onClick={() => setShowPassword(!showPassword)}
												className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-300"
											>
												{showPassword ? (
													<EyeOff size={16} />
												) : (
													<Eye size={16} />
												)}
											</button>
										</div>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<div className="flex justify-end mt-1">
							<button
								type="button"
								className="text-sm text-zinc-400 hover:text-zinc-300"
							>
								Forgot password?
							</button>
						</div>
					</div>
				</div>

				<Button
					type="submit"
					className="w-full bg-zinc-100 text-zinc-900 hover:bg-zinc-200 mt-6"
				>
					Sign In
				</Button>
			</form>
		</Form>
	);
}
