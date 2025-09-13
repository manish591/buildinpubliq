import { redirect } from 'next/navigation';
import { auth } from '@/auth';
import { MainHeader } from '../../_components/main-header';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default async function SettingsGeneralPage() {
  const session = await auth();

  if (!session?.user) {
    return redirect('/auth');
  }

  return (
    <div>
      <MainHeader>
        <MainHeader.Wrapper>
          <MainHeader.Title>General</MainHeader.Title>
        </MainHeader.Wrapper>
      </MainHeader>
      <main className="w-full max-w-7xl mx-auto py-6 px-8">
        <div className="space-y-8">
          <div className="border rounded-md">
            <div className="p-8">
              <p className="text-xl font-medium">Your Name</p>
              <p className="text-muted-foreground mt-2 text-sm">
                This is your display name on buildinpubliq
              </p>
              <Input className="max-w-md mt-6" placeholder="Enter name here" />
            </div>
            <div className="bg-muted rounded-b-md">
              <div className="px-8 py-4 flex items-center justify-end">
                <Button>Save Changes</Button>
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
                defaultValue="manishdevrani777@gmail.com"
                disabled
              />
            </div>
          </div>
          <div className="border rounded-md">
            <div className="p-8">
              <p className="text-xl font-medium">Your Avatar</p>
              <p className="text-muted-foreground mt-2 text-sm">
                This is your avatar image on your buildinpubliq account.
              </p>
              <Avatar className="mt-6 h-12 w-12">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </div>
            <div className="bg-muted rounded-b-md">
              <div className="px-8 py-4 flex items-center justify-end">
                <Button>Save Changes</Button>
              </div>
            </div>
          </div>
          <div className="border border-destructive rounded-md">
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
                <Button variant="destructive">Save Changes</Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
