'use client';

import { LogOut, User } from 'lucide-react';
import Link from 'next/link';
import { signOut } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export type NavbarProfileDropdownProps = {
  img: string;
  name: string;
  email: string;
};

export function NavbarProfileDropdown({
  img,
  name,
  email,
}: Readonly<NavbarProfileDropdownProps>) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          size="icon"
          variant="outline"
          className="bg-transparent hover:bg-transparent border-0"
        >
          <Avatar className="h-8 w-8 rounded-full">
            <AvatarImage src={img} />
            <AvatarFallback>{name.length > 0 ? name[0] : 'U'}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-[--radix-dropdown-menu-trigger-width] min-w-44 rounded-lg"
        side={'bottom'}
        align="end"
        sideOffset={4}
      >
        <DropdownMenuLabel className="p-0 font-normal">
          <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
            <Avatar className="h-8 w-8 rounded-full">
              <AvatarImage src={img} />
              <AvatarFallback>{name.length > 0 ? name[0] : 'U'}</AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-semibold">{name}</span>
              <span className="truncate text-xs">{email}</span>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="gap-2">
          <Link href="/profile" className="flex items-center gap-2">
            <User className="h-5 w-5" />
            <span>Profile</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="gap-2">
          <Button
            onClick={() => {
              signOut();
            }}
            className="h-6 p-0 bg-transparent hover:bg-transparent text-foreground"
          >
            <LogOut className="h-5 w-5" />
            Log out
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
