import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { getServerSession } from "next-auth";

import "./globals.css";
import SessionProvider from "@/components/SessionProvider";

const font = Poppins({ subsets: ["latin"], weight: ["400", "500", "600", "700"]});

export const metadata: Metadata = {
  title: "pravah",
  description: "build and find great people",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession();

  return (
    <html lang="en" className="dark">
      <body className={font.className}>
        <SessionProvider session={session}>
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
