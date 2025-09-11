'use client';

import { Layers, LayoutPanelLeft, Lightbulb, UserRoundCog } from 'lucide-react';
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
    title: 'ideas',
    url: '/dashboard/ideas',
    icon: Lightbulb,
    isActive: true,
  },
  {
    title: 'posts',
    url: '/dashboard/posts',
    icon: Layers,
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
