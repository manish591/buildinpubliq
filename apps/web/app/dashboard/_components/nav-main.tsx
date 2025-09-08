'use client';

import {
  Clock10,
  FolderKanban,
  Layers,
  LayoutPanelLeft,
  StickyNote,
  UserRoundCog,
} from 'lucide-react';
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';

const items = [
  {
    title: 'overview',
    url: '/dashboard',
    icon: LayoutPanelLeft,
    isActive: true,
  },
  {
    title: 'projects',
    url: '/dashboard/projects',
    icon: FolderKanban,
    isActive: true,
  },
  {
    title: 'New Post',
    url: '/dashboard/new-post',
    icon: StickyNote,
  },
  {
    title: 'posts',
    url: '/dashboard/posts',
    icon: Layers,
  },
  {
    title: 'Scheduled',
    url: '/dashboard/scheduled',
    icon: Clock10,
  },
  {
    title: 'accounts',
    url: '/dashboard/accounts',
    icon: UserRoundCog,
  },
];

export function NavMain() {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>dashboard</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <SidebarMenuItem key={item.title}>
            <SidebarMenuButton asChild tooltip={item.title}>
              <a href={item.url}>
                <item.icon />
                <span>{item.title}</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
