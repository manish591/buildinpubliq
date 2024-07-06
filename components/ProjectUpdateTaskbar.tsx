import Link from "next/link";
import { LayoutGrid, LayoutList } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import {Select,SelectContent,SelectItem,SelectTrigger,SelectValue} from "@/components/ui/select";

export default function ProjectUpdateTaskbar() {
  return (
    <div className="w-full text-right flex gap-2">
      <Input placeholder="Search Projects..." className="bg-transparent py-3" />
      <Select >
        <SelectTrigger className="bg-transparent w-[180px]">
          <SelectValue placeholder="Sort" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="light">Sort By Name</SelectItem>
          <SelectItem value="dark">Sort By Date</SelectItem>
        </SelectContent>
      </Select>
      <Link href="/dashboard/new">
        <Button variant="default" className="ml-auto">
          Create New Update
        </Button>
      </Link>
    </div>
  )
}