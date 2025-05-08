import Link from 'next/link';
import {
  FolderKanban,
  History,
  Settings,
  Users,
  UserSearch,
} from 'lucide-react';
import SignoutButton from '@/components/SignoutButton';

export function Sidebar({
  children,
}: Readonly<{ children?: React.ReactNode }>) {
  return (
    <div className="bg-muted/30 h-[100vh] sticky top-0 p-3 border-r flex flex-col">
      {children}
      <div className="mt-6">
        <h2 className="pl-2 text-sm text-muted-foreground">Projects</h2>
        <Link href="/dashboard">
          <div className="p-2 hover:bg-muted trasition rounded-md mt-2 flex items-center gap-2">
            <FolderKanban strokeWidth={1} width={16} height={16} />
            <span>My Projects</span>
          </div>
        </Link>
        <Link href="#">
          <div className="p-2 hover:bg-muted trasition rounded-md flex items-center gap-2">
            <History strokeWidth={1} width={16} height={16} />
            <span>View Updates</span>
          </div>
        </Link>
      </div>
      <div className="mt-6 hidden">
        <h2 className="pl-2 text-sm text-muted-foreground">Explore</h2>
        <Link href="#">
          <div className="p-2 hover:bg-muted trasition rounded-md mt-2 flex items-center gap-2">
            <Users strokeWidth={1} width={16} height={16} />
            <span>Community</span>
          </div>
        </Link>
        <Link href="#">
          <div className="p-2 hover:bg-muted trasition rounded-md flex items-center gap-2">
            <UserSearch strokeWidth={1} width={16} height={16} />
            <span>visesa</span>
          </div>
        </Link>
      </div>
      <div className="mt-6 hidden">
        <h2 className="pl-2 text-sm text-muted-foreground">Account</h2>
        <Link href="#">
          <div className="p-2 hover:bg-muted trasition rounded-md mt-2 flex items-center gap-2">
            <Settings strokeWidth={1} width={16} height={16} />
            <span>Settings</span>
          </div>
        </Link>
      </div>
      <SignoutButton />
    </div>
  );
}
