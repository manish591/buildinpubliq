'use client';

import { useLinkStatus } from 'next/link';

export default function LoadingIndicator() {
  const { pending } = useLinkStatus();
  return pending ? (
    <output
      className="animate-spin inline-block size-3.5 border-2 border-current border-t-transparent text-white rounded-full"
      aria-label="loading"
    >
      <span className="sr-only">Loading...</span>
    </output>
  ) : null;
}
