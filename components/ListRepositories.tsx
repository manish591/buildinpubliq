'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { getGithubRepositries, Repository } from '@/app/actions/github';
import { Input } from '@/components/ui/input';
import { Button } from './ui/button';
import { timeAgo } from '@/utils/date';
import { Loader } from '@/components/Loader';

interface ListRepositoriesProps {
  selectedRepo: Repository | null;
  setIsRepoSectionOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedRepo: React.Dispatch<React.SetStateAction<Repository | null>>;
}

export default function ListRepositories({
  setIsRepoSectionOpen,
  setSelectedRepo,
}: Readonly<ListRepositoriesProps>) {
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const filteredRepo = repositories.filter((repo) =>
    repo.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  useEffect(function () {
    (async function () {
      try {
        const repositories = await getGithubRepositries();
        setRepositories(repositories);
      } catch (err) {
        setRepositories([]);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div className="py-5 bg-background z-10 border absolute top-[100%] mt-4 w-full rounded-md">
      {loading ? (
        <div className="flex justify-center">
          <Loader />
        </div>
      ) : (
        <div>
          <div className="px-3">
            <Input
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
              }}
            />
          </div>
          {filteredRepo.length > 0 ? (
            <div className="h-32 px-5 overflow-auto flex flex-col mt-4 text-center">
              <div className="grid grid-cols-1 gap-2 mt-2">
                {filteredRepo.slice(0, 10).map((repo) => {
                  return (
                    <Button
                      variant="outline"
                      key={repo.id}
                      className="flex justify-start items-center gap-2 p-3 rounded-md text-sm bg-muted/40"
                      onClick={() => {
                        setSelectedRepo(repo);
                        setIsRepoSectionOpen(false);
                      }}
                    >
                      <Image
                        src="/github.svg"
                        width={16}
                        height={16}
                        alt="github"
                        className="w-5 h-5"
                      />
                      <h3>
                        {repo.owner.login} / {repo.name}
                      </h3>
                      <span className="mb-2 text-muted-foreground">.</span>
                      <p className="text-xs text-muted-foreground">
                        {timeAgo(new Date(repo.updated_at).getTime())}
                      </p>
                    </Button>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="py-4 pt-9">
              <p className="text-sm text-center">No repo found!</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
