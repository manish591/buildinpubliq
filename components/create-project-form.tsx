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
import { ListRepositoriesContainer } from './list-repositories-container';
import { Button } from './ui/button';
import { createProject } from '@/app/actions/projects';

export const repositorySchema = z.object({
  id: z.number(),
  name: z.string(),
  full_name: z.string(),
  private: z.boolean(),
  owner: z.object({
    login: z.string(),
    id: z.number(),
    avatar_url: z.string(),
    html_url: z.string(),
  }),
  html_url: z.string(),
  description: z.string().nullable(),
  fork: z.boolean(),
  created_at: z.string(),
  updated_at: z.string(),
  pushed_at: z.string(),
  stargazers_count: z.number(),
  watchers_count: z.number(),
  language: z.string().nullable(),
  forks_count: z.number(),
  open_issues_count: z.number(),
  default_branch: z.string(),
});

const formSchema = z.object({
  title: z.string().min(2).max(50),
  description: z.string().min(5).max(280),
  selectedRepo: repositorySchema.nullable(),
});

export type TProject = z.infer<typeof formSchema> & {
  id: string;
};

export function CreateProjectForm({
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
      selectedRepo: defaultProjectData.selectedRepo,
    },
  });

  const router = useRouter();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!values.selectedRepo) {
      console.log('selected repo is empty');
      return;
    }

    try {
      const { title, description, selectedRepo } = values;
      await createProject(title, description, selectedRepo);
      setIsOpen(false);
      router.refresh();
    } catch (err) {
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
        <FormField
          control={form.control}
          name="selectedRepo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>github repository</FormLabel>
              <ListRepositoriesContainer {...field} />
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex items-center mt-6 pb-6 px-6">
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
