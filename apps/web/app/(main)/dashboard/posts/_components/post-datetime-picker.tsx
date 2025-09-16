'use client';

import { ChevronDown, Clock8 } from 'lucide-react';
import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

export function PostDatetimePicker({
  disabled,
}: Readonly<{ disabled?: boolean }>) {
  const [_open, setOpen] = React.useState(false);
  const [date, setDate] = React.useState<Date | undefined>(undefined);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          size="sm"
          variant="ghost"
          className="h-6 px-2 -ml-2 gap-1"
          disabled={disabled}
        >
          Set Date & Time <ChevronDown className="mt-[1px]" />
        </Button>
      </PopoverTrigger>
      <PopoverContent side="top" align="start">
        <Calendar
          mode="single"
          selected={date}
          captionLayout="dropdown"
          className="p-0"
          onSelect={(date) => {
            setDate(date);
            setOpen(false);
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
              defaultValue="10:30"
              className="h-8 bg-transparent appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none shadow-none border-0 rounded-none px-0 focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
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
