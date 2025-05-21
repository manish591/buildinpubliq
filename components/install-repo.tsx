'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';

export function InstallRepo() {
  return (
    <div className="py-4 rounded-md text-center">
      <p className="text-sm w-[80%] mx-auto text-muted-foreground">
        install the github plugin to create the project updates.
      </p>
      <Button
        variant="outline"
        className="border py-2 px-3 mt-4"
        onClick={async () => {
          window.location.href = `https://github.com/apps/${process.env.NEXT_PUBLIC_GITHUB_APP_NAME}/installations/new`;
        }}
      >
        <div className="flex items-center gap-2">
          <Image
            src="/github.svg"
            width={16}
            height={16}
            alt="github"
            className="w-4 h-4"
          />
          <span>install github plugin</span>
        </div>
      </Button>
    </div>
  );
}
