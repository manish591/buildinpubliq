'use client';

import { Button } from '@/components/ui/button';

const CLIENT_ID = process.env.NEXT_PUBLIC_TWITTER_CLIENT_ID;
const REDIRECT_URI = 'http://localhost:3000/api/callback/twitter';
const SCOPE = 'tweet.write users.read offline.access';

export function ConnectTwitter() {
  return (
    <Button
      onClick={async () => {
        window.location.href = `https://x.com/i/oauth2/authorize?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=${SCOPE}&state=state&code_challenge=challenge&code_challenge_method=plain`;
      }}
    >
      connect
    </Button>
  );
}
