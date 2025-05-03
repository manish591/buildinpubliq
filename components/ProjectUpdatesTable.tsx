import Link from 'next/link';
import { timeAgo } from '@/utils/date';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Check,
  Delete,
  Edit,
  Ellipsis,
  EllipsisVertical,
  LogOut,
  Settings,
  User,
  ExternalLink,
  CirclePlus,
  FolderPlus,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { getAllUpdates } from '@/app/actions/updates';
import { CreateNewProject } from './createNewProject';

export default async function ProjectUpdatesTable() {
  const { data } = await getAllUpdates();
  return (
    <>
      {data.length <= 0 ? (
        // <div className="py-32 flex items-center justify-center flex-col">
        //   <h2 className="text-lg text-center">
        //     No updates. Start working on your projects by creating pull requests
        //   </h2>
        //   <Button variant="outline" className="flex items-center gap-2 mt-4">
        //     <CirclePlus strokeWidth={1} width={16} height={16} />
        //     <span>Create New update</span>
        //   </Button>
        // </div>
        <div className="flex flex-col items-center justify-center py-16 px-4">
          <div className="bg-muted/40 rounded-full p-6 mb-6">
            <FolderPlus className="h-12 w-12 text-muted-foreground" />
          </div>
          <h2 className="text-2xl font-semibold mb-2">No updates yet</h2>
          <p className="text-muted-foreground text-center max-w-md mb-8">
            You haven't created any updates yet.
            <br /> Start by creating your first update.
          </p>
          <Dialog>
            <DialogTrigger>
              <Button variant="default" className="lowercase flex items-center gap-2">
                <CirclePlus strokeWidth={1} width={16} height={16} />
                <span>Create New update</span>
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>new updates</DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
      ) : (
        <Table className="mt-4">
          <TableHeader>
            <TableRow>
              <TableHead>Content</TableHead>
              <TableHead className="hidden sm:table-cell">repo</TableHead>
              {/* <TableHead className="hidden sm:table-cell">Platforms</TableHead>
              <TableHead className="hidden sm:table-cell">Status</TableHead> */}
              <TableHead className="hidden sm:table-cell">Date</TableHead>
              <TableHead className="text-right sm:table-cell">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item) => {
              return (
                <TableRow key={item.id}>
                  <TableCell>
                    <div className="text-base line-clamp-3 max-w-xs">
                      {item.description}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-base line-clamp-1 max-w-56">
                      <Link href={`/${item.project.repositoryUrl}`}>
                        {item.project.fullName}
                      </Link>
                    </div>
                  </TableCell>
                  {/* <TableCell className="hidden sm:table-cell">
                    <div className="flex space-x-1">
                      <Badge
                        variant="outline"
                        className="bg-blue-50 text-blue-700 border-blue-200"
                      >
                        Twitter
                      </Badge>
                      <Badge
                        variant="outline"
                        className="bg-blue-50 text-blue-800 border-blue-200"
                      >
                        LinkedIn
                      </Badge>
                    </div>
                  </TableCell> */}
                  {/* <TableCell className="hidden sm:table-cell">
                    <Badge className="text-xs" variant="secondary">
                      Scheduled
                    </Badge>
                  </TableCell> */}
                  <TableCell className="hidden md:table-cell">
                    <div className="flex gap-1 items-center">
                      <Check className="h-3 w-3 text-gray-500"></Check>
                      <span>{item.createdAt.toISOString()}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <Dialog>
                      <DropdownMenu modal={false}>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="outline"
                            className="bg-transparent px-2 border-none"
                          >
                            <Ellipsis className="h-5 w-5"></Ellipsis>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                          className="w-[--radix-dropdown-menu-trigger-width] min-w-36 rounded-lg"
                          side={'bottom'}
                          align="end"
                          sideOffset={4}
                        >
                          <DropdownMenuItem className="gap-2">
                            <DialogTrigger asChild>
                              <Button
                                variant="outline"
                                className="bg-transparent px-0 border-none h-6 gap-2 lowercase"
                              >
                                <Edit className="h-5 w-5 text-gray-500" />
                                Edit
                              </Button>
                            </DialogTrigger>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="gap-2">
                            <Delete className="h-5 w-5 text-gray-500" />
                            Delete
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="gap-2">
                            <ExternalLink className="h-5 w-5 text-gray-500" />
                            pull request
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                      <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                          <DialogTitle className="pr-4">
                            {item.tagline}
                          </DialogTitle>
                        </DialogHeader>
                        <div className="bg-secondary/30 p-4 rounded-md mt-4">
                          {item.description}
                        </div>
                        <DialogFooter className="mt-6">
                          <Link
                            href={`https://x.com/compose/post?text=${item.description}`}
                            target="_blank"
                          >
                            <Button>Post On Twitter</Button>
                          </Link>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      )}
    </>
  );
}
