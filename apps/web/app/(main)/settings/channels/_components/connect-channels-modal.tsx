import { ConnectChannelButton } from '@/components/general/connect-channel-button';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { AVAILABLE_PLATFORM } from '@/constants';
import { constructChannelAuthURL } from '@/lib/construct-auth-url';
import { cn } from '@/lib/utils';

export function ConnectChannelsModal() {
  return (
    <Dialog>
      <DialogTrigger asChild className="cursor-pointer">
        <Button>Connect Channel</Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl!">
        <DialogHeader>
          <DialogTitle>Connect Your Channels</DialogTitle>
          <DialogDescription>
            Link your socials so every win gets shared — build in public,
            without lifting a finger.
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-3 gap-4 mt-4">
          {AVAILABLE_PLATFORM.map((platform) => {
            return (
              <ConnectChannelButton
                key={platform.name}
                className="border min-h-44 rounded-md flex flex-col items-center bg-transparent gap-0"
                authorizationURL={constructChannelAuthURL(
                  platform.authBaseURL,
                  {
                    ...platform.authQueryParams,
                    state: encodeURIComponent(
                      JSON.stringify({
                        redirect: '/onboarding/connect-channels',
                      }),
                    ),
                  },
                )}
              >
                <div
                  className={cn(
                    'w-12 h-12 p-1 rounded-md',
                    platform.iconBGColor,
                  )}
                >
                  {<platform.icon className="w-full! h-full!" />}
                </div>
                <p className="font-medium text-lg mt-3">{platform.title}</p>
                <p className="text-muted-foreground mt-1">Profile</p>
              </ConnectChannelButton>
            );
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
}
