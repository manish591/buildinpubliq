import { getCurrentUser } from '@/app/data/users/verify-auth-session';
import { redirect } from 'next/navigation';
import { MainHeader } from '../_components/main-header';

export default async function OverviewPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect('/auth');
  }

  return (
    <div>
      <MainHeader>
        <MainHeader.Title>overview</MainHeader.Title>
      </MainHeader>
      <main className="w-full max-w-6xl mx-auto py-6 px-6"></main>
    </div>
  );
}
