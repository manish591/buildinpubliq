import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";

import { Sidebar } from "@/components/dashboard/Sidebar";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { AvatarFallback } from "@radix-ui/react-avatar";

export default async function DashboardLayout({ 
  children 
}: Readonly<{ children: React.ReactNode }>) {
  const session = await getServerSession(authOptions);
  const user = session?.user;
  
  if(!user) {
    return redirect("/login");
  }

  return (
    <div className="w-full grid grid-cols-[200px_1fr]">
      <Sidebar>
        <div className="text-center flex items-center gap-4 hover:bg-muted p-2 transition rounded-md">
          <Avatar className="h-[2rem] w-[2rem] bg-primary text-background">
            <AvatarImage src={user.image ? user.image : ""} />
            <AvatarFallback>{user.name ? user.name[0] : "1"}</AvatarFallback>
          </Avatar>
          <span className="truncate">manish devrani</span>
        </div>
      </Sidebar>
      <main className="w-full bg-background py-4 px-10">
        <div>
          {children}
        </div>
      </main>
    </div>
  )
}