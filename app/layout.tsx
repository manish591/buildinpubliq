import type { Metadata } from "next";
import { Ubuntu_Mono } from "next/font/google";
import { getServerSession } from "next-auth";

import "./globals.css";
import SessionProvider from "@/components/SessionProvider";
import { ThemeProvider } from "@/components/ThemeProvider";

const font = Ubuntu_Mono({ subsets: ["latin"], weight: ["400", "700"] });

export const metadata: Metadata = {
  title: "Buildd",
  description: "Build Projects And Find Greate People On The Journey",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession();

  return (
    <html lang="en" className="capitalize">
      <body className={font.className}>
        <ThemeProvider attribute="class" defaultTheme="light">
          <SessionProvider session={session}>
            {children}
          </SessionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
