import DashboardTaskbar from "@/components/DashboardTaskbar";
import { ProjectsGrid } from "@/components/ProjectsGrid";
import { Menu } from "lucide-react";

export default function Dashboard() {
  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between">
        <div className="flex md:block items-center gap-4">
          <h2 className="text-2xl font-bold hidden md:block">My Projects</h2>
          <p className="hidden md:block">View your projects. Create New projects</p>
        </div>
        <DashboardTaskbar />
      </div>
      <ProjectsGrid />
    </div>
  )
};