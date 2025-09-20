import { ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function GithubPluginSettings({
  githubIntegrationInstallationId,
}: Readonly<{ githubIntegrationInstallationId: string }>) {
  return (
    <Link
      href={`https://github.com/settings/installations/${githubIntegrationInstallationId}`}
      target="_blank"
    >
      <Button
        variant="outline"
        className="w-full rounded-md text-sm flex items-center"
      >
        <span>github plugin settings</span>
        <ExternalLink />
      </Button>
    </Link>
  );
}
