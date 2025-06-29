import { redirect } from 'next/navigation';
import Link from 'next/link';
import { LogOut, Twitter, Linkedin, ChevronLeft } from 'lucide-react';
import { auth, signOut } from '@/auth';
import { getConnectedChannels } from '@/app/profile/actions';
import { ThemeToggle } from '@/components/theme-toggle';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { NavbarProfileDropdown } from '@/components/navbar-profile-dropdown';
import { ConnectLinkedin } from '@/components/connect-linkedin';
import { ConnectTwitter } from '@/components/connect-twitter';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default async function Profile() {
  const session = await auth();

  if (!session?.user) {
    return redirect('/auth');
  }

  const channelData = await getConnectedChannels(session.user.id ?? '');
  const isLinkedinConnected = channelData.find(
    (channel) =>
      channel.platform == 'LINKEDIN' && channel.expiresIn >= new Date(),
  );
  const isTwitterConnected = channelData.find(
    (channel) =>
      channel.platform == 'TWITTER' && channel.expiresIn >= new Date(),
  );

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
      <div className="w-full max-w-7xl mx-auto mt-8 px-4 pb-8">
        <Link href="/dashboard">
          <Button variant="outline">
            <ChevronLeft className="w-4 h-4" strokeWidth={2} />
            Dashboard
          </Button>
        </Link>
        <Card className="bg-background mt-6 overflow-hidden border-0 shadow-lg">
          <CardHeader className="border-b-2 pb-4">
            <CardTitle className="text-xl sm:text-2xl">
              connected channels
            </CardTitle>
            <CardDescription>
              Manage your connected social media accounts
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y">
              <div className="p-4 hover:bg-accent transition-colors">
                <div className="flex items-center justify-between gap-6">
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
                    {isTwitterConnected ? (
                      <span className="text-sm font-medium text-green-500">
                        connected
                      </span>
                    ) : (
                      <ConnectTwitter />
                    )}
                  </div>
                </div>
              </div>
              <div className="p-4 hover:bg-accent transition-colors">
                <div className="flex items-center justify-between gap-6">
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
                    {isLinkedinConnected ? (
                      <span className="text-sm font-medium text-green-500">
                        connected
                      </span>
                    ) : (
                      <ConnectLinkedin />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-background overflow-hidden border-0 shadow-lg mt-6">
          <CardHeader className="border-b pb-4">
            <CardTitle className="text-xl sm:text-2xl">
              Account Settings
            </CardTitle>
            <CardDescription>
              Manage your account settings and preferences
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="px-6 py-4 flex justify-between items-center gap-4">
              <div>
                <h3 className="font-medium text-base">
                  Log out from your account
                </h3>
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
