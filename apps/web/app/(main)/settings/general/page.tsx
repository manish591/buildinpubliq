import { redirect } from 'next/navigation';
import { auth } from '@/auth';
import { MainHeader } from '../../_components/main-header';

export default async function SettingsGeneralPage() {
  const session = await auth();

  if (!session?.user) {
    return redirect('/auth');
  }

  return (
    <div>
      <MainHeader>
        <MainHeader.Wrapper>
          <MainHeader.Title>General</MainHeader.Title>
        </MainHeader.Wrapper>
      </MainHeader>
      <main className="w-full max-w-7xl mx-auto py-6 px-8 border">
        <h1>jfjfj</h1>
      </main>
    </div>
  );
}
