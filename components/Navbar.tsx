import Link from 'next/link';
import ThemeToggle from './ThemeToggle';

export default function Navbar() {
  return (
    <header className="z-10 px-4 lg:px-6 h-14 flex items-center sticky top-0 bg-background/30 backdrop-blur-lg">
      <div className="flex items-center justify-center">
        <span className="font-bold text-xl">buildinpubliq</span>
      </div>
      <nav className="ml-auto flex gap-4 sm:gap-6 items-center">
        <Link
          href="#"
          className="text-sm font-medium hover:underline underline-offset-4 hidden"
          prefetch={false}
        >
          How It Works
        </Link>
        <Link
          href="#"
          className="text-sm font-medium hover:underline underline-offset-4 hidden"
          prefetch={false}
        >
          About
        </Link>
        <Link
          href="#"
          className="text-sm font-medium hover:underline underline-offset-4 hidden"
          prefetch={false}
        >
          Support
        </Link>
        <Link
          href="#"
          className="text-sm font-medium hover:underline underline-offset-4 hidden"
          prefetch={false}
        >
          Contact
        </Link>
        <ThemeToggle />
      </nav>
    </header>
  );
}
