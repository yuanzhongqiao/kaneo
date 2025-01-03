import { createRoute } from "@tanstack/react-router";
import { AuthLayout } from "../../components/auth/layout";
import { SignInForm } from "../../components/auth/sign-in-form";
import { AuthToggle } from "../../components/auth/toggle";
import { rootRoute } from "../__root";

export const signUpRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: "/auth/sign-up",
	component: SignUp,
});

function SignUp() {
	return (
		<AuthLayout
			title="Create account"
			subtitle="Get started with your free workspace"
		>
			<SignInForm />
			<AuthToggle
				message="Already have an account?"
				linkText="Sign in"
				linkTo="/auth/sign-in"
			/>
		</AuthLayout>
	);
}
