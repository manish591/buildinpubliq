import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { hasGithubIntegration } from '@/app/data/github/has-github-integration';
import { getUserDetails } from '@/app/data/users/get-user-details';
import { InstallGithubIntegration } from '@/components/general/install-github-integration';
import { Button } from '@/components/ui/button';
import { AppLogo } from '@/components/web/app-logo';
import { cn } from '@/lib/utils';
import { FinishOnboardingButton } from './_components/finish-onboarding-button';

export default async function OnboardingInstallGithubAppPage() {
  const userData = await getUserDetails();

  if (!userData) {
    redirect('/auth');
  }

  if (userData.isOnboardingCompleted) {
    redirect('/dashboard/posts');
  }

  const isGithubAppInstalled = await hasGithubIntegration();

  return (
    <>
      <div>
        <AppLogo>
          <AppLogo.LogoIcon>
            <span className="mt-[1px] font-bold text-white text-2xl text-shadow-[1.5px_1.5px_0px_rgba(0,0,0,1)]">
              b
            </span>
          </AppLogo.LogoIcon>
        </AppLogo>
      </div>
      <h1 className="text-2xl mt-6 font-medium">
        Install Github App{' '}
        {isGithubAppInstalled && (
          <span className="text-green-500 text-sm">(Connected)</span>
        )}
      </h1>
      <p className="text-muted-foreground mt-2 max-w-xl">
        Connect your repos to enable automatic idea generation from pull
        requests.
      </p>
      <div className="mt-10">
        <InstallGithubIntegration
          className={cn(
            'w-full h-30 border-dashed border-2 hover:bg-transparent',
            'hover:border-black/20 [&_svg]:size-8 text-lg flex-col cursor-pointer',
            'gap-3 capitalize opacity-70 hover:opacity-100 transition-opacity',
            isGithubAppInstalled &&
              'border-black/20 hover:border-black/20 opacity-100 hover:opacity-100',
          )}
          redirectTo="/onboarding/install-github-app"
        />
      </div>
      <div className="flex items-center justify-between mt-10">
        <Button variant="outline" asChild>
          <Link
            href="/onboarding/connect-channels"
            className="flex items-center gap-2"
          >
            <ChevronLeft className="text-muted-foreground" /> Previous
          </Link>
        </Button>
        <FinishOnboardingButton disabled={!isGithubAppInstalled} />
      </div>
    </>
  );
}
