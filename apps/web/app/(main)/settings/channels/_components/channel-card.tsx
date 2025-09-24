import type { Prisma } from '@buildinpubliq/db';
import { Delete, EllipsisVertical, RefreshCcw } from 'lucide-react';
import { ConnectChannelButton } from '@/components/general/connect-channel-button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { AVAILABLE_PLATFORM } from '@/constants';
import { constructChannelAuthURL } from '@/lib/construct-auth-url';
import { cn } from '@/lib/utils';

export function ChannelCard({
  platformUserName,
  platform,
  platformUserImg,
}: Readonly<Prisma.Channel>) {
  const platformData = AVAILABLE_PLATFORM.find((p) => p.name === platform);
  const platformAuthURL = platformData?.authBaseURL as string;
  const platformQueryParams = platformData?.authQueryParams as Record<
    string,
    unknown
  >;

  return (
    <div className="border rounded-md p-4 px-6 flex items-center justify-between hover:bg-muted transition-colors">
      <div className="flex items-center gap-4">
        <div className="relative w-max">
          <Avatar className="w-12 h-12">
            <AvatarImage src={platformUserImg ?? ''} />
            <AvatarFallback>{platformUserName?.at(0)}</AvatarFallback>
          </Avatar>
          <div className="absolute size-[22px] bg-background right-0 bottom-[0%] rounded-full flex items-center justify-center">
            {platformData && (
              <span
                className={cn(
                  'h-[18px] w-[18px] p-0.5 rounded-full',
                  platformData.iconBGColor,
                )}
              >
                <platformData.icon
                  className={cn('text-white w-full! h-full!')}
                />
              </span>
            )}
          </div>
        </div>
        <div>
          <p className="font-medium text-lg">{platformUserName}</p>
          <p className="text-sm text-muted-foreground capitalize">
            {platform.replace('TWITTER', 'X').toLowerCase()} Account
          </p>
        </div>
      </div>
      <div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild className="cursor-pointer">
            <Button size="icon" variant="ghost">
              <EllipsisVertical />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem className="flex gap-2 items-center" asChild>
              <ConnectChannelButton
                className="hover:shadow-none h-8 hover:bg-secondary font-normal cursor-pointer"
                authorizationURL={constructChannelAuthURL(platformAuthURL, {
                  ...platformQueryParams,
                  state: encodeURIComponent(
                    JSON.stringify({
                      redirect: '/dashboard/channels',
                    }),
                  ),
                })}
              >
                <RefreshCcw className="size-4" /> Refresh Connection
              </ConnectChannelButton>
            </DropdownMenuItem>
            <DropdownMenuSeparator className="hidden" />
            <DropdownMenuItem className="hidden gap-2 items-center text-destructive">
              <Delete className="size-4" /> Disconnect Channel
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
