import { ChevronDown, ChevronRight, Plus } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { LinkedinSVGIcon } from '@/components/svg-icons/linkedin';
import { Textarea } from '@/components/ui/textarea';

export function CreatePostModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Create Post
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl! gap-0 p-0 rounded-xl">
        <DialogHeader className="px-6 py-5 pb-2">
          <DialogTitle className="text-base flex items-center font-normal gap-2 text-muted-foreground">
            Post <ChevronRight className="size-4 text-muted-foreground/90" />{' '}
            <span className="text-foreground">New Post</span>
          </DialogTitle>
        </DialogHeader>
        <div className="flex items-center gap-4 px-6 bg-background py-4">
          <div className="relative w-max">
            <Avatar className="w-12 h-12">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="absolute size-[22px] bg-background right-0 bottom-[0%] rounded-full flex items-center justify-center">
              <LinkedinSVGIcon className="size-[18px] p-0.5 rounded-full text-white bg-[#0A66C2]" />
            </div>
          </div>
          <Avatar className="w-10 h-10">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
        <div className="max-h-[300px] overflow-y-auto px-6 pt-2 pb-4">
          <Textarea
            placeholder="Enter post content"
            className="min-h-[200px] focus-visible:ring-0 focus-visible:ring-transparent"
          />
        </div>
        <DialogFooter className="px-4 py-4 bg-muted/80 rounded-b-xl gap-4 border-t">
          <Button variant="outline" size="sm">
            Save As Drafts
          </Button>
          <Button size="sm">
            Schedule Posts <ChevronDown />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
