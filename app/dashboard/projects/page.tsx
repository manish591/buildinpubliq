import DashboardTaskbar from "@/components/DashboardTaskbar";
import { ProjectsGrid } from "@/components/ProjectsGrid";

export default async function Dashboard() {
  return (
    <div className="flex flex-col gap-8">
      <DashboardTaskbar />
      <ProjectsGrid />
    </div>
  )
};