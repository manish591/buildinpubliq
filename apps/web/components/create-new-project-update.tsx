'use client';

import { CirclePlus, Link as LinkIcon } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { createNewUpdate } from '@/app/actions/updates';
import { ProjectUpdateForm } from '@/components/project-update-form';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from '@/components/ui/dialog';

export enum Status {
  DRAFT = 'DRAFT',
  SCHEDULED = 'SCHEDULED',
  PUBLISHED = 'PUBLISHED',
}

export function CreateNewUpdate({
  isLinkedinConnected,
  isTwitterConnected,
  projectId,
}: Readonly<{
  isLinkedinConnected: boolean;
  isTwitterConnected: boolean;
  projectId: string;
}>) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogTrigger>
        <Button variant="default" className="flex items-center gap-2">
          <CirclePlus strokeWidth={2} width={16} height={16} />
          <span>
            <span className="hidden sm:inline">create </span>new update
          </span>
        </Button>
      </DialogTrigger>
      <DialogContent className="p-0 max-w-[350px] sm:max-w-[450px] mt-4">
        <DialogHeader>
          {!isLinkedinConnected && !isTwitterConnected ? (
            <div className="py-4 rounded-md text-center">
              <p className="text-sm w-[80%] mx-auto text-muted-foreground">
                you have not connected social channels yet. connect channels to
                create new updates
              </p>
              <Link href="/profile">
                <Button variant="outline" className="border py-2 px-3 mt-4">
                  <div className="flex items-center gap-2">
                    <LinkIcon></LinkIcon>
                    <span>connect channels</span>
                  </div>
                </Button>
              </Link>
            </div>
          ) : (
            <div className="flex items-center md:col-start-2 md:col-span-2">
              <Card className="text-left w-full p-0 border-none shadow-none">
                <CardHeader className="pt-10">
                  <CardTitle>create new update</CardTitle>
                  <CardDescription>
                    fill out the form to create a new update.
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <ProjectUpdateForm
                    isLinkedinConnected={isLinkedinConnected}
                    isTwitterConnected={isTwitterConnected}
                    defaultProjectUpdateData={{
                      id: '',
                      tagline: '',
                      description: '',
                      platform: [],
                      projectId: projectId,
                      status: Status.DRAFT,
                      scheduledAt: new Date(new Date().setHours(0, 0, 0, 0)),
                    }}
                    onSubmitFunc={createNewUpdate}
                    closeModal={setIsModalOpen}
                  />
                </CardContent>
              </Card>
            </div>
          )}
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
