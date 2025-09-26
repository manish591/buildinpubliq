import { AppLogo } from '@/components/web/app-logo';

export default function OnboardingLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="bg-sidebar w-full min-h-svh p-2 grid grid-cols-1 md:grid-cols-[300px_minmax(0,1fr)] border">
      <div className="h-screen hidden sm:block">
        <div className="px-4 py-4 pb-6 fixed flex flex-col h-screen">
          <AppLogo>
            <AppLogo.LogoIcon>
              <span className="mt-[1px] font-bold text-white text-2xl text-shadow-[1.5px_1.5px_0px_rgba(0,0,0,1)]">
                b
              </span>
            </AppLogo.LogoIcon>
            <AppLogo.AppName>
              <span className="font-normal! text-xl">buildinpubliq</span>
            </AppLogo.AppName>
          </AppLogo>
          <div className="mt-auto">
            <p className="text-muted-foreground/80 text-xs">Support</p>
            <p className="text-sm font-medium mt-1">
              manishdevrani777@gmail.com
            </p>
          </div>
        </div>
      </div>
      <div className="h-full border rounded-xl bg-background">
        <div className="max-w-2xl mx-auto h-full py-8 px-4 md:py-24">
          {children}
        </div>
      </div>
    </div>
  );
}
