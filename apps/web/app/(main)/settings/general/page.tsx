import { redirect } from 'next/navigation';
import { getUserDetails } from '@/app/data/users/get-user-details';
import { MainHeader } from '../../_components/main-header';
import { EditProfile } from './_components/edit-profile';

export default async function SettingsGeneralPage() {
  const userData = await getUserDetails();

  if (!userData) {
    return redirect('/auth');
  }

  return (
    <div>
      <MainHeader>
        <MainHeader.Wrapper>
          <MainHeader.Title>General</MainHeader.Title>
        </MainHeader.Wrapper>
      </MainHeader>
      <main className="w-full max-w-7xl mx-auto py-6 px-8">
        <EditProfile {...userData} />
      </main>
    </div>
  );
}
