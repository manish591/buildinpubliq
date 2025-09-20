import { redirect } from 'next/navigation';
import { MainHeader } from '@/app/(main)/_components/main-header';
import { getCurrentUser } from '@/app/data/users/verify-auth-session';
import { CreateIdeaModal } from './_components/create-idea-modal';
import { IdeasFilterDropdown } from './_components/ideas-filters-dropdown';
import { IdeasList } from './_components/ideas-list';
import { IdeasSearchBar } from './_components/ideas-search-bar';
import { Suspense } from 'react';

export default async function IdeasPage() {
  const user = await getCurrentUser();

  if (!user?.id) {
    redirect('/auth');
  }

  return (
    <div>
      <MainHeader>
        <MainHeader.Wrapper>
          <MainHeader.Title>Ideas</MainHeader.Title>
          <CreateIdeaModal />
        </MainHeader.Wrapper>
      </MainHeader>
      <main className="w-full max-w-7xl mx-auto py-6 px-8">
        <div className="flex items-center gap-3 justify-between">
          <div className="flex items-center gap-2">
            <IdeasFilterDropdown />
          </div>
          <IdeasSearchBar />
        </div>
        <Suspense fallback={<div className="mt-6">Loading...</div>}>
          <IdeasList />
        </Suspense>
      </main>
    </div>
  );
}
