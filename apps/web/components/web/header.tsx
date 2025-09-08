import { ArrowRight, Menu } from 'lucide-react';
import Link from 'next/link';
import { ThemeToggle } from '@/components/theme-toggle';
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
    <header className="z-10 px-4 sticky top-0 backdrop-blur-lg">
      <div className="flex items-center h-16 max-w-5xl px-4 mx-auto gap-10">
        <AppLogo />
        <Sheet>
          <SheetTrigger className="block sm:hidden">
            <Menu></Menu>
          </SheetTrigger>
          <SheetContent side="bottom">
            <SheetHeader className="text-left">
              <SheetTitle>buildinpubliq</SheetTitle>
              <SheetDescription>
                share your work in the public to build your personal developer
                portfolio on social media.
              </SheetDescription>
            </SheetHeader>
            <nav className="ml-auto gap-4 sm:gap-6 items-center flex">
              <Link
                href="#how-it-works"
                className="text-sm font-medium hover:underline underline-offset-4"
                prefetch={false}
              >
                features
              </Link>
              <Link
                href="#benefits"
                className="text-sm font-medium hover:underline underline-offset-4"
                prefetch={false}
              >
                how it works
              </Link>
              <Link
                href="#contact"
                className="text-sm font-medium hover:underline underline-offset-4"
                prefetch={false}
              >
                blog
              </Link>
              <ThemeToggle />
            </nav>
          </SheetContent>
        </Sheet>
        <nav className="gap-4 sm:gap-6 items-center hidden sm:flex">
          <Link
            href="#"
            className="font-medium hover:underline underline-offset-4"
            prefetch={false}
          >
            features
          </Link>
          <Link
            href="#"
            className="font-medium hover:underline underline-offset-4"
            prefetch={false}
          >
            how it works
          </Link>
          <Link
            href="#"
            className="font-medium hover:underline underline-offset-4"
            prefetch={false}
          >
            blog
          </Link>
        </nav>
        <div className="ml-auto flex items-center gap-4">
          <Button variant="outline">login</Button>
          <Button>
            get started <ArrowRight />
          </Button>
        </div>
      </div>
    </header>
  );
}
