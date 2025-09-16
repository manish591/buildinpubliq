import type { Prisma } from '@buildinpubliq/db';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { AVAILABLE_PLATFORM } from '@/constants';
import { cn } from '@/lib/utils';

export function ChannelsAvatarCombo({
  channels,
}: Readonly<{ channels: Prisma.Channel[] }>) {
  return (
    <div className="flex items-center gap-4 px-6 bg-background py-4">
      {channels.map((channel) => {
        return <ChannelsAvatar key={channel.id} channel={channel} />;
      })}
    </div>
  );
}

export function ChannelsAvatar({
  channel,
}: Readonly<{ channel: Prisma.Channel }>) {
  const platformData = AVAILABLE_PLATFORM.find(
    (p) => p.name === channel.platform,
  );

  return (
    <div className="relative w-max">
      <Avatar className="w-12 h-12">
        <AvatarImage src={channel.platformUserImg ?? ''} />
        <AvatarFallback>{channel.platformUserName?.at(0)}</AvatarFallback>
      </Avatar>
      <div className="absolute size-[22px] bg-background right-0 bottom-[0%] rounded-full flex items-center justify-center">
        {platformData && (
          <platformData.icon
            className={cn(
              'size-[18px] p-0.5 rounded-full',
              platformData.iconBGColor,
            )}
          />
        )}
      </div>
    </div>
  );
}
