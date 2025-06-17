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
import { toast } from 'sonner';

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
  title: z.string(),
  description: z.string(),
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
    let isValidated = true;

    if (!values.title || values.title.length < 2 || values.title.length > 50) {
      form.setError('title', {
        type: 'required',
        message: 'title must be between 2 and 50 characters long.',
      });

      isValidated = false;
    }

    if (
      !values.description ||
      values.description.length < 10 ||
      values.description.length > 280
    ) {
      form.setError('description', {
        type: 'required',
        message: 'description must be between 10 and 280 characters long.',
      });

      isValidated = false;
    }

    if (!values.selectedRepo) {
      form.setError('selectedRepo', {
        type: 'required',
        message: 'gitHub repository selection is required.',
      });

      isValidated = false;
    }

    if (!isValidated) {
      console.log('fields validation failed');
      return;
    }

    try {
      const { title, description, selectedRepo } = values;
      await createProject(title, description, selectedRepo!);
      setIsOpen(false);
      router.refresh();
      toast.success('successfully created new project');
    } catch (err: any) {
      toast.error('failed to create new project', {
        description: err.message,
      });
      console.log('error occured while creating project', err);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="max-h-[350px] overflow-y-auto px-6 space-y-4">
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
        </div>
        <div className="flex items-center mt-6 px-6">
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
