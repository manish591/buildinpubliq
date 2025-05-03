import { getAllProjects } from '@/app/actions/projects';
import ProjectCard from '@/components/ProjectCard';
import { FolderPlus } from 'lucide-react';
import { CreateNewProject } from './createNewProject';

export async function ProjectsGrid() {
  const projectsData = await getAllProjects();

  return (
    <div className="py-4">
      {projectsData.data.length <= 0 ? (
        <div className="flex flex-col items-center justify-center py-16 px-4">
          <div className="bg-muted/40 rounded-full p-6 mb-6">
            <FolderPlus className="h-12 w-12 text-muted-foreground" />
          </div>
          <h2 className="text-2xl font-semibold mb-2">No projects yet</h2>
          <p className="text-muted-foreground text-center max-w-md mb-8">
            You haven't created any projects yet.
            <br /> Start by creating your first project.
          </p>
          <CreateNewProject />
        </div>
      ) : (
        <div className="gap-8 md:columns-2 xl:columns-3 w-full">
          {projectsData.data.map((project) => {
            return (
              <div key={project.id} className="py-4">
                <ProjectCard {...project} />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
