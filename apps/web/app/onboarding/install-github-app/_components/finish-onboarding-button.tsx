'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { finishOnboarding } from '../../actions';

export function FinishOnboardingButton({
  disabled,
}: Readonly<{ disabled: boolean }>) {
  const router = useRouter();

  async function handleFinishOnboarding() {
    try {
      await finishOnboarding();
      router.push('/dashboard');
    } catch (err) {
      console.log('Failed to finish onboarding', err);
    }
  }

  return (
    <Button
      className="cursor-pointer"
      onClick={handleFinishOnboarding}
      disabled={disabled}
    >
      Finish
    </Button>
  );
}
