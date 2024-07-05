import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";
import Navbar from "@/components/Navbar";
import DashboardTaskbar from "@/components/DashboardTaskbar";
import { ProjectsGrid } from "@/components/ProjectsGrid";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);

  if(!session?.user) {
    return redirect("/login");
  }

  return (
    <div className="flex flex-col w-full min-h-screen">
      <Navbar />
      <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] bg-background flex-1 flex-col gap-4 p-4 md:gap-8 md:p-10">
        <DashboardTaskbar />
        <ProjectsGrid />
      </main>
    </div>
  )
};