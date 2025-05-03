import { LogOut, User, Edit, Twitter, Linkedin } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
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

export default function Profile() {
  return (
    <div className="min-h-screen w-full bg-secondary/50 dark:bg-secondary/30">
      <header className="border-b border-foreground/10 z-10 sticky top-0 bg-background backdrop-blur-lg">
        <div className="flex items-center justify-between h-16 max-w-7xl px-4 mx-auto">
          <div className="flex items-center gap-2">
            <span className="font-bold text-xl">buildinpubliq</span>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  size="icon"
                  variant="outline"
                  className="bg-transparent hover:bg-transparent border-0"
                >
                  <Avatar className="h-8 w-8 rounded-full">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                side={'bottom'}
                align="end"
                sideOffset={4}
              >
                <DropdownMenuLabel className="p-0 font-normal">
                  <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                    <Avatar className="h-8 w-8 rounded-lg">
                      <AvatarImage src="https://github.com/shadcn.png" />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-semibold">manish</span>
                      <span className="truncate text-xs">manishdevrani777</span>
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="gap-2">
                  <User className="h-5 w-5" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="gap-2">
                  <LogOut className="h-5 w-5" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>
      <div className="w-full max-w-7xl mx-auto mt-10 px-4">
        <div className="flex flex-col sm:flex-row justify-between gap-6 sm:gap-0 sm:items-center mb-6">
          <div className="flex gap-4 items-center">
            <Avatar className="h-20 w-20">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-lg font-bold">manish devrani</p>
              <p className="text-slate-500 dark:text-slate-400 mt-1 text-sm">
                manishdevrani777@gmail.com
              </p>
            </div>
          </div>
          <div>
            <Button variant="outline">
              <Edit></Edit>
              <span>edit profile</span>
            </Button>
          </div>
        </div>
        <Card className="bg-background mt-6 overflow-hidden border-0 shadow-lg">
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
        </Card>
        <Card className="bg-background overflow-hidden border-0 shadow-lg mt-6">
          <CardHeader className="border-b pb-4">
            <CardTitle>Account Settings</CardTitle>
            <CardDescription>
              Manage your account settings and preferences
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="p-4 flex justify-between items-center">
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
