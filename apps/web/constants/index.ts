import { Prisma } from '@buildinpubliq/db';
import { IconBrandX } from '@tabler/icons-react';
import { Linkedin } from 'lucide-react';

export const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL ?? 'http://localhost:3000';

// platforms
export const AVAILABLE_PLATFORM = [
  {
    name: Prisma.Platform.TWITTER,
    icon: IconBrandX,
    iconBGColor: 'bg-black',
    title: 'Twitter/X',
    authBaseURL: 'https://x.com/i/oauth2/authorize',
    authQueryParams: {
      response_type: 'code',
      code_challenge: 'challenge',
      code_challenge_method: 'plain',
      client_id: process.env.NEXT_PUBLIC_TWITTER_CLIENT_ID,
      redirect_uri: process.env.NEXT_PUBLIC_TWITTER_REDIRECT_URI,
      scope: process.env.NEXT_PUBLIC_TWITTER_SCOPE,
    },
  },
  {
    name: Prisma.Platform.LINKEDIN,
    icon: Linkedin,
    iconBGColor: 'bg-[#0A66C2]',
    title: 'LinkedIn',
    authBaseURL: 'https://www.linkedin.com/oauth/v2/authorization',
    authQueryParams: {
      response_type: 'code',
      client_id: process.env.NEXT_PUBLIC_LINKEDIN_CLIENT_ID,
      redirect_uri: process.env.NEXT_PUBLIC_LINKEDIN_REDIRECT_URI,
      scope: process.env.NEXT_PUBLIC_LINKEDIN_SCOPE,
    },
  },
];
