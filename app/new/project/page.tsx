import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ShowRepoOrInstallRepo from "@/components/ShowRepoOrInstallRepo";

export default function Component() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <div className="container py-12 md:py-20 mx-auto px-4 md:px-6 grid md:grid-cols-4 gap-8 md:pb-40">
          <div className="flex items-center mb-4 col-start-2 col-span-2">
            <Card className="w-full bg-muted/30">
              <CardHeader>
                <CardTitle>Create a New Project</CardTitle>
                <CardDescription>Fill out the form to create a new project.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Project Title</Label>
                  <Input id="title" placeholder="Enter project title" className="bg-transparent" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Project Description</Label>
                  <Textarea id="description" placeholder="Enter project description" className="bg-transparent min-h-[100px]" />
                </div>
                <ShowRepoOrInstallRepo />
              </CardContent>
              <CardFooter className="mt-6">
                <Link href="/dashboard">
                  <Button variant="secondary" className="mr-auto">
                    Cancel
                  </Button>
                </Link>
                <Button type="submit" className="ml-auto">
                  Create Project
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
        <Footer />
      </main>
    </div>
  )
};
