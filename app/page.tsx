import Link from "next/link";
import { getServerSession } from "next-auth";

export default async function Home() {
  const session = await getServerSession();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {
        session?.user ? (
          <h1>Logged In: { JSON.stringify(session?.user) }</h1>
        ):(
          <Link href="/login">Get started</Link>
        )
      }
    </main>
  );
}
