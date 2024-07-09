import Link from "next/link";

import { timeAgo } from "@/utils/date";
import { getAllUpdates } from "@/app/actions/updates";

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
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default async function ProjectUpdatesDashboard() {
  const { data } = await getAllUpdates();

  return (
    <Card>
      <CardHeader className="px-7">
        <CardTitle>Project Updates</CardTitle>
        <CardDescription>View All your updates here</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead className="hidden sm:table-cell">Repo</TableHead>
              <TableHead className="hidden sm:table-cell">Type</TableHead>
              <TableHead className="hidden md:table-cell">Created At</TableHead>
              <TableHead className="text-right sr-only">View Update</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {
              data.map(item => {
                return (
                  <TableRow key={item.id} className="hover:bg-accent">
                    <TableCell>
                      <div className="font-medium">{item.tagline}</div>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      <Link href={item.project.repositoryUrl} className="hover:underline lowercase">{item.project.fullName}</Link>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      <Badge className="text-xs" variant="secondary">
                        {item.type}
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">{timeAgo(item.createdAt.getTime())}</TableCell>
                    <TableCell className="text-right">
                      <Dialog>
                        <DialogTrigger asChild>
                        <Button variant="outline">View Update</Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                          <DialogHeader>
                            <DialogTitle className="pr-4">{item.tagline}</DialogTitle>
                          </DialogHeader>
                          <div className="bg-secondary/30 p-4 rounded-md mt-4">
                            {item.description}
                          </div>
                          <DialogFooter className="mt-6">
                            <Link href={`https://x.com/compose/post?text=${item.description}`} target="_blank">
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
