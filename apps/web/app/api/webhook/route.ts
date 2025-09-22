import { createHmac, timingSafeEqual } from 'node:crypto';
import { redis } from '@buildinpubliq/redis';
import { Queue } from 'bullmq';
import { type NextRequest, NextResponse } from 'next/server';

const githubEventsQueue = new Queue('github-events', {
  connection: redis,
});

export async function POST(req: NextRequest) {
  const payload = JSON.stringify(req.body);
  const signature = req.headers.get('X-Hub-Signature-256');
  const webhookSecret = process.env.GITHUB_APP_WEBHOOK_SECRET;

  if (!webhookSecret) {
    return NextResponse.json(
      { message: 'Invalid webhook secret' },
      { status: 401 },
    );
  }

  if (!signature) {
    return NextResponse.json({ message: 'Invalid signature' }, { status: 401 });
  }

  const expectedSignatureHex = `sha256=${createHmac('sha256', webhookSecret)
    .update(payload)
    .digest('hex')}`;
  const receivedBuffer = Uint8Array.from(Buffer.from(signature, 'hex'));
  const expectedBuffer = Uint8Array.from(
    Buffer.from(expectedSignatureHex, 'hex'),
  );
  const isValid = timingSafeEqual(receivedBuffer, expectedBuffer);

  if (!isValid) {
    return NextResponse.json({ message: 'Invalid signature' }, { status: 401 });
  }

  const githubEvent = req.headers.get('X-Github-Event');
  const data = await req.json();

  if (githubEvent === 'installation' && data && data.action === 'deleted') {
    const installationId = String(data.installation.id);
    await githubEventsQueue.add("uninstall-github-integration", {
      installationId
    });
  }

  if (
    githubEvent === 'pull_request' &&
    data &&
    data.action === 'closed' &&
    data.pull_request.merged
  ) {
    const repoId = String(data.repository.id);
    const title = data.pull_request.title as string;
    const description = data.pull_request.body ?? "";

    await githubEventsQueue.add('generate-idea', {
      repoId,
      title,
      description,
    });
  }

  return NextResponse.json({ message: 'Accepted' }, { status: 202 });
}
