import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

import { Sidebar } from "@/components/dashboard/Sidebar";

export default async function DashboardLayout({ 
  children 
}: Readonly<{ children: React.ReactNode }>) {
  const session = await getServerSession(authOptions);
  
  if(!session?.user) {
    return redirect("/login");
  }

  return (
    <div className="w-full grid grid-cols-[200px_1fr]">
      <Sidebar />
      <main className="w-full bg-background py-4 px-10">
        <div>
          {children}
        </div>
      </main>
    </div>
  )
}