'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { AppLogo } from '@/components/web/app-logo';
import { LifeBuoy, Plus, Send } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export function SiteHeader() {
  return (
    <header className="bg-background sticky top-0 z-50 flex w-full border-b">
      <div className="flex h-(--header-height) w-full gap-4 px-4">
        <AppLogo>
          <div className="bg-primary w-7 h-7 rounded-sm flex items-center justify-center">
            <span className="mt-[1px] font-bold text-white text-2xl text-shadow-[1.8px_1.8px_0px_rgba(0,0,0,1)]">
              b
            </span>
          </div>
          <div className="flex items-center justify-center">
            <span className="font-normal text-xl">buildinpubliq</span>
          </div>
        </AppLogo>
        <Separator orientation="vertical" className="mr-2 h-4" />
        <nav className="flex gap-4">
          <p className="text-lg font-medium text-primary px-3 flex items-center justify-center">
            overview
          </p>
          <p className="text-lg  px-3 flex items-center justify-center">
            ideas
          </p>
          <p className="text-lg  px-3 flex items-center justify-center">
            posts
          </p>
        </nav>
        <div className="ml-auto flex items-center gap-2">
          <Button>
            <Plus />
            New
          </Button>
          <Button variant="outline">
            <Send />
            Feedback
          </Button>
          <Link
            href="/feedback"
            className="h-8 px-2 flex items-center justify-center hover:bg-secondary"
          >
            <LifeBuoy className="size-5" />
          </Link>
          <Link href="/feedback" className="h-8 px-2">
            <Send className="size-5" />
          </Link>
          <Avatar className="w-9 h-9">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
}
