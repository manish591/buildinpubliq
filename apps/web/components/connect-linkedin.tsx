'use client';

import { Button } from '@/components/ui/button';
import { BASE_URL } from '@/constants';

const CLIENT_ID = process.env.NEXT_PUBLIC_LINKEDIN_CLIENT_ID;
const REDIRECT_URI = `${BASE_URL}/api/callback/linkedin`;
const SCOPE = 'w_member_social openid email profile';

export function ConnectLinkedin() {
  return (
    <Button
      onClick={async () => {
        window.location.href = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=${SCOPE}`;
      }}
    >
      connect
    </Button>
  );
}
