import Link from 'next/link';
import ThemeToggle from './ThemeToggle';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Menu } from 'lucide-react';

export default function Navbar() {
  return (
    <header className="border-b border-foreground/10 z-10 px-4 sticky top-0 backdrop-blur-lg">
      <div className="flex items-center justify-between h-16 max-w-7xl mx-auto">
        <div className="flex items-center justify-center">
          <span className="font-bold text-xl">buildinpubliq</span>
        </div>
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
                how it works
              </Link>
              <Link
                href="#benefits"
                className="text-sm font-medium hover:underline underline-offset-4"
                prefetch={false}
              >
                benefits
              </Link>
              <Link
                href="#contact"
                className="text-sm font-medium hover:underline underline-offset-4"
                prefetch={false}
              >
                contact
              </Link>
              <ThemeToggle />
            </nav>
          </SheetContent>
        </Sheet>
        <nav className="ml-auto gap-4 sm:gap-6 items-center hidden sm:flex">
          <Link
            href="#how-it-works"
            className="text-sm font-medium hover:underline underline-offset-4"
            prefetch={false}
          >
            how it works
          </Link>
          <Link
            href="#benefits"
            className="text-sm font-medium hover:underline underline-offset-4"
            prefetch={false}
          >
            benefits
          </Link>
          <Link
            href="#contact"
            className="text-sm font-medium hover:underline underline-offset-4"
            prefetch={false}
          >
            contact
          </Link>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
