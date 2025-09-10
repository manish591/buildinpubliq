import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';

export function IdeasSortBy() {
  return (
    <Select>
      <SelectTrigger className="w-36">
        <SelectValue placeholder="sort by" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="newest">newest first</SelectItem>
        <SelectItem value="oldest">oldest first</SelectItem>
      </SelectContent>
    </Select>
  );
}
