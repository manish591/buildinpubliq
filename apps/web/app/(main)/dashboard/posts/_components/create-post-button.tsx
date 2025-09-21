'use client';

import { IconPlus } from '@tabler/icons-react';
import { Button } from '@/components/ui/button';
import { useCreatePostModal } from './create-post-modal';

export function CreatePostButton() {
  const { CreatePostModal, setShowCreatePostModal } = useCreatePostModal();

  return (
    <>
      <Button
        className="gap-2 cursor-pointer"
        onClick={() => {
          setShowCreatePostModal(true);
        }}
      >
        <IconPlus className="h-4 w-4" />
        Create Post
      </Button>
      <CreatePostModal />
    </>
  );
}
