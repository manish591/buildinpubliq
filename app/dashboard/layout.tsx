import Link from 'next/link';
import { redirect } from 'next/navigation';
import { auth } from '@/auth';
import { ThemeToggle } from '@/components/theme-toggle';
import { NavbarProfileDropdown } from '@/components/navbar-profile-dropdown';

export default async function DashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await auth();

  if (!session?.user) {
    return redirect('/auth');
  }

  return (
    <div className="min-h-screen w-full bg-secondary/50 dark:bg-secondary/30">
      <header className="border-b border-foreground/10 z-10 sticky top-0 bg-background backdrop-blur-lg">
        <div className="flex items-center justify-between h-16 max-w-7xl px-4 mx-auto">
          <div className="flex items-center gap-2">
            <Link href="/" className="font-bold text-xl">
              buildinpubliq
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <NavbarProfileDropdown
              name={session.user.name ?? ''}
              img={session.user.image ?? ''}
              email={session.user.email ?? ''}
            />
          </div>
        </div>
      </header>
      {children}
    </div>
  );
}
