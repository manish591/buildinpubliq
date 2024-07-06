import { redirect } from "next/navigation";
import getProjectDetails from "@/app/actions/projects";
import ProjectUpdatesDashboard from "@/components/ProjectUpdateDashboard";
import ProjectUpdateTaskbar from "@/components/ProjectUpdateTaskbar";

export default async function ProjectUpdates({ 
  params 
}: Readonly<{ params: { projectId: string } }>) {
  const projectDetails = await getProjectDetails(params.projectId);

  if(!projectDetails.data) {
    return redirect("/dashboard/projects");
  }

  return (
    <div className="flex flex-col gap-8">
      <ProjectUpdateTaskbar />
      <ProjectUpdatesDashboard 
        title={projectDetails.data.title} 
        fullName={projectDetails.data.fullName}
        repositoryUrl={projectDetails.data.repositoryUrl}
        repoId={projectDetails.data.repoId}
      />
    </div>
  )
}