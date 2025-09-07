import { GitPullRequest } from 'lucide-react';
import Image from 'next/image';
import { ProjectCardDropdown } from '@/components/project-card-action-dropdown';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { timeAgo } from '@/lib/date';

interface ProjectCardProps {
  id: string;
  title: string;
  fullName: string;
  repositoryUrl: string;
  defaultBranch: string;
  description: string;
  repositoryUpdatedAt: string;
}

export function ProjectCard({
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
        <ProjectCardDropdown
          id={id}
          title={title}
          description={description}
          repositoryUrl={repositoryUrl}
        />
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
