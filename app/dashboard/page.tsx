import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import Image from "next/image";
import { BookOpen, GitPullRequest, House, LayoutPanelLeft, MoveHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import Navbar from "@/components/Navbar";
import DashboardTaskbar from "@/components/DashboardTaskbar";

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
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 max-w-7xl w-full mx-auto">
          <Card>
            <CardHeader className="flex flex-row items-center gap-4">
              <House className="w-8 h-8" />
              <div className="grid gap-1">
                <CardTitle>www</CardTitle>
                <CardDescription>example.com</CardDescription>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="ml-auto">
                    <MoveHorizontal className="w-4 h-4" />
                    <span className="sr-only">Toggle menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>View Project</DropdownMenuItem>
                  <DropdownMenuItem>View Settings</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </CardHeader>
            <CardContent className="grid gap-2">
              <div className="text-sm font-semibold">feat: update color scheme</div>
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <Image src="/github.svg" width={16} height={16} alt="github" className="w-4 h-4" />
                  <span className="text-muted-foreground">3h ago</span>
                </div>
                <div className="flex items-center gap-1">
                  <GitPullRequest className="w-4 h-4" />
                  <span className="text-muted-foreground">main</span>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center gap-4">
              <BookOpen className="w-8 h-8" />
              <div className="grid gap-1">
                <CardTitle>docs</CardTitle>
                <CardDescription>docs.example.com</CardDescription>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="ml-auto">
                    <MoveHorizontal className="w-4 h-4" />
                    <span className="sr-only">Toggle menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>View Project</DropdownMenuItem>
                  <DropdownMenuItem>View Settings</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </CardHeader>
            <CardContent className="grid gap-2">
              <div className="text-sm font-semibold">docs: add docs for memberships</div>
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <Image src="/github.svg" width={16} height={16} alt="github" className="w-4 h-4" />
                  <span className="text-muted-foreground">1 day ago</span>
                </div>
                <div className="flex items-center gap-1">
                  <GitPullRequest className="w-4 h-4" />
                  <span className="text-muted-foreground">main</span>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center gap-4">
              <LayoutPanelLeft className="w-8 h-8" />
              <div className="grid gap-1">
                <CardTitle>app</CardTitle>
                <CardDescription>app.example.com</CardDescription>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="ml-auto">
                    <MoveHorizontal className="w-4 h-4" />
                    <span className="sr-only">Toggle menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>View Project</DropdownMenuItem>
                  <DropdownMenuItem>View Settings</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </CardHeader>
            <CardContent className="grid gap-2">
              <div className="text-sm font-semibold">fix: login issues</div>
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <Image src="/github.svg" width={16} height={16} alt="github" className="w-4 h-4" />
                  <span className="text-muted-foreground">2 days ago</span>
                </div>
                <div className="flex items-center gap-1">
                  <GitPullRequest className="w-4 h-4" />
                  <span className="text-muted-foreground">main</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
};