import { getServerSession } from "next-auth";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { isGithubIntegrationInstalled } from "@/utils/github";
import InstallRepo from "@/components/InstallRepo";
import ListRepositories from "@/components/ListRepositoriesContainer";

export default async function ShowRepoOrInstallRepo() {
  const session = await getServerSession(authOptions);
  const userId = session?.userId ?? "";
  const isGithubAppInstalled = await isGithubIntegrationInstalled(userId);

  return (
    <>
      {
        isGithubAppInstalled ? (
          <ListRepositories />
        ):(
          <InstallRepo />
        )
      }
    </>
  )
}