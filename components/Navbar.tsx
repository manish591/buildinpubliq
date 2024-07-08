import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  return (
    <header className="px-4 lg:px-6 h-14 flex items-center sticky top-0 bg-background/30 backdrop-blur-lg">
      <Link href="#" className="flex items-center justify-center" prefetch={false}>
        <span className="font-bold text-xl">builDD</span>
      </Link>
      <nav className="ml-auto flex gap-4 sm:gap-6 items-center">
        <Link href="#" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
          How It Works
        </Link>
        <Link href="#" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
          About
        </Link>
        <Link href="#" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
          Support
        </Link>
        <Link href="#" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
          Contact
        </Link>
        <ThemeToggle />
      </nav>
    </header>
  )
}