import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

export default function ListRepositories() {
  return (
    <div className="space-y-2">
      <Label htmlFor="github-links">GitHub Repository</Label>
      <Select>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select Repo" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="light">Light</SelectItem>
          <SelectItem value="dark">Dark</SelectItem>
          <SelectItem value="system">System</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}