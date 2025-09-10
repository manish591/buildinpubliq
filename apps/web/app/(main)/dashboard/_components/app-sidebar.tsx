import { getCurrentUser } from '@/app/data/users/verify-auth-session';
import { NavMain } from '@/app/(main)/dashboard/_components/nav-main';
import { NavSecondary } from '@/app/(main)/dashboard/_components/nav-secondary';
import { NavUser } from '@/app/(main)/dashboard/_components/nav-user';
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
import { redirect } from 'next/navigation';

export async function AppSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const user = await getCurrentUser();

  if (!user?.id) {
    redirect('/auth');
  }

  return (
    <Sidebar variant="inset" {...props} className="border-r">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
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
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain />
        <NavSecondary className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  );
}
