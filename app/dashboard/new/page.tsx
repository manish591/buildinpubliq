import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import CreateProjectForm from "@/components/CreateProjectForm";
import { isGithubIntegrationInstalled } from "@/app/actions/github";

export default async function Projects() {
  const session = await getServerSession(authOptions);
  const userId = session?.userId ?? "";
  const isGithubAppInstalled = await isGithubIntegrationInstalled(userId);

  return (
    <div className="container py-12 mx-auto px-4 md:px-6 grid md:grid-cols-4 gap-8 md:pb-40">
      <CreateProjectForm isGithubAppInstalled={isGithubAppInstalled} />
    </div>
  )
};
