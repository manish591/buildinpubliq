'use client';

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

export function CreateNewUpdate() {
  return (
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
                <Checkbox id="twitter" />
                <label
                  htmlFor="twitter"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Twitter
                </label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox id="linkedin" />
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
                <SelectItem value="draft" className="hover:bg-accent lowercase">
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
  );
}
