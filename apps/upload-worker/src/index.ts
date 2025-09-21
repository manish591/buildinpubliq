export default {
  async fetch(req) {
    return new Response('update uploader worker');
  },

  async scheduled(event, env, ctx): Promise<void> {
    const resp = await fetch(`${env.API_URL}/upload-update`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${env.API_KEY}`,
      },
    });
    const wasSuccessful = resp.ok ? 'success' : 'fail';
    console.log(`trigger fired at ${event.cron}: ${wasSuccessful}`);
  },
} satisfies ExportedHandler<Env>;
