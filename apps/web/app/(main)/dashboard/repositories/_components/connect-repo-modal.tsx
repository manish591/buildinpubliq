'use client';

import { useRouter } from 'next/navigation';
import { Suspense, useCallback, useMemo, useState } from 'react';
import type React from 'react';
import { z } from 'zod';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { connectRepository } from '../actions';
import { Loader } from '@/components/general/loader';
import { useSuspenseQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';

export const repositorySchema = z.object({
  id: z.number(),
  full_name: z.string(),
  html_url: z.string(),
  default_branch: z.string(),
  updated_at: z.string(),
  language: z.string().nullable(),
  created_at: z.string(),
});

export type GithubRepository = z.infer<typeof repositorySchema>;

function ConnectRepoModalInner({
  setShowConnectRepoModal,
}: Readonly<{
  setShowConnectRepoModal: React.Dispatch<React.SetStateAction<boolean>>;
}>) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const { data, error } = useSuspenseQuery({
    queryKey: ['users-repos'],
    queryFn: async (): Promise<{
      status: number;
      data: GithubRepository[];
    }> => {
      const res = await fetch('/api/integrations/github/repos');
      const data = await res.json();
      return data;
    },
  });

  if (error) {
    return <p>Failed to load resource</p>;
  }

  const filteredRepoData = data.data.filter((repo) =>
    repo.full_name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  async function handleConnectRepo(repositoryData: GithubRepository) {
    try {
      await connectRepository(repositoryData);
      setShowConnectRepoModal(false);
      router.refresh();
    } catch (err) {
      console.log('Failed to connect repository', err);
    }
  }

  return (
    <>
      <DialogHeader className="px-6 py-4 border-b">
        <DialogTitle className="text-xl font-medium">
          Connect Repository
        </DialogTitle>
      </DialogHeader>
      <div className="px-6 py-6">
        <Input
          className="w-full mb-4"
          placeholder="Search repo.."
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
          }}
        />
        <div className="border rounded-md divide-y">
          {filteredRepoData.slice(0, 4).map((repo) => {
            return (
              <div key={repo.id} className="px-3 py-2">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-sm">{repo.full_name}</h3>
                  <Button
                    size="sm"
                    className="cursor-pointer"
                    onClick={() => {
                      handleConnectRepo(repo);
                    }}
                  >
                    Connect
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

function ConnectRepoModalLoader() {
  return (
    <div className="py-40 flex items-center justify-center">
      <Loader className="size-6" />
    </div>
  );
}

function ConnectRepoModal({
  showConnectRepoModal,
  setShowConnectRepoModal,
}: Readonly<{
  showConnectRepoModal: boolean;
  setShowConnectRepoModal: React.Dispatch<React.SetStateAction<boolean>>;
}>) {
  return (
    <Dialog open={showConnectRepoModal} onOpenChange={setShowConnectRepoModal}>
      <DialogContent className="p-0 gap-0">
        <Suspense fallback={<ConnectRepoModalLoader />}>
          <ConnectRepoModalInner
            setShowConnectRepoModal={setShowConnectRepoModal}
          />
        </Suspense>
      </DialogContent>
    </Dialog>
  );
}

export function useConnectRepoModal() {
  const [showConnectRepoModal, setShowConnectRepoModal] = useState(false);

  const connectRepoModalCallback = useCallback(() => {
    return (
      <ConnectRepoModal
        showConnectRepoModal={showConnectRepoModal}
        setShowConnectRepoModal={setShowConnectRepoModal}
      />
    );
  }, [showConnectRepoModal]);

  return useMemo(
    () => ({
      ConnectRepoModal: connectRepoModalCallback,
      setShowConnectRepoModal,
    }),
    [connectRepoModalCallback],
  );
}
