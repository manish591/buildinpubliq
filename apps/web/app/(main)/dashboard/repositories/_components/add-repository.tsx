'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { addRepository } from '../../ideas/actions';

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
      <DialogContent className="p-0 gap-0">
        <DialogHeader className="px-6 py-4 border-b">
          <DialogTitle className="text-xl font-medium">
            Add Repository
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
