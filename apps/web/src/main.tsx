import { RouterProvider, createRouter } from "@tanstack/react-router";
import ReactDOM from "react-dom/client";
import Loader from "./components/loader";
import { routeTree } from "./routeTree.gen";
import { StackClientApp } from "@stackframe/react";
import { ConvexReactClient } from "convex/react";
import { ConvexProvider } from "convex/react";
import { StackProvider, StackTheme } from "@stackframe/react";

const convex = new ConvexReactClient(import.meta.env.VITE_CONVEX_URL as string);

export const stackClientApp = new StackClientApp({
	projectId: import.meta.env.VITE_STACK_AUTH_PROJECT_ID!,
	publishableClientKey: import.meta.env.VITE_STACK_AUTH_PUBLISHABLE_CLIENT_KEY!,
	tokenStore: "cookie",
	redirectMethod: {
		useNavigate: () => (to: string) => {
			window.location.href = to;
		},
		navigate: (to: string) => {
			window.location.href = to;
		},
	},
});

const router = createRouter({
	routeTree,
	defaultPreload: "intent",
	defaultPendingComponent: () => <Loader />,
	context: {},
	Wrap: function WrapComponent({ children }: { children: React.ReactNode }) {
		return (
			<ConvexProvider client={convex}>
				<StackProvider app={stackClientApp}>
					<StackTheme>
						{children}
					</StackTheme>
				</StackProvider>
			</ConvexProvider>
		);
	},
});

convex.setAuth(stackClientApp.getConvexClientAuth({}));

declare module "@tanstack/react-router" {
	interface Register {
		router: typeof router;
	}
}

const rootElement = document.getElementById("app");

if (!rootElement) {
	throw new Error("Root element not found");
}

if (!rootElement.innerHTML) {
	const root = ReactDOM.createRoot(rootElement);
	root.render(<RouterProvider router={router} />);
}
