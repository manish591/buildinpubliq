import { getAllProjects } from "@/app/actions/projects";
import ProjectCard from "@/components/ProjectCard";

export async function ProjectsGrid() {
  const projectsData = await getAllProjects();

  return (
    <div className="gap-10 md:columns-2 lg:columns-3 max-w-7xl w-full mx-auto">
      {
        projectsData.data.map(project => {
          return (
            <div key={project.id} className="py-4">
              <ProjectCard {...project} />
            </div>
          )
        })
      }
    </div>
  )
}