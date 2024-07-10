import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ProjectUpdatesTable from "./ProjectUpdatesTable";

export default function ProjectUpdatesDashboard() {
  return (
    <Card>
      <CardHeader className="px-7">
        <CardTitle>Project Updates</CardTitle>
        <CardDescription>View All your updates here</CardDescription>
      </CardHeader>
      <CardContent>
        <ProjectUpdatesTable />
      </CardContent>
    </Card>
  )
}
