import Image from 'next/image';
import Link from 'next/link';
import {
  Edit,
  ExternalLink,
  GitPullRequest,
  MoveHorizontal,
} from 'lucide-react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { timeAgo } from '@/utils/date';
import { EditProjectForm } from './editProjectForm';

interface ProjectCardProps {
  id: string;
  title: string;
  fullName: string;
  repositoryUrl: string;
  defaultBranch: string;
  description: string;
  repositoryUpdatedAt: string;
}

export default function ProjectCard({
  id,
  title,
  fullName,
  repositoryUrl,
  defaultBranch,
  description,
  repositoryUpdatedAt,
}: Readonly<ProjectCardProps>) {
  return (
    <Card className="bg-muted/10 break-inside-avoid hover:shadow-md transition-shadow">
      <CardHeader className="flex flex-row items-center gap-4">
        <div className="grid gap-1">
          <CardTitle>{title}</CardTitle>
          <CardDescription>{fullName}</CardDescription>
        </div>
        <Dialog>
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="ml-auto">
                <MoveHorizontal className="w-4 h-4" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <DialogTrigger className="w-full">
                  <Button className="hover:bg-transparent w-full flex justify-start text-left bg-transparent h-5 px-0 text-foreground no-underline lowercase">
                    <Edit className="h-5 w-5 text-gray-500"></Edit>
                    <span>Edit</span>
                  </Button>
                </DialogTrigger>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link
                  href={repositoryUrl}
                  target="_blank"
                  className="w-full flex items-center gap-2"
                >
                  <ExternalLink className="h-5 w-5 text-gray-500"></ExternalLink>
                  View Repo
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
            <DialogContent>
              <DialogHeader>
                <EditProjectForm
                  id={id}
                  title={title}
                  description={description}
                />
              </DialogHeader>
            </DialogContent>
          </DropdownMenu>
        </Dialog>
      </CardHeader>
      <CardContent className="grid gap-2">
        <div className="text-sm">{description}</div>
        <div className="flex items-center gap-4 text-sm mt-2">
          <div className="flex items-center gap-1">
            <Image
              src="/github.svg"
              width={16}
              height={16}
              alt="github"
              className="w-4 h-4"
            />
            <span className="text-muted-foreground">
              {timeAgo(new Date(repositoryUpdatedAt).getTime())}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <GitPullRequest className="w-4 h-4" color="#696969" />
            <span className="text-muted-foreground">{defaultBranch}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
