'use client';

import { Status } from '@prisma/client';
import { useState } from 'react';
import Link from 'next/link';
import { Link as LinkIcon, Calendar as CalendarIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

export function CreateNewUpdate({
  isLinkedinConnected,
  isTwitterConnected,
}: Readonly<{ isLinkedinConnected: boolean; isTwitterConnected: boolean }>) {
  const [status, setStatus] = useState<keyof typeof Status>(Status.DRAFT);
  const [date, setDate] = useState<Date>();

  return (
    <>
      {!isLinkedinConnected && !isTwitterConnected ? (
        <div className="py-4 rounded-md text-center">
          <p className="text-sm w-[80%] mx-auto text-muted-foreground">
            you have not connected social channels yet. connect channels to
            create new updates
          </p>
          <Link href="/profile">
            <Button variant="outline" className="border py-2 px-3 mt-4">
              <div className="flex items-center gap-2">
                <LinkIcon></LinkIcon>
                <span>connect channels</span>
              </div>
            </Button>
          </Link>
        </div>
      ) : (
        <div className="flex items-center md:col-start-2 md:col-span-2">
          <Card className="w-full p-0 border-none shadow-none">
            <CardHeader className="pt-10">
              <CardTitle>create new update</CardTitle>
              <CardDescription>
                fill out the form to create a new update.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 h-[350px] overflow-y-auto">
              <div className="space-y-2">
                <Label htmlFor="description">tagline</Label>
                <Input
                  id="description"
                  placeholder="add your new update title"
                  className="bg-transparent"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">description</Label>
                <Textarea
                  id="description"
                  placeholder="add your new update description"
                  className="bg-transparent min-h-[100px]"
                />
              </div>
              <div>
                <p className="block text-sm font-medium mb-2">Platforms</p>
                <div className="flex space-x-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="twitter" disabled={!isTwitterConnected} />
                    <label
                      htmlFor="twitter"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Twitter
                    </label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox id="linkedin" disabled={!isLinkedinConnected} />
                    <label
                      htmlFor="linkedin"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      LinkedIn
                    </label>
                  </div>
                </div>
              </div>
              <div>
                <p className="block text-sm font-medium mb-2">status</p>
                <Select
                  defaultValue={Status.DRAFT}
                  value={status}
                  onValueChange={(val) => {
                    const newVal = val as keyof typeof Status;
                    setStatus(newVal);
                  }}
                >
                  <SelectTrigger className="w-[150px]">
                    <SelectValue
                      placeholder="Select status"
                      className="lowercase"
                    />
                  </SelectTrigger>
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
              </div>
              {status === Status.SCHEDULED && (
                <div>
                  <p className="block text-sm font-medium mb-2">
                    Select date and time
                  </p>
                  <div className="flex items-center gap-4">
                    <Popover modal={true}>
                      <PopoverTrigger asChild>
                        <Button
                          variant={'outline'}
                          className={cn(
                            'w-[200px] justify-start text-left font-normal',
                            !date && 'text-muted-foreground',
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {date ? (
                            format(date, 'PPP')
                          ) : (
                            <span>Pick a date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={setDate}
                          initialFocus
                          disabled={(date) => date < new Date()}
                        />
                      </PopoverContent>
                    </Popover>
                    <Select defaultValue="0">
                      <SelectTrigger className="w-[100px]">
                        <SelectValue
                          placeholder="select time"
                          className="lowercase"
                        />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: 24 }, (_, i) => {
                          return (
                            <SelectItem
                              key={i}
                              value={i.toString()}
                              className="hover:bg-accent lowercase"
                            >
                              {i < 10 ? `0${i}` : i}:00
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}
            </CardContent>
            <CardFooter className="mt-6 pb-10">
              <Button variant="secondary" className="mr-auto">
                Cancel
              </Button>
              <Button type="submit" className="ml-auto">
                create update
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}
    </>
  );
}
