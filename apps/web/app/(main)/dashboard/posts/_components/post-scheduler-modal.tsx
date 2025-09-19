import {
  ChevronDown,
  Clock8,
  Calendar as CalendarIcon,
  CalendarClock,
} from 'lucide-react';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import React, { useState } from 'react';
import { parseDate } from 'chrono-node';

export function PostSchedulerModal({
  scheduledAt,
  setScheduledAt,
  setIsScheduledAtInPast,
}: Readonly<{
  scheduledAt: Date | null;
  setIsScheduledAtInPast: React.Dispatch<React.SetStateAction<boolean>>;
  setScheduledAt: React.Dispatch<React.SetStateAction<Date | null>>;
}>) {
  const [date, setDate] = useState<Date>(() => {
    return scheduledAt ?? new Date(Date.now() + 24 * 60 * 60 * 1000);
  });
  const [value, setValue] = useState(() => {
    return format(date, 'MMM d, yyyy, h:mm a');
  });
  const [time, setTime] = useState(() => {
    const now = date;
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const formatHours = hours < 10 ? `0${hours}` : hours;
    const formatMinutes = minutes < 10 ? `0${minutes}` : minutes;
    return `${formatHours}:${formatMinutes}`;
  });
  const [error, setError] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger>
        <Button size="sm" variant="ghost" className="h-6 px-2 -ml-2 gap-1">
          {scheduledAt
            ? format(scheduledAt, 'MMM d, h:mm a')
            : 'Set Date & Time'}
          <ChevronDown className="mt-[1px]" />
        </Button>
      </DialogTrigger>
      <DialogContent className="md:max-w-md p-0 py-4">
        <DialogHeader className="px-4">
          <DialogTitle className="font-medium">Schedule Post</DialogTitle>
        </DialogHeader>
        <div className="px-4 text-xs flex gap-2 items-center text-muted-foreground/80">
          <CalendarClock className="size-4" />
          <span>
            Will send on {format(date, "EEE, MMM d, yyyy 'at' h:mm a")}
          </span>
        </div>
        <div className="flex-col flex gap-4 mt-6 px-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="date" className="px-0.5 font-normal">
              Date
            </Label>
            <div className="relative flex gap-2">
              <Input
                value={value}
                placeholder="Tomorrow or next week"
                className="bg-background pr-10"
                onChange={(e) => {
                  setValue(e.target.value);
                  const date = parseDate(e.target.value);
                  if (date) {
                    const currentDate = date;
                    const [hours, minutes] = time.split(':');
                    currentDate.setHours(Number(hours));
                    currentDate.setMinutes(Number(minutes));
                    setDate(currentDate);
                    if (currentDate > new Date()) {
                      setError(false);
                    }
                  }
                }}
              />
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="ghost"
                    className="absolute top-1/2 right-2 size-6 -translate-y-1/2"
                  >
                    <CalendarIcon className="size-3.5" />
                    <span className="sr-only">Select date</span>
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  className="w-auto overflow-hidden p-0"
                  align="end"
                >
                  <Calendar
                    mode="single"
                    selected={date}
                    captionLayout="dropdown"
                    disabled={{
                      before: new Date(),
                    }}
                    onSelect={(date) => {
                      if (!date) return;
                      const [hours, minutes] = time.split(':');
                      date.setHours(Number(hours));
                      date.setMinutes(Number(minutes));
                      setDate(date);
                      setValue(format(date, 'MMM d, yyyy, h:mm a'));
                      if (date > new Date()) {
                        setError(false);
                      }
                    }}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
          <div className="mt-2 flex flex-col gap-2">
            <Label htmlFor="time-picker" className="px-0.5 font-normal">
              Time
            </Label>
            <div className="flex items-center gap-3 border rounded-md px-2">
              <Clock8 className="size-4 text-muted-foreground shrink-0" />
              <Input
                type="time"
                className={cn(
                  'bg-transparent appearance-none [&::-webkit-calendar-picker-indicator]:hidden',
                  '[&::-webkit-calendar-picker-indicator]:appearance-none shadow-none border-0',
                  'rounded-none px-0 focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0',
                )}
                value={time}
                onChange={(e) => {
                  const currentTime = e.target.value;
                  const currentDate = date ?? new Date();
                  const [hours, minutes] = currentTime.split(':');
                  currentDate.setHours(Number(hours));
                  currentDate.setMinutes(Number(minutes));
                  setTime(currentTime);
                  setDate(currentDate);
                  setValue(format(currentDate, 'MMM d, yyyy, h:mm a'));
                  if (currentDate > new Date()) {
                    setError(false);
                  }
                }}
              />
              <span className="text-xs font-medium text-muted-foreground/70">
                Asia/Calcutta
              </span>
            </div>
          </div>
          {error ? (
            <div className="text-destructive mt-0 text-sm">
              <p>Scheduled time cannot be in the past</p>
            </div>
          ) : null}
        </div>
        <div className="mt-4 flex items-center justify-end gap-3 px-4">
          <Button
            size="sm"
            onClick={() => {
              if (date < new Date()) {
                setError(true);
                return;
              }
              setScheduledAt(date);
              setIsOpen(false);
              setError(false);
              setIsScheduledAtInPast(false);
            }}
          >
            Confirm
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
