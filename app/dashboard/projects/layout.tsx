import { redirect } from 'next/navigation';
import { auth } from '@/auth';
import { Sidebar } from '@/components/dashboard/Sidebar';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { AvatarFallback } from '@radix-ui/react-avatar';
import { Menu } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

export default async function DashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await auth();
  const user = session?.user;

  if (!user) {
    return redirect('/login');
  }

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-[200px_1fr]">
      <div className="hidden md:block">
        <Sidebar>
          <div className="text-center flex items-center gap-4 hover:bg-muted p-2 transition rounded-md">
            <Avatar className="h-[2rem] w-[2rem] bg-primary text-background">
              <AvatarImage src={user.image ?? ''} />
              <AvatarFallback>{user.name ? user.name[0] : '1'}</AvatarFallback>
            </Avatar>
            <span className="truncate">{user.name}</span>
          </div>
        </Sidebar>
      </div>
      <main className="relative w-full bg-background container py-3">
        <div className="md:hidden gap-4 pb-6">
          <Sheet>
            <SheetTrigger>
              <Menu className="md:hidden" />
            </SheetTrigger>
            <SheetContent side="left">
              <Sidebar>
                <div className="text-center flex items-center gap-4 hover:bg-muted p-2 transition rounded-md">
                  <Avatar className="h-[2rem] w-[2rem] bg-primary text-background">
                    <AvatarImage src={user.image ?? ''} />
                    <AvatarFallback>
                      {user.name ? user.name[0] : '1'}
                    </AvatarFallback>
                  </Avatar>
                  <span className="truncate">{user.name}</span>
                </div>
              </Sidebar>
            </SheetContent>
          </Sheet>
        </div>
        <div>{children}</div>
      </main>
    </div>
  );
}
