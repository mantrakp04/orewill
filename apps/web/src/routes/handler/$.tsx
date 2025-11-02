import { createFileRoute, useLocation } from "@tanstack/react-router";
import { StackHandler } from "@stackframe/react";
import { stackClientApp } from "@/main";

function StackRoutesHandler() {
	const location = useLocation();

	return (
		<StackHandler app={stackClientApp} location={location.pathname} fullPage />
	);
}

export const Route = createFileRoute("/handler/$")({
	component: StackRoutesHandler,
});
