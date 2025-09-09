import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { BackButton } from '@/components/web/back-button';
import { AppLogo } from '@/components/web/app-logo';
import { LoginWithGithub } from '@/app/(main)/auth/_components/login-with-github';
import { getCurrentUser } from '@/app/data/users/verify-auth-session';
import GithubSVGIcon from '@/components/svg-icons/github';
import GoogleSVGIcon from '@/components/svg-icons/google';

export default async function Login() {
  const user = await getCurrentUser();

  if (user) {
    redirect('/dashboard');
  }

  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="absolute top-6 left-6">
        <BackButton>
          <ArrowLeft /> Back
        </BackButton>
      </div>
      <div className="flex w-full max-w-sm flex-col gap-6">
        <div className="mx-auto">
          <AppLogo>
            <AppLogo.LogoIcon>
              <span className="mt-[1px] font-bold text-white text-2xl text-shadow-[1.5px_1.5px_0px_rgba(0,0,0,1)]">
                b
              </span>
            </AppLogo.LogoIcon>
            <AppLogo.AppName>
              <span className="font-normal text-xl">buildinpubliq</span>
            </AppLogo.AppName>
          </AppLogo>
        </div>
        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-xl">
                connect with the community
              </CardTitle>
              <CardDescription>connect with github or google</CardDescription>
            </CardHeader>
            <CardContent>
              <form>
                <div className="grid gap-6">
                  <div className="flex flex-col gap-4">
                    <LoginWithGithub>
                      <GithubSVGIcon />
                      continue with Github
                    </LoginWithGithub>
                    <Button variant="outline" className="w-full cursor-pointer">
                      <GoogleSVGIcon />
                      continue with Google
                    </Button>
                  </div>
                  <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                    <span className="bg-card text-muted-foreground relative z-10 px-2">
                      Or continue with
                    </span>
                  </div>
                  <div className="grid gap-6">
                    <div className="grid gap-3">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        type="email"
                        placeholder="m@example.com"
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full cursor-pointer">
                      Submit
                    </Button>
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>
          <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
            By clicking continue, you agree to our{' '}
            <Link href="/terms">Terms of Service</Link> and{' '}
            <Link href="/privacy">Privacy Policy</Link>.
          </div>
        </div>
      </div>
    </div>
  );
}
