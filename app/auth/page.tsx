import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { redirect } from 'next/navigation';
import { auth } from '@/auth';
import { UserAuthForm } from '@/components/user-auth-form';
import { Button } from '@/components/ui/button';

export default async function Login() {
  const session = await auth();

  if (session?.user) {
    return redirect('/dashboard');
  }

  return (
    <div className="relative h-full justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
        <div className="absolute inset-0 bg-zinc-900" />
        <div className="relative z-20 flex items-center text-lg font-medium">
          buildinpubliq
        </div>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg">
              &ldquo;Buildinpubliq Is The One Place Where People Can Learn And
              Find Great People. Everyone Should Check Out This Amazing
              Platform.&rdquo;
            </p>
            <footer className="text-sm">unknown</footer>
          </blockquote>
        </div>
      </div>
      <div className="p-4 flex flex-col sm:flex-row">
        <Link href="/">
          <Button variant="outline">
            <ArrowLeft className="w-5 h-5 text-gray-500"></ArrowLeft>
            <span>back to home</span>
          </Button>
        </Link>
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px] mt-auto mb-auto border rounded-md lg:rounded-none lg:border-none bg-muted/40 p-4 sm:p-0 sm:bg-transparent">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              connect with the community
            </h1>
            <p className="text-sm text-muted-foreground">
              use your github account to connect
            </p>
          </div>
          <UserAuthForm />
          <p className="px-8 text-center text-sm text-muted-foreground">
            By connecting your github account, you will give yourself a chance
            to shine
          </p>
        </div>
      </div>
    </div>
  );
}
