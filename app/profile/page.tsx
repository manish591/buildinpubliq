import { auth, signOut } from '@/auth';
import { redirect } from 'next/navigation';
import { LogOut, Edit, Twitter, Linkedin } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import ThemeToggle from '@/components/ThemeToggle';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { NavbarProfileDropdown } from '@/components/navbarProfileDropdown';

export default async function Profile() {
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
      <div className="w-full max-w-7xl mx-auto mt-10 px-4">
        <div className="flex flex-col sm:flex-row justify-between gap-6 sm:gap-0 sm:items-center mb-6">
          <div className="flex gap-4 items-center">
            <Avatar className="h-20 w-20">
              <AvatarImage src={user.image ?? ''} />
              <AvatarFallback>{user.name ? user.name[0] : 'U'}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-lg font-bold">{user.name ?? ''}</p>
              <p className="text-slate-500 dark:text-slate-400 mt-1 text-sm">
                {user.email ?? ''}
              </p>
            </div>
          </div>
          <div>
            {/* <Button variant="outline">
              <Edit></Edit>
              <span>edit profile</span>
            </Button> */}
          </div>
        </div>
        {/* <Card className="bg-background mt-6 overflow-hidden border-0 shadow-lg">
          <CardHeader className="border-b-2 pb-4">
            <CardTitle>Connected Accounts</CardTitle>
            <CardDescription>
              Manage your connected social media accounts
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y">
              <div className="p-4 hover:bg-accent transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-full">
                      <Twitter className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-medium">Twitter</h3>
                      <p className="text-xs text-foreground/50">
                        Connect to schedule and publish tweets
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-medium text-slate-500">
                      Disconnected
                    </span>
                  </div>
                </div>
              </div>
              <div className="p-4 hover:bg-accent transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-full">
                      <Linkedin className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-medium">LinkedIn</h3>
                      <p className="text-xs text-foreground/50">
                        Connect to share posts to your profile
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-medium text-slate-500">
                      Disconnected
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card> */}
        <Card className="bg-background overflow-hidden border-0 shadow-lg mt-6">
          <CardHeader className="border-b pb-4">
            <CardTitle>Account Settings</CardTitle>
            <CardDescription>
              Manage your account settings and preferences
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="px-6 py-4 flex justify-between items-center">
              <div>
                <h3 className="font-medium">Log out from your account</h3>
                <p className="text-xs text-foreground/50">
                  Sign out from the application on this device
                </p>
              </div>
              <Button
                variant="destructive"
                className="flex items-center gap-2"
                size="sm"
                onClick={async () => {
                  'use server';
                  await signOut();
                }}
              >
                <LogOut size={16} />
                <span>Logout</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
