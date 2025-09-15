'use client';

import type { Prisma } from '@buildinpubliq/db';
import { Upload } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { updateUserDetails } from '../../actions';

export function EditProfile({ name, email }: Readonly<Prisma.User>) {
  const [username, setUsername] = useState(name ?? '');
  const profileImageInputRef = useRef<HTMLInputElement | null>(null);
  const router = useRouter();

  async function handleUpdateProfileDetails() {
    try {
      await updateUserDetails(username);
      router.refresh();
    } catch (err) {
      console.log('Failed to update user details', err);
    }
  }

  return (
    <div className="space-y-8">
      <div className="border rounded-md">
        <div className="p-8">
          <p className="text-xl font-medium">Your Name</p>
          <p className="text-muted-foreground mt-2 text-sm">
            This is your display name on buildinpubliq
          </p>
          <Input
            className="max-w-md mt-6"
            placeholder="Enter name here"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
        </div>
        <div className="bg-muted rounded-b-md">
          <div className="px-8 py-4 flex items-center justify-end cursor-pointer">
            <Button
              disabled={username === '' || username === name}
              onClick={handleUpdateProfileDetails}
            >
              Save Changes
            </Button>
          </div>
        </div>
      </div>
      <div className="border rounded-md">
        <div className="p-8">
          <p className="text-xl font-medium">Your Email</p>
          <p className="text-muted-foreground mt-2 text-sm">
            This is your email on buildinpubliq
          </p>
          <Input
            className="max-w-md mt-6"
            type="email"
            defaultValue={email}
            disabled
          />
        </div>
      </div>
      <div className="border rounded-md hidden">
        <div className="p-8">
          <p className="text-xl font-medium">Your Avatar</p>
          <p className="text-muted-foreground mt-2 text-sm">
            This is your avatar image on your buildinpubliq account.
          </p>
          <Button
            className="mt-6 p-0 h-16 w-16 bg-transparent hover:bg-transparent relative group cursor-pointer"
            onClick={() => {
              profileImageInputRef.current?.click();
            }}
          >
            <Avatar className="h-16 w-16">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div
              className={cn(
                'inset-0 absolute bg-black/60 rounded-full',
                'opacity-0 group-hover:opacity-100 transition-opacity',
              )}
            />
            <Upload
              className={cn(
                'size-5! absolute left-[50%] top-[50%] translate-[-50%]',
                'opacity-0 group-hover:opacity-100 z-10 transition-opacity',
              )}
            />
          </Button>
          <Input
            type="file"
            ref={profileImageInputRef}
            className="sr-only!"
            onChange={(e) => {
              const file = e.target.files;

              if (!file) {
                return;
              }
            }}
          />
        </div>
        <div className="bg-muted rounded-b-md cursor-pointer">
          <div className="px-8 py-4 flex items-center justify-end">
            <Button>Save Changes</Button>
          </div>
        </div>
      </div>
      <div className="hidden border border-destructive rounded-md">
        <div className="p-8">
          <p className="text-xl font-medium">Delete Account</p>
          <p className="text-muted-foreground mt-2 text-sm">
            Permanently delete your Buildinpuliq account, all of your ideas,
            posts and their respective stats. This action cannot be undone -
            please proceed with caution.
          </p>
        </div>
        <div className="rounded-b-md border-t border-destructive">
          <div className="px-8 py-4 flex items-center justify-end">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="destructive">Delete Account</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Bye, bye 👋</DialogTitle>
                  <DialogDescription>
                    Your account, posts, and GitHub integrations will be gone
                    forever. Like… totally wiped. There's no going back.
                  </DialogDescription>
                </DialogHeader>
                <div className="mt-4 flex justify-end">
                  <Button className="cursor-pointer">Confirm</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </div>
  );
}
