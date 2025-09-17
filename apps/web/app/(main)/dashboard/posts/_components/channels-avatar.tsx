import type { Prisma } from '@buildinpubliq/db';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { AVAILABLE_PLATFORM } from '@/constants';
import { cn } from '@/lib/utils';

export function ChannelsAvatar({
  channel,
  selectedChannels,
  setSelectedChannels,
}: Readonly<{
  channel: Prisma.Channel;
  selectedChannels: string[];
  setSelectedChannels: React.Dispatch<React.SetStateAction<string[]>>;
}>) {
  const platformData = AVAILABLE_PLATFORM.find(
    (p) => p.name === channel.platform,
  );
  const isChannelSelected = selectedChannels.includes(channel.id);

  return (
    <Button
      className={cn(
        'relative w-max',
        'bg-transparent h-12 w-12 border-0 shadow-none p-0 rounded-full hover:bg-transparent cursor-pointer',
      )}
      onClick={() => {
        setSelectedChannels((prevChannels) => {
          if (prevChannels.includes(channel.id)) {
            return prevChannels.filter((item) => item !== channel.id);
          }
          return [...prevChannels, channel.id];
        });
      }}
    >
      <Avatar className={cn('w-12 h-12', !isChannelSelected && 'saturate-0')}>
        <AvatarImage src={channel.platformUserImg ?? ''} />
        <AvatarFallback>{channel.platformUserName?.at(0)}</AvatarFallback>
      </Avatar>
      <div
        className={cn(
          'absolute size-[22px] bg-background right-0 bottom-[0%] rounded-full flex items-center justify-center',
        )}
      >
        {platformData && (
          <platformData.icon
            className={cn(
              'size-[18px] p-0.5 rounded-full',
              platformData.iconBGColor,
              !isChannelSelected && 'saturate-0',
            )}
          />
        )}
      </div>
    </Button>
  );
}
