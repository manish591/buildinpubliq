'use client';

import { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { format } from 'date-fns';
import { ChevronDownIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { SocialPlatform, Status } from '@prisma/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

const formSchema = z.object({
  tagline: z.string().min(2).max(50),
  description: z.string().min(5).max(280),
  platform: z.array(z.nativeEnum(SocialPlatform)).min(1, {
    message: 'select atleast one channel',
  }),
  status: z.nativeEnum(Status),
  scheduledAt: z.date().optional(),
});

export type TProjectUpdate = z.infer<typeof formSchema> & {
  projectId: string;
  id: string;
};

export function ProjectUpdateForm({
  isLinkedinConnected,
  isTwitterConnected,
  defaultProjectUpdateData,
  onSubmitFunc,
  closeModal,
}: Readonly<{
  isTwitterConnected: boolean;
  isLinkedinConnected: boolean;
  defaultProjectUpdateData: TProjectUpdate;
  onSubmitFunc: (data: TProjectUpdate) => Promise<void>;
  closeModal: React.Dispatch<React.SetStateAction<boolean>>;
}>) {
  const [timeStr, setTimeStr] = useState<string>('00:00');

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      tagline: defaultProjectUpdateData.tagline,
      description: defaultProjectUpdateData.description,
      platform: defaultProjectUpdateData.platform,
      status: defaultProjectUpdateData.status,
      scheduledAt: defaultProjectUpdateData.scheduledAt,
    },
  });

  const statusValue = form.watch('status');
  const router = useRouter();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const postScheduledAt = values.scheduledAt;

    if (values.status === 'SCHEDULED' && !postScheduledAt) {
      form.setError('scheduledAt', {
        type: 'required',
        message: 'Please select scheduled date',
      });

      return;
    }

    if (
      values.status === 'SCHEDULED' &&
      postScheduledAt!.getTime() < new Date().getTime()
    ) {
      form.setError('scheduledAt', {
        type: 'min',
        message: 'Please select a future date',
      });

      return;
    }

    try {
      const data = {
        ...values,
        id: defaultProjectUpdateData.id,
        projectId: defaultProjectUpdateData.projectId,
      };
      console.log('the data', data);
      await onSubmitFunc(data);
      closeModal(false);
      router.refresh();
    } catch (err) {
      console.log('error occured while creating form', err);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="h-[350px] overflow-y-auto px-6 space-y-6 py-4">
          <FormField
            control={form.control}
            name="tagline"
            render={({ field }) => (
              <FormItem>
                <FormLabel>tagline</FormLabel>
                <FormControl>
                  <Input
                    placeholder="enter project update tagline"
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
                    placeholder="enter project update description"
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
            name="platform"
            render={() => (
              <FormItem>
                <FormLabel>platform</FormLabel>
                <div className="flex items-center space-x-4">
                  {Object.values(SocialPlatform).map((platform) => {
                    return (
                      <FormField
                        key={platform}
                        control={form.control}
                        name="platform"
                        render={({ field }) => {
                          return (
                            <FormItem className="flex items-center gap-2">
                              <FormControl>
                                <Checkbox
                                  disabled={
                                    platform === 'TWITTER'
                                      ? !isTwitterConnected
                                      : !isLinkedinConnected
                                  }
                                  checked={field.value.includes(platform)}
                                  onCheckedChange={(checked) =>
                                    checked
                                      ? field.onChange([
                                          ...field.value,
                                          platform,
                                        ])
                                      : field.onChange(
                                          field.value.filter(
                                            (val) => val != platform,
                                          ),
                                        )
                                  }
                                />
                              </FormControl>
                              <FormLabel className="!mt-0">
                                {platform}
                              </FormLabel>
                            </FormItem>
                          );
                        }}
                      />
                    );
                  })}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>status</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-[150px]">
                      <SelectValue
                        placeholder="select status"
                        className="lowercase"
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem
                      value={Status.DRAFT}
                      className="hover:bg-accent lowercase"
                    >
                      draft
                    </SelectItem>
                    <SelectItem
                      value={Status.SCHEDULED}
                      className="hover:bg-accent lowercase"
                    >
                      scheduled
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          {statusValue === 'SCHEDULED' && (
            <FormField
              control={form.control}
              name="scheduledAt"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <div className="flex gap-4">
                    <div className="flex flex-col gap-3">
                      <FormLabel htmlFor="date" className="px-1">
                        Date
                      </FormLabel>
                      <Popover modal={true}>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              id="date"
                              className="justify-between font-normal"
                            >
                              {format(field.value!, 'PPP')}
                              <ChevronDownIcon className="h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent
                          className="w-auto overflow-hidden p-0"
                          align="start"
                        >
                          <Calendar
                            mode="single"
                            selected={field.value}
                            disabled={{ before: new Date() }}
                            captionLayout="dropdown"
                            onSelect={field.onChange}
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                    <div className="flex flex-col gap-3">
                      <FormLabel htmlFor="time" className="px-1">
                        Time
                      </FormLabel>
                      <Input
                        type="time"
                        id="time"
                        value={timeStr}
                        onChange={(e) => {
                          const d = e.target.value.split(':');
                          const hours = parseInt(d[0]);
                          const minutes = parseInt(d[1]);
                          const currentDate = new Date(field.value!);
                          currentDate.setHours(hours);
                          currentDate.setMinutes(minutes);
                          field.onChange(currentDate);
                          setTimeStr(`${d[0]}:${d[1]}`);
                        }}
                        className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                      />
                    </div>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
        </div>
        <div className="flex items-center mt-6 pb-6 px-6">
          <Button
            variant="secondary"
            className="mr-auto"
            type="button"
            onClick={() => {
              closeModal(false);
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
