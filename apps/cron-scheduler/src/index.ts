export default {
	async fetch(req) {
		return new Response("Hello Worker!");
	},

	async scheduled(event, env, ctx): Promise<void> {
		let resp = await fetch(`${env.API_URL}/schedule-update`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"Authorization": `Bearer ${env.API_KEY}`
			}
		});
		let wasSuccessful = resp.ok ? 'success' : 'fail';
		console.log(`trigger fired at ${event.cron}: ${wasSuccessful}`);
	},
} satisfies ExportedHandler<Env>;
