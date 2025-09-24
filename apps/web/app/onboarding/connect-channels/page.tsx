import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getAllChannels } from '@/app/data/channels/get-all-channels';
import { getUserDetails } from '@/app/data/users/get-user-details';
import { ConnectChannelButton } from '@/components/general/connect-channel-button';
import { Button } from '@/components/ui/button';
import { AppLogo } from '@/components/web/app-logo';
import { AVAILABLE_PLATFORM } from '@/constants';
import { constructChannelAuthURL } from '@/lib/construct-auth-url';
import { cn } from '@/lib/utils';

export default async function OnboardingConnectChanneslsPage() {
  const userData = await getUserDetails();

  if (!userData) {
    redirect('/auth');
  }

  if (userData.isOnboardingCompleted) {
    redirect('/dashboard/posts');
  }

  const channelsData = await getAllChannels();
  const connectedPlatform = new Set(
    channelsData.map((channel) => channel.platform),
  );

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
        Connect Channels{' '}
        {channelsData.length > 0 && (
          <span className="text-sm text-green-500">
            ({channelsData.length} Connected)
          </span>
        )}
      </h1>
      <p className="text-muted-foreground mt-2 max-w-xl">
        Connect at least one social media channel to start scheduling and
        managing your content. You can add more channels anytime.
      </p>
      <div className="mt-10 grid grid-cols-3 gap-4">
        {AVAILABLE_PLATFORM.map((platform) => {
          return (
            <ConnectChannelButton
              key={platform.name}
              className={cn(
                'border min-h-44 rounded-md flex flex-col items-center bg-transparent gap-0',
                connectedPlatform.has(platform.name) && 'border-primary',
              )}
              authorizationURL={constructChannelAuthURL(platform.authBaseURL, {
                ...platform.authQueryParams,
                state: encodeURIComponent(
                  JSON.stringify({
                    redirect: '/onboarding/connect-channels',
                  }),
                ),
              })}
            >
              <div className={cn('w-12 h-12')}>
                <platform.icon
                  className={cn('w-full! h-full!', platform.iconBGColor)}
                />
              </div>
              <p className="font-medium text-lg mt-3">{platform.title}</p>
              <p className="text-muted-foreground mt-1">Profile</p>
            </ConnectChannelButton>
          );
        })}
      </div>
      <div className="flex items-center justify-between mt-10">
        <Button variant="outline" asChild>
          <Link href="/onboarding/welcome" className="flex items-center gap-2">
            <ChevronLeft className="text-muted-foreground" /> Previous
          </Link>
        </Button>
        <Button asChild>
          <Link
            href="/onboarding/install-github-app"
            className={cn(
              connectedPlatform.size === 0 && 'pointer-events-none opacity-80',
            )}
          >
            Continue
          </Link>
        </Button>
      </div>
    </>
  );
}
