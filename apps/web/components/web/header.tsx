import { IconArrowRight, IconMenu3 } from '@tabler/icons-react';
import Link from 'next/link';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { AppLogo } from '@/components/web/app-logo';
import { Button } from '../ui/button';

export function Header() {
  return (
    <header className="z-10 sticky top-0 backdrop-blur-lg">
      <div className="flex items-center h-16 max-w-6xl px-4 mx-auto gap-10">
        <AppLogo>
          <AppLogo.LogoIcon>
            <span className="mt-[1px] font-bold text-white text-2xl text-shadow-[1.5px_1.5px_0px_rgba(0,0,0,1)]">
              b
            </span>
          </AppLogo.LogoIcon>
          <AppLogo.AppName className="font-medium text-xl">
            Buildinpubliq
          </AppLogo.AppName>
        </AppLogo>
        <Sheet>
          <SheetTrigger className="block sm:hidden ml-auto">
            <IconMenu3 />
          </SheetTrigger>
          <SheetContent side="bottom">
            <SheetHeader className="text-left">
              <SheetTitle>
                <AppLogo>
                  <AppLogo.LogoIcon>
                    <span className="mt-[1px] font-bold text-white text-2xl text-shadow-[1.5px_1.5px_0px_rgba(0,0,0,1)]">
                      b
                    </span>
                  </AppLogo.LogoIcon>
                  <AppLogo.AppName className="font-medium text-xl">
                    Buildinpubliq
                  </AppLogo.AppName>
                </AppLogo>
              </SheetTitle>
              <SheetDescription className="sr-only">
                Mobile header
              </SheetDescription>
            </SheetHeader>
            <nav className="mt-6 gap-2 flex flex-col">
              <Link href="#features" className="text-base font-medium">
                Features
              </Link>
              <Link href="#integrations" className="text-base font-medium">
                Integrations
              </Link>
              <Link
                href="https://buildinpubliq.blogbee.site"
                target="_blank"
                className="text-base font-medium"
              >
                Blog
              </Link>
            </nav>
            <div className="mt-6 flex flex-col gap-2">
              <Button
                variant="outline"
                size="sm"
                className="cursor-pointer"
                asChild
              >
                <Link href="/auth">Login</Link>
              </Button>
              <Button size="sm" className="cursor-pointer" asChild>
                <Link href="/auth">
                  Get Started <IconArrowRight />
                </Link>
              </Button>
            </div>
          </SheetContent>
        </Sheet>
        <nav className="gap-4 sm:gap-8 items-center hidden sm:flex mt-[2px]">
          <Link
            href="#features"
            className="font-normal hover:opacity-80 transition-opacity"
          >
            Features
          </Link>
          <Link
            href="#integrations"
            className="font-normal hover:opacity-80 transition-opacity"
          >
            Integrations
          </Link>
          <Link
            href="https://buildinpubliq.blogbee.site"
            target="_blank"
            className="font-normal hover:opacity-80 transition-opacity"
          >
            Blog
          </Link>
        </nav>
        <div className="ml-auto hidden sm:flex items-center gap-4">
          <Button
            variant="outline"
            size="sm"
            className="cursor-pointer"
            asChild
          >
            <Link href="/auth">Login</Link>
          </Button>
          <Button size="sm" className="cursor-pointer" asChild>
            <Link href="/auth">
              Get Started <IconArrowRight />
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
