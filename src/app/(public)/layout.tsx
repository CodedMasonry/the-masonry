import "~/styles/globals.css";

import { type Metadata } from "next";

import { TRPCReactProvider } from "~/trpc/react";
import { ThemeProvider } from "~/components/theme-provider";
import { Navbar } from "~/components/navbar";
import Footer from "~/components/footer";
import { ProfessionalSection } from "~/lib/routing";

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
        <Navbar />

        <main className="custombackground flex min-h-svh flex-col">
          {children}
        </main>

        <Footer />
      </TRPCReactProvider>
    </ThemeProvider>
  );
}
