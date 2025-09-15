import { getCurrentUser } from '@/app/data/users/verify-auth-session';
import { Sidebar, SidebarMenu } from '@/components/ui/sidebar';
import { AppLogo } from '@/components/web/app-logo';
import { redirect } from 'next/navigation';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ExternalLink, LifeBuoy, LogOut, Send, Settings } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuGroup,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { AppSidebarSecondary } from './app-sidebar-secondary';
import { LogoutButton } from '@/components/general/logout-button';

export async function AppSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const user = await getCurrentUser();

  if (!user?.id) {
    redirect('/auth');
  }

  return (
    <Sidebar variant="inset" {...props} className="border-none pl-0">
      <div className="grid grid-cols-[60px_minmax(0,1fr)] h-full">
        <div className="h-full py-4 flex flex-col">
          <div className="flex justify-center">
            <AppLogo>
              <div className="bg-primary w-7 h-7 rounded-sm flex items-center justify-center">
                <span className="mt-[1px] font-bold text-white text-2xl text-shadow-[1.8px_1.8px_0px_rgba(0,0,0,1)]">
                  b
                </span>
              </div>
            </AppLogo>
          </div>
          <div className="mt-auto flex flex-col gap-6 items-center justify-center">
            <div className="flex flex-col gap-3">
              <Button asChild size="icon" variant="ghost">
                <Link href="/support">
                  <LifeBuoy className="w-4 h-4 text-foreground/60" />
                </Link>
              </Button>
              <Button asChild size="icon" variant="ghost">
                <Link href="/feedback">
                  <Send className="w-4 h-4 text-foreground/60" />
                </Link>
              </Button>
            </div>
            <SidebarMenu>
              <DropdownMenu>
                <DropdownMenuTrigger className="w-max mx-auto">
                  <Avatar className="h-8 w-8 rounded-full">
                    <AvatarImage
                      src={user.image ?? ''}
                      alt={user.name ?? 'profile image'}
                    />
                    <AvatarFallback className="rounded-lg">
                      {user.name?.at(0)}
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-[var(--radix-dropdown-menu-trigger-width)] min-w-56 rounded-lg"
                  align="end"
                  side="right"
                  sideOffset={4}
                >
                  <DropdownMenuLabel className="p-0 font-normal">
                    <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                      <Avatar className="h-8 w-8 rounded-full">
                        <AvatarImage
                          src={user.image ?? ''}
                          alt={user.name ?? 'profile image'}
                        />
                        <AvatarFallback className="rounded-lg">
                          {user.name?.at(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="grid flex-1 text-left text-sm leading-tight">
                        <span className="truncate font-medium">
                          {user.name}
                        </span>
                        <span className="truncate text-xs">{user.email}</span>
                      </div>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem
                      className="flex items-center gap-2 cursor-pointer"
                      asChild
                    >
                      <Link href="/settings/general">
                        <Settings className="w-4 h-4" />
                        Settings
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="flex items-center gap-2 cursor-pointer"
                      asChild
                    >
                      <Link
                        href="https://buildinpubliq.blogbee.site/"
                        target="blank"
                        rel="noreferrer"
                      >
                        <ExternalLink className="w-4 h-4" />
                        Blog
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <LogoutButton className="font-normal h-8 cursor-pointer">
                      <LogOut className="w-4 h-4" />
                      Log out
                    </LogoutButton>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenu>
          </div>
        </div>
        <AppSidebarSecondary />
      </div>
    </Sidebar>
  );
}
