import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import Link from 'next/link';
import { IconBrandGithub } from '@tabler/icons-react';

const items = [
  {
    title: 'Repositories',
    url: '/dashboard/repositories',
    icon: IconBrandGithub,
  },
];

export function NavLibrary() {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Library</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <SidebarMenuItem key={item.title}>
            <SidebarMenuButton asChild>
              <Link href={item.url}>
                <item.icon />
                <span>{item.title}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
