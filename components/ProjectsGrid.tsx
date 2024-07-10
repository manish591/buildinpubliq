import { getAllProjects } from "@/app/actions/projects";
import ProjectCard from "@/components/ProjectCard";

export async function ProjectsGrid() {
  const projectsData = await getAllProjects();

  return (
    <div className="py-8">
      {
        projectsData.data.length <= 0 ? (
          <div className="py-48 text-center border rounded-md">
            <h2 className="text-2xl font-bold">No projects to show</h2>
            <p className="mt-2 w-[30%] mx-auto">Start by creating a new project by clicking the button above and filling the required details</p>
          </div>
        ):(
          <div className="gap-8 md:columns-2 lg:columns-3 w-full">
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
    </div>
  )
}