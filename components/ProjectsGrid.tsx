import { getAllProjects } from "@/app/actions/projects";
import ProjectCard from "@/components/ProjectCard";

export async function ProjectsGrid() {
  const projectsData = await getAllProjects();

  return (
    <div className="py-8 gap-8 md:columns-2 lg:columns-3 w-full">
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