"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function InstallRepo() {
  return (
    <div className="mt-4 border py-4 text-center">
      <p className="text-sm w-[70%] mx-auto">You Must Install the Github Plugin to start Sharing Your Project Updates</p>
      <Button 
        variant="outline"
        className="border py-2 px-3 mt-4" 
        onClick={async () => {
        window.location.href = "https://github.com/apps/pravah-dev/installations/new";
        }}>
          <div className="flex items-center gap-2">
            <Image src="/github.svg" width={16} height={16} alt="github" className="w-4 h-4" />
            <span>Install Github Plugin</span>
          </div>
      </Button>
    </div>
  )
}