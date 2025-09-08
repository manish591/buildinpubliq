'use client';

import {
  Clock10,
  FolderKanban,
  Layers,
  LifeBuoy,
  Send,
  StickyNote,
  UserRoundCog,
} from 'lucide-react';
import { NavMain } from '@/app/dashboard/_components/nav-main';
import { NavSecondary } from '@/app/dashboard/_components/nav-secondary';
import { NavUser } from '@/app/dashboard/_components/nav-user';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { AppLogo } from '@/components/web/app-logo';

const data = {
  user: {
    name: 'shadcn',
    email: 'm@example.com',
    avatar: '/avatars/shadcn.jpg',
  },
  navMain: [
    {
      title: 'projects',
      url: '#',
      icon: FolderKanban,
      isActive: true,
    },
    {
      title: 'New Post',
      url: '#',
      icon: StickyNote,
    },
    {
      title: 'posts',
      url: '#',
      icon: Layers,
    },
    {
      title: 'Scheduled',
      url: '#',
      icon: Clock10,
    },
    {
      title: 'accounts',
      url: '#',
      icon: UserRoundCog,
    },
  ],
  navSecondary: [
    {
      title: 'Support',
      url: '#',
      icon: LifeBuoy,
    },
    {
      title: 'Feedback',
      url: '#',
      icon: Send,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <AppLogo>
                <div className="bg-primary w-7 h-7 rounded-sm flex items-center justify-center">
                  <span className="mt-[1px] font-bold text-white text-2xl text-shadow-[1.5px_1.5px_0px_rgba(0,0,0,1)]">
                    b
                  </span>
                </div>
                <div className="flex items-center justify-center">
                  <span className="font-normal text-xl">buildinpubliq</span>
                </div>
              </AppLogo>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
