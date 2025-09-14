import { ConnectChannelButton } from '@/components/general/connect-channel-button';
import { LinkedinSVGIcon } from '@/components/svg-icons/linkedin';
import { TwitterSVGIcon } from '@/components/svg-icons/twitter';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  LINKEDIN_AUTHORIZATION_BASE_URL,
  LINKEDIN_AUTHORIZATION_QUERY_PARAMS,
  TWITTER_AUTHORIZATION_BASE_URL,
  TWITTER_AUTHORIZATION_QUERY_PARAMS,
} from '@/constants';
import { constructAuthURL } from '@/lib/construct-auth-url';

const LINKEDIN_AUTHORIZATION_URL = constructAuthURL(
  LINKEDIN_AUTHORIZATION_BASE_URL,
  LINKEDIN_AUTHORIZATION_QUERY_PARAMS,
  '/settings/channels',
);

const TWITTER_AUTHORIZATION_URL = constructAuthURL(
  TWITTER_AUTHORIZATION_BASE_URL,
  TWITTER_AUTHORIZATION_QUERY_PARAMS,
  '/settings/channels',
);

export function ConnectChannelsModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
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
          <ConnectChannelButton
            className="border min-h-44 rounded-md flex flex-col items-center bg-transparent gap-0"
            authorizationURL={LINKEDIN_AUTHORIZATION_URL}
          >
            <div className="w-12 h-12 bg-[#0A66C2] p-1 rounded-md">
              <LinkedinSVGIcon className="w-full! h-full!" />
            </div>
            <p className="font-medium text-lg mt-3">LinkedIn</p>
            <p className="text-muted-foreground mt-1">Profile</p>
          </ConnectChannelButton>
          <ConnectChannelButton
            className="border min-h-44 rounded-md flex flex-col items-center bg-transparent gap-0"
            authorizationURL={TWITTER_AUTHORIZATION_URL}
          >
            <div className="w-12 h-12 bg-black p-1 rounded-md">
              <TwitterSVGIcon className="w-full! h-full!" />
            </div>
            <p className="font-medium text-lg mt-3">X/Twitter</p>
            <p className="text-muted-foreground mt-1">Profile</p>
          </ConnectChannelButton>
        </div>
      </DialogContent>
    </Dialog>
  );
}
