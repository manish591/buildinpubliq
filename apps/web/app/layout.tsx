import './globals.css';
import { Jost } from 'next/font/google';
import { generateMetadata } from '@/lib/generateMetadata';
import Providers from './providers';

const font = Jost({
  subsets: ['latin'],
  display: 'swap',
});

export const metadata = generateMetadata();

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={font.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
