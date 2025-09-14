import type { Prisma } from '@buildinpubliq/db';
import {
  Delete,
  EllipsisVertical,
  ExternalLink,
  RefreshCcw,
} from 'lucide-react';
import { LinkedinSVGIcon } from '@/components/svg-icons/linkedin';
import { TwitterSVGIcon } from '@/components/svg-icons/twitter';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Link from 'next/link';

const PLATFORM_BASE_URL = {
  TWITTER: 'https://x.com',
  LINKEDIN: 'https://www.linkedin.com/in',
};

export function ChannelCard({
  platformUserName,
  platform,
  platformUserImg,
}: Readonly<Prisma.Channel>) {
  return (
    <div className="border rounded-md p-4 px-6 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="relative w-max">
          <Avatar className="w-12 h-12">
            <AvatarImage src={platformUserImg ?? ''} />
            <AvatarFallback>{platformUserName?.at(0)}</AvatarFallback>
          </Avatar>
          <div className="absolute size-[22px] bg-background right-0 bottom-[0%] rounded-full flex items-center justify-center">
            {platform === 'LINKEDIN' && (
              <LinkedinSVGIcon className="size-[18px] p-0.5 bg-[#0A66C2] rounded-full" />
            )}
            {platform === 'TWITTER' && (
              <TwitterSVGIcon className="size-[18px] p-0.5 bg-black rounded-full" />
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
            <DropdownMenuItem
              asChild
              className="flex items-center gap-2 cursor-pointer capitalize"
            >
              <Link
                href={`${PLATFORM_BASE_URL[platform]}/${platformUserName}`}
                target="_blank"
              >
                <ExternalLink className="size-4" />
                View on {platform.toLowerCase()}
                {platform === 'TWITTER' && '/X'}
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex gap-2 items-center">
              <RefreshCcw className="size-4" /> Refresh Connection
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="flex gap-2 items-center text-destructive">
              <Delete className="size-4" /> Disconnect Channel
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
