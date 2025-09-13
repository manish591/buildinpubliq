'use client';

import { Layers, LayoutPanelLeft, Lightbulb } from 'lucide-react';
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';

const items = [
  {
    title: 'Overview',
    url: '/dashboard',
    icon: LayoutPanelLeft,
    isActive: true,
  },
  {
    title: 'Ideas',
    url: '/dashboard/ideas',
    icon: Lightbulb,
    isActive: true,
  },
  {
    title: 'Posts',
    url: '/dashboard/posts',
    icon: Layers,
  },
];

export function NavMain() {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Dashboard</SidebarGroupLabel>
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
