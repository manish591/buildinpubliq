'use client';

import { ChevronDown, Clock8 } from 'lucide-react';
import { useState } from 'react';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';

export function PostDatetimePicker({
  disabled,
  scheduledAt,
  setScheduledAt,
}: Readonly<{
  disabled?: boolean;
  scheduledAt: Date | null;
  setScheduledAt: React.Dispatch<React.SetStateAction<Date | null>>;
}>) {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [time, setTime] = useState(() => {
    const now = new Date();
    const hours = (now.getHours() + 1) % 24;
    const minutes = now.getMinutes();
    const formatHours = hours < 10 ? `0${hours}` : hours;
    const formatMinutes = minutes < 10 ? `0${minutes}` : minutes;
    return `${formatHours}:${formatMinutes}`;
  });

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          size="sm"
          variant="ghost"
          className="h-6 px-2 -ml-2 gap-1"
          disabled={disabled}
        >
          {scheduledAt
            ? format(scheduledAt, 'MMM d, h:mm a')
            : 'Set Date & Time'}
          <ChevronDown className="mt-[1px]" />
        </Button>
      </PopoverTrigger>
      <PopoverContent side="top" align="start">
        <Calendar
          mode="single"
          selected={date}
          captionLayout="dropdown"
          className="p-0"
          onSelect={(date) => {
            if (!date) return;
            const [hours, minutes] = time.split(':');
            date.setHours(Number(hours));
            date.setMinutes(Number(minutes));
            setDate(date);
            setScheduledAt(date);
          }}
        />
        <div className="mt-4 flex flex-col gap-3">
          <Label htmlFor="time-picker" className="px-1">
            Time
          </Label>
          <div className="flex items-center gap-3 border rounded-md px-2">
            <Clock8 className="size-4 text-muted-foreground shrink-0" />
            <Input
              type="time"
              className={cn(
                'h-8 bg-transparent appearance-none [&::-webkit-calendar-picker-indicator]:hidden',
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
                setScheduledAt(currentDate);
              }}
            />
            <span className="text-xs font-medium text-muted-foreground/70">
              Asia/Calcutta
            </span>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
