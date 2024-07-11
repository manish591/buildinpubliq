"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Repository } from "@/app/actions/github";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import ListRepositoriesContainer from "@/components/ListRepositoriesContainer";
import InstallRepo from "@/components/InstallRepo";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { createProject } from "@/app/actions/projects";
import { STATUS } from "@/constants/response";

export default function CreateProjectForm({ 
  isGithubAppInstalled 
}: Readonly<{ isGithubAppInstalled: boolean }>) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedRepo, setSelectedRepo] = useState<Repository | null>(null);
  const router = useRouter();

  async function handleCreateProjectForm(e: React.SyntheticEvent<HTMLButtonElement>) {
    e.preventDefault();

    if(!title || !description || !selectedRepo) {
      console.log("Data is missing");
      return;
    }

    try {
      const data = await createProject(title, description, selectedRepo);

      if(data.status === STATUS.SUCCESS) {
        router.push("/dashboard/projects");
      }

      if(data.status === STATUS.ERROR) {
        console.log("ERROR: ", data.message);
      }
    } catch(err) {
      console.log("Error occured", err);
    }
  }

  return (
    <div className="flex items-center mb-4 md:col-start-2 md:col-span-2">
      <Card className="w-full bg-muted/30">
        <CardHeader>
          <CardTitle>Create a New Project</CardTitle>
          <CardDescription>Fill out the form to create a new project.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Project Title</Label>
            <Input 
              id="title" 
              placeholder="Enter project title" 
              className="bg-transparent"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Project Description</Label>
            <Textarea 
              id="description" 
              placeholder="Please add relevant data, This will help us generate meaningful updates" 
              className="bg-transparent min-h-[100px]"
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            />
          </div>
          { 
            isGithubAppInstalled ? (
              <ListRepositoriesContainer 
                selectedRepo={selectedRepo} 
                setSelectedRepo={setSelectedRepo} 
              />
            ):(
              <InstallRepo />
            )
          }
        </CardContent>
        <CardFooter className="mt-6">
          <Link href="/dashboard/projects">
            <Button variant="secondary" className="mr-auto">
              Cancel
            </Button>
          </Link>
          <Button 
            type="submit" 
            className="ml-auto"
            disabled={!title || !description || !selectedRepo}
            onClick={handleCreateProjectForm}
          >
            Create Project
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}