import Image from "next/image";
import Link from "next/link";
import { GitPullRequest, MoveHorizontal } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { timeAgo } from "@/utils/date";

interface ProjectCardProps {
  id: string,
  title: string,
  fullName: string,
  repositoryUrl: string,
  defaultBranch: string,
  description: string,
  repositoryUpdatedAt: string
}

export default function ProjectCard({ 
  title, fullName, repositoryUrl, defaultBranch, description, repositoryUpdatedAt
}: Readonly<ProjectCardProps>) {
  return (
    <Card className="bg-muted/10 break-inside-avoid">
      <CardHeader className="flex flex-row items-center gap-4">
        <div className="grid gap-1">
          <CardTitle>{title}</CardTitle>
          <CardDescription>{fullName}</CardDescription>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="ml-auto">
              <MoveHorizontal className="w-4 h-4" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <Link href="/dashboard/projects/updates">View Updates</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href={repositoryUrl} target="_blank">View Repo</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent className="grid gap-2">
        <div className="text-sm">{description}</div>
        <div className="flex items-center gap-4 text-sm mt-2">
          <div className="flex items-center gap-1">
            <Image src="/github.svg" width={16} height={16} alt="github" className="w-4 h-4" />
            <span className="text-muted-foreground">{timeAgo(new Date(repositoryUpdatedAt).getTime())}</span>
          </div>
          <div className="flex items-center gap-1">
            <GitPullRequest className="w-4 h-4" color="#696969" />
            <span className="text-muted-foreground">{defaultBranch}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
