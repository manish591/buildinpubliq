'use client';

import { z } from 'zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Button } from './ui/button';
import { editProject } from '@/app/actions/projects';
import { toast } from 'sonner';

const formSchema = z.object({
  title: z.string().min(2).max(50),
  description: z.string().min(5).max(280),
});

export type TProject = z.infer<typeof formSchema> & {
  id: string;
};

export function EditProjectForm({
  defaultProjectData,
  setIsOpen,
}: Readonly<{
  defaultProjectData: TProject;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}>) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: defaultProjectData.title,
      description: defaultProjectData.description,
    },
  });

  const router = useRouter();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const { title, description } = values;
      await editProject(defaultProjectData.id, title, description);
      setIsOpen(false);
      router.refresh();
      toast.success('successfully edited the project');
      console.log('success occured while creating project');
    } catch (err) {
      toast.error('failed to edit the project');
      console.log('error occured while creating project', err);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>title</FormLabel>
              <FormControl>
                <Input placeholder="enter project title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="enter project description"
                  className="bg-transparent min-h-[100px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex items-center mt-6 pb-6">
          <Button
            variant="secondary"
            className="mr-auto"
            onClick={() => {
              setIsOpen(false);
            }}
          >
            Cancel
          </Button>
          <Button type="submit" className="ml-auto">
            submit
          </Button>
        </div>
      </form>
    </Form>
  );
}
