import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { UserAuthForm } from '@/components/UserAuthForm';

export default async function Login() {
  const session = await auth();

  if (session?.user) {
    return redirect('/dashboard/projects');
  }

  return (
    <div className="container relative h-full flex flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
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
      <div className="border p-4 py-10 bg-muted/40 rounded-md md:bg-transparent md:rounded-none md:border-none lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Login to your account
            </h1>
            <p className="text-sm text-muted-foreground">
              Connect your github account below
            </p>
          </div>
          <UserAuthForm />
          <p className="px-8 text-center text-sm text-muted-foreground">
            By connecting your github account, you gave yourself a chance to
            shine
          </p>
        </div>
      </div>
    </div>
  );
}
