import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import ThemeToggle from '@/components/ThemeToggle';
import { NavbarProfileDropdown } from '@/components/navbarProfileDropdown';

export default async function DashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await auth();
  const user = session?.user;

  if (!user) {
    return redirect('/login');
  }

  return (
    <div className="min-h-screen w-full bg-secondary/50 dark:bg-secondary/30">
      <header className="border-b border-foreground/10 z-10 sticky top-0 bg-background backdrop-blur-lg">
        <div className="flex items-center justify-between h-16 max-w-7xl px-4 mx-auto">
          <div className="flex items-center gap-2">
            <span className="font-bold text-xl">buildinpubliq</span>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <NavbarProfileDropdown
              name={user.name ?? ''}
              img={user.image ?? ''}
              email={user.email ?? ''}
            />
          </div>
        </div>
      </header>
      {children}
    </div>
  );
}
