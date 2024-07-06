import Navbar from "@/components/Navbar";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import Footer from "@/components/Footer";

export default async function DashboardLayout({ 
  children 
}: Readonly<{ children: React.ReactNode }>) {
  const session = await getServerSession(authOptions);
  
  if(!session?.user) {
    return redirect("/login");
  }

  return (
    <div className="flex flex-col w-full min-h-screen">
      <Navbar />
      <main className="max-w-7xl w-full mx-auto min-h-[calc(100vh_-_theme(spacing.16))] bg-background flex-1 py-12">
        {children}
      </main>
      <Footer />
    </div>
  )
}