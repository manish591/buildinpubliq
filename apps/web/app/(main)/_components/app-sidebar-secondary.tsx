'use client';

import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { AppLogo } from '@/components/web/app-logo';
import { cn } from '@/lib/utils';
import { NavMain } from './nav-main';
import { NavSettings } from './nav-settings';

export function AppSidebarSecondary() {
  const pathname = usePathname();

  return (
    <div className="h-full bg-background/60 rounded-[10px] overflow-hidden">
      <div
        className={cn(
          'w-[200%] grid grid-cols-2 h-full transition-transform',
          pathname.includes('settings') ? '-translate-x-6/12' : 'translate-x-0',
        )}
      >
        <div>
          <SidebarHeader>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  size="lg"
                  asChild
                  className="hover:bg-transparent"
                >
                  <AppLogo>
                    <div className="flex items-center justify-center">
                      <span className="font-light text-xl">Buildinpubliq</span>
                    </div>
                  </AppLogo>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarHeader>
          <SidebarContent>
            <NavMain />
          </SidebarContent>
          <SidebarFooter></SidebarFooter>
        </div>
        <div>
          <SidebarHeader>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  size="lg"
                  asChild
                  className="hover:bg-transparent cursor-pointer active:bg-transparent"
                >
                  <Link
                    href="/dashboard/posts"
                    className="flex items-center justify-start gap-4 group/sidebar"
                  >
                    <div className="h-6 w-6 flex items-center justify-center">
                      <ChevronLeft
                        strokeWidth={2}
                        className="w-4 h-4 text-foreground/60 group-hover/sidebar:text-foreground"
                      />
                    </div>
                    <span className="font-medium text-xl">Settings</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarHeader>
          <SidebarContent>
            <NavSettings />
          </SidebarContent>
          <SidebarFooter></SidebarFooter>
        </div>
      </div>
    </div>
  );
}
