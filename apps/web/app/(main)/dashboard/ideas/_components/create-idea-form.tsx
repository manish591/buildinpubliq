'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { createIdea } from '../actions';
import type React from 'react';

const formSchema = z.object({
  title: z.string(),
  content: z.string(),
});

export type CreateIdeaData = z.infer<typeof formSchema>;

export function CreateIdeaForm({
  setShowCreateIdeaModal,
}: Readonly<{
  setShowCreateIdeaModal: React.Dispatch<React.SetStateAction<boolean>>;
}>) {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      content: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await createIdea(values);
      setShowCreateIdeaModal(false);
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
            Create
          </Button>
        </div>
      </form>
    </Form>
  );
}
