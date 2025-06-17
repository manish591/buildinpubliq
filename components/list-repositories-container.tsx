'use client';

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { Repository } from '@/app/actions/github';
import { Button } from '@/components/ui/button';
import { ListRepositories } from '@/components/list-repositories';

export function ListRepositoriesContainer({
  value,
  onChange,
}: Readonly<{
  value: Repository | null;
  onChange: (val: Repository | null) => void;
}>) {
  const [isRepoSectionOpen, setIsRepoSectionOpen] = useState(false);

  return (
    <div className="space-y-2 relative">
      <div className="space-y-2">
        <Button
          type="button"
          onClick={() => {
            setIsRepoSectionOpen(!isRepoSectionOpen);
          }}
          variant="outline"
          className="w-full flex justify-between items-center bg-transparent hover:bg-transparent rounded-md px-3 py-2.5 text-sm"
        >
          <span className="text-muted-foreground">
            {value ? value.name : 'Select Repositories'}
          </span>
          <ChevronDown strokeWidth={1} className="w-5 h-5" />
        </Button>
      </div>
      {isRepoSectionOpen && (
        <ListRepositories
          setIsRepoSectionOpen={setIsRepoSectionOpen}
          selectedRepo={value}
          setSelectedRepo={onChange}
        />
      )}
    </div>
  );
}
