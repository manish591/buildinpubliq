import './globals.css';
import { Manrope } from 'next/font/google';
import { auth } from '@/auth';
import { SessionProvider } from '@/components/session-provider';
import { ThemeProvider } from '@/components/theme-provider';
import { generateMetadata } from '@/lib/generateMetadata';

const font = Manrope({
  subsets: ['latin'],
  display: 'swap',
  weight: ['700', '500'],
});

export const metadata = generateMetadata();

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <html lang="en" className="lowercase">
      <body className={font.className}>
        <ThemeProvider attribute="class" defaultTheme="dark">
          <SessionProvider session={session}>{children}</SessionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
