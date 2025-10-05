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

  const toggleChannel = () =>
    setSelectedChannels((prev) =>
      prev.includes(channel.id)
        ? prev.filter((id) => id !== channel.id)
        : [...prev, channel.id],
    );

  const PlatformIcon = platformData?.icon as
    | React.ComponentType<React.SVGProps<SVGSVGElement>>
    | undefined;

  return (
    <Button
      type="button"
      aria-pressed={isChannelSelected}
      onClick={toggleChannel}
      className={cn(
        'relative p-0 w-12 h-12 rounded-full bg-transparent border-0 shadow-none',
        'flex items-center justify-center cursor-pointer',
      )}
    >
      <Avatar className={cn('w-12 h-12', !isChannelSelected && 'saturate-0')}>
        <AvatarImage src={channel.platformUserImg ?? ''} />
        <AvatarFallback>{channel.platformUserName?.at(0)}</AvatarFallback>
      </Avatar>
      {PlatformIcon && (
        <span className="absolute size-[22px] bg-background right-0 bottom-0 rounded-full flex items-center justify-center">
          <span
            className={cn(
              'h-[18px] w-[18px] p-0.5 rounded-full',
              platformData?.iconBGColor,
            )}
          >
            <PlatformIcon className={cn('text-white w-full! h-full!')} />
          </span>
        </span>
      )}
    </Button>
  );
}
