import {
  ExternalLink,
  Edit,
  Archive,
  MoreHorizontal,
  Lightbulb,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { getAllIdeas } from '@/app/data/ideas/get-all-ideas';

export async function IdeasList() {
  const allIdeas = await getAllIdeas();

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Ideas ({allIdeas.length})</h2>
      </div>
      {allIdeas.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-80 text-center border bg-card rounded-md">
          <div className="text-6xl mb-4">
            <Lightbulb className="w-12 h-12 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold mb-2">No ideas yet</h3>
          <p className="text-muted-foreground mb-4">
            Connect a repo or generate an idea to get started
          </p>
        </div>
      ) : (
        <div className="grid gap-4">
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">
                      repo name
                    </Badge>
                    <Badge variant="secondary" className="text-xs">
                      don't
                    </Badge>
                  </div>
                  <h3 className="font-semibold text-balance">title here</h3>
                  <p className="text-sm text-muted-foreground">createdat</p>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Convert to Post
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Archive className="h-4 w-4 mr-2" />
                      Archive
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-sm text-pretty leading-relaxed">previws</p>
              <div className="flex gap-2 mt-4">
                <Button size="sm" className="gap-2">
                  <ExternalLink className="h-3 w-3" />
                  Convert to Post
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="gap-2 bg-transparent"
                >
                  <Edit className="h-3 w-3" />
                  Edit
                </Button>
                <Button size="sm" variant="ghost" className="gap-2">
                  <Archive className="h-3 w-3" />
                  Archive
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
