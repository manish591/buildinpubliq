'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
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
import { Button } from '@/components/ui/button';
import { createProject } from '@/app/(main)/dashboard/(pages)/projects/actions';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Check, ChevronsUpDown } from 'lucide-react';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { cn } from '@/lib/utils';

export const repositorySchema = z.object({
  id: z.number(),
  full_name: z.string(),
  html_url: z.string(),
  default_branch: z.string(),
  updated_at: z.string(),
  language: z.string().nullable(),
  created_at: z.string(),
});

const formSchema = z.object({
  title: z.string(),
  description: z.string(),
  repository: z.string().optional(),
});

export type CreateProjectData = z.infer<typeof formSchema>;
export type GithubRepository = z.infer<typeof repositorySchema>;

export function CreateProjectForm({
  repositoriesData,
}: Readonly<{ repositoriesData: GithubRepository[] }>) {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
      repository: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const selectedRepo = repositoriesData.find(
        (repo) => repo.full_name === values.repository,
      );
      await createProject({
        title: values.title,
        description: values.description,
        selectedRepo,
      });
      router.push('/dashboard/projects');
    } catch (err) {
      toast.error('failed to create new project');
      console.log('error occured while creating project', err);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="max-h-[350px] overflow-y-auto space-y-4">
          <FormField
            control={form.control}
            name="repository"
            render={({ field }) => (
              <FormItem>
                <FormLabel>github repository</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        className={cn(
                          'w-full justify-between bg-transparent text-sm font-normal!',
                          field.value
                            ? 'text-foreground'
                            : 'text-foreground/70',
                        )}
                      >
                        {field.value ? field.value : 'select github repository'}
                        <ChevronsUpDown className="opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-xl p-0">
                    <Command>
                      <CommandInput
                        placeholder="Search framework..."
                        className="h-9"
                      />
                      <CommandList>
                        <CommandEmpty>No framework found.</CommandEmpty>
                        <CommandGroup>
                          {repositoriesData.map((repo) => {
                            return (
                              <CommandItem
                                key={repo.id}
                                value={repo.full_name}
                                onSelect={() => {
                                  form.setValue('repository', repo.full_name);
                                }}
                              >
                                {repo.full_name}
                                <Check
                                  className={cn(
                                    'ml-auto',
                                    field.value === repo.full_name
                                      ? 'opacity-100'
                                      : 'opacity-0',
                                  )}
                                />
                              </CommandItem>
                            );
                          })}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>title</FormLabel>
                <FormControl>
                  <Input
                    placeholder="enter project title"
                    className="bg-transparent"
                    {...field}
                  />
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
        </div>
        <div className="flex items-center mt-6">
          <Button type="submit" className="ml-auto">
            submit
          </Button>
        </div>
      </form>
    </Form>
  );
}
