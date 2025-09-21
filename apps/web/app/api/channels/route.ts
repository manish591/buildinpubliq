import type { NextRequest } from "next/server";
import { getAllChannels } from "@/app/data/channels/get-all-channels";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const platform = searchParams.get('platform') ?? undefined;

  const channels = await getAllChannels({ platform });

  return new Response(JSON.stringify({
    status: 200,
    data: channels
  }), {
    headers: { 'Content-Type': "application/json" }
  });
}