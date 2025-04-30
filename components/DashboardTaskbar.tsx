import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { CirclePlus } from 'lucide-react';

export default function DashboardTaskbar() {
  return (
    <Link href="/dashboard/new">
      <Button variant="default" className="flex items-center gap-2">
        <CirclePlus strokeWidth={1} width={16} height={16} />
        <span>Create New Project</span>
      </Button>
    </Link>
  );
}
