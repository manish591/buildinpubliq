import { MoveLeft } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="grid min-h-full place-items-center">
      <div className="text-center">
        <p className="text-base font-semibold">404</p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">Page not found</h1>
        <p className="mt-6 text-base leading-7 text-gray-600">Sorry, we couldn’t find the page you’re looking for.</p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link href="/">
            <Button
              variant="outline"
              className="rounded-md px-3.5 py-2.5 text-sm flex items-center gap-3"
            >
              <MoveLeft />
              <span>Back To Home</span>
            </Button>
          </Link>
        </div>
      </div>
    </main>
  )
}
