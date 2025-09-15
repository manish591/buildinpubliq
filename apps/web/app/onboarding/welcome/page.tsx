import { Calendar, ChevronLeft, User2 } from 'lucide-react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getUserDetails } from '@/app/data/users/get-user-details';
import { Button } from '@/components/ui/button';
import { AppLogo } from '@/components/web/app-logo';
import { WelcomeFeatureCard } from './_components/welcome-feature-card';
import { GithubSVGIcon } from '@/components/svg-icons/github';

export default async function OnboardingWelcomePage() {
  const userData = await getUserDetails();

  if (!userData) {
    redirect('/auth');
  }

  if (userData.isOnboardingCompleted) {
    redirect('/dashboard/posts');
  }

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
      <h1 className="text-2xl mt-6 font-medium capitalize">
        Welcome, {userData.name}!
      </h1>
      <p className="text-muted-foreground mt-2 max-w-xl">
        Let's get your social media automation set up in just a few minutes.
        Buildinpubliq offers variety of features for you to grow as a developer.
      </p>
      <div className="mt-10 grid grid-cols-3 gap-4">
        <WelcomeFeatureCard>
          <User2 />
          <div className="mt-6">
            <h3 className="font-medium text-lg leading-[1.1]">
              Unlimited social accounts
            </h3>
            <p className="text-muted-foreground text-sm mt-2">
              Connect unlimited accounts from all major platforms
            </p>
          </div>
        </WelcomeFeatureCard>
        <WelcomeFeatureCard>
          <Calendar />
          <div className="mt-6">
            <h3 className="font-medium text-lg leading-[1.1]">
              Unlimited scheduling
            </h3>
            <p className="text-muted-foreground text-sm mt-2">
              Schedule unlimited posts with no monthly restrictions
            </p>
          </div>
        </WelcomeFeatureCard>
        <WelcomeFeatureCard>
          <GithubSVGIcon className="size-6" />
          <div className="mt-6">
            <h3 className="font-medium text-lg leading-[1.1]">
              Code to Content
            </h3>
            <p className="text-muted-foreground text-sm mt-2">
              Auto-generate ideas from your github pull request.
            </p>
          </div>
        </WelcomeFeatureCard>
      </div>
      <div className="flex items-center justify-between mt-10">
        <Button variant="outline" disabled>
          <ChevronLeft className="text-muted-foreground" /> Previous
        </Button>
        <Button asChild>
          <Link href="/onboarding/connect-channels">Continue</Link>
        </Button>
      </div>
    </>
  );
}
