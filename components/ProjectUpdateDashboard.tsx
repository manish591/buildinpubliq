import getAllProjectUpdates from "@/app/actions/updates";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Link from "next/link";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

interface ProjectUpdateDashboardProps {
  title: string,
  fullName: string,
  repositoryUrl: string,
  repoId: string
}

export default async function ProjectUpdatesDashboard({ 
  title, fullName, repositoryUrl, repoId 
}: Readonly<ProjectUpdateDashboardProps>) {
  const projectUpdates = await getAllProjectUpdates(repoId);

  return (
    <Card className="bg-transparent">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <Link href={repositoryUrl} target="_blank" className="hover:underline w-max">
          <CardDescription>{fullName}</CardDescription>
        </Link>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Type</TableHead>
              <TableHead className="hidden md:table-cell">Created by</TableHead>
              <TableHead className="hidden md:table-cell">Created at</TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
          {
            projectUpdates.data.map(update => {
              return (
                <TableRow key={update.id}>
                  <TableCell className="font-medium">
                    {update.tagline}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{update.type}</Badge>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    manish591
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    2023-07-12 10:42 AM
                  </TableCell>
                  <TableCell>
                    <Dialog>
                      <DialogTrigger asChild>
                      <Button variant="secondary">View Update</Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                          <DialogTitle>{update.tagline}</DialogTitle>
                        </DialogHeader>
                        <div className="bg-secondary/30 p-4 rounded-md mt-4">
                          {update.description}
                        </div>
                        <DialogFooter className="mt-6">
                          <Link href={`https://x.com/compose/post?text=${update.description}`} target="_blank">
                            <Button>Post On Twitter</Button>
                          </Link>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              )
            })
          }
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}