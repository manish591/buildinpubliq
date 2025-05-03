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

export default async function ProjectUpdatesTable() {
  // const { data } = await getAllUpdates();
  const data = [
    {
      id: '1a2b3c',
      title: 'Build a Portfolio',
      tagline: 'Showcase your dev journey',
      description: 'A personal portfolio to showcase my projects.',
      project: {
        repositoryUrl: 'https://github.com/johndoe/portfolio',
        fullName: 'johndoe/portfolio',
      },
      repoId: 'repo001',
      defaultBranch: 'main',
      language: 'TypeScript',
      repositoryUpdatedAt: '2025-04-28T14:32:00Z',
      userId: 'user123',
      createdAt: new Date('2025-04-01T10:00:00Z'),
      updatedAt: new Date('2025-04-28T14:32:00Z'),
    },
    {
      id: '4d5e6f',
      title: 'Chat App',
      tagline: 'Talk in real time',
      description: 'A simple real-time chat application using WebSockets.',
      project: {
        repositoryUrl: 'https://github.com/janedoe/chat-app',
        fullName: 'janedoe/chat-app',
      },
      repoId: 'repo002',
      defaultBranch: 'main',
      language: 'JavaScript',
      repositoryUpdatedAt: '2025-04-25T16:00:00Z',
      userId: 'user456',
      createdAt: new Date('2025-03-15T09:00:00Z'),
      updatedAt: new Date('2025-04-25T16:00:00Z'),
    },
    {
      id: '7g8h9i',
      title: 'Task Manager',
      tagline: 'Stay organized effortlessly',
      description: 'A task manager with drag-and-drop support.',
      project: {
        repositoryUrl: 'https://github.com/bobsmith/task-manager',
        fullName: 'bobsmith/task-manager',
      },
      repoId: 'repo003',
      defaultBranch: 'develop',
      language: 'Python',
      repositoryUpdatedAt: '2025-04-20T08:45:00Z',
      userId: 'user789',
      createdAt: new Date('2025-02-20T12:30:00Z'),
      updatedAt: new Date('2025-04-20T08:45:00Z'),
    },
    {
      id: '0j1k2l',
      title: 'E-commerce API',
      tagline: 'Power your online store backend',
      description: 'A backend API for an e-commerce application.',
      project: {
        repositoryUrl: 'https://github.com/alice/ecommerce-api',
        fullName: 'alice/ecommerce-api',
      },
      repoId: 'repo004',
      defaultBranch: 'main',
      language: 'Go',
      repositoryUpdatedAt: '2025-04-22T11:10:00Z',
      userId: 'user321',
      createdAt: new Date('2025-01-10T14:00:00Z'),
      updatedAt: new Date('2025-04-22T11:10:00Z'),
    },
    {
      id: '3m4n5o',
      title: 'Blog CMS',
      tagline: 'Manage content with ease',
      description: 'A headless CMS for managing blog content.',
      project: {
        repositoryUrl: 'https://github.com/carol/blog-cms',
        fullName: 'carol/blog-cms',
      },
      repoId: 'repo005',
      defaultBranch: 'main',
      language: 'Ruby',
      repositoryUpdatedAt: '2025-04-30T18:00:00Z',
      userId: 'user654',
      createdAt: new Date('2025-03-01T08:15:00Z'),
      updatedAt: new Date('2025-04-30T18:00:00Z'),
    },
  ];

  return (
    <>
      {data.length <= 0 ? (
        <div className="py-32">
          <h2 className="text-2xl text-center">No updates to show</h2>
        </div>
      ) : (
        <Table className="mt-4">
          <TableHeader>
            <TableRow>
              <TableHead>Content</TableHead>
              <TableHead className="hidden sm:table-cell">Platforms</TableHead>
              <TableHead className="hidden sm:table-cell">Status</TableHead>
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
                    <div className="text-base line-clamp-2 max-w-xs">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Mollitia beatae eligendi atque vitae sint eaque dicta
                      fugiat, repellendus blanditiis debitis.
                    </div>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
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
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    <Badge className="text-xs" variant="secondary">
                      Scheduled
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <div className="flex gap-1 items-center">
                      <Check className="h-3 w-3 text-gray-500"></Check>
                      <span>May 1, 10:30 AM</span>
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
