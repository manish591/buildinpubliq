'use client';

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import ListRepositories from '@/components/ListRepositories';
import { Repository } from '@/app/actions/github';

interface ListRepositoriesContainerProps {
  selectedRepo: Repository | null;
  setSelectedRepo: React.Dispatch<React.SetStateAction<Repository | null>>;
}

export default function ListRepositoriesContainer({
  selectedRepo,
  setSelectedRepo,
}: Readonly<ListRepositoriesContainerProps>) {
  const [isRepoSectionOpen, setIsRepoSectionOpen] = useState(false);

  return (
    <div className="space-y-2 relative">
      <div className="space-y-2">
        <Label htmlFor="github-repo">GitHub Repository</Label>
        <Button
          onClick={() => {
            setIsRepoSectionOpen(!isRepoSectionOpen);
          }}
          variant="outline"
          className="w-full flex justify-between items-center bg-transparent hover:bg-transparent rounded-md px-3 py-2.5 text-sm"
        >
          <span className="text-muted-foreground">
            {selectedRepo ? selectedRepo.name : 'Select Repositories'}
          </span>
          <ChevronDown strokeWidth={1} className="w-5 h-5" />
        </Button>
      </div>
      {isRepoSectionOpen && (
        <ListRepositories
          setIsRepoSectionOpen={setIsRepoSectionOpen}
          selectedRepo={selectedRepo}
          setSelectedRepo={setSelectedRepo}
        />
      )}
    </div>
  );
}
