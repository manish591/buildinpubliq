import { EllipsisVertical } from 'lucide-react';
import TwitterSVGIcon from '@/components/svg-icons/twitter';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

export function ChannelCard() {
  return (
    <div className="border rounded-md p-4 px-6 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="relative w-max">
          <Avatar className="w-12 h-12">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="absolute size-[22px] bg-background right-0 bottom-[0%] rounded-full flex items-center justify-center">
            <TwitterSVGIcon className="size-[18px] p-0.5 bg-foreground rounded-full" />
          </div>
        </div>
        <div>
          <p className="font-medium text-lg">manishdevrani777</p>
          <p className="text-sm text-muted-foreground">X Premium Account</p>
        </div>
      </div>
      <div>
        <Button size="icon" variant="ghost">
          <EllipsisVertical />
        </Button>
      </div>
    </div>
  );
}
