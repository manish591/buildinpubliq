'use client';

import Link from 'next/link';
import { Link as LinkIcon } from 'lucide-react';
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

export function CreateNewUpdate({
  isLinkedinConnected,
  isTwitterConnected,
}: Readonly<{ isLinkedinConnected: boolean; isTwitterConnected: boolean }>) {
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
        <div className="flex items-center mb-4 md:col-start-2 md:col-span-2">
          <Card className="w-full p-0 border-none shadow-none">
            <CardHeader className="px-2">
              <CardTitle>create new update</CardTitle>
              <CardDescription>
                fill out the form to create a new update.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 px-2">
              <div className="space-y-2">
                <Label htmlFor="description">content</Label>
                <Textarea
                  id="description"
                  placeholder="add your new update content"
                  className="bg-transparent min-h-[100px]"
                />
              </div>
              <div>
                <p className="block text-sm font-medium mb-2">Platforms</p>
                <div className="flex space-x-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="twitter" disabled={isTwitterConnected} />
                    <label
                      htmlFor="twitter"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Twitter
                    </label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox id="linkedin" disabled={isLinkedinConnected} />
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
                <Select defaultValue="draft">
                  <SelectTrigger className="w-[150px]">
                    <SelectValue
                      placeholder="Select status"
                      className="lowercase"
                    />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem
                      value="draft"
                      className="hover:bg-accent lowercase"
                    >
                      draft
                    </SelectItem>
                    <SelectItem
                      value="queued"
                      className="hover:bg-accent lowercase"
                    >
                      scheduled
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
            <CardFooter className="mt-6 px-2">
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
