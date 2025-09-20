'use client';

import type React from 'react';
import { useCallback, useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { editIdea } from '../actions';

const formSchema = z.object({
  title: z.string(),
  content: z.string(),
});

export type EditIdeaData = z.infer<typeof formSchema> & {
  id: string;
};

function EditIdeaForm({
  defaultValues,
  setShowEditIdeaModal,
}: Readonly<{
  defaultValues: { id: string; title: string; content: string };
  setShowEditIdeaModal: React.Dispatch<React.SetStateAction<boolean>>;
}>) {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: defaultValues.title,
      content: defaultValues.content,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await editIdea({
        id: defaultValues.id,
        ...values,
      });
      setShowEditIdeaModal(false);
      router.refresh();
    } catch (err) {
      console.log('Error while creating the form', err);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="space-y-4 px-6 py-6 max-h-[320px] overflow-y-auto">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Enter title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Content</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Enter content"
                    className="min-h-[150px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex justify-end bg-muted border-t px-6 py-4 rounded-b-xl">
          <Button type="submit" size="sm" className="cursor-pointer">
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
}

function EditIdeaModal({
  showEditIdeaModal,
  setShowEditIdeaModal,
  defaultValues,
}: Readonly<{
  showEditIdeaModal: boolean;
  setShowEditIdeaModal: React.Dispatch<React.SetStateAction<boolean>>;
  defaultValues: { id: string; title: string; content: string };
}>) {
  return (
    <Dialog open={showEditIdeaModal} onOpenChange={setShowEditIdeaModal}>
      <DialogContent className="md:max-w-lg p-0 gap-0 rounded-xl">
        <DialogHeader className="py-4 px-6 border-b">
          <DialogTitle className="text-xl font-medium">Edit Idea</DialogTitle>
        </DialogHeader>
        <EditIdeaForm
          defaultValues={defaultValues}
          setShowEditIdeaModal={setShowEditIdeaModal}
        />
      </DialogContent>
    </Dialog>
  );
}

export function useEditPostModal({
  defaultValues,
}: {
  defaultValues: { id: string; title: string; content: string };
}) {
  const [showEditIdeaModal, setShowEditIdeaModal] = useState(false);

  const editIdeaModalCallback = useCallback(() => {
    return (
      <EditIdeaModal
        defaultValues={defaultValues}
        showEditIdeaModal={showEditIdeaModal}
        setShowEditIdeaModal={setShowEditIdeaModal}
      />
    );
  }, [showEditIdeaModal, defaultValues]);

  return useMemo(
    () => ({
      EditIdeaModal: editIdeaModalCallback,
      setShowEditIdeaModal: setShowEditIdeaModal,
    }),
    [editIdeaModalCallback],
  );
}
