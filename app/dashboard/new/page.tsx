import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import CreateProjectForm from "@/components/CreateProjectForm";
import { isGithubIntegrationInstalled } from "@/app/actions/github";
import { ChevronRight } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

export default async function Projects() {
  const session = await getServerSession(authOptions);
  const userId = session?.userId ?? "";
  const isGithubAppInstalled = await isGithubIntegrationInstalled(userId);

  return (
    <div>
      <div className="p-4 border-b sticky top-0 bg-background/30 backdrop-blur-lg">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/dashboard/projects">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Create new project</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      </div>
      <div className="container py-12 mx-auto px-4 md:px-6 grid md:grid-cols-4 gap-8 md:pb-40">
        <CreateProjectForm isGithubAppInstalled={isGithubAppInstalled} />
      </div>
    </div>
  )
};
