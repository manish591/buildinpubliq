import ProjectUpdatesDashboard from "@/components/ProjectUpdateDashboard";
import ProjectUpdateTaskbar from "@/components/ProjectUpdateTaskbar";

export default async function ProjectUpdates() {
  return (
    <div className="flex flex-col gap-8">
      <ProjectUpdateTaskbar />
      <ProjectUpdatesDashboard />
    </div>
  )
}