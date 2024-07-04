import Link from "next/link";
import { LayoutGrid, LayoutList } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import {Select,SelectContent,SelectItem,SelectTrigger,SelectValue} from "@/components/ui/select";

export default function DashboardTaskbar() {
  return (
    <div className="max-w-7xl w-full items-stretch text-right mx-auto flex gap-2">
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
      <ToggleGroup type="single" className="border rounded-md">
        <ToggleGroupItem value="grid" size="sm">
          <LayoutGrid width={17} height={17} />
        </ToggleGroupItem>
        <ToggleGroupItem value="list" size="sm">
          <LayoutList width={17} height={17} />
        </ToggleGroupItem>
      </ToggleGroup>
      <Link href="/new/project">
        <Button variant="default" className="ml-auto">
          Create New Project
        </Button>
      </Link>
    </div>
  )
}