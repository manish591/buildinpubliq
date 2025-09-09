'use client';

import { CirclePlus } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from '@/components/ui/dialog';

export function InstallGithubIntegration() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  function handleInstallGithubIntegration() {
    const githubAppName = process.env.NEXT_PUBLIC_GITHUB_APP_NAME;
    window.location.href = `https://github.com/apps/${githubAppName}/installations/new`;
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogTrigger>
        <Button variant="default" className="flex items-center gap-2">
          <CirclePlus strokeWidth={2} width={16} height={16} />
          <span>Create New Project</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="px-0">
        <DialogHeader>
          <div className="py-4 rounded-md text-center">
            <p className="text-sm w-[80%] mx-auto text-muted-foreground">
              install the github plugin to create the project updates.
            </p>
            <Button
              variant="outline"
              className="border py-2 px-3 mt-4"
              onClick={handleInstallGithubIntegration}
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
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
