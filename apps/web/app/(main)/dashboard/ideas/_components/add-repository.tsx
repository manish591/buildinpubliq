'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import { addRepository } from '../actions';

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

export function AddRepository({
  repositoriesData,
  children,
}: Readonly<{
  repositoriesData: GithubRepository[];
  children: React.ReactNode;
}>) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const filteredRepoData = repositoriesData.filter((repo) =>
    repo.full_name.toLowerCase().includes(searchQuery.toLowerCase()),
  );
  const router = useRouter();

  async function handleAddRepo(repositoryData: GithubRepository) {
    try {
      await addRepository(repositoryData);
      setIsModalOpen(false);
      router.refresh();
    } catch (err) {
      console.log('error occured while creating project', err);
    }
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogTrigger className="w-full">{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add repository</DialogTitle>
          <DialogDescription>
            Fill out the form to add new repository
          </DialogDescription>
        </DialogHeader>
        <div>
          <Input
            className="w-full mb-4"
            placeholder="search repo.."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
            }}
          />
          <div className="border rounded-md divide-y">
            {filteredRepoData.slice(0, 4).map((repo) => {
              return (
                <div key={repo.id} className="px-3 py-3">
                  <div className="flex items-center justify-between gap-2">
                    <h3>{repo.full_name}</h3>
                    <Button
                      className="cursor-pointer"
                      onClick={() => {
                        handleAddRepo(repo);
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
      </DialogContent>
    </Dialog>
  );
}
