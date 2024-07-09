import DashboardTaskbar from "@/components/DashboardTaskbar";
import { ProjectsGrid } from "@/components/ProjectsGrid";

export default async function Dashboard() {
  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">My Projects</h2>
          <p>View your projects. Create New projects</p>
        </div>
        <DashboardTaskbar />
      </div>
      <ProjectsGrid />
    </div>
  )
};