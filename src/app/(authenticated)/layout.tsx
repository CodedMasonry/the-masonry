import "~/styles/globals.css";

import type { Metadata } from "next";

import { ThemeProvider } from "~/components/theme-provider";
import { TRPCReactProvider } from "~/trpc/react";

export const metadata: Metadata = {
	title: "Brock Shaffer",
	description: "A guy who made a website",
	icons: [{ rel: "icon", url: "/favicon.svg" }],
};

export default function RootLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<ThemeProvider
			attribute="class"
			defaultTheme="light"
			disableTransitionOnChange
		>
			<TRPCReactProvider>
				<main className="custombackground flex min-h-svh flex-col">
					{children}
				</main>
			</TRPCReactProvider>
		</ThemeProvider>
	);
}
